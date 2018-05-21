import React, {Component} from "react"
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"
import Button from "@material-ui/core/es/Button/Button";
import Drawer from "@material-ui/core/es/Drawer/Drawer";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import IconButton from "@material-ui/core/es/IconButton/IconButton";
import MoreVertIcon from '@material-ui/icons/MoreVert';

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
        const ADD_QUESTION = "/add";
        const LEADERBOARD = "/leaderboard";
        const ANSWERED = "/answeredquestions";
        const UNANSWERED = "/unansweredquestions";
        const fullList = (
            <div>
                <List>
                    <ListItem>
                        <Button size={"large"} onClick={this.navigate(ANSWERED)}>Answered Questions</Button>
                    </ListItem>
                    <Divider/>
                    <ListItem>
                        <Button size={"large"} onClick={this.navigate(UNANSWERED)}>Unanswered Questions</Button>
                    </ListItem>
                    <Divider/>
                    <ListItem>
                        <Button size={"large"} onClick={this.navigate(ADD_QUESTION)}>Add Question</Button>
                    </ListItem>
                    <Divider/>
                    <ListItem>
                        <Button size={"large"} onClick={this.navigate(LEADERBOARD)}>Leaderboard</Button>
                    </ListItem>
                    <Divider/>
                    <ListItem>
                        <Button size={"large"} onClick={this.navigate(LOGOUT)}>Logout</Button>
                    </ListItem>
                    <Divider/>
                    <ListItem>
                        <Button size={"large"} onClick={this.toggleDrawer('left', false)}>Close</Button>
                    </ListItem>
                </List>
            </div>
        );


        return (
            <div>
                <IconButton onClick={this.toggleDrawer('left', true)}>
                    <MoreVertIcon/>
                </IconButton>
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