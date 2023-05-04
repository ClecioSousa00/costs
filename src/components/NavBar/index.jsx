import { Link } from "react-router-dom"

export const NavBar = () =>{
    return(
        <>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/NewProject">Projetos</Link>
                <Link to="/About">Sobre</Link>
                <Link to="/Contacts">Contato</Link>
            </nav>
        </>
    )
}