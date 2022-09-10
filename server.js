const express = require('express')
const path = require('path')
//Permet d'avoir un fichier et y metrre des varables d'environnement
require ('dotenv').config()


//Paramètrer le port après test1
const PORT = process.env.connectToPort || 7000

//Notre app sera une appli express
const app = express()

//on veut que notre app utilise du JSON
app.use(express.json())

//On lui indique qu'il utilise les fichiers static du front (Rep client) dans le dossier build créé par notre build
app.use(express.static('client/build'))

//On crée une "mini API virtuel" local où on définit la terminaison de "url" donc http://localhost:<PORT>/ ...
app.get('/api/test', (_, res) => {
    res.send({
        msg : `Notre API factice localhost est prête (Back et Front connecté!)`
    })
}) 

//Pour toutes les autres address, on veut envoyer les fichiers "réponse" sur le chemin indiqué 
//grace à path.join __dirname, c'est le chemin dir et la terminaison qu'on indique
app.get('/*', (_, res) => {
    res.sendFile(path.join(__dirname, './client/build/index.html'))
}) 

//écouter le port voulu et console.log le N°port et test1 avec 5000 et test2 avec PORT+env
app.listen(PORT, () => {
    console.log(`Le serveur est lancé au port : ${PORT}`)//${5000}
})
