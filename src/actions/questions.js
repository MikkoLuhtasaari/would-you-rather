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

export function handleSaveQuestion({text}) {
    return (dispatch, getState) => {
        const {authedUser} = getState();

        dispatch(showLoading());

        return _saveQuestion({
            text,
            author: authedUser
        }).then((question) => dispatch(saveQuestion(question)))
            .then(() => dispatch(hideLoading()))
    }
}

export function handleSaveQuestionAnswer(info) {
    return (dispatch) => {
        dispatch(saveQuestionAnswer(info));

        return _saveQuestionAnswer(info)
            .catch((e) => {
                console.warn("Error in handleSaveQuestion", e);
                dispatch(saveQuestionAnswer(info));
                alert("Error saving answer");
            })
    }
}