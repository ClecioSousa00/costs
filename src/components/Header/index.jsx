import { Link } from 'react-router-dom'

import './Header.css'
import Logo from '../../assets/images/costs_logo.png'
import { NavBar } from '../NavBar'

export const Header = () =>{
    return(
        <header className='header'>
            <picture>
                <Link to="/"> <img src={Logo} alt="Moeda dourada com a face $" /> </Link>
            </picture>
            <NavBar/>
        </header>
    )
}