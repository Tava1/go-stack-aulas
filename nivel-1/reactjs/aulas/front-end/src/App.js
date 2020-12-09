import React, { useState, useEffect } from 'react';
import api from './services/api'

import './App.css'
// import backgroundImage from './assets/background.jpg'

import Header from './components/Header';

function App() {

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('/projects').then(response => {
      setProjects(response.data);
    })
  }, [])

  async function handleAddProject() {
    // sem aplicar conceito de imutabilidade
    // projects.push(`Novo projeto ${Date.now()}`);

    // aplicando conceito de imutabilidade
    // setProjects([...projects, `Novo projeto ${Date.now()}`]);

    const response = await api.post('/projects', {
      title: `Frontzao ${Date.now()}`,
      owner: 'Eu mesmo'
    });

    const project = response.data;
    setProjects([...projects, project]);

  }

  return (
    <>
      <Header title="Project" />

      {/* <img width={300} src={backgroundImage} alt="background" /> */}

      <ul>
        {projects.map(project => <li key={project.id}>{project.title}</li>)}
      </ul>

      <button type="button" onClick={handleAddProject}>Adicionar projeto</button>
    </>
  );
}

export default App;