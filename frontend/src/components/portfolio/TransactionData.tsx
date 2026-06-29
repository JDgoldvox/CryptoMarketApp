import style from "./TransactionData.module.css"

export default function TransactionData() {

    const headers: string[] = ["Id", "Date", "Time", "Type", "Amount"];
    
    const transactions: TransactionData[] = [
        {Id: 145, Date:"2024-3-10", Time:"10:45", Type:"Buy", Amount:"$1000"},
        {Id: 148, Date:"2024-3-10", Time:"10:45", Type:"Buy", Amount:"$1000"},
        {Id: 142, Date:"2024-3-10", Time:"10:45", Type:"Buy", Amount:"$1000"},
        {Id: 143, Date:"2024-3-10", Time:"10:45", Type:"Buy", Amount:"$1000"},
    ];
    
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
            {
                headers.map((header, index) => {
                    return <th key={index}>{header}</th>
                })
            }
            </thead>
            <tbody>
            {
                transactions.map((transaction, index) => {
                    return ( 
                        <tr>
                            <td key={index}>{transaction.Id}</td>
                            <td key={index}>{transaction.Date}</td>
                            <td key={index}>{transaction.Time}</td>
                            <td key={index}>{transaction.Type}</td>
                            <td key={index}>{transaction.Amount}</td>
                        </tr>
                    );
                })
            }
            </tbody>
        </table>
    )
}