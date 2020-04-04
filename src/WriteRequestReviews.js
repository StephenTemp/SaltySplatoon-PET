import React from 'react';
import './App.css';
import Request from './Requests'

class WriteRequestReviews extends React.Component {
    
    constructor(props) {
        super(props);
        let fakeRequestPeople = ["Alexandru M", "Alex Zhou", "Stephen", "Sam"]
        let fakeRequests = [
          {
            requesterName: "Person 1",
            dateRequested: "March 31",
            content: "",
            text_length_left: 0
          },
          {
            requesterName: "Person 2",
            dateRequested: "March 31",
            content: "",
            text_length_left: 0
          },
          {
            requesterName: "Person 3",
            dateRequested: "March 31",
            content: "",
            text_length_left: 0
          }
        ]

        fakeRequests = fakeRequests.map(obj => {
          obj['collapsed'] = true;
          return obj;
        });

        this.state = {
          currentTime: 0,
          fakeRequestPeople: fakeRequestPeople,
          fakeRequests: fakeRequests,
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
      console.log(this.state.fakeRequests)
        return (
          <div className="App">
            <p>
                This is the WriteRequestReviews.js file. The number is {this.props.number1}.
            </p>
            <div className = "request-reviews">
            
            </div>
            <div className = "write-reviews">
              <Request requests={ this.state.fakeRequests }/>
            </div>
{/* 
              <p>
                This is the WriteRequestReviews.js file. The number is {this.props.number1}.
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

export default WriteRequestReviews;