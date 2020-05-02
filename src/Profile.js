import React from 'react';
import './App.css';

class Profile extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {currentTime: 0};
    
        fetch('/time').then(res => res.json()).then(data => {
          this.setState({
            currentTime: data.time,
          });
        });
    }
    
    render() {
        return (
          <div className="App">
            <p>
                This is the Profile.js file
            </p>
            <header className="App-header">
              {/* <img src={logo} className="App-logo" alt="logo" /> */}
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
            </header>
          </div>
        );
      }
}

export default Profile;