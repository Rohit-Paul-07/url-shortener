import { Url } from "../models/Url.js"
import shortid from 'shortid'

import { config } from "dotenv"

config({path:'.env'})

export const shorturl = async (req, res) => {
    const longURL = req.body.longURL
    const shortcode = shortid.generate()
    const BASE_URL = process.env.BASE_URL

    const shortUrl = `${BASE_URL}/${shortcode}`

    // save to database
    const newURL = new Url({ shortcode, longURL })
    await newURL.save();
    console.log("Successfully saved ", newURL)

    res.render('index.ejs', { shortUrl })
}

export const originalUrl = async (req, res) => {
    
    const shortcode = req.params.shortcode

    const originalurl = await Url.findOne({shortcode})

    if(originalurl){
        res.redirect(originalurl.longURL)
    }
    else{
        res.json({message:"Invalid Url"})
    }

    
}