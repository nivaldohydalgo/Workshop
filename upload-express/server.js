const express  = require('express')
const bodyParser  = require('body-parser')
const multer  = require('multer')

const app = express()

app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
    //res.json({message: 'Bem-vindo!'})
    res.sendFile(__dirname+'/index.html')
})

app.listen(3000, '127.0.0.1', () => {
    console.log(`Server running on port 3000`)
})
