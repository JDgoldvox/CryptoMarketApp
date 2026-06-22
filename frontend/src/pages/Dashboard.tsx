
import d from "./Dashboard.module.css"

export default function Dashboard() {
  return (
    <>
        <div className={d.gridContainer}>
            <div className={`${d.gridItemA} ${d.lol}`}>Dashboard</div>
            <div className={`${d.gridItemB} ${d.lol2}`}>
                <p> Dashboard </p>
            </div>
            <div className={`${d.gridItemC} ${d.lol}`}>Dashboard</div>
        </div>
        
      
    </>
  );
}