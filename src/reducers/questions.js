import {RECEIVE_QUESTIONS, SAVE_QUESTION, SAVE_QUESTION_ANSWER} from "../actions/questions";

export default function questions(state = {}, action) {
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
            let users = {};
            let questions = {};
            return {
                ...state,
                users: {
                    ...users,
                    [action.authedUser]: {
                        ...users[action.authedUser],
                        answers: {
                            ...users[action.authedUser].answers,
                            [action.qid]: action.answer
                        }
                    }
                },
                questions : {
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