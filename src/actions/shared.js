import {receiveUsers, handleSaveUserAnswer} from "./users";
import {receiveQuestions, handleSaveQuestionAnswer} from "./questions";
import {setAuthedUser} from "./authedUser";
import {showLoading, hideLoading} from "react-redux-loading"
import {getInitialData} from "../utils/api";

const AUTHED_ID = "";

export function handleInitialData() {
    return (dispatch) => {
        dispatch(showLoading());
        return getInitialData()
            .then(({questions, users}) => {
                dispatch(receiveQuestions(questions));
                dispatch(receiveUsers(users));
                dispatch(setAuthedUser(AUTHED_ID));
                dispatch(hideLoading());
            })
    }
}

export function handleQuestionAnswer(info) {
    return (dispatch) => {
        dispatch(handleSaveQuestionAnswer(info.info));
        dispatch(handleSaveUserAnswer(info.info))
    }
}