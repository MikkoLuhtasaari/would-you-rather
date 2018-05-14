import {receiveUsers} from "./users";
import {receiveQuestions} from "./questions";
import {setAuthedUser} from "./authedUser";
import {showLoading, hideLoading} from "react-redux-loading"
import {getInitialData} from "../utils/api";

const AUTHED_ID = "";

export function handleInitialData() {
    return (dispatch) => {
        dispatch(showLoading());
        return getInitialData()
            .then(({users, questions}) => {
                dispatch(receiveQuestions(questions));
                dispatch(receiveUsers(users));
                dispatch(setAuthedUser(AUTHED_ID));
                dispatch(hideLoading());
            })
    }
}