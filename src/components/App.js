import React, {Component, Fragment} from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from "react-router-dom"
import {connect} from "react-redux"
import LoadingBar from "react-redux-loading"
import {handleInitialData} from "../actions/shared";
import LoginPage from "./LoginPage"
import UnansweredQuestions from "./UnansweredQuestions";
import AnsweredQuestions from "./AnsweredQuestions";
import NewQuestion from "./NewQuestion"
import Logout from "./Logout"
import Leaderboard from "./Leaderboard";
import QuestionDetails from "./QuestionDetails";
import MenuNav from "./MenuNav";

// const PrivateRoute = ({component: Component, ...rest}) => (
//     <Route {...rest} render={(props) => (
//         props && props.authedUser !== ""
//             ? <Component {...props} />
//             : <Redirect to="/"/>
//     )}/>
// );

// {this.props.location.pathname === "/"
//     ? <Route path="/" exact component={LoginPage}/>
//     : <Redirect to="/" /> }

class App extends Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData())
    }

    render() {
        return (
            <Router>
                <Fragment>
                    <LoadingBar/>
                    {this.props.shouldLogIn === true
                        ? <Route path="/" component={LoginPage}/>
                        : <div><MenuNav/>
                            <Switch>
                                <Route path="/answeredquestions" component={AnsweredQuestions}/>
                                <Route path="/unansweredquestions" component={UnansweredQuestions}/>
                                <Route path="/add" component={NewQuestion}/>
                                <Route path="/leaderboard" component={Leaderboard}/>
                                <Route path="/questions/:id" component={QuestionDetails}/>
                                <Route path="/logout" component={Logout}/>
                            </Switch>
                        </div>
                    }
                </Fragment>
            </Router>
        );
    }
}

function mapStateToProps({users, authedUser}) {
    return {
        loading: users === {},
        shouldLogIn: authedUser == null
    }
}

export default connect(mapStateToProps)(App)