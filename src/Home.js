import React from 'react';
import './App.css';
import FontSizeChanger from 'react-font-size-changer';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          currentTime: 0,
          logInToken: this.props.logInToken,
          user: ""
        };

        fetch('/time').then(res => res.json()).then(data => {
          this.setState({
            currentTime: data.time,
          });
        });
        const requestOptions = {
          method: 'POST',
          headers: { 'Authorization': 'Bearer ' + this.state.logInToken, 'Content-Type': 'application/json' },
          body: JSON.stringify({  })
        };
        console.log(requestOptions)
        fetch('/get-username', requestOptions)
          .then(response => response.json())
          .then(data =>
            this.setState({
            user: data.user,
         })
            // console.log(data)
          );
    }

    render() {
        return (
          <div className="App">
            <h1>
                Welcome {this.state.user}!
            </h1>
            <FontSizeChanger
            targets={['#target .content']}
            onChange={(element, newValue, oldValue) => {
              console.log(element, newValue, oldValue);
            }}
            options={{
              stepSize: 2,
              range: 5
            }}
            customButtons={{
              up: <span style={{'fontSize': '36px', 'textAlign':'left'}}>A</span>,
              down: <span style={{'fontSize': '20px', 'textAlign':'left'}}>A</span>,
              style: {
                backgroundColor: 'grey',
                color: 'white',
                WebkitBoxSizing: 'border-box',
                WebkitBorderRadius: '5px',
                width: '40px',
              },
              buttonsMargin: 10
            }}
          />
          <div id="target">
            <p className="title" style={{'textAlign': 'left', 'margin-left': "40px"}}><b>How to Use Ulti-PET</b></p>
            <p className="content" style={{'textAlign': 'left', 'margin-left': "40px", 'margin-right': "400px"}}>
              <div>Ulti-PET allows colleagues to request and view feedback from one another. Here's how to get started.</div>
              <div><b>Sending a review request</b> is simple and easy. Simply navigate to the <i>Write Request Reviews</i> tab and enter or select the colleague(s) to request from.</div>
              <div><b>Writing a review</b> for a colleague is equally convenient. View your current requests by clicking the <i>Write Request Reviews</i> tab, and click on the desired colleague to respond to his/her request with a review. Alternatively, a user may <b>reject a request</b> by selecting the <i>reject</i> button on a given request.</div>
              <div>Additionally, <b>view your reviews</b> via the aptly-named <i>View Reviews</i> tab. Each review can be fully observed in a dropdown box. <b> Managers</b> can view their employee's reviews by entering or selecting them from search bar and clicking <i> Change Employee</i>. Return to your own reviews with the <i>My Reviews</i> button. </div>
              </p>
          </div>
            {/* <header className="App-header">
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

export default Home;
