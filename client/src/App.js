import React, { Component } from 'react';
import logo from './logo.svg';
import './css/bootstrap.min.css';
import Header from './containers/Header';
import Body from './containers/Banner';
import CreatePost from './components/CreatePost';
import Side from './containers/Side';
import Rank from './containers/Rank';
import HomePage from './containers/HomePage';

class App extends Component {
  render() {
    return (
      <>
        <Header />
        <div className="container" style={{ marginTop: "70px" }}>
          <Body />
          <div className="row">
            <div className="col-3">
              <Side />
              <Rank />
            </div>
            <div className="col">
              <CreatePost />
              <HomePage />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default App;
