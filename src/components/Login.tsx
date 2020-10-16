import { Button } from '@material-ui/core'
import React from 'react'
import {CognitoHostedUIIdentityProvider} from '@aws-amplify/auth/lib/types'
import { Auth } from 'aws-amplify'

const Login = () => {
    return (
        <div>
            <Button onClick={() => Auth.federatedSignIn({customProvider: CognitoHostedUIIdentityProvider.Google})}>Log in</Button>
        </div>
    )
}

export default Login
