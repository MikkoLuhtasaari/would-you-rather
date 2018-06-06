import React, {Component, Fragment} from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from "react-router-dom"
import {connect} from "react-redux"
import LoadingBar from "react-redux-loading"
import LoginPage from "./LoginPage"
import UnansweredQuestions from "./UnansweredQuestions";
import AnsweredQuestions from "./AnsweredQuestions";
import NewQuestion from "./NewQuestion"
import Logout from "./Logout"
import Leaderboard from "./Leaderboard";
import QuestionDetails from "./QuestionDetails";
import MenuNav from "./MenuNav";
import Page404 from "./Page404";
import {handleInitialData} from "../actions/shared";

// Private route checks if user is logged in and if not redirects to login page.
const PrivateRoute = ({component: Component, isLoggedIn, ...rest}) => (
    <Route
        {...rest}
        render={(props) => (
            isLoggedIn === true
            ? <Component {...props} />
            : <Redirect to={{
                pathname: '/'
            }}/>
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
                    {this.props.isLoggedIn
                        ? <MenuNav/>
                        : null
                    }
                    <div>
                        <Switch>
                            <PrivateRoute path="/answeredquestions" component={AnsweredQuestions} isLoggedIn={this.props.isLoggedIn}/>
                            <PrivateRoute path="/unansweredquestions" component={UnansweredQuestions} isLoggedIn={this.props.isLoggedIn}/>
                            <PrivateRoute path="/add" component={NewQuestion} isLoggedIn={this.props.isLoggedIn}/>
                            <PrivateRoute path="/leaderboard" component={Leaderboard} isLoggedIn={this.props.isLoggedIn}/>
                            <PrivateRoute path="/questions/:id" component={QuestionDetails} isLoggedIn={this.props.isLoggedIn}/>
                            <PrivateRoute exact path="/logout" component={Logout} isLoggedIn={this.props.isLoggedIn}/>
                            <Route exact path="/" component={LoginPage}/>
                            <Route path="/" component={Page404}/>
                        </Switch>
                    </div>
                </Fragment>
            </Router>
        );
    }
}

function mapStateToProps({users, authedUser}) {
    return {
        loading: users === {},
        isLoggedIn: authedUser !== null
    }
}

export default connect(mapStateToProps)(App)