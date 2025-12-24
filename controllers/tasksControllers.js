import fs from 'fs'
import { readTasks,writeTasks } from '../utils/readWrite.js'
const tasksPath = './tasks.json'

export async function getTasks(req, res) {
    const tasks = await readTasks()
    res.json(tasks)
}

export async function getCompleted(req,res) {
    let tasks = await readTasks()
    const completed = req.query.completed
    if (completed==='true') {
        tasks = tasks.filter(task => task.completed===completed)
        if (tasks.length === 0) {
            res.send("there is no completed tasks")
        }
        else{
            res.json(tasks)
        }
    }
    else if (completed === 'false') {
        tasks = tasks.filter(task => task.completed===false)
        if (tasks.length === 0) {
            res.send("all tasks are completed")
        }
        else {
            res.json(tasks)
        }
    }
    else {
        res.send('Task not found!')
    }
}

export async function getTaskById(req, res) {
  const tasks = await readTasks();
  const result = tasks.find((task) => task.id === parseInt(req.params.id));
  if (!result) res.status(404).send(`id - ${req.params.id} not found`);
  res.json(result);
}
