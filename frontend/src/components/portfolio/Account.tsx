import style from "./Account.module.css"
import {type IAccountDetails, GetAccountDetails} from "../../services/AccountServices.ts"
import {useEffect, useState} from "react";

export default function Account() {

    const[username, setUsername] = useState<string>("loading...");
    const[balance, setBalance] = useState<number | string>("loading...");
    const[lastSignedIn, setLastSignedIn] = useState<Date | string>("loading...");
    const[fiat, setFiat] = useState<number | string>("loading...");
    const[pnl, setPnl] = useState<number | string>("loading...");
    
    useEffect( () =>
    {
        const fetchAccountDetails = async () =>
        {
            try {
                const accountDetails: IAccountDetails = await GetAccountDetails(1);
                setBalance(accountDetails.balance);
                setLastSignedIn(accountDetails.lastSignedIn);
                setFiat(accountDetails.fiat);
                setPnl(accountDetails.pnl);
                setUsername(accountDetails.username);
            }
            catch (e){
                console.log(e);
                setBalance("error");
                setLastSignedIn("error");
                setFiat("error");
                setPnl("error");
                setUsername("error");
            }
        }
        
        fetchAccountDetails();
    },[]);

    return (
        <div className={style.accountWrapper}>
            <p className = {style.title}> Account information </p>
            
            <ul className = {style.accountList}>
                <AccountItem accountItemName="Name: " value={username}/>
                <AccountItem accountItemName="Last Signed In: " value={lastSignedIn.toLocaleString()}/>
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