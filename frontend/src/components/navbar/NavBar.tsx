import navbarStyle from './NavBar.module.css'
import {NavLink} from "react-router";
import { Hexagon } from "lucide-react";

export default function NavBar() {
    
    return (
        <nav className={navbarStyle.navBarContainer}>
            
            <NavLink className={navbarStyle.logoContainer} to="/">
                <Hexagon className={navbarStyle.logo} />
                <div className = {navbarStyle.logoTextContainer}>
                    <p> Crypto</p>
                    <p> Market</p>
                </div>
                
            </NavLink>
            
            <ul className = {navbarStyle.navBar}>
                <li>
                    <NavLink to="/portfolio"> Portfolio </NavLink>
                </li>
                <li>
                    <NavLink to="/market"> Market </NavLink>
                </li>
                
                {/*<button> Sign in </button>*/}
                {/*<button> Create Account </button>*/}
            </ul>
        </nav>
    )
    
}