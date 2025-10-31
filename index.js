import express from "express";
import axios from "axios";
import bodyParser from 'body-parser';

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
    const country=req.body.country;
    
    try {
        const response=await axios.get(API_URL + `?name=${name}&country_id=${country}`);
        const result=response.data;
        res.render("index.ejs",{
            content: `Name: ${result.name}, Gender: ${result.gender}, Probability: ${result.probability}`,
        });
            
    } catch (error) {
        res.send(error.message);
    }
});

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});