import {_saveQuestionAnswer} from "../utils/_DATA";
import {hideLoading, showLoading} from "react-redux-loading";

export const RECEIVE_USERS = "RECEIVE_USERS";
export const SAVE_USER_ANSWER = "SAVE_USER_ANSWER";

export function receiveUsers(users) {
    return {
        type: RECEIVE_USERS,
        users
    }
}

export function saveUserAnswer({authedUser, qid, answer}) {
    return {
        type: SAVE_USER_ANSWER,
        authedUser,
        id: qid,
        answer
    }
}

export function handleSaveUserAnswer(info) {
    return dispatch => {
        dispatch(saveUserAnswer(info));
        dispatch(showLoading());
        return _saveQuestionAnswer(info)
            .then(() => dispatch(hideLoading()))
    }
}