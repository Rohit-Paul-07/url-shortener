import express from 'express'
import { shorturl,originalUrl} from './controllers/url.js'
import mongoose from 'mongoose'
import { config } from 'dotenv'

const app = express()

// .env path
config({path:'.env'})

mongoose.connect(process.env.MONGO_URL,{
    dbname:"NodeJs_Mastery_Course"
}).then(()=>console.log("MongoDb connected")).catch((err)=>console.log(err))


app.use(express.urlencoded({extended:true}))


// rendering the ejs file
app.get('/', (req, res) => {
    res.render('index.ejs', { shortUrl: null })
})

// shorting url logic
app.post('/url_shorten', shorturl)

// redirect to original url
app.get("/:shortcode",originalUrl)

export const port = process.env.PORT
                 
app.listen(port, () => console.log(`server is running on port ${port}`))