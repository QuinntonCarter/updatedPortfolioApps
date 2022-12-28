import React, {useState, useContext} from "react";
import AuthForm from './forms/AuthForm.js';
import { UserContext } from './context/UserProvider.js';

const initInputs = { username:'', password:'' }

export default function Auth(){
    const [inputs, setInputs] = useState(initInputs)
    const [toggle, setToggle] = useState(false)

    const { signup, login, errMsg, resetAuthError } = useContext(UserContext)

    function handleChange(e){
        const {name, value} = e.target
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    }

    function handleSignup(e){
        e.preventDefault()
        signup(inputs)
    }

    function handleLogin(e){
        e.preventDefault()
        login(inputs)
    }

    function toggleForm(){
        setToggle(prev => !prev)
        resetAuthError()
        setInputs(initInputs)
    }

    return(
        <div className='authContainer'>
            <h1 className='header'> chat app </h1>
            { !toggle ?
                <>
                    <AuthForm
                        handleChange={handleChange}
                        handleSubmit={handleSignup}
                        inputs={inputs}
                        btnText='sign up'
                        errMsg={errMsg}
                    />
                    <p style={{cursor: 'pointer'}} onClick={toggleForm}> current member? </p>
                </>
                :
                <>
                    <AuthForm
                        handleChange={handleChange}
                        handleSubmit={handleLogin}
                        inputs={inputs}
                        btnText='login'
                        errMsg={errMsg}
                    />
                    <p style={{cursor: 'pointer'}} onClick={toggleForm}> not a local? </p>
                </>
            }
        </div>
    )
}