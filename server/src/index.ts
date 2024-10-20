import express from "express";
import connect from "./db/connect";
import Meal from "./models/Meal";
import Page from "./models/Page";
import cors from "cors";
import Drink from "./models/Drink";
import Image from "./models/Image";
import WantedPosition from "./models/WantedPosition";
import Adress from "./models/Adress";
import Contact from "./models/Contact";
import Schedule from "./models/Schedule";
import meals from "./defaultValues/meals";
import pages from "./defaultValues/pages";
import adresses from "./defaultValues/adresses";
import contacts from "./defaultValues/contacts";
import drinks from "./defaultValues/drinks";
import images from "./defaultValues/images";
import schedules from "./defaultValues/schedules";
import wantedPositions from "./defaultValues/wantedPositions";
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(cors());

app.get("/api/all-meals", async (req, res) => {
  try {
    const meals = await Meal.find();
    res.status(200).json({ success: true, hits: meals.length, data: meals });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post("/api/add-meal", async (req, res) => {
  try {
    const meal = await Meal.create(req.body);
    res.status(201).json({ success: true, data: meal });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

app.delete("/api/delete-meal/:id", async (req, res) => {
  try {
    const meal = await Meal.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, data: meal });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
});

app.put("/api/update-meal/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const meal = await Meal.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ success: true, data: meal });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
});

app.get("/api/all-pages", async (req, res) => {
  try {
    const pages = await Page.find();
    res.status(200).json({ success: true, hits: pages.length, data: pages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get("/api/page/:page", async (req, res) => {
  const page = req.params.page;

  try {
    const pageData = await Page.findOne({ name: page });
    res.status(200).json({ success: true, data: pageData });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
});

app.put("/api/update-page/:page", async (req, res) => {
  const page = req.params.page;
  const newPage = req.body;

  try {
    const pageToEdit = await Page.findOneAndUpdate({ name: page }, newPage, {
      new: true,
    });
    res.status(200).json({ success: true, data: pageToEdit });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
});

app.get("/api/all-drinks", async (req, res) => {
  try {
    const drinks = await Drink.find();
    res.status(200).json({ success: true, hits: drinks.length, data: drinks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post("/api/add-drink", async (req, res) => {
  try {
    const drink = await Drink.create(req.body);
    res.status(201).json({ success: true, data: drink });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

app.put("/api/update-drink/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const drink = await Drink.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ success: true, data: drink });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
});

app.delete("/api/delete-drink/:id", async (req, res) => {
  try {
    const drink = await Drink.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, data: drink });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
});

app.get("/api/gallery", async (req, res) => {
  try {
    const images = await Image.find();
    res.status(200).json({ success: true, hits: images.length, data: images });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post("/api/add-image", async (req, res) => {
  try {
    const image = await Image.create(req.body);
    res.status(201).json({ success: true, data: image });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

app.delete("/api/delete-image/:id", async (req, res) => {
  try {
    const image = await Image.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, data: image });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
});

app.put("/api/update-image/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const image = await Image.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ success: true, data: image });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
});

app.get("/api/wanted-positions", async (req, res) => {
  try {
    const positions = await WantedPosition.find();
    res
      .status(200)
      .json({ success: true, hits: positions.length, data: positions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get("/api/adresses", async (req, res) => {
  try {
    const adress = await Adress.find();
    res.status(200).json({ success: true, data: adress });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get("/api/contacts", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res
      .status(200)
      .json({ success: true, hits: contacts.length, data: contacts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get("/api/contacts/schedules", async (req, res) => {
  try {
    const schedules = await Schedule.find();
    res
      .status(200)
      .json({ success: true, hits: schedules.length, data: schedules });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.put("/api/reset", async (req, res) => {
  try {
    await Meal.deleteMany();
    await Page.deleteMany();
    await Drink.deleteMany();
    await Image.deleteMany();
    await WantedPosition.deleteMany();
    await Adress.deleteMany();
    await Contact.deleteMany();
    await Schedule.deleteMany();
    await Meal.insertMany(meals);
    await Page.insertMany(pages);
    await Drink.insertMany(drinks);
    await Image.insertMany(images);
    await WantedPosition.insertMany(wantedPositions);
    await Adress.insertMany(adresses);
    await Contact.insertMany(contacts);
    await Schedule.insertMany(schedules);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

const start = async () => {
  await connect();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

start();
