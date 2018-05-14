import React, {Component} from "react"
import {connect} from "react-redux"
import {setAuthedUser} from "../actions/authedUser";
import {Link, withRouter} from "react-router-dom"

class User extends Component {

    handleLogin = (e, id) => {
        e.preventDefault();

        const {dispatch, users} = this.props;
        console.log("User props", this.props);
        dispatch(setAuthedUser({
            id
        }));
        this.props.history.push(`/questions/${id}`)
    };

    render() {
        const {user} = this.props;

        const {name, avatarURL, id} = user;
        return (
            <div className="col-xs-1" align="center">
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

function mapStateToProps({users, questions}, {id}) {
    const user = users[id];
    return {
        user,
        users,
        questions
    }
}

export default withRouter(connect(mapStateToProps)(User))