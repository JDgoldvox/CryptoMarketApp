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