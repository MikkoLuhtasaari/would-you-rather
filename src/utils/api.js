import {
    _saveQuestion,
    _getUsers,
    _saveQuestionAnswer,
    _getQuestions
} from "./_DATA";

export function getInitialData () {
    return Promise.all([
        _getQuestions(),
        _getUsers()
    ]).then(([users, questions]) => ({
        users,
        questions
    }))
}