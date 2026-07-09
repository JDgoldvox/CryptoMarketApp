import style from "./Login.module.css"
import {useEffect, useState} from "react";
import { AuthService } from "../services/AuthService.ts";
import {type NavigateFunction, useNavigate} from "react-router";


export default function Login() {

    const navigate : NavigateFunction = useNavigate();
    const [username, setUsername] = useState<string>("no_username");
    const [password, setPassword] = useState<string>("no_password");
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        async function verifySession() {
            if (await AuthService.IsAuthenticated()) {
                navigate("/");
            } 
            else {
                setIsLoading(false);
            }
        }
        verifySession(); 
    }, [navigate]);

    if (isLoading) {
        return <div className={style.page}><h1>Loading...</h1></div>;
    }
    
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
    if(username === "" || password === "")
    {
        alert("Please enter a username and password");
        return;
    }
    
    const loginData: boolean = await GetLoginInfo(username, password);
    if(!loginData) return;
    navigate("/");
}

async function GetLoginInfo(username: string, password:string)
{
    const loginUrl: string = "http://localhost:5277/login";
    const refreshUrl: string = "http://localhost:5277/refresh";
     
    try { //Try access token
        const response = await fetch(loginUrl, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
                {
                    username: username,
                    password: password,
                }
            ),
        });
        
        if(response.ok)
        {
            console.log("Successfully used refresh token to login");
            return true;
        }
    }
    catch (e)
    {
        console.log(e);
    }
    
    try {
        const response = await fetch(refreshUrl, {
            method: "POST",
            credentials: "include",
        })
        
        return response.ok;
    }
    catch(e)
    {
        console.log(e);
    }

    return false;
}