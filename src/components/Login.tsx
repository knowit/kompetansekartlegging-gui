import { Button, makeStyles } from '@material-ui/core'
import React from 'react'
import {CognitoHostedUIIdentityProvider} from '@aws-amplify/auth/lib/types'
import { Auth } from 'aws-amplify'
import { KnowitColors } from '../styles';

const LoginStyle = makeStyles({
    container: {
        height: '100vw',
        width: '100vw',
        position: "relative"
    },
    topDiv: {
        width: '100%',
        position: "absolute",
        zIndex: 1,
        height: '100%',
        background: KnowitColors.white
    },
    midDiv: {
        width: '100%',
        position: "absolute",
        zIndex: 2,
        height: '70%',
        top: '30%',
        background: KnowitColors.ecaluptus,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40
    },
    botDiv: {
        width: '100%',
        position: "absolute",
        zIndex: 3,
        height: '65%',
        top: '35%',
        background: KnowitColors.greyGreen,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40
    },
    frontDiv: {
        position: "absolute",
        width: '100%',
        height: '80%',
        zIndex: 4,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    headline: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: '10%'
    },
    loginButton: {
        padding: 30,
        background: KnowitColors.lightGreen,
        fontSize: 20,
        '&:hover': {
            background: KnowitColors.green
        }
    }
});

const Login = () => {
    const style = LoginStyle();

    return (
        <div className={style.container}>
            <div className={style.topDiv} />
            <div className={style.midDiv} />
            <div className={style.botDiv} />
            <div className={style.frontDiv}>
                <div className={style.headline}>
                    KOMPETANSEKARTLEGGING
                </div>
                <Button 
                    className={style.loginButton} 
                    onClick={() => Auth.federatedSignIn({customProvider: CognitoHostedUIIdentityProvider.Google})}
                >Logg inn</Button>
            </div>
        </div>
    )
}

export default Login
