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
  Button, Row
} from 'reactstrap';

import Home from './Home'
import Profile from './Profile'
import ViewReviews from './ViewReviews'
import WriteRequestReviews from './WriteRequestReviews'
//import './components/layouts/Header.css'

import logo from './logo.png';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentTime: 0,
      logInToken: "",
      email: "",
      password: "123",
      name: "",
      msg: ""
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
    if (!this.state.email) {
      this.setState({
        msg: 'Please enter an Email.'
      });
      return;
    }
    if (!this.state.password) {
      this.setState({
        msg: 'Please enter a Password.'
      });
      return;
    }
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
          logInToken: data.access_token,
          name: data.name,
          msg: data.msg
        })
      );
  }

  handleClick(thing) {
    console.log(thing);
  }

  render() {
    return (
      <Router>
      <div style={{"margin-top": "90px"}} >
        { this.state.logInToken ? (
        <header style={{"position": "fixed", "background": "#eeeeee", "width": "100%", "height": "60px", "margin-top": "-90px", "z-index": "1"}}>
          <div style={{"padding-top": "10px", "padding-bottom": "10px"}}>
          <Row style={{"padding-left": "30px"}}>
            <Col>
              <Button tag = {Link} id='homebtn' to="/">Home</Button>{" "}
              {/* <Button tag = {Link} id='profilebtn' to="/profile">Profile</Button>{" "} */}
              <Button tag = {Link} id='viewbtn' to="/viewreviews">View Reviews</Button>{" "}
              <Button tag = {Link} id='writebtn' to="/writerequestreviews">Write Request Reviews</Button>
            </Col>
            <div style={{ "padding-right": "50px", "padding-top": "5px"}}>
              <Row>
              <div style={{"padding-right": "20px", "padding-top": "6px"}}>{"Hi " + this.state.name + "!"}</div>
              <Button tag = {Link} id='signout' to="/" onClick={() =>this.setState({logInToken: "", email: "", password: "123",})}>Sign Out</Button>
              </Row>
            </div>
          </Row>
          {/* <li>
            <Link className='navBtn' id='profilebtn' to="/profile">Profile</Link>
          </li>
          <li>
            <Link className='navBtn' id='viewbtn' to="/viewreviews">View Reviews</Link>
          </li>
          <li>
            <Link className='navBtn' id='writebtn' to="/writerequestreviews">Write Request Reviews</Link>
          </li>
          <li>
            <Link className='navBtn' onClick={() =>this.setState({logInToken: "", email: "", password: "123",})}>Sign Out</Link>
          </li> */}
        </div>
        {/* <hr /> */}
        </header>
        
        ) : ""
        }

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        
        {this.state.logInToken ? 
          ( 
          
          <Switch>
            <Route exact path="/">
              <Home logInToken={this.state.logInToken}/>
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/viewreviews">
              <ViewReviews logInToken={this.state.logInToken}/>
            </Route>
            <Route path="/writerequestreviews">
              <WriteRequestReviews logInToken={this.state.logInToken}/>
            </Route>
          </Switch>
          
          )
        : 
        <Container className="App" fluid="sm" style={{"margin-top": "100px", "text-align": "left", "transform": "translate(-50%,-100%)", "left": "50%", "top": "50%", "position": "absolute"}}>
        <img src={logo} alt="logo" style={{"display": "block", "margin":"0 auto", "height": "182px", "width": "252px"}}/>
        <h2 style={{"text-align": "center"}}>Sign In</h2>
        <Form className="form" onSubmit={ (e) => this.submitForm(e) }>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <FormGroup>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                id="exampleEmail"
                value={ this.state.email }
                placeholder="myemail@email.com"
                onChange={ (e) => this.handleChange(e) }
              />
            </FormGroup>
          </Col>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input
                type="password"
                name="password"
                value={ this.state.password }
                id="examplePassword"
                placeholder="********"
                onChange={ (e) => this.handleChange(e) }
              />
              <Label>{this.state.msg}</Label>
            </FormGroup>
          </Col >
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <Button>Submit</Button>
          </Col>
        </Form>
      </Container>
        }
      </div>
    </Router>
    );
  }
}

export default App;
