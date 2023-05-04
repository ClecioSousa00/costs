import { Link } from 'react-router-dom'
import Logo from '../../assets/images/costs_logo.png'
import { NavBar } from '../NavBar'

export const Header = () =>{
    return(
        <header>
            <picture>
                <Link to="/"> <img src={Logo} alt="Moeda dourada com a face $" /> </Link>
            </picture>
            <NavBar/>
        </header>
    )
}