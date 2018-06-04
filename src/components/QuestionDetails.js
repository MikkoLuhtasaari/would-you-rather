import React, {Component} from "react"
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import User from "./User"
import Avatar from "@material-ui/core/es/Avatar/Avatar";
import Page404 from "./Page404";
import Route from "react-router-dom/es/Route";
import List from '@material-ui/core/List';
import ListItem from "@material-ui/core/es/ListItem/ListItem";

class QuestionDetails extends Component {
    render() {
        const {question, authedUser, users} = this.props;
        let optionOnePercent, optionTwoPercent;
        if (question) {
            optionOnePercent = ((question.optionOne.votes.length / (question.optionOne.votes.length + question.optionTwo.votes.length)) * 100) + "%";
            optionTwoPercent = ((question.optionTwo.votes.length / (question.optionOne.votes.length + question.optionTwo.votes.length)) * 100) + "%";
        }
        return (
            <div>
                {typeof question === "undefined"
                    ? <Route component={Page404}/>
                    :
                    <div>
                        <h1> Welcome back !</h1>
                        < User id={authedUser}/>
                        <Paper elevation={24}>
                            <Typography variant="headline" align="center">
                                WOULD YOU RATHER
                            </Typography>
                            <Grid container alignContent="center" spacing={8}>
                                <Grid item xs={5}>
                                    <Card>
                                        <Grid container justify="center">
                                            <Grid item>
                                                <CardHeader title={question.optionOne.text}/>
                                            </Grid>
                                        </Grid>
                                        <CardContent>
                                            <Grid container justify="center">
                                                <List>
                                                    {question.optionOne.votes.map((answer) =>
                                                        (<Grid item key={users[answer].name}>
                                                                <ListItem>
                                                                    <Avatar alt={users[answer].name}
                                                                            src={users[answer].avatarURL}/>
                                                                </ListItem>
                                                            </Grid>
                                                        )
                                                    )}
                                                </List>
                                            </Grid>
                                            <Typography align="center" variant="headline" component="h2">
                                                Votes: {question.optionOne.votes.length}
                                            </Typography>
                                            <Typography align="center" variant="subheading" component="h2">
                                                Votes % : {optionOnePercent}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={2}>
                                    <Grid container justify="center">
                                        <Grid item>
                                            <Avatar alt={users[question.author].name}
                                                    src={users[question.author].avatarURL}/>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={5}>
                                    <Card>
                                        <Grid container justify="center">
                                            <Grid item>
                                                <CardHeader title={question.optionTwo.text}/>
                                            </Grid>
                                        </Grid>
                                        <CardContent>
                                            <Grid container justify="center">
                                                <List>
                                                    {question.optionTwo.votes.map((answer) =>
                                                        (
                                                            <Grid item key={users[answer].name}>
                                                                <ListItem>
                                                                    <Avatar alt={users[answer].name}
                                                                            src={users[answer].avatarURL}/>
                                                                </ListItem>
                                                            </Grid>
                                                        )
                                                    )}
                                                </List>
                                            </Grid>
                                            <Typography align="center" variant="headline" component="h2">
                                                Votes: {question.optionTwo.votes.length}
                                            </Typography>
                                            <Typography align="center" variant="subheading" component="h2">
                                                Votes % : {optionTwoPercent}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Paper>
                    </div>
                }
            </div>
        )
    }
}

function mapStateToProps({questions, authedUser, users}, props) {
    const id = props.match.params.id;
    const question = questions[id];
    return {
        question,
        authedUser,
        users
    }
}

export default withRouter(connect(mapStateToProps)(QuestionDetails))