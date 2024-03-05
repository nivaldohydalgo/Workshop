import express from 'express'
import path from 'path'
import mongoose from 'mongoose'
import cors from 'cors'
import routes from './routes'

class App {
    constructor() {
        this.server = express()

        mongoose.connect('mongodb://mongoadmin:12345678@localhost:27017/admin', {
        })


        this.middlewares()
        this.routes()
    }

    middlewares() {
        this.server.use(cors())
        this.server.use(
            '/files',
            express.static(path.resolve(__dirname, '..', 'uploads'))
        )
        this.server.use(express.json())
    }

    routes() {
        this.server.use(routes)
    }

}

export default new App().server
