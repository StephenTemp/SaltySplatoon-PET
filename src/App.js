import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import {
  Container, Col, Form,
  FormGroup, Label, Input,
  Button,
} from 'reactstrap';

import Home from './Home'
import Profile from './Profile'
import ViewReviews from './ViewReviews'
import WriteRequestReviews from './WriteRequestReviews'
//import './components/layouts/Header.css'


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentTime: 0,
      logInToken: "",
      email: "",
      password: "123",
      name: ""
    };
    // this.submitForm = this.submitForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount(){
    this.setState({
      currentTime: 0
    });

    fetch('/time').then(res => res.json()).then(data => {
      this.setState({
        currentTime: data.time,
      });
    });
  }

  handleChange(event) {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;
    this.setState({
      [ name ]: value,
    });
  }

  submitForm(e) {
    e.preventDefault();
    console.log(`Email: ${ this.state.email }`)
    
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: this.state.email, password: this.state.password })
    };
    console.log(requestOptions)
    fetch('/login', requestOptions)
      .then(response => response.json())
      .then(data =>
        this.setState({
          logInToken: data.access_token
        })
      );
  }

  handleClick(thing) {
    console.log(thing);
  }

  render() {
    return (
      <Router>
      <div>
        <p>
          Token: {this.state.logInToken}
        </p>
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
        {this.state.logInToken ? 
          (<Switch>
            <Route exact path="/">
              <Home logInToken={this.state.logInToken}/>
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/viewreviews">
              <ViewReviews />
            </Route>
            <Route path="/writerequestreviews">
              <WriteRequestReviews number1={25}/>
            </Route>
          </Switch>)
        : 
        <Container className="App">
        <h2>Sign In(user=test@test.com, pass="pass")</h2>
        <Form className="form" onSubmit={ (e) => this.submitForm(e) }>
          <Col>
            <FormGroup>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                id="exampleEmail"
                placeholder="myemail@email.com"
                onChange={ (e) => this.handleChange(e) }
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input
                type="password"
                name="password"
                value="123"
                id="examplePassword"
                placeholder="********"
                onChange={ (e) => this.handleChange(e) }
              />
            </FormGroup>
          </Col>
          <Button>Submit</Button>
        </Form>
      </Container>
        }
      </div>
    </Router>
    );
  }
}

export default App;
