// Get the most recently created item of an array, based on createdAt.
const getNewestItem = (array) => {
    let sortedArray = array.sort((a, b) =>
        Date.parse(a.createdAt) > Date.parse(b.createdAt) ? -1 : 1
    );
    return sortedArray[0];
};

// Combine the answers with their respective questions.
const mapQuestionToAnswer = (questionMap, answer) => {
    const question = questionMap[answer.questionID];

    if (!question) {
        return {
            knowledge: answer.knowledge,
            motivation: answer.motivation,
            error: {
                message: "question not found in current form definition",
                answer,
            },
        };
    }

    return {
        knowledge: answer.knowledge,
        motivation: answer.motivation,
        updatedAt: answer.updatedAt,
        question: {
            text: question.text,
            topic: question.topic,
            category: question.category,
            id: question.id,
        },
    };
};

// Get user attribute..
const getUserAttribute = (user, attribute) => {
    return user.Attributes.find((attr) => attr.Name === attribute).Value;
};

module.exports = { getNewestItem, mapQuestionToAnswer, getUserAttribute };
