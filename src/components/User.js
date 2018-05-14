import React, {Component} from "react"
import {connect} from "react-redux"
import {setAuthedUser} from "../actions/authedUser";
import {Link, withRouter} from "react-router-dom"

class User extends Component {

    handleLogin = (e, id) => {
        e.preventDefault();

        const {dispatch} = this.props;
        console.log(id);

        dispatch(setAuthedUser({
            id
        }));
        this.props.history.push("/questions")
    };

    render() {
        const {user} = this.props;

        const {name, avatarURL, id} = user;
        return (
            <div>
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

function mapStateToProps({authedUser, users}, {id}) {
    const user = users[id];
    return {
        authedUser,
        user
    }
}

export default withRouter(connect(mapStateToProps)(User))