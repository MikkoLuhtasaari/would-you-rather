import React, {Component} from "react"
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"
import {setAuthedUser} from "../actions/authedUser";

class Logout extends Component {
    componentWillMount() {
        const {dispatch} = this.props;
        dispatch(setAuthedUser(""));
        this.props.history.push("/");
    }

    render() {
        return (
            <div></div>
        )
    }
}

export default withRouter(connect()(Logout))