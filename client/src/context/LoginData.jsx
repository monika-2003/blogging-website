import React, { createContext, useState } from 'react';

export const LoginContext = createContext(null)

const LoginData = ({children}) => {

    const [account, setAccount] = useState({
        name: '',
        email: ''
    })

    return (
        <LoginContext.Provider value={{account, setAccount}}>
            {children}
        </LoginContext.Provider>
    )
}

export default LoginData
