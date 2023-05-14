import {FaRegEdit, FaRegTrashAlt} from "react-icons/fa"

import "./ProjectCard.css"

export const ProjectCard = ({id, name, budjet, handleRemove}) =>{
    return(
        <div className="card_project">
            <h1 className="title_project">Nome do projeto</h1>
            <p><strong>Orçamento:</strong> {budjet}</p>
            <p>desenvolvimento</p>
            <div className="button_project">
                <button><FaRegEdit/>Editar</button>
                <button><FaRegTrashAlt/>Excluir</button>
            </div>
        </div>
    )
}