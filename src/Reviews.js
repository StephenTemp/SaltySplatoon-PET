import React, { useState } from 'react';
import './App.css';
import {Collapse, Container, Col, Row, Button} from 'reactstrap'

class Reviews extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			reviews: this.props.reviews,
			c: true
		}
		this.handleCollapse = this.handleCollapse.bind(this);
		//Potentially remove these
		this.handleRejectReview = this.handleRejectReview.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
	}

	handleCollapse(index){
		let reviewsCopy = [...this.state.reviews];
		console.log(reviewsCopy);
		reviewsCopy[index].collapsed = !reviewsCopy[index].collapsed;
		this.setState({
			reviews: reviewsCopy
		})
	}

	handleRejectReview(e, index){
		//Required for preventing collapse on button click
		e.stopPropagation();
		let reviewsCopy = [...this.state.reviews];
		reviewsCopy.splice(index, 1);
		this.setState({
			reviews: reviewsCopy
		})
	}

	handleTextChange(e, index){
		console.log("New text for " + index + "is: " + e.target.value)
		console.log("Word count is: " + e.target.value.trim().split(" ").length);
	}

	Hidden = (reviewerName) => {
		var hiddentextarea = document.getElementById('textarea')
		if(hiddentextarea.style.display === 'none'){
			hiddentextarea.style.display = ''
		} else{
			hiddentextarea.style.display = 'none'
		}
	}

	render() {
        //console.log(this.props.todos)
        return this.state.reviews.map((review, index) => (
            <Container fluid='sm'>
                <p style={reviewstyle}>
                    <p onClick = {() => this.handleCollapse(index)}>
                        <Container>
                            <Row>
                                <Col>
                                    <h3 style={h3inlinestyle}>{ review.reviewerName }</h3>
                                </Col>
                                <Col>
                                    <h4 style={h4inlinestyle}>{ review.dateReviewed }</h4>
                                </Col>
                                <Col xs='auto'>
                                    <Button onClick = {(e) => {this.handleRejectReview(e, index)}} color = "danger">Reject Review</Button>
                                </Col>
                            </Row>
                        </Container>
                    </p>
                    <Collapse isOpen={this.state.reviews[index].collapsed}>
                        <textarea id='textarea' style={textareastyle} name='textarea' rows='10' onChange={(e)=>{this.handleTextChange(e,index)}}></textarea>
                    </Collapse>
                </p>
            </Container>
        ));
    }
}

const reviewstyle = {
	margin: '15px',
	padding: '15px',
		'background-color': '#FFF',
		'border-radius': '8px',
		'box-shadow': '0px 0px 10px rgba(0, 0, 0, 0.2)'
}

const h3inlinestyle = {
	'text-align': 'left',
}

const h4inlinestyle = {
	'text-align': 'right',
}
	
const textareastyle = {
	'overflow-y': 'hidden',
	width: '80%' 
}

export default Reviews;