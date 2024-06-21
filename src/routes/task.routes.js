import { Router } from "express";
import { task } from "../models/task.model.js";

const routes = Router();

routes.get("/", async (req, res) => {
  try {
    const tasks = await task.find();
    res.send(tasks);
  } catch (error) {
    res.status(500).send(error);
  }
});

routes.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const taskById = await task.findById(id);
    res.send(taskById);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

routes.post("/", async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) return res.status(400).send("Missing data");
    const newTask = new task({ title, description });
    await newTask.save();
    res.send(newTask);
  } catch (error) {
    res.status(500).send(error);
  }
});

routes.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTask = await task.findByIdAndUpdate(id, req.body, {
      new: true, // return the updated document)
    });
    if (!updatedTask) return res.status(404).send("Task not found");
    res.send(updatedTask);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

routes.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await task.findByIdAndDelete(id);
    if (!deletedTask) return res.status(404).send("Task not found");
    res.json({ delete_ok: deletedTask });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

routes.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;
    const task = await task.findByIdAndUpdate(id, { completed }, { new: true });
    if (!task) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "error updating task" });
  }
});

export default routes;
