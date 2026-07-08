import style from "./Login.module.css"
import { useState } from "react";
import { AuthService } from "../services/AuthService.ts";
import {type NavigateFunction, useNavigate} from "react-router";


export default function Login() {

    const navigate : NavigateFunction = useNavigate();
    
    const [username, setUsername] = useState<string>("no_username");
    const [password, setPassword] = useState<string>("no_password");
    
    return (
        <div className={style.page}>
            <div className={style.loginContainer}>
                <div className={style.loginContainer__content}>
                    <h1>login</h1>
                    <input type="text"
                           placeholder="username"
                           onChange={(e) => {
                               setUsername(e.target.value);}}/>
                    <input type="password"
                           placeholder="password" 
                           onChange={(e) => {
                               setPassword(e.target.value);}}/>
                    <button name="hello" 
                            onClick={() => SubmitLogin(username, password, navigate)}> 
                            Login 
                            </button>
                </div>
            </div>
        </div>
      );
}

async function SubmitLogin(username: string, password:string, navigate: NavigateFunction)
{
    if(AuthService.isAuthenticated())
    {
        navigate("/");
        return;
    }
    
    if(username === "" || password === "")
    {
        alert("Please enter a username and password");
        return;
    }
    
    alert(`${username} ${password}`);
    
    //todo: send authentication request to server
    const loginData: boolean = await GetLoginInfo(username, password);
    
    if(!loginData)
    {
        return;
    }
    
    //grab authentication tokens
    AuthService.login(username, password);
    navigate("/");
}

async function GetLoginInfo(username: string, password:string)
{
    const url = "http://localhost:5277/login";

    //refreshToken: "",
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
                {
                    username: username,
                    password: password,
                    refreshToken: ""
                }
            ),
        });
        
        if(!response.ok)
        {
            throw new Error(`Response status: ${response.status}`);
        }
        
        //test response
        const result = await response.json();
        console.log(result);
    }
    catch (error)
    {
        console.log(error);
    }
    
    return true;
}