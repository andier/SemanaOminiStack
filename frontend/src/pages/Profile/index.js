import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { FiPower, FiTrash2 } from 'react-icons/fi';

import axios from 'axios';
import api from '../../services/api'
import '../../global.css';
import './style.css';

import logoImg from '../../assets/logo.svg';

export default function Logon(){
    const [incidents, setIncidents] = useState([]);
    
    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');
    const history = useHistory();
    
    useEffect(() => {
        api.get('profile',{
            headers:{
                Authorization: ongId
            }
        }).then (response => {
            setIncidents(response.data);
        })
    }, [ongId]);

    async function handleDeleteIncident(id) {

        console.log ({id, ongId});
        try {

            const request = axios.create({
                headers: {
                    Authorization: ongId
                }
            });
            // Workaround para o metodo delete
            await request.delete(`http://localhost:3335/incidents/${id}`);

            setIncidents(incidents.filter(incidents => incidents.id !== id));

        } catch (error) {
            alert(`Erro ao deletar caso, tente novamente`);
        }
    }

    async function handleLogout() {
        localStorage.clear();
        history.push('/');
    }

    return (
         <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                <spam>Bem Vinda, {ongName}</spam>

                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>

                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041"/>
                </button>
                
            </header>

            <h1>Casos cadastrados</h1>

            <ul >

                {incidents.map(incidents => (
                    <li key={incidents.id}>
                    <strong>CASO:</strong>
                    <p>{incidents.title} - ID: {incidents.id}</p>

                    <strong>DESCRIÇÃO:</strong>
                    <p>{incidents.description}</p>

                    <strong>VALOR:</strong>
                    <p> {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incidents.value)}</p>

                    <button onClick={() => handleDeleteIncident(incidents.id)} type="button">
                        <FiTrash2 site={20} color="#A8A8B3" />
                    </button>
                    </li>
                ))}
            
            </ul>
        </div>
    );
}