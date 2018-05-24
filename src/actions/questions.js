import {_saveQuestion, _saveQuestionAnswer} from "../utils/_DATA";
import {showLoading, hideLoading} from "react-redux-loading";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const SAVE_QUESTION = "SAVE_QUESTION";
export const SAVE_QUESTION_ANSWER_USER = "SAVE_QUESTION_ANSWER_USER";
export const SAVE_QUESTION_ANSWER_QUESTION = "SAVE_QUESTION_ANSWER_QUESTION";

function saveQuestionAnswerQuestion({id, authedUser, answer}) {
    console.log("saveQuestionAnswerQuestion");
    return {
        type: SAVE_QUESTION_ANSWER_QUESTION,
        id,
        authedUser,
        answer
    }
}

function saveQuestionAnswerUser({id, authedUser, answer}) {
    console.log("saveQuestionAnswerUser");
    return {
        type: SAVE_QUESTION_ANSWER_USER,
        id,
        authedUser,
        answer
    }
}

function saveQuestion(question) {
    return {
        type: SAVE_QUESTION,
        question
    }
}

export function handleSaveQuestion({optionOneText, optionTwoText}) {
    return (dispatch, getState) => {
        const {authedUser} = getState();

        dispatch(showLoading());

        return _saveQuestion({
            author: authedUser,
            optionOneText,
            optionTwoText
        }).then((question) => dispatch(saveQuestion(question)))
            .then(() => dispatch(hideLoading()))
    }
}

export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions
    }
}

export function handleSaveQuestionAnswer(qid, answer) {
    return (dispatch, getState) => {
        console.log("Before reading authed user");
        const {authedUser} = getState();
        dispatch(showLoading());
        console.log("After show loading");

        return _saveQuestionAnswer({
            authedUser,
            qid,
            answer
        }).then((newState) => dispatch(saveQuestionAnswerUser(newState)))
            .then((newState) => dispatch(saveQuestionAnswerQuestion(newState)))
            .then(() => dispatch(hideLoading()))
    }
}