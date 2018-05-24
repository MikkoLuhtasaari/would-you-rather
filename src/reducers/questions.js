import {
    RECEIVE_QUESTIONS,
    SAVE_QUESTION,
    SAVE_QUESTION_ANSWER_USER,
    SAVE_QUESTION_ANSWER_QUESTION
} from "../actions/questions";

export default function questions(state = {}, action) {
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

        case(SAVE_QUESTION_ANSWER_USER):
            console.log("SAVE_QUESTION_ANSWER_USER");
            let users = state.users;
            return {
                ...state,
                ...state.questions,
                users: {
                    ...users,
                    [action.authedUser]: {
                        ...users[action.authedUser],
                        answers: {
                            ...users[action.authedUser].answers,
                            [action.qid]: action.answer
                        }
                    }
                }
            };

        case(SAVE_QUESTION_ANSWER_QUESTION):
            console.log("SAVE_QUESTION_ANSWER_QUESTION");
            let questions = state.questions;
            return {
                ...state,
                ...state.users,
                questions: {
                    ...questions,
                    [action.qid]: {
                        ...questions[action.qid],
                        [action.answer]: {
                            ...questions[action.qid][action.answer],
                            votes: questions[action.qid][action.answer].votes.concat([action.authedUser])
                        }
                    }
                }
            };

        default:
            return state
    }

}