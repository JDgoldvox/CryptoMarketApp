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

function SubmitLogin(username: string, password:string, navigate: NavigateFunction)
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
    
    //grab authentication tokens
    AuthService.login(username, password);
    navigate("/");
}