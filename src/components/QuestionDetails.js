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

class QuestionDetails extends Component {
    render() {
        const {question, authedUser, users} = this.props;
        let optionOnePercent = ((question.optionOne.votes.length / (question.optionOne.votes.length + question.optionTwo.votes.length)) * 100) + "%";
        let optionTwoPercent = ((question.optionTwo.votes.length / (question.optionOne.votes.length + question.optionTwo.votes.length))* 100) + "%";
        return (
            <div>
                {question === undefined
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
                                        <CardHeader title={question.optionOne.text}/>
                                        <CardContent>
                                            <List>
                                                {question.optionOne.votes.map((answer) =>
                                                    (<Avatar alt={users[answer].name} src={users[answer].avatarURL}/>)
                                                )}
                                            </List>
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
                                    <Avatar alt={users[question.author].name} src={users[question.author].avatarURL}/>
                                </Grid>
                                <Grid item xs={5}>
                                    <Card>
                                        <CardHeader title={question.optionTwo.text}/>
                                        <CardContent>
                                            <List>
                                                {question.optionTwo.votes.map((answer) =>
                                                    (<Avatar alt={users[answer].name} src={users[answer].avatarURL}/>)
                                                )}
                                            </List>
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