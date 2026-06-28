import style from "./Holding.module.css"

export default function Holding() {
    
    let headers: string[] = ["Asset", "Holdings", "Last Price", "24h Volume", "24h Change"];

    const transactions: HoldingsData[] = [
        { id: 1, asset: "Bitcoin", holdings: "0.5 BTC", lastPrice: "$60,000", volume24h: "$30B", change24h: "+2.5%" },
        { id: 2, asset: "Ethereum", holdings: "10 ETH", lastPrice: "$3,300", volume24h: "$15B", change24h: "-1.2%" },
        { id: 3, asset: "Ethereum", holdings: "10 ETH", lastPrice: "$3,300", volume24h: "$15B", change24h: "-1.2%" },
        { id: 4, asset: "Ethereum", holdings: "10 ETH", lastPrice: "$3,300", volume24h: "$15B", change24h: "-1.2%" },
        { id: 5, asset: "Ethereum", holdings: "10 ETH", lastPrice: "$3,300", volume24h: "$15B", change24h: "-1.2%" },
        { id: 6, asset: "Ethereum", holdings: "10 ETH", lastPrice: "$3,300", volume24h: "$15B", change24h: "-1.2%" },
        { id: 7, asset: "Ethereum", holdings: "10 ETH", lastPrice: "$3,300", volume24h: "$15B", change24h: "-1.2%" },
        { id: 8, asset: "Ethereum", holdings: "10 ETH", lastPrice: "$3,300", volume24h: "$15B", change24h: "-1.2%" },
    ];

    interface HoldingsData {
        id: number;
        asset: string;
        holdings: string;
        lastPrice: string;
        volume24h: string;
        change24h: string;
    }
    
    return (
        <div className = {style.tableDiv}>
            <table className={style.table}>
                <caption> Holdings </caption>

                <thead>
                <tr>
                    { headers.map((header, index) => {
                        return <th key={index}>{header}</th>
                    })}
                </tr>
                </thead>

                <tbody>
                { transactions.map((transaction) => {
                    return <tr key={transaction.id}>
                        <td>{transaction.asset}</td>
                        <td>{transaction.holdings}</td>
                        <td>{transaction.lastPrice}</td>
                        <td>{transaction.volume24h}</td>
                        <td>{transaction.change24h}</td>
                    </tr>
                })
                }
                </tbody>
            </table>
        </div>
    );
}