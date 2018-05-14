import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom"
import {connect} from "react-redux"
import {handleInitialData} from "../actions/shared";

class App extends Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData())
    }

  render() {
    return (
      <div>
          <p>Text</p>
      </div>
    );
  }
}

function mapStateToProps({questions}) {
    return {
        loading: questions === null
    }
}

export default connect(mapStateToProps)(App);
