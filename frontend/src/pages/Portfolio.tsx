
import d from "./Portfolio.module.css"

export default function Portfolio() {
  return (
    <>
        <div className={d.gridContainer}>
            <div className={`${d.gridItemA} ${d.lol}`}>Portfolio</div>
            <div className={`${d.gridItemB} ${d.lol2}`}>
                <p> Dashboard </p>
            </div>
            <div className={`${d.gridItemC} ${d.lol}`}>Dashboard</div>
        </div>
    </>
  );
}