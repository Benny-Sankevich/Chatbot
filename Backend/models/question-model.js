const mongoose = require("mongoose");

const QuestionSchema = mongoose.Schema({
    question: {
        type: String,
        required: [true, "Missing question."],
        unique: [true, "Question already exist."],
        minLength: [1, "Question must be minimum 1 chars."],
        maxLength: [5000, "Question can`t exceed 5000 chars."],
    },
    answer: {
        type: String,
        required: [true, "Missing answer."],
        minLength: [1, "Answer must be minimum 1 chars."],
        maxLength: [5000, "Answer can`t exceed 5000 chars."],
    },
    createdDate: {
        type: String,
    },
},
    {
        versionKey: false,
        id: false
    });

const QuestionModel = mongoose.model("QuestionModel", QuestionSchema, "questions");

module.exports = QuestionModel;