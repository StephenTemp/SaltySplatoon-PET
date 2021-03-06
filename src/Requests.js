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
        // console.log(requestsCopy);
        requestsCopy[index].collapsed = !requestsCopy[index].collapsed;
        requestsCopy[index].text_length_left = requestsCopy[index].content.length
        this.setState({
            requests: requestsCopy
        })
    }

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

                const requestOptions = {
                    method: 'POST',
                    headers: { 'Authorization': 'Bearer ' + this.props.logInToken, 'Content-Type': 'application/json' },
                    body: JSON.stringify({"_id" : this.state.requests[index]['request_id']})
                };
                let name = this.state.requests[index]["requester"]
                delete this.state.requests[index];
                this.setState({
                    requests: this.state.requests
                })
                this.props.setRequests(this.state.requests)
                fetch('/reject_review', requestOptions)
                    .then(response => response.json())
                    .then(data =>
                        this.props.showAlert("You have successfully rejected a request from "+name+".")
                );

            
        } else {

        }
    }


    handleTextChange(e, ind) {

        let textContent = e.target.value
        if (textContent.length > 5000) {
            textContent = textContent.slice(0, 5000)
        }
        this.setState({ requests: this.state.requests.map((request, index) => {
            if (index === ind){
                request.text_length_left = textContent.length
                request.content = textContent;
            }
            return request
        })
            //text_length_left: e.target.value.length
        })
    }

    handleSaveReview(e, index){
        this.state.requests[index]["saved_at_time"] = "Last saved at " + new Date().toLocaleTimeString();
        const requestOptions = {
            method: 'POST',
            headers: { 'Authorization': 'Bearer ' + this.props.logInToken, 'Content-Type': 'application/json' },
            body: JSON.stringify({"review_content_id" : this.state.requests[index]['review_content_id'], "content" : this.state.requests[index]['content']})
        };
        fetch('/save_review', requestOptions)
        // .then(res => res.text())          // convert to plain text
        // .then(text => console.log(text))
        .then(response => response.json())
        .then(data =>
            {}
        );

        this.setState({
            requests: [...this.state.requests]
        })
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

                const saveRequestOptions = {
                    method: 'POST',
                    headers: { 'Authorization': 'Bearer ' + this.props.logInToken, 'Content-Type': 'application/json' },
                    body: JSON.stringify({"review_content_id" : this.state.requests[index]['review_content_id'], "content" : this.state.requests[index]['content']})
                };
                fetch('/save_review', saveRequestOptions)
                // .then(res => res.text())          // convert to plain text
                // .then(text => console.log(text))
                .then(response => response.json())
                .then(data =>
                    {}
                );

                //IN PROGRESS
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Authorization': 'Bearer ' + this.props.logInToken, 'Content-Type': 'application/json' },
                    body: JSON.stringify({"_id" : this.state.requests[index]['request_id']})
                };
                let name = this.state.requests[index]["requester"]

                delete this.state.requests[index];
                this.setState({
                    requests: this.state.requests
                })
                this.props.setRequests(this.state.requests)
                fetch('/send_review', requestOptions)
                    .then(response => response.json())
                    .then(data =>
                        this.props.showAlert("You have successfully sent a review to "+name+".")
                );
            
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
                                    <Row>
                                        <Col xs="auto">
                                            <p>
                                                <div>{this.state.requests[index].collapsed ? "▼" : ""}</div>
                                                <div style={{"transform": "rotate(-90deg)"}}>{(!this.state.requests[index].collapsed) ? "▼" : ""}</div>
                                            </p>
                                        </Col>
                                        <Col>
                                            <h3 style={h3inlinestyle}>{ request.requester }</h3>
                                        </Col>
                                    </Row>
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
        <textarea id='textarea' value={request.content} style={textareastyle} name='textarea' rows='10' onChange={(e)=>{this.handleTextChange(e,index)}}></textarea>
                        <p id='char_count' sytle={char_count_style} >{request.text_length_left}/5000</p>
                        <br></br>
                        <p style={{display: 'flex', justifyContent: 'flex-end', margin:'5px', marginRight: '15px'}}>
                            <i id='savedat' style={{marginRight:'30px'}}>{request.saved_at_time}</i>
                            <Button id='savebtn' style={{marginRight: '10px'}} color='secondary' onClick={(e) => (this.handleSaveReview(e, index))}>Save</Button>
                            <Button id='sendreviewbtn' color='success' disabled= {request.content.trim().length == 0} onClick={(e) => (this.handleSendReview(e, index))}>Send Review</Button>
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
