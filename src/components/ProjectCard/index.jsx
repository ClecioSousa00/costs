import {FaRegEdit, FaRegTrashAlt, FaPlus} from "react-icons/fa"

import "./ProjectCard.css"
import { Link } from "react-router-dom"

export const ProjectCard = ({id, name, budget, categorie, handleRemove}) =>{

    return(
        <div className="card_project">
            <h1 className="title_project">{name}</h1>
            <div className="description_project">
                <p><strong>Orçamento: </strong>R$ {budget}</p>
                <p className="categorie">{categorie}</p>
            </div>
            <div className="button_project"> 
                <Link className="btnEdit" to={`/Projeto/${id}`}><FaRegEdit/>Editar</Link>
                <Link className="btnAdd" to={`/Projeto/${id}`}><FaPlus/>Adicionar Serviços</Link>
                <button onClick={() => handleRemove(id)}><FaRegTrashAlt/>Excluir</button>
            </div>
        </div>
    )
}