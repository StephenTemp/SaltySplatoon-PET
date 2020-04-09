import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Home from './Home'
import Profile from './Profile'
import ViewReviews from './ViewReviews'
import WriteRequestReviews from './WriteRequestReviews'
//import './components/layouts/Header.css'


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {currentTime: 0};
    this.setState({
      currentTime: 0
    });

    fetch('/time').then(res => res.json()).then(data => {
      this.setState({
        currentTime: data.time,
      });
    });

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(thing) {
    console.log(thing);
  }

  render() {
    return (
      <Router>
      <div>
        <ul>
          <li>
            <Link id='homebtn' color='primary' to="/">Home</Link>
          </li>
          <li>
            <Link id='profilebtn' to="/profile">Profile</Link>
          </li>
          <li>
            <Link id='viewbtn' to="/viewreviews">View Reviews</Link>
          </li>
          <li>
            <Link id='writebtn' to="/writerequestreviews">Write Request Reviews</Link>
          </li>
        </ul>
        <hr />

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/viewreviews">
            <ViewReviews />
          </Route>
          <Route path="/writerequestreviews">
            <WriteRequestReviews />
          </Route>
        </Switch>
      </div>
    </Router>
    );
  }
}

export default App;
