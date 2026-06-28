import style from "./TopMovers.module.css"
import btc from "../../../public/symbols/bitcoin.png"

export default function TopMovers() {
    return (
       <>
           <div className={style.topMoversList}>
               <p className={style.topMovers__title}> Top Movers </p>
               <CoinBlock/>
               <hr/>
               <CoinBlock/>
               <hr/>
               <CoinBlock/>
               <hr/>
               <CoinBlock/>
           </div>
       </>
    );
}

function CoinBlock()
{
    return (
        <div className={style.topMoversList__content}>
            <img src={btc} alt="btc"/>
            <div className={style.topMoversList__info}>
                <p className={style.topMoversList__name}> Bitcoin </p>
                <p className={style.topMoversList__ticker}> Btc </p>
            </div>
            <div className ={style.topMoversList__priceInfo}>
                <p className={style.topMoversList__price}> $145.75 </p>
                <p className={style.topMoversList__change}> 14% </p>
            </div>
        </div>
    )
}