import { Header } from "../../components/Header"
import {Form} from "../../components/Form"

export const NewProject = () => {
    return (
        <>
            <Header />
            <main>
                <section className="section">
                    <h1 className="title">Criar Projetos</h1>
                    <p className="text">Crie seu projeto para adicionar serviços</p>
                    <Form/>
                </section>
            </main>
        </>
    )
}