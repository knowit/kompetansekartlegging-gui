import React, { Fragment, useEffect, useRef, useState } from 'react';
import './App.css';
import Amplify, {Auth, Hub} from 'aws-amplify';
import awsconfig from './aws-exports';
import * as mutations from './graphql/mutations';
import * as queries from './graphql/queries'
import * as helper from './helperFunctions'
import Content from './components/Content';
import NavBar from './components/NavBar';
import { Footer } from './components/Footer';
import { BrowserRouter } from 'react-router-dom';
import Login from './components/Login';
import { debounce, makeStyles } from '@material-ui/core';
import * as qustomQueries from './graphql/custom-queries'
import { Category } from './types'
import {isMobile} from 'react-device-detect';
import FloatingScaleDescButton from './components/FloatingScaleDescButton';
import NavBarDesktop from './components/NavBarDesktop';
import clsx from 'clsx';


awsconfig.oauth.redirectSignIn = `${window.location.origin}/`;
awsconfig.oauth.redirectSignOut = `${window.location.origin}/`;

Amplify.configure(awsconfig);

const showFormDefSendButton = false;

type FormType = {
    topic: String,
    category: String,
    text: String
};
const formDef: FormType[] = require('./form3.json');


const appStyle = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        // height: '100vh',
         //height: 'calc(var(--vh, 1vh) * 100)',
        height: isMobile ? 'auto' : '100vh',
        overflowY: isMobile ? 'hidden' : 'visible'
    },
    content: {
        height: '100%',
        flexGrow: 1
    }
});

const App = () => {
    const style = appStyle();

    const [user, setUser] = useState<any | null>(null);
    // const [customState, setCustomState] = useState<any | null>(null)
    const [answerHistoryOpen, setAnswerHistoryOpen] = useState<boolean>(false); // oppdaterer seg ikke på close
    const [dimensions, setDimensions] = useState({ 
        height: window.innerHeight,
        width: window.innerWidth
    });
    const [scaleDescOpen, setScaleDescOpen] = useState(false);

    useEffect(() => {
        const handleResize = debounce(() => {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
            console.log("resize!")
            setDimensions({
                height: window.innerHeight,
                width: window.innerWidth
            })
        }, 10);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, []);

    useEffect(() => {
        Hub.listen('auth', ({ payload: { event, data } }) => {
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
            .then(user => setUser(user))
            .catch(() => console.log("Not signed in"));
    }, []);

    useEffect(() => {
        // console.log("User: ", user);
        // if(user) console.log("Username: ", user.username);
    }, [user])

    const sendFormDefinition = async () => {
        // Get all categories, create categories that dont exists, create form def

        let categories: Category[] = (await helper.callGraphQL<{ listCategorys: { items: [Category] } }>(queries.listCategorys)).data?.listCategorys.items || [];
        console.log("Listed categories: ", categories);
        const missingCategories: String[] = formDef.map(item => {
            if(!categories.some(cat => cat.text === item.category))
                return item.category;
            return "";
        }).filter((v, i, a) => a.indexOf(v) === i);

        console.log("Missing categories: ", missingCategories);

        for(let i = 0; i < missingCategories.length; i++){
            if(missingCategories[i] === "") continue;
            let input = {
                text: missingCategories[i],
                description: ""
            }
            console.log("New category input: ", input);
            let newCat = (await helper.callGraphQL<{createCategory: Category}>(mutations.createCategory, {input: input})).data?.createCategory;
            if(newCat) categories.push(newCat);
        }
        console.log("Total categories: ", categories);

        let formId = (await helper.callGraphQL<{ createFormDefinition: { id: String } }>(mutations.createFormDefinition, qustomQueries.createFormDefinitionInputConsts)).data?.createFormDefinition.id;
        console.log("Created form definition with id: ", formId);

        console.log("Start creating questions, wait for them to complete before reloading site....");
        for (let i = 0; i < formDef.length; i++) {
            let input = {
                categoryID: categories.find(cat => cat.text === formDef[i].category)?.id,
                formDefinitionID: formId,
                topic: formDef[i].topic,
                text: formDef[i].text
            }
            if(input.categoryID && input.formDefinitionID){
                let newQuestion = await helper.callGraphQL(mutations.createQuestion, {input: input});
                console.log("Created question: ", newQuestion);
            } else {
                console.log("ERROR: Missing required data for question: ", input);
            }
        }
        console.log("Question creation completed!");
    };

    const deleteUserData = async () => {
        let allUserForms = await helper.listUserForms();
        let deleteResult = [];
        if(allUserForms.length > 0){
            for(let i = 0; i < allUserForms.length; i++) {
                for(const answer of allUserForms[i].questionAnswers.items){
                    deleteResult.push((await helper.callGraphQL(mutations.deleteQuestionAnswer, {input: {"id": answer.id}})));
                }
                deleteResult.push((await helper.callGraphQL(mutations.deleteUserForm, {input: {"id": allUserForms[i].id}})));
            }
            console.log(deleteResult);
        } else console.log("No Userforms active");
    };

    // Navbarfunctions:

    // used to reference items in desktop navbar
    const [userName, setUserName] = useState<string>('');
    const [userPicture, setUserPicture] = useState<string>('');

    // used to set username and userpicture
    useEffect(() => {
        if (user) {
            if (typeof user != "undefined" && user.hasOwnProperty("attributes")) {
                let attributes = user.attributes
                setUserName(attributes.name)
                setUserPicture(attributes.picture)
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
    const categoryNavRef = useRef<HTMLInputElement | null>(null)
    const [collapseMobileCategories, setCollapseMobileCategories] = useState<boolean>(false);


    useEffect(() => {
        window.addEventListener("scroll", handleScroll)
    })

    const handleScroll = () => {
        
        if (categoryNavRef.current?.clientHeight !== undefined) {
            if (window.scrollY > categoryNavRef.current?.clientHeight-56) {
                setCollapseMobileCategories(true)
            } else {
                setCollapseMobileCategories(false)
            }
        }
    }

    const scrollToTopMobile = () => {
        if (categoryNavRef.current?.clientHeight) {
            window.scroll(0, categoryNavRef.current?.clientHeight-50)
            setCollapseMobileCategories(true);
        }
    }

    
    return (
        <div className={style.root}>
            {user ?
                <Fragment>
                    {isMobile ? null : 
                        <NavBarDesktop 
                            confirmDeleteUserdata={confirmDeleteUserdata}
                            displayAnswers={displayAnswers}
                            signout={signout}
                            userName={userName}
                            userPicture={userPicture}
                            />
                    }
                    
                    {showFormDefSendButton ? <button onClick={() => sendFormDefinition()}>Send form definition to server</button> : ""}
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
                        setScaleDescOpen={setScaleDescOpen}
                    />
                    <FloatingScaleDescButton
                        scaleDescOpen={scaleDescOpen}
                        setScaleDescOpen={setScaleDescOpen}
                        isMobile={isMobile}
                    />
                </Fragment>
            :
            <Login isMobile={isMobile}/>
            }
        </div>
    );
}

export default App;
