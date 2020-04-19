import React from 'react';
import './App.css';
import Review from './Reviews'
import Select from 'react-select';
import {Container, Row, Col, Button} from 'reactstrap';

class ViewReviews extends React.Component {
    
    constructor(props) {
        super(props);
        //let fakeReviewPeople = ["P1", "P2", "P3", "P4"]
        let myEmployees = ["John Smith", "Walter White", "Big Cheese", "The Dude"]
        myEmployees = myEmployees.map(x => {
          return ({value : x, label : x});
        })

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
          obj['collapsed'] = false;
          return obj;
        });

        this.state = {
          currentTime: 0,
          myEmployees: myEmployees,
          fakeReviews: fakeReviews,
          reviewer: "Reviewer 1",
          employeeValue: [],
          selectedEmployee: []
        };
        this.handleEmployeeChange = this.handleEmployeeChange.bind(this)
        this.handleViewEmployee = this.handleViewEmployee.bind(this)
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

    handleEmployeeChange(selectedOptions){
      console.log("Current Employee: ", selectedOptions)
      this.setState({
        selectedEmployee: selectedOptions,
        employeeValue: selectedOptions
      })
    }

    async handleViewEmployee(selectedOptions){
      console.log(this.state.selectedEmployee)
    }

    render() {
      console.log(this.state.fakeReviews)
        return (
          <div className="App">
            <div className="view-employees">
              <Container fluid='sm'>
                <Row>
                  <Col xs='auto'>
                    <h3 style={{display: 'flex', justifyContent: 'left'}}>Reviews for Current User</h3>
                  </Col>
                  <Col></Col>
                  <Col xs='2'>
                    <Button color = {'primary'} onClick = {(selectedOptions) => this.handleViewEmployee(selectedOptions)}>My Reviews</Button>
                  </Col>
                  <Col xs='3'>
                    <Select 
                      options={this.state.myEmployees}
                      isMulti={false}
                      value={this.state.employeeValue}
                      onChange={(selectedOptions) => this.handleEmployeeChange(selectedOptions)}
                      placeholder={"View Employees"}/>
                  </Col>
                  <Col xs='2'>
                    <Button color = {'primary'} onClick = {(selectedOptions) => this.handleViewEmployee(selectedOptions)}>Change Employee</Button>
                  </Col>
                </Row>
              </Container>
            </div>
            <Container fluid='sm'>
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