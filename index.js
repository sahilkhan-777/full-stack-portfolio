import dns from "dns";
dns.setDefaultResultOrder("ipv4first");
import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = 3000;

/* ------------------ MIDDLEWARE ------------------ */
app.set("view engine", "ejs");
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

/* ------------------ ROUTES ------------------ */
app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/about", (req, res) => {
  res.render("about.ejs", { skills });
});

app.get("/projects", (req, res) => {
  res.render("projects.ejs", { projects: featuredProjects });
});

app.get("/contact", (req, res) => {
  res.render("contact.ejs");
});

/* ------------------ NODEMAILER SETUP ------------------ */
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false, // bypass self-signed certificate
  },
});

transporter.verify((error) => {
  if (error) {
    console.error("❌ Mail transporter error:", error);
  } else {
    console.log("✅ Mail transporter ready");
  }
});

/* ------------------ CONTACT API ------------------ */
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields",
    });
  }

  const adminHTML = `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Message:</strong></p>
    <p>${message}</p>
  `;

  const userHTML = `
    <h2>Thank you for contacting me</h2>
    <p>Hi ${name},</p>
    <p>I’ve received your message and will reply shortly.</p>
    <p>— Sahil</p>
  `;

  try {
    await transporter.sendMail({
      from: `"Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: adminHTML,
    });

    await transporter.sendMail({
      from: `"Sahil Khan" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Thanks for reaching out",
      html: userHTML,
      headers: {
        "X-Auto-Response-Suppress": "All",
        Precedence: "bulk",
      },
    });

    res.status(200).json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (err) {
    console.error("❌ Send mail failed:", err);

    res.status(500).json({
      success: false,
      message: err.message || "Email sending failed",
    });
  }
});

/* ------------------ SERVER ------------------ */
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

/* ------------------ DATA ------------------ */
const featuredProjects = [
  {
    title: "Random Cocktail Recipe",
    description: "Random cocktail generator using TheCocktailDB API",
    link: "https://random-cocktail-recipe.onrender.com/",
    thumbnail: "/images/cocktail.png",
  },
  {
    title: "Gym Website",
    description:
      "A modern, responsive, and interactive gym website built with HTML, CSS, and JavaScript, designed to showcase a fitness center’s programs, trainers, pricing plans, and contact options.",
    link: "https://sahilkhan-777.github.io/gofitness-gym",
    thumbnail: "/images/gym.png",
  },
  {
    title: "Choice Based JavaScript Game",
    description:
      "A choice-based JavaScript game built with HTML, CSS, and JavaScript. Players make decisions that affect the story outcome.",
    link: "https://sahilkhan-777.github.io/choice-based-js-game",
    thumbnail: "/images/js-game.png",
  },
  {
    title: "Todo App",
    description:
      "A simple and intuitive todo app built with HTML, CSS, and JavaScript.",
    link: "https://sahilkhan-777.github.io/todoApp",
    thumbnail: "/images/todoapp.png",
  },
  {
    title: "JavaScript Calculator App",
    description:
      "A simple and elegant calculator built with HTML, CSS, and JavaScript, featuring basic arithmetic operations, keyboard support, and multi-step expression evaluation powered by Math.js.",
    link: "https://sahilkhan-777.github.io/odin-calculator",
    thumbnail: "/images/calculator.png",
  },
  {
    title: "Etch a Sketch",
    description:
      "A sketchboard app built with HTML, CSS, and JavaScript that allows users to draw by hovering over a grid of squares, with options to change colors, clear the board, and adjust grid size.",
    link: "https://sahilkhan-777.github.io/etch-a-sketch",
    thumbnail: "/images/sketch.png",
  },
];

const skills = [
  { name: "ReactJs", icon: "/images/svg/react.svg" },
  { name: "ExpressJs", icon: "/images/svg/express.svg" },
  { name: "NodeJs", icon: "/images/svg/node.svg" },
];
