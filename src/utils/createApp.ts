import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import path from 'path'
import bodyParser from 'body-parser'

const app = express()

class createApp {
    mode: string
    dirname: any
    mongoString: string
    router: any

    constructor(options: any) {
        this.mode = options.mode
        this.dirname = options.dirname
        this.mongoString = options.mongoString
        this.router = options.router
    }

    getApp = () => {

        app.use(bodyParser.json())

        if (this.mode === "prod") {
            app.use(cors({
                origin: ['http://localhost:3000']
            }))
            console.log("App is running in production mode")
        } else {
            console.log("App is running in development mode")
        }

        mongoose.connect(this.mongoString, () => { console.log("Connected to MongoDB") })

        app.use('/static', express.static(path.join(this.dirname + '/static')))

        app.use('/api', this.router)

        return app
    }

}

export default createApp