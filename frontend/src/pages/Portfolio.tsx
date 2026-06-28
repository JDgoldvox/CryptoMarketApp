
import portfolioStyle from "./Portfolio.module.css"
import TopMovers from "../components/portfolio/TopMovers.tsx"
import Account from "../components/portfolio/Account.tsx"

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
                recent transaction history
            </div>
            <div className={`${portfolioStyle.gridItemE} ${portfolioStyle.containerStyle}`}>
                pie chart on coin holdings
            </div>
            <div className={`${portfolioStyle.gridItemF} ${portfolioStyle.containerStyle}`}>
                coin table of current holdings
            </div>
        </div>
    </div>
  );
}