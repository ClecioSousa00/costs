import {FaGithub, FaLinkedinIn, FaInstagram} from "react-icons/fa"
import MyPhoto from "../../assets/images/eu2m200px.png"
import "./Cards.css"
import { Link } from "react-router-dom"

export const Cards = () => {
    return (
        <div className="container">
            <div className="container_card">
                <div className="card_image">
                    <img src={MyPhoto} alt="meu desenho em pixel" />
                </div>
                <div className="description">
                    <h2 className="text_name">Clécio Sousa</h2>
                    <p className="text_dev">Dev Front-End</p>
                </div>
                <ul className="social_icons">
                    <Link to={"https://github.com/ClecioSousa00"} target="_blank"><FaGithub  className="item"/></Link>
                    <Link to={"https://www.linkedin.com/in/clécio-sousa"} target="_blank"><FaLinkedinIn className="item"/></Link>
                    <Link to={"https://instagram.com/clecio_sousa_?igshid=NGExMml2YTkyZg=="} target="_blank"><FaInstagram className="item"/></Link>
                </ul>
            </div>
        </div>
    )
}
