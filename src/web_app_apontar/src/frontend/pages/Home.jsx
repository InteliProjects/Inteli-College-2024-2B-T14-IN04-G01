import React from "react";
import { Link } from "react-router-dom";
import "../../assets/styles/Home.css";
import {
  FaHome,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaClock,
  FaUserFriends,
  FaSignOutAlt,
} from "react-icons/fa";

export default function Home() {
  return (
    <div className="home-container">
      {/* Conteúdo Principal */}
      <main className="main-content">
        <div className="welcome-message">
          <h1>
            Seja Bem-Vinda, <br /> Ana Carolina 😊
          </h1>
          <div className="home-image-container">
            <img
              src="../../src/assets/images/Home.png"
              alt="Equipe Apontar"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
