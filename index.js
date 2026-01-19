import express from "express";

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs");
})

app.get("/about", (req, res) => {
    res.render("about.ejs", { skills: skills});
});

app.get("/projects", (req, res) => {
    res.render("projects.ejs", { projects: featuredProjects });
});

app.get("/contact", (req, res) => {
    res.render("contact.ejs");
});

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
})


const featuredProjects = [
    {
        title: 'Random Cocktail Recipe',
        description: 'A cocktaik recipe web app that lets users search recipes by name, view featured cocktails, and get a a random drink recipe with a single click. Built with Node.js, Express and Ejs - it fetches data dynamically from the TheCocktailDBAPI',
        link: 'https://random-cocktail-recipe.onrender.com/',
        thumbnail: '/images/cocktail.png'
    },
    {
        title: 'Gym Website',
        description: 'A modern, responsive, and interactive gym website built with HTML, CSS, and JavaScript, designed to showcase a fitness center’s programs, trainers, pricing plans, and contact options.',
        link: 'https://sahilkhan-777.github.io/gofitness-gym',
        thumbnail: '/images/gym.png'
    },
    {
        title: 'Choice Based JavaScript Game',
        description: 'A choice-based JavaScript game built with HTML, CSS, and JavaScript. Players make decisions that affect the story outcome.',
        link: 'https://sahilkhan-777.github.io/choice-based-js-game',
        thumbnail: '/images/js-game.png'
    },
    {
        title: 'Todo App',
        description: 'A simple and intuitive todo app built with HTML, CSS, and JavaScript.',
        link: 'https://sahilkhan-777.github.io/todoApp',
        thumbnail: '/images/todoapp.png'
    },
    {
        title: 'Todo App',
        description: 'A simple and intuitive todo app built with HTML, CSS, and JavaScript.',
        link: 'https://sahilkhan-777.github.io/todoApp',
        thumbnail: '/images/todoapp.png'
    },
    {
        title: 'Todo App',
        description: 'A simple and intuitive todo app built with HTML, CSS, and JavaScript.',
        link: 'https://sahilkhan-777.github.io/todoApp',
        thumbnail: '/images/todoapp.png'
    }
]

const skills = [
    {
        name: 'ReactJs',
        icon: '/images/svg/react.svg'
    },
    {
        name: 'ExpressJs',
        icon: '/images/svg/express.svg'
    },
    {
        name: 'NodeJs',
        icon: '/images/svg/node.svg'
    },
    {
        name: 'Bootstrap',
        icon: '/images/svg/bootstrap.svg'
    },
    {
        name: 'JavaScript',
        icon: '/images/svg/javascript.svg'
    },
    {
        name: 'HTML5',
        icon: '/images/svg/html.svg'
    },
    {
        name: 'CSS3',
        icon: '/images/svg/css.svg'
    },
    {
        name: 'EJS',
        icon: '/images/svg/ejs.png'
    }
]