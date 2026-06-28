import style from "./Account.module.css"

export default function Account() {
    return (
        <div className={style.accountWrapper}>
            <p className = {style.title}> Account information </p>
            
            <ul className = {style.accountList}>
                
                <AccountItem accountItemName="Name: " value="John Doe"/>
                <AccountItem accountItemName="Last Signed In: " value="12:34 PM"/>
                <AccountItem accountItemName="Fiat: " value="$1234.56"/>
                <AccountItem accountItemName="Balance: " value={500}/>
                <AccountItem accountItemName="24h PNL%: " value="12.34%"/>
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