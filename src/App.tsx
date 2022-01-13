import React, { Fragment, useEffect, useRef, useState } from "react";
import "./App.css";
import {Amplify,  API, Auth, Hub } from "aws-amplify";
import awsconfig from "./aws-exports";
import Content from "./components/Content";
import Login from "./components/Login";
import { ThemeProvider } from "@material-ui/core/styles";
import { debounce, makeStyles } from "@material-ui/core";
import { isMobile } from "react-device-detect";
import FloatingScaleDescButton from "./components/FloatingScaleDescButton";
import NavBarDesktop from "./components/NavBarDesktop";
import { UserRole } from "./types";
import theme from "./theme";
import { getActiveOrganizationName } from "./helperFunctions";

awsconfig.oauth.redirectSignIn = `${window.location.origin}/`;
awsconfig.oauth.redirectSignOut = `${window.location.origin}/`;

// let config = Amplify.configure(awsconfig);
// console.log(config);
API.configure(awsconfig);
Auth.configure(awsconfig);

Hub.listen(/.*/, (data) => {
    console.log('Hub listening to all messages: ', data);
});

const appStyle = makeStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        height: isMobile ? "auto" : "100vh",
        overflowY: isMobile ? "hidden" : "visible",
    },
    content: {
        height: "100%",
        flexGrow: 1,
    },
});

const hasRole = (role: string) => (user: any): boolean => {
    const groups: Array<string> =
        user?.signInUserSession?.idToken?.payload["cognito:groups"];
    return groups?.includes(role);
};
const isAdmin = hasRole("admin");
const isGroupLeader = hasRole("groupLeader");
const userToRoles = (user: any): UserRole[] => {
    let roles = [UserRole.NormalUser];
    if (isAdmin(user)) roles.push(UserRole.Admin);
    if (isGroupLeader(user)) roles.push(UserRole.GroupLeader);
    return roles;
};

const App = () => {
    const style = appStyle();

    const [user, setUser] = useState<any | null>(null);
    const [roles, setRoles] = useState<UserRole[]>([UserRole.NormalUser]);
    const [showFab, setShowFab] = useState<boolean>(true);
    const [answerHistoryOpen, setAnswerHistoryOpen] = useState<boolean>(false);
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
                    setUser({...data});
                    break;
                case "signIn_failure":
                    console.trace("Failed to sign in");
                    break;
                case "signOut":
                    setUser(null);
                    break;
            }
        });
        Auth.currentAuthenticatedUser()
            .then((res) => {
                console.log(res);
                setUser(res);
            })
            .catch(() => console.log("Not signed in"));
    }, []);

    useEffect(() => {
        if (isMobile) {
            // hide body overflow to avoid doublescroll
            if (scaleDescOpen) {
                document.body.style.overflow = "hidden";
            } else {
                document.body.style.overflow = "";
            }
        }
    }, [scaleDescOpen]);

    // used to reference items in desktop navbar
    const [userName, setUserName] = useState<string>("");
    const [userPicture, setUserPicture] = useState<string>("");
    const [organizationName, setOrganizationName] = useState<any>("");

    useEffect(() => {

        console.log('userEffect user', user);

        if (user) {
            if (
                typeof user != "undefined" &&
                user.hasOwnProperty("attributes")
            ) {
                setRoles(userToRoles(user));
                let attributes = user.attributes;
                setUserName(attributes.name);
                setUserPicture(attributes.picture);
                getActiveOrganizationName()
                    .then(setOrganizationName)
                    .catch((e) => console.log(e));
            }
        }
    }, [user]);

    const signout = () => {
        Auth.signOut();
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
        <ThemeProvider theme={theme}>
            <div className={style.root}>
                {user ? (
                    <Fragment>
                        {isMobile ? null : (
                            <NavBarDesktop
                                displayAnswers={displayAnswers}
                                signout={signout}
                                userName={userName}
                                organizationName={organizationName}
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
                            organizationName={organizationName}
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
                            roles={roles}
                            setShowFab={setShowFab}
                        />
                        {showFab && (
                            <FloatingScaleDescButton
                                scaleDescOpen={scaleDescOpen}
                                setScaleDescOpen={setScaleDescOpen}
                                firstTimeLogin={firstTimeLogin}
                                isMobile={isMobile}
                            />
                        )}
                    </Fragment>
                ) : (
                    <Login isMobile={isMobile} />
                )}
            </div>
        </ThemeProvider>
    );
};

export default App;
