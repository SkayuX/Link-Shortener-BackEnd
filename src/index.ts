import createApp from './utils/createApp'
import { config } from 'dotenv'
import path from 'path'
import router from './Routes'
config()

const app = new createApp({
    mode: "dev", 
    dirname: path.join(__dirname), 
    mongoString: 'mongodb://localhost:27017/link',
    router: router,
}).getApp()



app.listen(8080)