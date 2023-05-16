import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { Form } from "../../components/Form"
import { ServiceForm } from "../../components/ServiceForm"

import "./Project.css"

export const Project = () => {

    const { id } = useParams()
    const [project, setProject] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)

    useEffect(() => {
        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => setProject(data))
            .catch(err => console.log("erro ao pegar projeto ao clicar em editar"))
    }, [id])


    const editProject = (project) => {
        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        })
            .then(response => response.json())
            .then(data =>{
                setProject(data) 
                setShowProjectForm(false)
            } )
            .catch(err => console.log("erro ao pegar projeto ao clicar em editar"))
    }

    const createService = () =>{
        
    }

    const toggleProjectForm = () => {
        setShowProjectForm(!showProjectForm)
    }
    const toggleServiceForm = () => {
        setShowServiceForm(!showServiceForm)
    }

    if (!project) {
        console.log('projeto ainda n existe');//colocar loader
        return
    }
    //fazer a div ser um componente
    return (
        <main className="edit_project">
            <h1>Projeto: {project.nameproject}</h1>
            <button className="edit_btn" onClick={toggleProjectForm}>{showProjectForm ? 'Fechar' : 'Editar Projeto'}</button>
            {!showProjectForm ?
                <div className="description_project">
                    <p>Categoria: {project.categorie}</p>
                    <p>Orçamento: {project.budgetValue}</p>
                    <p>Valor Gasto: {project.cost}</p>
                </div> :
                <Form handleSubmit={editProject} projectData={project} textBtn="Salvar Alterações"/>
            }
            <div className="service_project">
                <h2>Adicione um serviço</h2>
                <button className="edit_btn" onClick={toggleServiceForm}>{!showServiceForm ? 'Adicionar serviço' : 'Fechar'}</button>
                <div>
                    {showServiceForm && (<ServiceForm handleSubmit={createService} projectData={project}/>)}
                </div>
                <h2>Serviços</h2>
            </div>
        </main>
    )
}