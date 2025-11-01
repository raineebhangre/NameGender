import express from "express";
import axios from "axios";
import bodyParser from 'body-parser';
import { countries } from './countries.js';

const app=express();
const port=3000;

app.use(bodyParser.urlencoded({extended:true}));

const API_URL="https://api.genderize.io";

app.get("/",(req,res)=>{
    res.locals={data:42};
    res.render("index.ejs");
});

app.post("/submit", async(req,res)=>{
    const name=req.body.name;
    const country=req.body.country.trim();
    
    let countryObj=null;

    if(country){
         countryObj= countries.find(
            (c) => c.name.toLowerCase() === country.toLowerCase()
         );

        if (!countryObj) {
            return res.render("index.ejs", {
                error: `Data not available for "${country}"`,
                content: null,
            });
    }}

    try {
        let url = `${API_URL}?name=${name}`;
        if (countryObj) {
           url += `&country_id=${countryObj.code}`;
        }

        const response = await axios.get(url);
        const result = response.data;
        res.render("index.ejs",{
            content: result,
        });
            
    } catch (error) {
        res.send(error.message);
    }
});

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});