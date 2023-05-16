import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { v4 as uuidv4 } from "uuid"

import { Form } from "../../components/Form"
import { ServiceForm } from "../../components/ServiceForm"

import "./Project.css"
import { ServiceCard } from "../../components/ServiceCard"

export const Project = () => {

    const { id } = useParams()
    const [project, setProject] = useState([])
    const [services, setServices] = useState([])
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
            .then(data =>{
                setProject(data)
                setServices(data.services)
            })
            .catch(err => console.log("erro ao pegar projeto ao clicar em editar"))
    }, [id, services])


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

    const createService = (project) =>{
        const lastService = project.services[project.services.length -1]
        
        lastService.id = uuidv4()
        const lastServiceCost = lastService.costValue
        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)
        
        if(newCost > parseFloat(project.budgetValue)){
            console.log("valor do serviço é maior que o orçamento");
            project.services.pop()
            return false
        }
       project.cost = newCost

       fetch(`http://localhost:5000/projects/${project.id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project)
       })
       .then(response => response.json())
       .then(data => console.log(data))
       .catch(err => console.log("erro ao mudar valor"))
        
    }

    const toggleProjectForm = () => {
        setShowProjectForm(!showProjectForm)
    }
    const toggleServiceForm = () => {
        setShowServiceForm(!showServiceForm)
    }

    const generateCardServices = (services) =>{
        return(
            services.map(service => (
                <ServiceCard 
                    id={service.id}
                    name={service.nameService}
                    cost={service.costValue}
                    description={service.descriptionService}
                    key={service.id}
                />
            ))
        )
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
                {services.length ? generateCardServices(services) : <h1>não tem</h1>}
            </div>
        </main>
    )
}

// 