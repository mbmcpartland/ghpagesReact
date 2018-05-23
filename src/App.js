import React, { Component } from 'react';
import logo from './Pictures/frn2.png';
import logo2 from './Pictures/USF_logo_green.jpg';
import filler from './Pictures/filler.jpg'
import './App.css';
import About from './About';
import Events from './Events';
import Form from './Form';
import { Redirect } from 'react-router';
import 'react-tabs/style/react-tabs.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { BrowserRouter as Router} from 'react-router-dom';

var global = "";

var hosturl = "http://localhost:3000/";

function changeState(that) {
  that.setState({redirect: true});
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    }
  }

func(callback) {
  var pass = prompt("Please enter the password:");

  if(pass === null || pass === "") {
     return;
  }

  var reroute = 'api/auth?pass='+pass;

  fetch(hosturl + reroute, {
     accept: 'application/json',
  }).then(function(res) {
     return res.json();
  }).then(function(json) {
     var string = JSON.stringify(json);
     var mohamed = JSON.parse(string);
     var result = mohamed.message;
     if(result === 'success') {
       console.log('password authenticated');
       global = "success";
     } else {
       global = "fail";
       alert('incorrect password');
     }
     callback();
  });
}

handleOnClick = (that) => {
    this.func(function() {
      if(global === "success") {
        changeState(that);
      }
    });
}
  render() {
    if (this.state.redirect) {
    return <Redirect push to='Admin' />;
    }
    var that = this;
    return (
      <div className="App">
      <button onClick={()=>this.handleOnClick(that)} className="gearButton"></button>
      <div className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <img src={filler} className="filler" alt="filler"/>
          <img src={logo2} className="App-logo" alt="logo2"/>
      </div>

    <Tabs>
    <TabList>
      <Tab>Report Food</Tab>
      <Tab> FRN Events </Tab>
      <Tab>About Us</Tab>
    </TabList>

    <TabPanel>
      <Form />
    </TabPanel>
    <TabPanel>
      <Events />
    </TabPanel>
    <TabPanel>
      <About />
    </TabPanel>
  </Tabs>

      </div>
    );
  }
}
export default App;