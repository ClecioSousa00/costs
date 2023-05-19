import { useState } from "react"
import { SubmitButton } from "../SubmitButton"
import "./Form.css"
import { useNavigate } from "react-router-dom"

export const Form = ({handleSubmit, projectData, textBtn}) =>{

    const [project, setProject] = useState(projectData || {})
    const navigate = useNavigate()

    const submitForm = (event) =>{
        event.preventDefault()
        handleSubmit(project)
        console.log(project);
        navigate("/Projetos")
    }

    const handleChange = (event) =>{
        setProject({...project, [event.target.name]: event.target.value})
    }

 
    return(
        <form className="form" onSubmit={submitForm}>
            <div>
                <label htmlFor="nameproject">Projeto</label>
                <input
                    className="form_input"
                    value={project.nameproject || ''}
                    type="text"
                    name="nameproject"
                    id="nameproject"
                    placeholder="Nome do Projeto"
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="budgetValue">Orçamento</label>
                <input
                    className="form_input"
                    value={project.budgetValue || ''}
                    type="number"
                    name="budgetValue"
                    id="budgetValue"
                    placeholder="Orçamento do Projeto"
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="categorie">Categoria</label>
                <input
                    className="form_input"
                    value={project.categorie || ''}
                    type="text"
                    name="categorie"
                    id="categorie"
                    placeholder="Categoria do Projeto"
                    onChange={handleChange}
                />
            </div>
            <SubmitButton  text={textBtn}/>
        </form>
    )
}
