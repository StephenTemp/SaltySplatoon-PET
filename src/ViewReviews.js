import React from 'react';
import './App.css';
import Review from './Reviews'
import {Container, Row, Col} from 'reactstrap';

class ViewReviews extends React.Component {
    
    constructor(props) {
        super(props);
        let fakeReviewPeople = ["P1", "P2", "P3", "P4"]
        let fakeReviews = [
          {
          	userID: "1",
            reviewerLName: "Last Name 1",
            reviewerFName: "First Name 1",
            dateReviewed: "March 31",
            content: "My opinion on giving this review is said worker is a person who likes to do a lot of work but I can't tell if he is good at work or if he pays someone else to do it but if that's the case then I don't know why we pay him and not pay the other person but then again my mom tells me I just kinda ramble on and I should sleep more but why sleep when I do nothing important while I sleep. This long run on sentence is brought to you by the testing of wrapping text."
          },
          {
          	userID: "2",
            reviewerLName: "Last Name 2",
            reviewerFName: "First Name 2",
            dateReviewed: "March 31",
            content: "This is a review 2"
          },
          {
          	userID: "3",
            reviewerLName: "Last Name 3",
            reviewerFName: "First Name 3",
            dateReviewed: "March 31",
            content: "This is a review 3"
          }
        ]

        fakeReviews = fakeReviews.map(obj => {
          obj['collapsed'] = true;
          return obj;
        });

        this.state = {
          currentTime: 0,
          fakeReviewPeople: fakeReviewPeople,
          fakeReviews: fakeReviews,
          reviewer: "Reviewer 1"
        };
    }

    componentDidMount(){
      this.setState({
        currentTime: 5
      });
      console.log(this.state.currentTime)
      fetch('/time').then(res => res.json()).then(data => {
        this.setState({
          currentTime: data.time,
        });
      });
    }

    setThis() {

    }

    render() {
      console.log(this.state.fakeReviews)
        return (
          <div className="App">
            <p>
                This is the ViewReviews.js file. The number is {this.props.number1}.
            </p>
            <Container>
              <Row>
                <Col>userID</Col>
                <Col>Coworker Last Name</Col>
                <Col>Coworker First Name</Col>
                <Col>Time Posted</Col>
              </Row>
            </Container>
            <div className = "view-reviews">
              <Review reviews={ this.state.fakeReviews }/>
            </div>
{/* 
              <p>
                This is the ViewReviews.js file. The number is {this.props.number1}.
            </p>
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <p>
                Edit <code>src/App.js</code> and save to reload.
              </p>
              <p>The current time is {this.state.currentTime}.</p>
              <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn React
              </a>
            </header> */}
          </div>
        );
      }
}

export default ViewReviews;