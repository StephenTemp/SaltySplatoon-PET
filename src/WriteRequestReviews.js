import React from 'react'
import './App.css';
import Requests from './Requests';
import Select from 'react-select';
import {Container, Row, Col, Button} from 'reactstrap'
import confirm from "./ConfirmModal";

class WriteRequestReviews extends React.Component {

    constructor(props) {
        super(props);
        let fakeRequestPeople = ["Alexandru M", "Alex Zhou", "Stephen", "Sam"]
        fakeRequestPeople = fakeRequestPeople.map(x => {
          return ({value : x, label : x});
        })

        let fakeRequests = [
          {
            requesterName: "Person 1",
            dateRequested: "March 31",
            content: "",
            text_length_left: 0,
            saved_at_time: ''
          },
          {
            requesterName: "Person 2",
            dateRequested: "March 31",
            content: "",
            text_length_left: 0,
            saved_at_time: ''
          },
          {
            requesterName: "Person 3",
            dateRequested: "March 31",
            content: "",
            text_length_left: 0,
            saved_at_time: ''
          }
        ]

        fakeRequests = fakeRequests.map(obj => {
          obj['collapsed'] = true;
          return obj;
        });

        this.state = {
          logInToken: this.props.logInToken,
          requestPeople: [],
          requestedReviews: [],
          fakeRequestPeople: fakeRequestPeople,
          fakeRequests: fakeRequests,
          reviewer: "Reviewer 1",
          requestsValue: [],
          selectedRequestReviewers: []
        };
        this.handleRequestReview = this.handleRequestReview.bind(this)
        this.handleRequestChange = this.handleRequestChange.bind(this)
    }



    componentDidMount(){
      const requestOptions = {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + this.state.logInToken, 'Content-Type': 'application/json' },
        body: JSON.stringify({  })
      };
      fetch('/get-possible-reviewers', requestOptions)
        .then(response => response.json())
        .then(data =>
          this.setState({
            requestPeople: data.possible_reviewers,
          }
        )
      );
      fetch('/get_requested_reviews', requestOptions)
        .then(response => response.json())
        .then(data =>
          this.setState({
            requestedReviews: data.requestes_list,
          }
        )
      );
    }

    handleRequestChange(selectedOptions){
      this.setState({
        selectedRequestReviewers: selectedOptions,
        requestsValue: selectedOptions
      })
    }

    async handleRequestReview(selectedOptions){
      let numPeople = this.state.selectedRequestReviewers?this.state.selectedRequestReviewers.length:0;
      let peopleStr = "";
      let requestEmails = []
      for (let i=0;i<numPeople;i++) {
        if (i>0)
          peopleStr+=", "
        if (i>0 && i== numPeople-1)
          peopleStr+="and "
        peopleStr+=this.state.selectedRequestReviewers[i].label
        requestEmails.push(this.state.selectedRequestReviewers[i].value)
      }
      if (await confirm(
        "Confirm Request Reviews",
        numPeople>0 ? "Are you sure you want to request reviews from "+peopleStr+"?":"You have not selected anybody to request reviews from.",
        "primary",
        "secondary",
        numPeople>0?"Yes":"Okay",
        numPeople>0?"Cancel":null
        )) {
          const requestOptions = {
            method: 'POST',
            headers: { 'Authorization': 'Bearer ' + this.state.logInToken, 'Content-Type': 'application/json' },
            body: JSON.stringify({reviewer_emails: requestEmails})
          };
          fetch('/send-review-requests', requestOptions)
            .then(response => response.json())
            .then(data =>
              this.setState({

              }
            )
          );
          this.setState({
            selectedRequestReviewers: [],
            requestsValue: []
          })
        } else {

        }
    }

    render() {
        return (
          <div className="App">
            <div className = "request-reviews">
            <Container fluid='sm'>
              <Row>
                <Col xs='auto'>
                  <h3 style={{display: 'flex', justifyContent: 'left'}}>Requests for You</h3>
                </Col>
                <Col></Col>
                <Col></Col>
                <Col xs='3'>
                    <Select
                      options={this.state.requestPeople}
                      isMulti={true}
                      value={this.state.requestsValue}
                      onChange={(selectedOptions) => this.handleRequestChange(selectedOptions)}
                      placeholder={"Request Reviews"}/>
                </Col>
                <Col xs='2'>
                  <Button color = {'primary'} onClick = {(selectedOptions) => this.handleRequestReview(selectedOptions)}>Request Reviews</Button>
                </Col>
              </Row>
            </Container>
            </div>
            <div className = "write-reviews">//edited
              <Requests key={"key"} requests={ this.state.requestedReviews} logInToken={this.props.logInToken}/>
            </div>
          </div>
        );
      }
}

export default WriteRequestReviews;
