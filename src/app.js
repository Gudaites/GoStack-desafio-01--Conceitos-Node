const express = require("express");
const { uuid } = require("uuidv4");
const cors = require("cors");


const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repositorie = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };

  repositories.push(repositorie);
  return response.json(repositorie);
});

app.put("/repositories/:id", (request, response) => {
  const {id}  =  request.params;
  const {title, url,techs} = request.body;

  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);
  
  const repositorie = repositories.find(repositorie => repositorie.id === id);

  if(repositorieIndex < 0){
    return response.status(400).json({error: 'Repositorie not found.'})
  }

  const repositorieUpdate = {
    id,
    title,
    url,
    techs,
    likes: repositorie.likes,
  }

  repositories[repositorieIndex] = repositorieUpdate;

  return response.json(repositorieUpdate);
});

app.delete("/repositories/:id", (request, response) => {
  const {id}  =  request.params;

  const repositorieIndex = repositories.findIndex(project => project.id === id);

  if(repositorieIndex < 0){
    return response.status(400).json({error: 'Repositorie not found.'})
  }

  repositories.splice(repositorieIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const {id}  =  request.params;

  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);
  
  const repositorie = repositories.find(repositorie => repositorie.id === id);
  console.log(repositorie);
  if(repositorieIndex < 0){
    return response.status(400).json({error: 'Repositorie not found.'})
  }

  const repositorieUpdate = {
    id,
    title: repositorie.title,
    url: repositorie.url,
    techs: repositorie.techs,
    likes: repositorie.likes + 1,
  }
  repositories[repositorieIndex] = repositorieUpdate;
  return response.json(repositorieUpdate);
});

module.exports = app;
