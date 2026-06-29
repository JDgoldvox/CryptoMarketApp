
import portfolioStyle from "./Portfolio.module.css"
import TopMovers from "../components/portfolio/TopMovers.tsx"
import Account from "../components/portfolio/Account.tsx"
import Holding from "../components/portfolio/Holding.tsx"
import TransactionData from "../components/portfolio/TransactionData.tsx";

export default function Portfolio() {
  return (
    <div className={portfolioStyle.portfolioPage}>
        <div className={portfolioStyle.gridContainer}>
            <div className={`${portfolioStyle.gridItemA} ${portfolioStyle.containerStyle}`}>
                <Account/>
            </div>
            <div className={`${portfolioStyle.gridItemB} ${portfolioStyle.containerStyle}`}>
                <p> Dashboard </p>
            </div>
            <div className={`${portfolioStyle.gridItemC} ${portfolioStyle.containerStyle}`}>
                <TopMovers/>
            </div>
            <div className={`${portfolioStyle.gridItemD} ${portfolioStyle.containerStyle}`}>
                <TransactionData/>
            </div>
            <div className={`${portfolioStyle.gridItemE} ${portfolioStyle.containerStyle}`}>
                pie chart on coin holdings
            </div>
            <div className={`${portfolioStyle.gridItemF} ${portfolioStyle.containerStyle}`}>
                <Holding/>
            </div>
        </div>
    </div>
  );
}