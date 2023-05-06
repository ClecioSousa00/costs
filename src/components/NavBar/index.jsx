import { useState } from 'react'
import { Link } from "react-router-dom"

import { MenuToogle } from '../MenuToogle'
import './NavBar.css'

export const NavBar = () =>{
    
    const [menuIsOpen, setMenuIsOpen] = useState(false)

    const openMenu = () =>{
        setMenuIsOpen(!menuIsOpen)
    }

    // const closeMenu = () =>{
    //     setMenuIsOpen(false)
    // }

    return(
        <>
            <nav className={`${'nav_bar'} ${menuIsOpen && 'active'}`}>
                <ul className="nav_bar_itens">
                    <li><Link className='nav_bar_links' to="/">Home</Link></li>
                    <li><Link className='nav_bar_links' to="/Novo-Projeto">Projetos</Link></li>
                    <li><Link className='nav_bar_links' to="/Sobre">Sobre</Link></li>
                    <li><Link className='nav_bar_links' to="/Contatos">Contato</Link></li>
                </ul>
            </nav>
            <MenuToogle isOpen={menuIsOpen} fnClickMenu={openMenu}/>
        </>
    )
}