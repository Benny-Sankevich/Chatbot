require("../data-access-layer/dal");
const QuestionModel = require("../models/question-model");
const helpers = require("../helpers/helpers");

function getQuestionAsync(questionToCheck) {
    return QuestionModel.findOne({ question: helpers.getToLowerCaseText(questionToCheck) }).exec();
}

function addQuestionAsync(question, answer) {
    return saveQuestionAsync(getNewQuestion(question, answer));
}

function saveQuestionAsync(questionData) {
    questionData.question = helpers.getToLowerCaseText(questionData.question);
    questionData.createdDate = helpers.getDateTimeNow();
    return questionData.save();
}

function getNewQuestion(question, answer) {
    return new QuestionModel({ question, answer })
}

module.exports = {
    getQuestionAsync,
    addQuestionAsync,
}