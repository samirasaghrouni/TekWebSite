require('./db');
const express = require('express');
const Etudiant_router = require('./routers/Etudiants');
const matiere_router = require('./routers/matières');
const groupe_router = require('./routers/groupes.js');
const semestre_router = require('./routers/semestres.js');
const port = process.env.port || 3000;
const app = express();
app.use('/api/etudiants',Etudiant_router)
app.use('/api/matieres',matiere_router)
app.use('/api/groupes',groupe_router)
app.use('/api/semestre',semestre_router)
app.listen(()=>console.log('server on'+port+'........'));


