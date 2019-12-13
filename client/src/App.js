import React, { Component } from "react";
import "./css/bootstrap.min.css";
import { Provider } from "react-redux";
import store from "./store";
import { connect } from 'react-redux';
import { loadWeb3, getUser } from './actions/userActions';
import Header from "./containers/Header";
import Body from "./containers/Banner";
import CreatePost from "./components/CreatePost";
import Side from "./containers/Side";
import Rank from "./containers/Rank";
import HomePage from "./containers/HomePage";
import Account from "./components/Account";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAccount: true,
    }
  }

  componentDidMount() {
    this.props.loadWeb3()
  }

  handleShowAccount = (show) => {
    console.log("SHOW", show)
    this.setState({ showAccount: show})
  }

  render() {
    return (
      <div>
        <Account
          show={this.state.showAccount}
          onHide={() => this.handleShowAccount(false)}
        />
        <Header showAccount={() => this.handleShowAccount(true)}/>
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
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps, { loadWeb3, getUser })(App);
