import React, {Component} from "react"
import {NavLink} from "react-router-dom"

class Nav extends Component {
    render() {
        return (
            <nav className="nav">
                <ul className="no-bullets">
                    <li>
                        <NavLink to="new">
                            New Question
                        </NavLink>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default Nav