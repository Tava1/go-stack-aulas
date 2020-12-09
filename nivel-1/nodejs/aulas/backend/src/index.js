const express = require('express');
const { uuid, isUuid } = require('uuidv4');

const app = express();
app.use(express.json())

// Armazem de dados em memória
const projects = [];

function logRequests(request, response, next) {
  const { method, url } = request;
  const logLabel = `[${method.toUpperCase()}] ${url}`;

  console.log('Passo: 1')
  console.time(logLabel);

  next(); // Próximo middleware

  console.log('Passo: 2')
  console.timeEnd(logLabel);
}

function validateProjectID(request, response, next) {
  const { id } = request.params;

  if (!isUuid(id)) {
    return response.status(400).json({ error: 'Invalid project ID.' });
  }

  return next();
}

app.use(logRequests);
app.use('/projects/:id', validateProjectID);

app.get('/projects', (request, response) => {
  console.log('Passo: 3')
  const { title } = request.query

  const results = title ? projects.filter(project => project.title.includes(title)) : projects;

  return response.json(results);
});

app.post('/projects', (request, response) => {
  const { title, owner } = request.body;

  const project = { id: uuid(), title, owner }

  projects.push(project);

  return response.json(project);
});

app.put('/projects/:id', (request, response) => {
  const { id } = request.params;
  const { title, owner } = request.body;

  // encontrando a posição de um projeto especifico no vetor.
  const projectIndex = projects.findIndex(project => project.id === id);

  if (projectIndex < 0) {
    return response.status(400).json({ error: 'Project not found.' });
  }

  const project = {
    id,
    title,
    owner
  };

  projects[projectIndex] = project;

  return response.json(project);
});

app.delete('/projects/:id', (request, response) => {
  const { id } = request.params;

  const projectIndex = projects.findIndex(project => project.id === id)

  if (projectIndex < 0) {
    return response.status(400).json({ error: 'Project not found.' });
  }

  projects.splice(projectIndex, 1)

  return response.status(204).send();
});

// Para acessar pelo navegador precisamos ouvir uma porta
// Podemos passar um segundo parâmetro que e disparado totalmente de forma automática sempre quando o servidor entra em execucao.
app.listen(3333, () => {
  console.log('🏁 Back-end started!')
}); 