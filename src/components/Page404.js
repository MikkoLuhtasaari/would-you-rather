import React, {Component} from "react"
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

class Page404 extends Component {
    render() {
        return (
            <div>
                <h1>Page404</h1>
                <h2>Page not found</h2>
            </div>
        )
    }
}

export default withRouter(connect()(Page404))