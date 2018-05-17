import React, {Component} from "react"
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"
import Button from "@material-ui/core/es/Button/Button";
import Drawer from "@material-ui/core/es/Drawer/Drawer";

class MenuNav extends Component {
    state = {
        top: false,
        left: false,
        bottom: false,
        right: false,
    };

    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        });
    };

    navigate = (to) => () => {
        this.props.history.push(to);
    };

    render() {
        //TODO rest of the buttons, remember close button
        const LOGOUT = "/logout";
        const fullList = (
            <div>
                <Button size={"large"} onClick={this.navigate(LOGOUT)}>Logout</Button>
            </div>
        );


        return (
            <div>
                <Button onClick={this.toggleDrawer('left', true)}>Open Left</Button>
                <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.toggleDrawer('left', false)}
                        onKeyDown={this.toggleDrawer('left', false)}
                    >
                        {fullList}
                    </div>
                </Drawer>
            </div>
        )
    }
}

export default withRouter(connect()(MenuNav))