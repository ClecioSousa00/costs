import { useState } from "react"
import { SubmitButton } from "../SubmitButton"
import "./Form.css"
import { useNavigate } from "react-router-dom"

export const Form = ({handleSubmit, projectData, categories}) =>{

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
            <input 
                className="form_input" 
                type="text" 
                name="nameproject" 
                placeholder="Nome do Projeto"
                onChange={handleChange}
            />
            <input 
                className="form_input" 
                type="number" 
                name="budgetValue" 
                placeholder="Orçamento do Projeto"
                onChange={handleChange}
            />
            <input 
                className="form_input" 
                type="text" 
                name="categorie" 
                placeholder="Categoria do Projeto"
                onChange={handleChange}
            />
            {/* <select className="form_select" name="category_id" id="">
                <option>Selecione uma opcao</option>
                {categories.map(categorie => <option key={categorie.id} value={categorie.id}>{categorie.name}</option>)}
            </select> */}
            <SubmitButton  text="Criar Projeto"/>
        </form>
    )
}
