/* Amplify Params - DO NOT EDIT
	API_KOMPETANSEKARTLEGGIN_CATEGORYTABLE_ARN
	API_KOMPETANSEKARTLEGGIN_CATEGORYTABLE_NAME
	API_KOMPETANSEKARTLEGGIN_FORMDEFINITIONTABLE_ARN
	API_KOMPETANSEKARTLEGGIN_FORMDEFINITIONTABLE_NAME
	API_KOMPETANSEKARTLEGGIN_GRAPHQLAPIIDOUTPUT
	API_KOMPETANSEKARTLEGGIN_QUESTIONANSWERTABLE_ARN
	API_KOMPETANSEKARTLEGGIN_QUESTIONANSWERTABLE_NAME
	API_KOMPETANSEKARTLEGGIN_QUESTIONTABLE_ARN
	API_KOMPETANSEKARTLEGGIN_QUESTIONTABLE_NAME
	API_KOMPETANSEKARTLEGGIN_USERFORMTABLE_ARN
	API_KOMPETANSEKARTLEGGIN_USERFORMTABLE_NAME
	AUTH_KOMPETANSEKARTLEGGIND11D7CCE_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const compression = require("compression");
const { getCurrentInvoke } = require("@vendia/serverless-express");

// db helpers
const {
    getAllFormDefs,
    getAllUsers,
    getAllCategories,
    getAllQuestionForFormDef,
    getAnswersForUserForm,
    getAnswersForUser,
} = require("./db");

// general helpers
const { getNewestItem } = require("./helpers");

// configure express
const app = express();
const router = express.Router();

// configure router
router.use(compression());
router.use(cors());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// root
router.get("/", (req, res) => {
    res.json({
        message: "alive and well",
    });
});

// returns: newest answers for all users
router.get("/answers", async (req, res) => {
    // Find all FormDefinitions.
    const formDefs = await getAllFormDefs();

    // Find the latest FormDefinition.
    const lastFormDef = getNewestItem(formDefs.Items);
    console.log(lastFormDef);

    // Get all categories.
    const allCategories = await getAllCategories();
    const categoryMap = allCategories.Items.reduce((map, category) => {
        map[category.id] = category;
        return map;
    }, {});
    console.log(categoryMap);

    // Find all the questions belonging to the current FormDefinition.
    const allQuestions = await getAllQuestionForFormDef(lastFormDef.id);
    const allQuestionsWithCategory = allQuestions.Items.map((q) => ({
        ...q,
        category: categoryMap[q.categoryID].text,
    }));
    const questionMap = allQuestionsWithCategory.reduce((map, question) => {
        map[question.id] = question;
        return map;
    }, {});
    console.log(questionMap);

    // Find all users.
    const allUsers = await getAllUsers();
    console.log(allUsers.Users);

    // Find answers for the current form definition for each user.
    const userAnswers = await Promise.all(
        allUsers.Users.map((user) =>
            getAnswersForUser(user, lastFormDef, questionMap)
        )
    );

    // Filter away users with no answers.
    const nonEmptyUserAnswers = userAnswers.filter(
        (ua) => ua.answers.length > 0
    );

    console.log(nonEmptyUserAnswers);
    // Create response.
    return res.json({ nonEmptyUserAnswers });
});

// returns: all answers for given username
router.get("/answers/:username", (req, res) => {
    return res.status(404).json({
        error: "not implemented",
    });
});

// The serverless-express library creates a server and listens on a Unix
// Domain Socket for you, so you can remove the usual call to app.listen.
// app.listen(3000)
app.use("/", router);

module.exports = app;
