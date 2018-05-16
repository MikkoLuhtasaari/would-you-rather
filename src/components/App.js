import React, {Component, Fragment} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom"
import {connect} from "react-redux"
import LoadingBar from "react-redux-loading"
import {handleInitialData} from "../actions/shared";
import LoginPage from "./LoginPage"
import UnansweredQuestions from "./UnansweredQuestions";
import AnsweredQuestions from "./AnsweredQuestions";
import Nav from "./Nav"
import NewQuestion from "./NewQuestion"

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
                                <Route path="/" exact component={LoginPage}/>
                                {/* TODO figure out a proper logic */}
                                {this.props.authedUser === "" && !this.props.authedUser.id
                                    ? null
                                    : <Nav/>
                                }
                                <Route path="/answeredquestions/:id" component={AnsweredQuestions}/>
                                <Route path="/unansweredquestions/:id" component={UnansweredQuestions}/>
                                <Route path="/new" component={NewQuestion}/>
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