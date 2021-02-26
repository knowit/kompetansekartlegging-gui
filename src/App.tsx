import React, { Fragment, useEffect, useRef, useState } from "react";
import "./App.css";
import Amplify, { Auth, Hub } from "aws-amplify";
import awsconfig from "./aws-exports";
import * as mutations from "./graphql/mutations";
import * as helper from "./helperFunctions";
import Content from "./components/Content";
import Login from "./components/Login";
import { debounce, makeStyles } from "@material-ui/core";
import { isMobile } from "react-device-detect";
import FloatingScaleDescButton from "./components/FloatingScaleDescButton";
import NavBarDesktop from "./components/NavBarDesktop";

awsconfig.oauth.redirectSignIn = `${window.location.origin}/`;
awsconfig.oauth.redirectSignOut = `${window.location.origin}/`;

Amplify.configure(awsconfig);

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
    const [scaleDescOpen, setScaleDescOpen] = useState(false);
    const [firstTimeLogin, setFirstTimeLogin] = useState(false);

    useEffect(() => {
        const handleResize = debounce(() => {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty("--vh", `${vh}px`);
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
            }
        });
        Auth.currentAuthenticatedUser()
            .then(setUser)
            .catch(() => console.log("Not signed in"));
    }, []);

    // hide body overflow to avoid doublescroll
    const avoidBodyScrollWhenScaleDescOpenMobile = () => {
        if (scaleDescOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    };

    useEffect(() => {
        if (isMobile) {
            avoidBodyScrollWhenScaleDescOpenMobile();
        }
    }, [scaleDescOpen]);

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
    const [
        collapseMobileCategories,
        setCollapseMobileCategories,
    ] = useState<boolean>(false);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleScroll = () => {
        if (categoryNavRef.current?.clientHeight !== undefined) {
            let menuHeight = categoryNavRef.current?.clientHeight - 56;
            // Makes sure there is enough content to collapse; stops glitchy drag-scrolling past content
            if (
                document.body.clientHeight > window.innerHeight + menuHeight &&
                window.scrollY > menuHeight
            ) {
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
                        setCollapseMobileCategories={
                            setCollapseMobileCategories
                        }
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
