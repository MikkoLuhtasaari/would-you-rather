import {_saveQuestion, _saveQuestionAnswer} from "../utils/_DATA";
import {showLoading, hideLoading} from "react-redux-loading";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const SAVE_QUESTION = "SAVE_QUESTION";
export const SAVE_QUESTION_ANSWER = "SAVE_QUESTION_ANSWER";

export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions
    }
}

function saveQuestionAnswer({id, authedUser, answer}) {
    return {
        type: SAVE_QUESTION_ANSWER,
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
        console.log(optionOneText, optionTwoText);

        return _saveQuestion({
            author: authedUser,
            optionOneText,
            optionTwoText
        }).then((question) => dispatch(saveQuestion(question)))
            .then(() => dispatch(hideLoading()))
    }
}

export function handleSaveQuestionAnswer(qid, answer) {
    return (dispatch, getState) => {
        const {authedUser} = getState();
        dispatch(showLoading());

        return _saveQuestionAnswer({
            authedUser,
            qid,
            answer
        }).then((newState) => dispatch(saveQuestionAnswer(newState)))
            .then(() => dispatch(hideLoading()))
    }
}