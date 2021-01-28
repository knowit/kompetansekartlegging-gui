import { Button, makeStyles } from '@material-ui/core'
import React from 'react'
import {CognitoHostedUIIdentityProvider} from '@aws-amplify/auth/lib/types'
import { Auth } from 'aws-amplify'
import { KnowitColors } from '../styles';

const loginStyle = makeStyles({
    container: {
        height: '100vw',
        width: '100vw',
        position: "relative",
        fontFamily: 'Arial'
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
        background: KnowitColors.beige,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50
    },
    botDiv: {
        width: '100%',
        position: "absolute",
        zIndex: 3,
        height: '65%',
        top: '35%',
        background: KnowitColors.darkBrown,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50
    },
    frontDiv: {
        position: "absolute",
        width: '100%',
        height: '75%',
        zIndex: 4,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    headline: {
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: '10%'
    },
    loginButton: {
        padding: 10,
        paddingLeft: 40,
        paddingRight: 40,
        borderRadius: 50,
        background: KnowitColors.lightGreen,
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        fontSize: 20,
        '&:hover': {
            background: KnowitColors.green
        }
    }
});

const Login = () => {
    const style = loginStyle();

    return (
        <div className={style.container}>
            <div className={style.topDiv} />
            <div className={style.midDiv} />
            <div className={style.botDiv} />
            <div className={style.frontDiv}>
                <div className={style.headline}>
                    Kompetansekartlegging
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
