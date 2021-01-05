import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import '../../global.css';
import './style.css';

import logoImg from '../../assets/logo.svg'
import api from '../../services/api';

export default function Register(){
    const[title, seTitle] = useState('');
    const[description, setDescription] = useState('');
    const[value, setValue] = useState('');

    const ongId = localStorage.getItem('ongId');
    const history = useHistory();

    async function handleNewIncident(e)
    {
        e.preventDefault();

        const data = {
            title,
            description,
            value            
        }

        try {
            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId
                }
            });

            history.push('/profile');

        } catch (error) {
            alert("Error ao cadastrar caso, tente novamente")
        }
    }
    return (
        <div className="new-incident-container">
            <div className="content">
                <section className="form">
                    <img src={logoImg} alt="Be The Hero"/>

                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
                
                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041"/> 
                        Voltar para home
                    </Link>
                
                </section>
                <form onSubmit={handleNewIncident}>
                    <input 
                        placeholder="Título do caso" 
                        value={title}
                        onChange={e => seTitle(e.target.value)}
                    />
                    <textarea 
                        value={description}
                        placeholder="Descrição" 
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input 
                        placeholder="Valor em reais"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>    
        </div>
    );
}