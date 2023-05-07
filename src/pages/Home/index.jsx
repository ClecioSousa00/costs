import { Header } from "../../components/Header"
import "./Home.css"
import imageHome from "../../assets/images/savings.svg"
import { LinkButton } from "../../components/LinkButton"

export const Home = () =>{
  return (
    <>
      <Header/>
      <main className="main_home">
        <section className="section_home">
          <h1 className="title_home">Bem vindo ao <span>Costs</span></h1>
          <p className="text_home">Comece a gerenciar seus projetos agora mesmo!</p>
          <LinkButton to="/Novo-Projeto" text="Criar Projeto"/>
          <img className="image_home" src={imageHome} alt="desenho de um homen em cima de um cofre porquinho" />
        </section>
      </main>
    </>
  )
}

