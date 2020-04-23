import React, { useState } from 'react';
import './App.css';
import {Collapse, Container, Col, Row, Button} from 'reactstrap'
import confirm from "./ConfirmModal";

class Requests extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            logInToken: this.props.logInToken,
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

    // componentDidMount(){
    //     console.log("props")
    //     this.setState({
    //         requests: this.props.requests
    //     })
    //     console.log(this.props.requests)
    // }

    componentWillReceiveProps(nextProps){
        this.setState({
            requests: nextProps.requests
        })
    }

    async handleRejectReview(e, index) {
        // Required for preventing collapse on button click
        e.stopPropagation();
        if (await confirm(
            "Confirm Request Removal",
            "Are you sure you want to reject this request from "+this.state.requests[index]["requester"]+"?",
            "danger",
            "secondary",
            "Yes",
            "Cancel"
            )) {

              console.log("TEST-------------------")
                //MESSING WITH THIS
              const requestOptions = {
                method: 'POST',
                headers: { 'Authorization': 'Bearer ' + this.props.logInToken, 'Content-Type': 'application/json' },
                body: JSON.stringify({"_id" : this.state.requests[index]['request_id']})
              };
              fetch('/reject_review', requestOptions)
                .then(response => response.json())
                .then(data =>
                  this.setState({

                  }
                )
              );

            delete this.state.requests[index];
            this.setState({
                requests: this.state.requests
            })


        } else {

        }
    }


    handleTextChange(e, ind) {
        console.log("New text for " + ind + "is: " + e.target.value)
        //console.log("Word count is: " + e.target.value.trim().split(" ").length);
        console.log("Char count is: " + e.target.value.length);
        console.log(e)
        this.setState({ requests: this.state.requests.map((request, index) => {
            if (index === ind){
                // console.log(e.target.value.length)
                // console.log(request.requesterName)
                request.text_length_left = e.target.value.length
            }
            return request
        })
            //text_length_left: e.target.value.length
        })
    }

    handleSaveReview(e, index){
        let saveContent = document.getElementById('textarea').value
        // this.setState({ requests: this.state.requests.map(request => {

        // }) })
        let requestsCopy = [...this.state.requests];
        requestsCopy[index].content = saveContent;
        requestsCopy[index].saved_at_time = new Date().toLocaleTimeString();
        console.log(requestsCopy, index)
        const requestOptions = {
            method: 'POST',
            headers: { 'Authorization': 'Bearer ' + this.props.logInToken, 'Content-Type': 'application/json' },
            body: JSON.stringify({"review_content_id" : requestsCopy[index]['review_content_id'], "content" : requestsCopy[index]['content']})
          };
        fetch('/save_review', requestOptions)
        // .then(res => res.text())          // convert to plain text
        // .then(text => console.log(text))
        .then(response => response.json())
        .then(data =>
            this.setState({
                requests: this.state.requests
            })
        );
        console.log(this.state.requests)
    }

    async handleSendReview(e, index){
        if (await confirm(
            "Confirm Send Review",
            "Are you sure you want to send this review? You will not be able to make changes after it is sent.",
            "primary",
            "secondary",
            "Yes",
            "Cancel"
            )) {
            // Save the review
            let saveContent = document.getElementById('textarea').value
            // this.setState({ requests: this.state.requests.map(request => {

            // }) })
            
            delete this.state.requests[index];
            this.setState({
                requests: this.state.requests
            })
            // TODO Send the review
        } else {

        }
    }

    Hidden = (requesterName) => {
        var hiddentextarea = document.getElementById('textarea')
        if (hiddentextarea.style.display === 'none'){
            hiddentextarea.style.display = ''
        } else {
            hiddentextarea.style.display = 'none'
        }
    }

    // showSimpleDateFormat() {
    //     var simpleDate = this.props.requests.date.split(" ")
    //     var stringDate = simpleDate.slice(0, 3)
    //     return stringDate
    // }

    render() {
        console.log("state")
        console.log(this.state.requests)
        console.log(this.props.requests)
        console.log("state end")

        // if (!this.state.requests) {
        //     this.state.requests = []
        // }

        return <div key={'key'}>{this.state.requests.map((request, index) => (request ?
        // return <div key={'key'}>{this.props.requests.map((request, index) => (request ?
            <Container fluid='sm'>
                <p style={requeststyle}>
                    <p onClick = {() => this.handleCollapse(index)}>
                        <Container>
                            <Row>
                                <Col>
                                    <h3 style={h3inlinestyle}>{ request.requester }</h3>
                                </Col>
                                <Col>
                                    <h4 style={h4inlinestyle}>{ request.date.split(" ")[0]+" "+request.date.split(" ")[1]+" "+request.date.split(" ")[2] }</h4>
                                </Col>
                                <Col xs='auto'>
                                    <Button onClick = {(e) => {this.handleRejectReview(e, index)}} color = "dark">Reject Request</Button>
                                </Col>
                            </Row>
                        </Container>
                    </p>
                    <Collapse isOpen={this.state.requests[index].collapsed}>
        <textarea id='textarea' style={textareastyle} name='textarea' rows='10' onChange={(e)=>{this.handleTextChange(e,index)}}>{request.content}</textarea>
                        <p id='char_count' sytle={char_count_style} >{request.text_length_left}/5000</p>
                        <br></br>
                        <p style={{display: 'flex', justifyContent: 'flex-end', margin:'5px', marginRight: '15px'}}>
                            <i id='savedat' style={{position:'relative', right:'62%'}}>saved at {request.saved_at_time}</i>
                            <Button id='savebtn' style={{marginRight: '10px'}} color='secondary' onClick={(e) => (this.handleSaveReview(e, index))}>Save</Button>
                            <Button id='sendreviewbtn' color='success' onClick={(e) => (this.handleSendReview(e, index))}>Send Review</Button>
                        </p>
                    </Collapse>
                </p>
            </Container>
        : ""))}</div>;
    }
}

const requeststyle = {
    margin: '15px',
    padding: '15px',
	'backgroundColor': '#FFF',
	'borderRadius': '8px',
	'boxShadow': '0px 0px 10px rgba(0, 0, 0, 0.2)'
}

const h3inlinestyle = {
    'textAlign': 'left',
}

const h4inlinestyle = {
    'textAlign': 'right',
}

const textareastyle = {
    'overflowY': 'hidden',
    width: '80%'
}

const char_count_style = {
    position: 'relative',
    left: '35%'
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
