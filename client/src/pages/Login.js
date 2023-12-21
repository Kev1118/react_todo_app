import { useRef, useEffect, useState } from "react";
import { Button, Card, CardBody, FormControl, FormLabel } from "react-bootstrap";
import axios from 'axios'

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";
import { useLoginMutation } from "../features/auth/authApiSlice";

const  Login = () => {
    const userRef = useRef()
    const errRef = useRef()
    //REGISTER VARIABLE
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [regUsername, setRegUsername] = useState('')
    const [regPassword, setRegPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    
    const navigate = useNavigate();
    const [toggleBody, setToggleBody] = useState(false)

    const [login, { isLoading}] = useLoginMutation()
    const dispatch = useDispatch()

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrorMessage('')
    },[username, password])


    const handleLogin = async () => {
        try{
            const userData = await login({username, password}).unwrap()
            dispatch(setCredentials({...userData, username}))
            setUsername('')
            setPassword('')
            navigate('/dashboard')
        }catch(err){
            if(!err?.originalStatus){
                setErrorMessage('No Server Response')
                console.log(err)
            }else if(err.originalStatus === 400){
                setErrorMessage('Missing Username or Password')
            }else if(err.originalStatus === 401) {
                setErrorMessage('Unauthorized')
            }else {
                setErrorMessage('Login Failed')
            }
            // errRef.current.focus()
        }
       
    }

    const handleRegister = () => {
        if(regPassword === confirmPassword){
            axios.post(process.env.REACT_APP_API_KEY + '/auth/register', {
                name: name,
                email: email,
                username: regUsername,
                password: regPassword
            }).then((response) => {
                console.log(response)
            }).catch((error) => {
                console.error(error)
            })
        }else{
            alert('Confirm password does not match')
        }
    }

    const content = isLoading ? <h1>Loading .. . </h1> : (
        <div className="login-container" >
        <div ref={errRef} className={errorMessage ? "errMsg" : "offscreen"} aria-live="assertive">{errorMessage}</div>
        <Card className="login-card" style={{width: '20rem'}}>
            <CardBody hidden={toggleBody}>
                <h4 className="text-center text-white">Login</h4>
                {errorMessage ? <div className="alert alert-danger">{errorMessage}</div> : null}
                <div className="mb-3">
                    <FormLabel className="text-white">Username:</FormLabel>
                    <FormControl ref={userRef} onChange={(e) => setUsername(e.target.value)}></FormControl>
                </div>
                <div className="mb-3">
                    <FormLabel className="text-white">Password:</FormLabel>
                    <FormControl type="password" onChange={(e) => setPassword(e.target.value)}></FormControl>
                </div>
                <div className="d-grid mb-2">
                    <Button variant="success" onClick={() => handleLogin()}>Login</Button>
                </div>
                <span className="text-link" onClick={() => setToggleBody(!toggleBody)}><small>Create an account</small></span>
            </CardBody>
            <CardBody hidden={!toggleBody}>
                <h4 className="text-center text-white">Register</h4>

                <div className="mb-3">
                    <FormLabel className="text-white">Name:</FormLabel>
                    <FormControl onChange={(e) => setName(e.target.value)}></FormControl>
                </div>
                <div className="mb-3">
                    <FormLabel className="text-white">Email:</FormLabel>
                    <FormControl onChange={(e) => setEmail(e.target.value)}></FormControl>
                </div>
                <div className="mb-3">
                    <FormLabel className="text-white">Username:</FormLabel>
                    <FormControl onChange={(e) => setRegUsername(e.target.value)}></FormControl>
                </div>
                <div className="mb-3">
                    <FormLabel className="text-white">Password:</FormLabel>
                    <FormControl type="password" onChange={(e) => setRegPassword(e.target.value)}></FormControl>
                </div>
                <div className="mb-3">
                    <FormLabel className="text-white">Confirm Password:</FormLabel>
                    <FormControl type="password" onChange={(e) => setConfirmPassword(e.target.value)}></FormControl>
                </div>
                <div className="d-grid mb-2">
                    <Button variant="success" onClick={handleRegister}>Signup</Button>
                </div>
                <span className="text-link" onClick={() => setToggleBody(!toggleBody)}><small>Already have an acoount?</small></span>
            </CardBody>
        </Card>
    </div>
    )
    
    return content
}
export default Login