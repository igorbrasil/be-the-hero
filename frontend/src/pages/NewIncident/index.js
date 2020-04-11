import React, { useState } from "react";
import api from "../../services/api";
import { Link, useHistory } from "react-router-dom";
import logoImg from "../../assets/logo.svg";
import { FiArrowLeft } from "react-icons/fi";
import "./styles.css";
// import { Container } from './styles';

export default function NewIncident() {
  const history = useHistory();

  const [title, setTitle] = useState("");
  const [description, setDescripition] = useState("");
  const [value, setValue] = useState("");
  const ongId = localStorage.getItem("ongId");

  async function handleRegister(e) {
    e.preventDefault();
    const data = {
      title,
      description,
      value,
    };

    try {
      await api.post("incidents", data, {
        headers: {
          Authorization: ongId,
        },
      });

      alert(`Seu Incidente foi criado com sucesso`);
      history.push("/profile");
    } catch (err) {
      alert("Erro no cadastro, tente novament!");
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />
          <h1>Cadastro novo caso</h1>
          <p>
            Descre o caso detalhadamente para encontar um herói para resolver
            isso.
          </p>
          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#e02041" />
            Voltar para home
          </Link>
        </section>
        <form onSubmit={handleRegister}>
          <input
            placeholder="Titulo do caso"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescripition(e.target.value)}
          />
          <input
            placeholder="Valor em reais"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />

          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
