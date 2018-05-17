import React, {Component} from "react"
import {NavLink, withRouter} from "react-router-dom"
import {connect} from "react-redux"
import {setAuthedUser} from "../actions/authedUser";

class Nav extends Component {

    handleLogout = () => {
        const {dispatch} = this.props;
        dispatch(setAuthedUser(""));
        //this.props.history.push("/");
    };

    render() {
        return (
            <nav className="nav">
                <ul className="no-bullets">
                    <li>
                        <NavLink to="/add">
                            New Question
                        </NavLink>
                        <NavLink to="/leaderboard">
                            Leaderboard
                        </NavLink>
                        <NavLink to="/answeredquestions">
                            Answered Questions
                        </NavLink>
                        <NavLink to="/unansweredquestions">
                            Unanswered Questions
                        </NavLink>
                        <NavLink to="/logout">
                            Logout
                        </NavLink>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default withRouter(connect()(Nav))