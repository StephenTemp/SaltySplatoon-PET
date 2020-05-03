import React from 'react'
import './App.css';
import Requests from './Requests';
import Select from 'react-select';
import {Container, Row, Col, Button, Alert} from 'reactstrap'
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
          selectedRequestReviewers: [],
          showAlert: false,
          alertText: "test text"
        };
        this.handleRequestReview = this.handleRequestReview.bind(this)
        this.handleRequestChange = this.handleRequestChange.bind(this)
        this.showAlert = this.showAlert.bind(this)
        this.hideAlert = this.hideAlert.bind(this)
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

    showAlert(alert) {
      this.setState({
        showAlert: true,
        alertText: alert
      })
      setTimeout(this.hideAlert, 2000)
    }

    hideAlert() {
      this.setState({
        showAlert: false
      })
    }

    handleRequestChange(selectedOptions){
      this.setState({
        selectedRequestReviewers: selectedOptions,
        requestsValue: selectedOptions
      })
    }

    reversesort(input){
      var output = Array.from(input)
      while (input.length) {
        output.push(input.pop());
      }
      input = output
      return output
    }

    handleSortByDate(){
      let copyRequests = [...this.state.requestedReviews]
      if (copyRequests.length>1){
          // const originalRequest = [...this.state.requestedReviews]
        const sortedRequests = copyRequests
        const comp = (new Date(sortedRequests[1].date)-new Date(sortedRequests[0].date))
        if(comp>0){
          // console.log('date is min', sortedRequests, comp)
          const rever = copyRequests.sort((a, b) => b.date.localeCompare(a.date))
          this.setState({
            requestedReviews : rever
          })
        }
        else{
          // console.log(new Date(copyRequests[1].date)-new Date(copyRequests[0].date), '=======', sortedRequests)
          const rever = copyRequests.sort((a, b) => a.date.localeCompare(b.date))
          this.setState({
            requestedReviews : rever
          })
        }
      }
      
      // if (originalRequest.join(',') === sortedRequests.join(',')){
      //   const rever = Array.from(this.reversesort(sortedRequests))
      //   console.log(sortedRequests,'same', reversed, 'reversed', rever)
      //   this.setState({
      //     requestedReviews : rever
      //   })
      // }
      // else{
      //   console.log('not same')
      //   this.setState({
      //     requestedReviews : reversed
      //   })
      // }
      // const reversed = sortedRequests.reverse()
    }

    // handleSortByName(){
    //   let copyRequests = [...this.state.requestedReviews]
    //   const sortedRequests = copyRequests.sort((a, b) => b.requester.localeCompare(a.requester))
    //   const reversed = sortedRequests.reverse()
    //   this.setState({
    //     requestedReviews : reversed
    //   })
    //   console.log(this.state.requestedReviews, sortedRequests, reversed)
    // }

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

      let plural = "reviews"
            if (numPeople == 1) {
              plural = "a review"
            }
      if (await confirm(
        "Confirm Request Reviews",
        numPeople>0 ? "Are you sure you want to request " + plural + " from "+peopleStr+"?":"You have not selected anybody to request reviews from.",
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
          if (numPeople > 0) {
              fetch('/send-review-requests', requestOptions)
              .then(response => response.json())
              .then(data =>
                this.showAlert("You have successfully requested " + plural + " from "+peopleStr+".")
            );
          }
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
              <Alert color="secondary" isOpen={this.state.showAlert}>
                {this.state.alertText}
              </Alert>
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
            <div className = "write-reviews">
              <Container fluid='sm'>
              <p style={requeststyle}>
                <Row>
                  <Col>
                    Name
                  </Col>
                  <Col></Col>
                  <Col>
                    <button style={sortstyle} onClick = {() => this.handleSortByDate()}>↑↓Date</button>
                    
                  </Col>
                </Row>
                </p>
              </Container>
              <Requests key={"key"} showAlert = {(alert) => this.showAlert(alert)} requests={ this.state.requestedReviews} logInToken={this.props.logInToken}/>
            </div>
          </div>
        );
      }
}

const requeststyle = {
  margin: '15px',
  padding: '15px',
'backgroundColor': '#FFF',
'borderRadius': '8px',
'boxShadow': '0px 0px 10px rgba(0, 0, 0, 0.2)'
}

const sortstyle = {
  border: 'none',
  backgroundColor: 'inherit',
  fontSize: '16px',
  cursor: 'pointer',
  display: 'inline-block'
}

export default WriteRequestReviews;
