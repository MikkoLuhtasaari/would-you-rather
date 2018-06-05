import React, {Component, Fragment} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
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

class App extends Component {
    render() {
        return (
            <Router>
                <Fragment>
                    <LoadingBar/>
                    <div>
                        <MenuNav/>
                        <Switch>
                            <Route exact path="/" component={LoginPage}/>
                            <Route exact path="/answeredquestions" component={AnsweredQuestions}/>
                            <Route exact path="/unansweredquestions" component={UnansweredQuestions}/>
                            <Route exact path="/add" component={NewQuestion}/>
                            <Route exact path="/leaderboard" component={Leaderboard}/>
                            <Route path="/questions/:id" component={QuestionDetails}/>
                            <Route exact path="/logout" component={Logout}/>
                            <Route path="/" component={Page404}/>
                        </Switch>
                    </div>
                </Fragment>
            </Router>
        );
    }
}

function mapStateToProps({users}) {
    return {
        loading: users === {},
    }
}

export default connect(mapStateToProps)(App)