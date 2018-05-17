import React, {Component} from "react"
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {handleSaveQuestionAnswer} from "../actions/questions";

class Question extends Component {

    registerVote = (e, question, authedUser, answer) => {
        const {dispatch} = this.props;
        e.preventDefault();
        dispatch(handleSaveQuestionAnswer({
            qid: question.id,
            answer
        }));
    };

    navigateToDetails = (e, qid) => {
        e.preventDefault();
        this.props.history.push(`/questions/${qid}`)
    };

    vote1 = itemProps => <Button
        onClick={(e) => this.registerVote(e, this.props.question, this.props.authedUser, "optionOne")} {...itemProps} />;

    vote2 = itemProps => <Button
        onClick={(e) => this.registerVote(e, this.props.question, this.props.authedUser, "optionTwo")} {...itemProps} />;


    detailsButton = itemProps => <Button
        onClick={(e) => this.navigateToDetails(e, this.props.question.id)} {...itemProps} />;

    render() {
        const {question, isAnswered} = this.props;
        return (
            <div>
                <Grid container alignContent="center" spacing={8}>
                    <Grid item xs={6}>
                        <Card raised={true}>
                            {/* TODO try to fix styling back to intented */}
                            <CardContent component={this.detailsButton}>
                                <Typography variant="headline" component="h2">
                                    {question.optionOne.text}
                                </Typography>
                                <Typography color="textSecondary">
                                    Votes: {question.optionOne.votes.length}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                {isAnswered ? (
                                    <Button disabled variant="raised" color="primary" fullWidth={true}>Vote</Button>
                                ) : (<Button component={this.vote1} variant="raised" color="primary"
                                             fullWidth={true}>Vote</Button>
                                )}
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={6}>
                        <Card raised={true}>
                            <CardContent component={this.detailsButton}>
                                <Typography variant="headline" component="h2">
                                    {question.optionTwo.text}
                                </Typography>
                                <Typography color="textSecondary">
                                    Votes: {question.optionTwo.votes.length}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                {isAnswered ? (
                                    <Button disabled variant="raised" color="secondary" fullWidth={true}>Vote</Button>
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

function mapStateToProps({questions, authedUser}, {id, isAnswered}) {
    const question = questions[id];
    return {
        question,
        authedUser,
        isAnswered
    }
}

export default withRouter(connect(mapStateToProps)(Question))