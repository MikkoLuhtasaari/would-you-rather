import React, {Component, Fragment} from 'react';
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom"
import {connect} from "react-redux"
import LoadingBar from "react-redux-loading"
import {handleInitialData} from "../actions/shared";
import LoginPage from "./LoginPage"
import UnansweredQuestions from "./UnansweredQuestions";
import AnsweredQuestions from "./AnsweredQuestions";
import Nav from "./Nav"
import NewQuestion from "./NewQuestion"

// TODO Question details page (remember 404), voting, leaderboard, logout
const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={(props) => (
        this.props && this.props.authedUser && this.props.authedUser !== ""
            ? <Component {...props} />
            : <Redirect to="/"/>
    )}/>
);

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
                                {this.props.authedUser === ""
                                    ? null
                                    : <Nav/>
                                }
                                <PrivateRoute path="/answeredquestions/:id" component={AnsweredQuestions}/>
                                <PrivateRoute path="/unansweredquestions/:id" component={UnansweredQuestions}/>
                                <PrivateRoute path="/add" component={NewQuestion}/>
                            </div>
                        }
                    </div>
                </Fragment>
            </Router>
        );
    }
}

function mapStateToProps({users, authedUser}) {
    return {
        loading: users === {},
        authedUser
    }
}

export default connect(mapStateToProps)(App)