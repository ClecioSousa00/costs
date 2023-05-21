import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { v4 as uuidv4 } from "uuid"
import {FaAngleLeft} from 'react-icons/fa'

import { Form } from "../../components/Form"
import { ServiceForm } from "../../components/ServiceForm"

import "./Project.css"
import { ServiceCard } from "../../components/ServiceCard"
import { ProjectDescription } from "../../components/ProjectDescription"
import { Loader } from "../../components/Loader"
import { axiosInstance } from "../../axios/axios.instance"
import { Menssage } from "../../components/Menssage"

export const Project = () => {

    const { id } = useParams()
    const [project, setProject] = useState([])
    const [services, setServices] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [showMenssage, setShowMenssage] = useState(false)

    

    useEffect(() => {
        axiosInstance.get(`${id}`)
            .then(response => {
                setProject(response.data)
                setServices(response.data.services)
            })
            .catch(err => console.log('erro ao abrir o projeto'))
        // fetch(`http://localhost:5000/projects/${id}`, {
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        // })
        //     .then(response => response.json())
        //     .then(data => {
        //         setTimeout(() => {setProject(data)},400)
        //         setServices(data.services)
        //     })
        //     .catch(err => console.log("erro ao pegar projeto ao clicar em editar"))
    }, [id])
    


    const editProject = (project) => {
        axiosInstance.patch(`${id}`, project)
            .then(response => {
                setProject(response.data)
                setShowProjectForm(false)
            })
            .catch(err => console.log('erro ao pegar o projeto para editar'))

        // fetch(`http://localhost:5000/projects/${id}`, {
        //     method: 'PATCH',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(project),
        // })
        //     .then(response => response.json())
        //     .then(data => {
        //         setProject(data)
        //         setShowProjectForm(false)
        //     })
        //     .catch(err => console.log("erro ao pegar projeto ao clicar em editar"))
    }

    const createService = (project) => {
        const lastService = project.services[project.services.length - 1]

        lastService.id = uuidv4()
        const lastServiceCost = lastService.costValue
        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

        if (newCost > parseFloat(project.budgetValue)) {
            console.log("valor do serviço é maior que o orçamento");
            setShowMenssage(true)
            project.services.pop()
            return 
        }
        setShowMenssage(false)
        project.cost = newCost

        axiosInstance.patch(`${project.id}`,project)
            .then(response =>{
                setProject(response.data)
                setShowServiceForm(false)
            })
            .catch(err => console.log("erro ao criar serviço do projeto"))

        // fetch(`http://localhost:5000/projects/${project.id}`, {
        //     method: 'PATCH',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(project)
        // })
        //     .then(response => response.json())
        //     .then(data => {
        //         setProject(data)
        //         setShowServiceForm(false)
        //     })
        //     .catch(err => console.log("erro ao mudar valor"))

    }

    const removeService = (id, cost) => {
        console.log('fetch 4');
        const serviceUpdate = project.services.filter(service => service.id !== id)
        const projectUpdate = project
        projectUpdate.services = serviceUpdate
        projectUpdate.cost = parseFloat(projectUpdate.cost) - parseFloat(cost)

        axiosInstance.patch(`${projectUpdate.id}`,projectUpdate)
            .then(response =>{
                setProject(projectUpdate)
                setServices(serviceUpdate)
            })
            .catch(err => console.log("erro ao deletar projeto"))

        // fetch(`http://localhost:5000/projects/${projectUpdate.id}`, {
        //     method: 'PATCH',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(projectUpdate)
        // }).then(response => response.json())
        //     .then(data => {
        //         setProject(projectUpdate)
        //         setServices(serviceUpdate)
        //     })
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
            <Link className="back_link" to="/Projetos"><FaAngleLeft/> Voltar</Link>
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
            {showMenssage && <Menssage visible='visible'/>}
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