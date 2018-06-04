import {RECEIVE_USERS, SAVE_USER_ANSWER} from "../actions/users";

export default function users(state = {}, action) {
    switch (action.type) {
        case(RECEIVE_USERS):
            return {
                ...state,
                ...action.users
            };

        case(SAVE_USER_ANSWER): {
            let user = {...state[action.authedUser]};
            let answer = action.answer;

            return {
                ...state,
                [action.authedUser] : {
                    ...user,
                    answers: {
                        ...user.answers,
                        [action.id] : answer
                    }
                }
            }
        }
        default:
            return state;
    }
}