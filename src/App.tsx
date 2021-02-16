import React, { Fragment, useEffect, useRef, useState } from "react";
import "./App.css";
import Amplify, { Auth, Hub } from "aws-amplify";
import awsconfig from "./aws-exports";
import * as mutations from "./graphql/mutations";
import * as queries from "./graphql/queries";
import * as helper from "./helperFunctions";
import Content from "./components/Content";
import Login from "./components/Login";
import { debounce, makeStyles } from "@material-ui/core";
import * as qustomQueries from "./graphql/custom-queries";
import { Category } from "./types";
import { isMobile } from "react-device-detect";
import FloatingScaleDescButton from "./components/FloatingScaleDescButton";
import NavBarDesktop from "./components/NavBarDesktop";

awsconfig.oauth.redirectSignIn = `${window.location.origin}/`;
awsconfig.oauth.redirectSignOut = `${window.location.origin}/`;

Amplify.configure(awsconfig);

const showFormDefSendButton = false;
const currentFormJSON: FormJSON = require("./catalogs/Katalog - 2021.json");

//JSON structure:
type FormJSON = {
    Categories: [
        {
            text: string,           //Name of the category
            description: string,    //Description of the category, shown above all questions
            index: number | null    //Used to sort the category, if null its sorted alphabetically last
        }
    ],
    Questions: [
        {
            categoryText: string,   //The text of the category (use the strucure over) to link the question with. If text is typed wrong, the question will be ignored (for now atleast)
            topic: string,          //Short worded description of the question (Java, C#, React...)
            text: string,           //Description text for the specific question
            index: number | null,   //Used to sort the question, if null its sorted alphabetically last
            qid: string | null      //Used to link 2 categories for future history if a category is updated
        }
    ]
}

// type FormType = {
//     topic: String;
//     category: String;
//     text: String;
// };
// const formDef: FormType[] = require("./Katalog - 2020 - Gammel.json");

const appStyle = makeStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        // height: '100vh',
        //height: 'calc(var(--vh, 1vh) * 100)',
        height: isMobile ? "auto" : "100vh",
        overflowY: isMobile ? "hidden" : "visible",
    },
    content: {
        height: "100%",
        flexGrow: 1,
    },
});

