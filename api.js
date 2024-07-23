import express from 'express';
import axios from 'axios';
import cors from "cors"
const app = express();

app.use(cors())

app.get("/api/list_pet", async(req, res) => {
    const listPet = await axios.get("https://joygotchi.vercel.app/api/list_pet");
    //console.log("listpet",listPet.data)
    res.json(listPet.data);
});
//list_pet_battle
app.get("/api/list_pet_battle", async(req, res) => {
    const listPet = await axios.get("https://joygotchi.vercel.app/api/list_pet_battle");
    //console.log("listpet",listPet.data)
    res.json(listPet.data);
});
app.listen(8080, (error) => {
    if (error) return console.log(`Error: ${error}`);
    console.log("LISTEN PORT 8080")
});