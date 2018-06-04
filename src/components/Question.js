import React, {Component} from "react"
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {handleQuestionAnswer} from "../actions/shared";
import Avatar from "@material-ui/core/es/Avatar/Avatar";

class Question extends Component {

    registerVote = (e, question, authedUser, answer, questions) => {
        const {dispatch} = this.props;
        e.preventDefault();
        const info = {
            questions: questions,
            qid: question.id,
            answer: answer,
            authedUser
        };
        dispatch(handleQuestionAnswer({
            info
        }));
    };

    navigateToDetails = (e, qid) => {
        e.preventDefault();
        this.props.history.push(`/questions/${qid}`)
    };

    vote1 = itemProps => <Button
        onClick={(e) => this.registerVote(e, this.props.question, this.props.authedUser, "optionOne", this.props.questions)} {...itemProps} />;

    vote2 = itemProps => <Button
        onClick={(e) => this.registerVote(e, this.props.question, this.props.authedUser, "optionTwo", this.props.questions)} {...itemProps} />;


    detailsButton = itemProps => <Button
        onClick={(e) => this.navigateToDetails(e, this.props.question.id)} {...itemProps} />;

    render() {
        const {authedUser, question, isAnswered, users} = this.props;
        let isFirstAnswered = false;
        if (isAnswered) {
            for (let i = 0; i < question.optionOne.votes.length; i++) {
                if (question.optionOne.votes[i].toString().toLowerCase() === authedUser.toString().toLowerCase()) {
                    isFirstAnswered = true;
                }
            }
        }
        return (
            <div>
                <h2>WOULD YOU RATHER???</h2>
                <Grid container alignContent="center" spacing={8}>
                    <Grid item xs={5}>
                        <Card raised={true}>
                            <CardContent>
                                <Typography variant="headline" component={this.detailsButton}>
                                    {question.optionOne.text}
                                </Typography>
                                <Typography color="textSecondary">
                                    Votes: {question.optionOne.votes.length}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                {isAnswered ? (
                                    <Button disabled variant="raised" color="primary" fullWidth={true}>
                                        {isFirstAnswered ? "Your Vote"
                                            : "Vote"}
                                    </Button>
                                ) : (<Button component={this.vote1} variant="raised" color="primary"
                                             fullWidth={true}>Vote</Button>
                                )}
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={2}>
                        <Avatar alt={users[question.author].name} src={users[question.author].avatarURL}/>
                    </Grid>
                    <Grid item xs={5}>
                        <Card raised={true}>
                            <CardContent>
                                <Typography variant="headline" component={this.detailsButton}>
                                    {question.optionTwo.text}
                                </Typography>
                                <Typography color="textSecondary">
                                    Votes: {question.optionTwo.votes.length}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                {isAnswered ? (
                                    <Button disabled variant="raised" color="secondary" fullWidth={true}>
                                        {!isFirstAnswered ? "Your Vote"
                                            : "Vote"}
                                    </Button>
                                ) : (<Button component={this.vote2} variant="raised" color="secondary"
                                             fullWidth={true}>Vote</Button>
                                )}
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

function mapStateToProps({questions, authedUser, users}, {id, isAnswered}) {
    const question = questions[id];
    return {
        questions,
        question,
        authedUser,
        users,
        isAnswered
    }
}

export default withRouter(connect(mapStateToProps)(Question))