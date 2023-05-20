import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { v4 as uuidv4 } from "uuid"

import { Form } from "../../components/Form"
import { ServiceForm } from "../../components/ServiceForm"

import "./Project.css"
import { ServiceCard } from "../../components/ServiceCard"
import { ProjectDescription } from "../../components/ProjectDescription"
import { Loader } from "../../components/Loader"

export const Project = () => {

    const { id } = useParams()
    const [project, setProject] = useState([])
    const [services, setServices] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)

    

    useEffect(() => {
        console.log('fetch 1');
        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                setTimeout(() => {setProject(data)},400)
                setServices(data.services)
            })
            .catch(err => console.log("erro ao pegar projeto ao clicar em editar"))
    }, [id])
    


    const editProject = (project) => {
        console.log('fetch 2');
        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        })
            .then(response => response.json())
            .then(data => {
                setProject(data)
                setShowProjectForm(false)
            })
            .catch(err => console.log("erro ao pegar projeto ao clicar em editar"))
    }

    const createService = (project) => {
        const lastService = project.services[project.services.length - 1]

        lastService.id = uuidv4()
        const lastServiceCost = lastService.costValue
        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

        if (newCost > parseFloat(project.budgetValue)) {
            console.log("valor do serviço é maior que o orçamento");
            project.services.pop()
            return false
        }
        project.cost = newCost

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project)
        })
            .then(response => response.json())
            .then(data => {
                setProject(data)
                setShowServiceForm(false)
            })
            .catch(err => console.log("erro ao mudar valor"))

    }

    const removeService = (id, cost) => {
        console.log('fetch 4');
        const serviceUpdate = project.services.filter(service => service.id !== id)
        const projectUpdate = project
        projectUpdate.services = serviceUpdate
        projectUpdate.cost = parseFloat(projectUpdate.cost) - parseFloat(cost)

        fetch(`http://localhost:5000/projects/${projectUpdate.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(projectUpdate)
        }).then(response => response.json())
            .then(data => {
                setProject(projectUpdate)
                setServices(serviceUpdate)
            })
    }

    const toggleProjectForm = () => {
        setShowProjectForm(!showProjectForm)
    }
    const toggleServiceForm = () => {
        setShowServiceForm(!showServiceForm)
    }

    const generateCardServices = (services) => {
        return (
            services.map(service => (
                <ServiceCard
                    id={service.id}
                    name={service.nameService}
                    cost={service.costValue}
                    description={service.descriptionService}
                    handleRemove={removeService}
                    key={service.id}
                />
            ))
        )
    }

    if(!project.nameproject){
        return <Loader/>
    }
   
    //fazer a div ser um componente
    return (
        <main className="edit_project">
            <div className="header_project">
                <h1 className="title_project">{project.nameproject}</h1>
                <button className="edit_btn" onClick={toggleProjectForm}>{showProjectForm ? 'Fechar' : 'Editar Projeto'}</button>
            </div>
            {!showProjectForm ?
                <ProjectDescription categorie={project.categorie} budgetValue={project.budgetValue} cost={project.cost} />
                :
                <Form handleSubmit={editProject} projectData={project} textBtn="Salvar Alterações" />
            }
            <div className="service_project">
                <div className="header_project">
                    <h2 className="title_services">Serviços</h2>
                    <button className="edit_btn" onClick={toggleServiceForm}>{!showServiceForm ? 'Adicionar serviço' : 'Fechar'}</button>
                </div>
                <div>
                    {showServiceForm && (<ServiceForm handleSubmit={createService} projectData={project} />)}
                </div>
                
            </div>
                <div className="container_services">
                    {services.length ? generateCardServices(services) 
                    : 
                    <h1 className="title_project_without">Você ainda não possui serviços adicionados</h1>
                    }
                </div>
        </main>
    )
}

// 