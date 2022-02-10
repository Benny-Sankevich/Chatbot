function getDateTimeNow() {
    return new Date().toLocaleString();
}

function getToLowerCaseText(text) {
    return text.toLowerCase();
}

function isQuestion(text) {
    const questionMarkReg = /^[A-Za-z\s].*\?/;
    const questionWordType = /Where|Who|When/;
    if (questionMarkReg.test(text) || questionWordType.test(text)) return true;
    return false;
}

function isNotFromTheBot(username) {
    return config.bot.name !== username;
}

module.exports = {
    getDateTimeNow,
    getToLowerCaseText,
    isQuestion,
    isNotFromTheBot
}