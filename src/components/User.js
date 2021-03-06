import React, {Component} from "react"
import {connect} from "react-redux"
import {setAuthedUser} from "../actions/authedUser";
import {withRouter} from "react-router-dom"

class User extends Component {

    handleLogin = (e, id) => {
        e.preventDefault();

        const {dispatch} = this.props;
        dispatch(setAuthedUser(
            id
        ));
        this.props.history.push("/unansweredquestions/")
    };

    render() {
        const {user} = this.props;
        const {name, avatarURL, id} = user;

        return (
            <div align="center">
                <img src={avatarURL}
                     alt={`Avatar of ${name}`}
                     className="avatar"
                    onClick={(e) => this.handleLogin(e, id)}
                />
                <h2>{name}</h2>
            </div>
        )
    }
}

const mapStateToProps = ({users, questions}, {id}) => ({
    user: users[id],
    users,
    questions
})

export default withRouter(connect(mapStateToProps)(User))