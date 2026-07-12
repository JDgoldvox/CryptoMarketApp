import style from "./Account.module.css"
import {GetUserBalance} from "../../services/AccountServices.ts"
import {useEffect, useState} from "react";

export default function Account() {

    const[username, setUsername] = useState<string>("loading...");
    const[balance, setBalance] = useState<string>("loading...");
    const[lastSignedIn, setLastSignedIn] = useState<string>("loading...");
    const[fiat, setFiat] = useState<string>("loading...");
    const[pnl, setPnl] = useState<string>("loading...");
    
    useEffect( () =>
    {
        const fetchBalance = async () => {
            try {
                const balance = await GetUserBalance(1);
                setBalance(balance);
            }
            catch (e){
                console.log(e);
                setBalance("error");
            }
        }

        fetchBalance();
    },[]);

    return (
        <div className={style.accountWrapper}>
            <p className = {style.title}> Account information </p>
            
            <ul className = {style.accountList}>
                
                <AccountItem accountItemName="Name: " value={username}/>
                <AccountItem accountItemName="Last Signed In: " value={lastSignedIn}/>
                <AccountItem accountItemName="Fiat: " value={fiat}/>
                <AccountItem accountItemName="Balance: " value={balance}/>
                <AccountItem accountItemName="24h PNL%: " value={pnl}/>
            </ul>
        </div>
    )
}

function AccountItem({accountItemName, value}: AccountItemProps) {
    return (
        <li>
            <div className={style.accountList__content}>
                <p className={style.accountList__itemName}> {accountItemName} </p> 
                <p className={style.accountList__itemValue}> {value} </p>
            </div>
        </li>
    )
}

interface AccountItemProps {
    accountItemName: string;
    value: any;
}