const App = () => {
    const style = appStyle();

    const [user, setUser] = useState<any | null>(null);
    // const [customState, setCustomState] = useState<any | null>(null)
    const [answerHistoryOpen, setAnswerHistoryOpen] = useState<boolean>(false); // oppdaterer seg ikke på close
    const [dimensions, setDimensions] = useState({
        height: window.innerHeight,
        width: window.innerWidth,
    });
    const [scaleDescOpen, setScaleDescOpen] = useState(false);
    const [firstTimeLogin, setFirstTimeLogin] = useState(false);

    useEffect(() => {
        const handleResize = debounce(() => {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
            setDimensions({
                height: window.innerHeight,
                width: window.innerWidth
            })
        }, 100);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        Hub.listen("auth", ({ payload: { event, data } }) => {
            switch (event) {
                case "signIn":
                    setUser(data);
                    break;
                case "signOut":
                    setUser(null);
                    break;
                // case "customOAuthState":
                //     setCustomState(data);
            }
        });
        Auth.currentAuthenticatedUser()
            .then((user) => setUser(user))
            .catch(() => console.log("Not signed in"));
    }, []);

    useEffect(() => {
        // console.log("User: ", user);
        // if(user) console.log("Username: ", user.username);
    }, [user]);

    // hide body overflow to avoid doublescroll
    const avoidBodyScrollWhenScaleDescOpenMobile = () => {
        if (scaleDescOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }

    useEffect(() => {
        if (isMobile) {
            avoidBodyScrollWhenScaleDescOpenMobile()
        }
    }, [scaleDescOpen])

    const sendFormDefinition = async () => {
        //Create a new formDefinition and get its id
        let formId = "";
        try {
            formId = (
                await helper.callGraphQL<{ createFormDefinition: { id: String } }>(
                    mutations.createFormDefinition,
                    qustomQueries.createFormDefinitionInputConsts
                )
            ).data?.createFormDefinition.id as string || "";
            console.log("Created form definition with id: ", formId);
        } catch (err) {
            console.error(err);
            return;
        }
        
        //Create the categories and collect the results (id, text)
        let categories: Category[] = [];
        for(const category of currentFormJSON.Categories) {
            const input = {
                text: category.text,
                description: category.description,
                index: category.index
            };
            const result = (
                await helper.callGraphQL<{ createCategory: Category }>(
                    mutations.createCategory,
                    { input: input }
                )
            ).data?.createCategory;
            if (result) {
                console.log("Created categor: ", { category: category, input: input });
                categories.push(result);
            } else console.error("Failed to create category: ", { category: category, input: input })
        }
        
        //Create questions mapping to the correct category
        console.log("Start creating questions, wait for them to complete before reloading site....");
        for(const question of currentFormJSON.Questions) {
            const input = {
                topic: question.topic,
                text: question.text,
                categoryID: categories.find(cat => cat.text === question.categoryText)?.id,
                formDefinitionID: formId,
                index: question.index,
                qid: question.qid
            };
            if (input.categoryID && input.formDefinitionID) {
                const newQuestion = await helper.callGraphQL(
                    mutations.createQuestion,
                    { input: input }
                );
                console.log("Created question: ", newQuestion);
            } else {
                console.error("ERROR: Missing required data for question: ", input);
            }
        }
        console.log("Question creation completed!");
        
        /* OLD (LAST) WAY OF SENDING FORMDEF
        
        for (let i = 0; i < formDef.length; i++) {
            let input = {
                categoryID: categories.find(
                    (cat) => cat.text === formDef[i].category
                )?.id,
                formDefinitionID: formId,
                topic: formDef[i].topic,
                text: formDef[i].text,
            };
            if (input.categoryID && input.formDefinitionID) {
                let newQuestion = await helper.callGraphQL(
                    mutations.createQuestion,
                    { input: input }
                );
                console.log("Created question: ", newQuestion);
            } else {
                console.log(
                    "ERROR: Missing required data for question: ",
                    input
                );
            }
        }
        console.log("Question creation completed!");
        
        // Get all categories, create categories that dont exists, create form def

        let categories: Category[] =
            (
                await helper.callGraphQL<{
                    listCategorys: { items: [Category] };
                }>(queries.listCategorys)
            ).data?.listCategorys.items || [];
        console.log("Listed categories: ", categories);
        const missingCategories: String[] = formDef
            .map((item) => {
                if (!categories.some((cat) => cat.text === item.category))
                    return item.category;
                return "";
            })
            .filter((v, i, a) => a.indexOf(v) === i);

        console.log("Missing categories: ", missingCategories);

        for (let i = 0; i < missingCategories.length; i++) {
            if (missingCategories[i] === "") continue;
            let input = {
                text: missingCategories[i],
                description: "",
            };
            console.log("New category input: ", input);
            let newCat = (
                await helper.callGraphQL<{ createCategory: Category }>(
                    mutations.createCategory,
                    { input: input }
                )
            ).data?.createCategory;
            if (newCat) categories.push(newCat);
        }
        console.log("Total categories: ", categories);
        
        
        
        console.log(
            "Start creating questions, wait for them to complete before reloading site...."
        );
        for (let i = 0; i < formDef.length; i++) {
            let input = {
                categoryID: categories.find(
                    (cat) => cat.text === formDef[i].category
                )?.id,
                formDefinitionID: formId,
                topic: formDef[i].topic,
                text: formDef[i].text,
            };
            if (input.categoryID && input.formDefinitionID) {
                let newQuestion = await helper.callGraphQL(
                    mutations.createQuestion,
                    { input: input }
                );
                console.log("Created question: ", newQuestion);
            } else {
                console.log(
                    "ERROR: Missing required data for question: ",
                    input
                );
            }
        }
        console.log("Question creation completed!");
        */
    };

    const deleteUserData = async () => {
        let allUserForms = await helper.listUserForms();
        let deleteResult = [];
        if (allUserForms.length > 0) {
            for (let i = 0; i < allUserForms.length; i++) {
                for (const answer of allUserForms[i].questionAnswers.items) {
                    deleteResult.push(
                        await helper.callGraphQL(
                            mutations.deleteQuestionAnswer,
                            { input: { id: answer.id } }
                        )
                    );
                }
                deleteResult.push(
                    await helper.callGraphQL(mutations.deleteUserForm, {
                        input: { id: allUserForms[i].id },
                    })
                );
            }
            console.log(deleteResult);
        } else console.log("No Userforms active");
    };

    // Navbarfunctions:

    // used to reference items in desktop navbar
    const [userName, setUserName] = useState<string>("");
    const [userPicture, setUserPicture] = useState<string>("");

    // used to set username and userpicture
    useEffect(() => {
        if (user) {
            if (
                typeof user != "undefined" &&
                user.hasOwnProperty("attributes")
            ) {
                let attributes = user.attributes;
                setUserName(attributes.name);
                setUserPicture(attributes.picture);
            }
        }
    }, [user]);

    const signout = () => {
        Auth.signOut();
    };

    // todo: trengs ikke...?
    const confirmDeleteUserdata = () => {
        deleteUserData();
    };

    const displayAnswers = () => {
        setAnswerHistoryOpen(true);
    };

    // SCROLL

    const mobileNavRef = useRef<HTMLInputElement>(null);
    const categoryNavRef = useRef<HTMLInputElement | null>(null);
    const [collapseMobileCategories, setCollapseMobileCategories] = useState<
        boolean
    >(false);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleScroll = () => {
        if (categoryNavRef.current?.clientHeight !== undefined ) {
            let menuHeight = categoryNavRef.current?.clientHeight - 56;
            // Makes sure there is enough content to collapse; stops glitchy drag-scrolling past content
            if (document.body.clientHeight > window.innerHeight + menuHeight && window.scrollY > menuHeight) {
                setCollapseMobileCategories(true);
            } else {
                setCollapseMobileCategories(false);
            }
        }
    };

    const scrollToTopMobile = () => {
        if (categoryNavRef.current?.clientHeight) {
            window.scroll(0, categoryNavRef.current?.clientHeight - 50);
            setCollapseMobileCategories(true);
        }
    };

    return (
        <div className={style.root}>
            {user ? (
                <Fragment>
                    {isMobile ? null : (
                        <NavBarDesktop
                            confirmDeleteUserdata={confirmDeleteUserdata}
                            displayAnswers={displayAnswers}
                            signout={signout}
                            userName={userName}
                            userPicture={userPicture}
                        />
                    )}

                    {showFormDefSendButton ? (
                        <button onClick={() => sendFormDefinition()}>
                            Send form definition to server
                        </button>
                    ) : (
                        ""
                    )}
                    <Content
                        user={user}
                        setAnswerHistoryOpen={setAnswerHistoryOpen}
                        answerHistoryOpen={answerHistoryOpen}
                        isMobile={isMobile}
                        signout={signout}
                        userName={userName}
                        userPicture={userPicture}
                        collapseMobileCategories={collapseMobileCategories}
                        categoryNavRef={categoryNavRef}
                        mobileNavRef={mobileNavRef}
                        scrollToTop={scrollToTopMobile}
                        setCollapseMobileCategories={setCollapseMobileCategories}
                        setScaleDescOpen={setScaleDescOpen}
                        setFirstTimeLogin={setFirstTimeLogin}
                    />
                    <FloatingScaleDescButton
                        scaleDescOpen={scaleDescOpen}
                        setScaleDescOpen={setScaleDescOpen}
                        firstTimeLogin={firstTimeLogin}
                        isMobile={isMobile}
                    />
                </Fragment>
            ) : (
                <Login isMobile={isMobile} />
            )}
        </div>
    );
};

export default App;
