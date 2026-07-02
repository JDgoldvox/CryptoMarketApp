import style from './TrendingRow.module.css'
import TrendingBox from "./TrendingBox.tsx"

export default function TrendingRow() {
    
    return (
        <div className={style.tendingRow}>
            <TrendingBox/>
            <TrendingBox/>
            <TrendingBox/>
        </div>
    )
}