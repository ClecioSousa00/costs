import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { v4 as uuidv4 } from "uuid"
import { FaAngleLeft } from 'react-icons/fa'

import { Form } from "../../components/Form"
import { ServiceForm } from "../../components/ServiceForm"

import "./Project.css"
import { ServiceCard } from "../../components/ServiceCard"
import { ProjectDescription } from "../../components/ProjectDescription"
import { Loader } from "../../components/Loader"
import { axiosInstance } from "../../axios/axios.instance"
import { Menssage } from "../../components/Menssage"
import { Modal } from "../../components/Modal"

export const Project = () => {

    const { id } = useParams()
    const [project, setProject] = useState([])
    const [services, setServices] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [showMenssage, setShowMenssage] = useState(false)

    const [isOpenModal, setIsOpenModal] = useState(false)
    const [idService, setIdService] = useState('')
    const [costService, setCostService] = useState(0)


    useEffect(() => {
        axiosInstance.get(`${id}`)
            .then(response => {
                setProject(response.data)
                setServices(response.data.services)
            })
            .catch(() => console.log('erro ao abrir o projeto'))
    }, [id])



    const editProject = (project) => {
        axiosInstance.patch(`${id}`, project)
            .then(response => {
                setProject(response.data)
                setShowProjectForm(false)
            })
            .catch(() => console.log('erro ao pegar o projeto para editar'))
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

        axiosInstance.patch(`${project.id}`, project)
            .then(() => {
                setProject(project)
                setShowServiceForm(false)
            })
            .catch(() => console.log("erro ao criar serviço do projeto"))
    }



    const buttonModal = (value) => {
        if (!value) {
            setIsOpenModal(false)
        }
        if (value) {
            const serviceUpdate = project.services.filter(service => service.id !== idService)
            const projectUpdate = project
            projectUpdate.services = serviceUpdate
            projectUpdate.cost = parseFloat(projectUpdate.cost) - parseFloat(costService)

            axiosInstance.patch(`${projectUpdate.id}`, projectUpdate)
                .then(() => {
                    setProject(projectUpdate)
                    setServices(serviceUpdate)
                })
                .catch(() => console.log("erro ao deletar projeto"))
                .finally(() => setIsOpenModal(false))
        }
    }

    const removeService = (id, cost) => {
        setIdService(id)
        setCostService(cost)
        setIsOpenModal(true)
        // const serviceUpdate = project.services.filter(service => service.id !== id)
        // const projectUpdate = project
        // projectUpdate.services = serviceUpdate
        // projectUpdate.cost = parseFloat(projectUpdate.cost) - parseFloat(cost)

        // axiosInstance.patch(`${projectUpdate.id}`,projectUpdate)
        //     .then(() =>{
        //         setProject(projectUpdate)
        //         setServices(serviceUpdate)
        //     })
        //     .catch(() => console.log("erro ao deletar projeto"))
    }

    const toggleProjectForm = () => {
        setShowProjectForm(!showProjectForm)
    }
    const toggleServiceForm = () => {
        setShowServiceForm(!showServiceForm)
        setShowMenssage(false)
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

    if (!project.nameproject) {
        return <Loader />
    }

    //fazer a div ser um componente
    return (
        <main className="edit_project">
            <Link className="back_link" to="/Projetos"><FaAngleLeft /> Voltar</Link>
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
                {showMenssage && <Menssage visible='visible' />}
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
            {isOpenModal && <Modal buttonModal={buttonModal} />}

        </main>
    )
}

// 