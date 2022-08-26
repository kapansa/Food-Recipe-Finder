const express = require("express");
const https = require("https");

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {

    res.render("index", { recipes: [] });
    
});

app.post("/search", (req, res) => {

    const query = req.body.recipe;
    const app_key = "a9d48da080dbdffcf8d96935f188685b";
    const app_id = "05540eeb";

    const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${app_id}&app_key=${app_key}`;
    
    https.get(url, (result) => {

        let chunks = [];
        result.on('data', (data) => {
            chunks.push(data);
        }).on('end', () => {
            const data = Buffer.concat(chunks);
            const recipes = JSON.parse(data);
            console.log(recipes.hits);
            res.render("index", { recipes: recipes.hits });
        });

    });

});

app.listen(3000, () => {
    console.log(`Server is listening at port 3000...`);
});