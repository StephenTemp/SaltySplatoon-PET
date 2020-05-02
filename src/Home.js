import React from 'react';
import './App.css';

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