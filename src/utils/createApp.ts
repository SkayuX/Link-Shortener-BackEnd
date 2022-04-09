import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import path from 'path'

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

        app.use(express.json())

        return app
    }

}

export default createApp