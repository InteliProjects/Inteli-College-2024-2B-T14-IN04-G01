import React from "react";
import "../../assets/styles/Professor.css"; // Importação do CSS ajustado
import { FaHome, FaUserGraduate, FaChalkboardTeacher, FaClock, FaUserFriends, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";


const Sidebar = () => 
{
    return (

        <aside className="sidebar">
            <ul>
            <li>
                <FaHome className="icon" /> <Link to="/home">Home</Link>
            </li>
            <li>
                <FaUserGraduate className="icon" /> <Link to="/alunos">Alunos</Link>
            </li>
            <li>
                <FaChalkboardTeacher className="icon" /> <Link to="/professores">Professores</Link>
            </li>
            <li>
                <FaClock className="icon" /> <Link to="/presenca">Marcação de Presença</Link>
            </li>
            <li>
                <FaUserFriends className="icon" /> <Link to="/visitas">Visitantes</Link>
            </li>
            <li>
                <FaSignOutAlt className="icon" /> <Link to="/sair">Sair</Link>
            </li>
            </ul>
        </aside>
    );
};

export default Sidebar;