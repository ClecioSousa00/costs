import { useState, useEffect } from "react"

import { LinkButton } from "../../components/LinkButton"

import "./MyProject.css"
import { ProjectCard } from "../../components/ProjectCard"
import { Loader } from "../../components/Loader"
import { Modal } from "../../components/Modal"
import { axiosInstance } from "../../axios/axios.instance"

export const MyProjects = () => {

    const [projects, setProjects] = useState([])
    const [isOpenModal, setIsOpenModal] = useState(false)
    // const [valueButtonModal, setValueButtonModal] = useState(false)
    const [idProjectDelete, setIdProjectDelete] = useState()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        axiosInstance.get('')
            .then(response => setProjects(response.data))
            .catch(() => console.log('erro ao carregar meu projetos'))
            .finally(() => setIsLoading(false))

    }, [])

    const generateCardsProject = (projects) => {

        return (projects.map(project => <ProjectCard
            id={project.id}
            name={project.nameproject}
            budget={project.budgetValue}
            categorie={project.categorie}
            key={project.id}
            handleRemove={removeProjects}
        />
        ))
    }

    const buttonModal = (value) => {
        if (!value) {
            setIsOpenModal(false)
        }
        if (value) {

            axiosInstance.delete(`${idProjectDelete}`)
                .then(response => response.json())
                .then(() => setProjects(projects.filter(project => project.id !== idProjectDelete)))
                .catch(() => console.log("erro ao excluir"))
                .finally(() => setIsOpenModal(false))

            // fetch(`http://localhost:5000/projects/${idProjectDelete}`, {
            //     method: 'DELETE',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            // })
            //     .then(response => response.json())
            //     .then(() => setProjects(projects.filter(project => project.id !== idProjectDelete)))
            //     .catch(() => console.log("erro ao excluir"))
            //     .finally(() => setIsOpenModal(false))
        }
    }

    const removeProjects = (id) => {
        setIsOpenModal(true)
        setIdProjectDelete(id)
        console.log(id);
        // if (!valueButtonModal) return

        // fetch(`http://localhost:5000/projects/${id}`, {
        //     method: 'DELETE',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        // })
        //     .then(response => response.json())
        //     .then(() => setProjects(projects.filter(project => project.id !== id)))
        //     .catch(err => console.log("erro ao excluir"))
    }

    if (isLoading) {
        return <Loader />
    }

    return (
        <>
            <main>
                <div className="my_project">
                    <h1>Meus Projetos</h1>
                    <LinkButton to="/Novo-Projeto" text="Criar Projeto" />
                </div>
                {isOpenModal && <Modal buttonModal={buttonModal} />}
                <section className="container_projects">
                    {projects.length ? (generateCardsProject(projects)) : <h2 className="title_project-title">Nenhum projeto foi criado</h2>}
                </section>
            </main>
        </>
    )
}