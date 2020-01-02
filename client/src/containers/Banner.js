import React, { Component } from 'react';
import './../css/bootstrap.min.css';

class Body extends Component {
  render() {
    return (
      <div>
        <hr />
        <div className="jumbotron">
          <h1 className="display-3">Block Forum</h1>
          <h3 className="lead">This is a blockchain-based forum.</h3>
        </div>
      </div>
    );
  }
}

export default Body;
