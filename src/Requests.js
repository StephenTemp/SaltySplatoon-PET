import React, { useState } from 'react';
import './App.css';
import {Collapse, Container, Col, Row, Button} from 'reactstrap'

class Requests extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            requests: this.props.requests,
            c: true
        }
        this.handleCollapse = this.handleCollapse.bind(this);
        this.handleRejectReview = this.handleRejectReview.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
    }
    
    handleCollapse(index) {
        let requestsCopy = [...this.state.requests];
        console.log(requestsCopy);
        requestsCopy[index].collapsed = !requestsCopy[index].collapsed;
        this.setState({
            requests: requestsCopy
        })
    }

    handleRejectReview(e, index) {
        // Required for preventing collapse on button click
        e.stopPropagation();
        let requestsCopy = [...this.state.requests];
        requestsCopy.splice(index, 1);
        this.setState({
            requests: requestsCopy
        })
    }


    handleTextChange(e, index) {
        console.log("New text for " + index + "is: " + e.target.value)
        console.log("Word count is: " + e.target.value.trim().split(" ").length);
    }

    Hidden = (requesterName) => {
        var hiddentextarea = document.getElementById('textarea')
        if (hiddentextarea.style.display === 'none'){
            hiddentextarea.style.display = ''
        } else {
            hiddentextarea.style.display = 'none'
        }
    }

    render() {
        //console.log(this.props.todos)
        return this.state.requests.map((request, index) => (
            <Container fluid='sm'>
                <p style={requeststyle}>
                    <p onClick = {() => this.handleCollapse(index)}>
                        <Container>
                            <Row>
                                <Col>
                                    <h3 style={h3inlinestyle}>{ request.requesterName }</h3>
                                </Col>
                                <Col>
                                    <h4 style={h4inlinestyle}>{ request.dateRequested }</h4>
                                </Col>
                                <Col xs='auto'>
                                    <Button onClick = {(e) => {this.handleRejectReview(e, index)}} color = "danger">Reject Request</Button>
                                </Col>
                            </Row>
                        </Container>
                    </p>
                    <Collapse isOpen={this.state.requests[index].collapsed}>
                        <textarea id='textarea' style={textareastyle} name='textarea' rows='10' onChange={(e)=>{this.handleTextChange(e,index)}}></textarea>
                    </Collapse>
                </p>
            </Container>
        ));
    }
}

const requeststyle = {
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

// function Requests ({faq, index, toggleFAQ}) {
// 	return (
// 		<div
// 			className={"faq " + (faq.open ? 'open' : '')}
// 			key={index}
// 			onClick={() => toggleFAQ(index)}
// 		>
// 			<div className="faq-question">
// 				{faq.question}
// 			</div>
// 			<div className="faq-answer">
// 				{faq.answer}
// 			</div>
// 		</div>
// 	)
// }

export default Requests;