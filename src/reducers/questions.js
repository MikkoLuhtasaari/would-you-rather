import {RECEIVE_QUESTIONS, SAVE_QUESTION, SAVE_QUESTION_ANSWER} from "../actions/questions";

export default function questions(state={}, action) {
    console.log(action);
    switch (action.type) {
        case(RECEIVE_QUESTIONS):
            return {
                ...state,
                ...action.questions
            };
        case(SAVE_QUESTION):
            let answers = {};
            return {
                ...state,
                [action.question.id]: action.question,
                ...answers
            };
        case(SAVE_QUESTION_ANSWER):
            //TODO Fix the logic
            return {
                    ...state,
                    ...action.authedUser,
                    ...action.qid,
                    ...action.answer
            };
        default:
            return state
    }
}