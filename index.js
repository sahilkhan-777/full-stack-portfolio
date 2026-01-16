import express from "express";

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs");
})

app.get("/about", (req, res) => {
    res.render("about.ejs");
});

app.get("/projects", (req, res) => {
    res.render("projects.ejs");
});

app.get("/contact", (req, res) => {
    res.render("contact.ejs");
});

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
})