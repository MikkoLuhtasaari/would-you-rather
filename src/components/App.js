import React, {Component, Fragment} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom"
import {connect} from "react-redux"
import LoadingBar from "react-redux-loading"
import {handleInitialData} from "../actions/shared";
import LoginPage from "./LoginPage"
import QuestionsPage from "./QuestionsPage";

class App extends Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData())
    }

    render() {
        return (
            <Router>
                <Fragment>
                    <LoadingBar/>
                    <div>
                        {this.props.users === null
                            ? null
                            : <div>
                                <Route path="/" exact component={LoginPage} />
                                <Route path="/questions/:id" component={QuestionsPage}/>
                             </div>
                        }
                    </div>
                </Fragment>
            </Router>
        );
    }
}

function mapStateToProps({users}) {
    return {
        loading: users === {}
    }
}

export default connect(mapStateToProps)(App)