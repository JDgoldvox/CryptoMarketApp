import style from "./TransactionData.module.css"
import {useState} from "react";

export default function TransactionData() {

    const headers: string[] = ["Id", "Date", "Time", "Type", "Amount"];
    
    let [transactions, setTransactions] = useState<TransactionData[]>([
        {Id: 145, Date:"loading...", Time:"loading...", Type:"loading...", Amount:"loading..."},
        {Id: 146, Date:"loading...", Time:"loading...", Type:"loading...", Amount:"loading..."},
        {Id: 147, Date:"loading...", Time:"loading...", Type:"loading...", Amount:"loading..."},
        {Id: 148, Date:"loading...", Time:"loading...", Type:"loading...", Amount:"loading..."}
    ]);
    
    interface TransactionData
    {
        Id: number;
        Date: string;
        Time: string;
        Type: string;
        Amount: string;
    }
    
    return (
        <table className={style.table}>
            <caption> Transaction Data </caption>
            <thead>
                <tr>
                {
                    headers.map((header: string, index: number) => {
                        return <th key={index}>{header}</th>
                    })
                }
                </tr>
            </thead>
            <tbody>
            {
                transactions.map((transaction: TransactionData, index: number) => {
                    return ( 
                        <tr key={index}>
                            <td>{transaction.Id}</td>
                            <td>{transaction.Date}</td>
                            <td>{transaction.Time}</td>
                            <td>{transaction.Type}</td>
                            <td>{transaction.Amount}</td>
                        </tr>
                    );
                })
            }
            </tbody>
        </table>
    )
}