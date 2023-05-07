import {FaGithub, FaLinkedinIn, FaInstagram} from "react-icons/fa"
import MyPhoto from "../../assets/images/eu2m200px.png"
import "./Cards.css"

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
                    <li><FaGithub  className="item"/></li>
                    <li><FaLinkedinIn className="item"/></li>
                    <li><FaInstagram className="item"/></li>
                </ul>
            </div>
        </div>
    )
}