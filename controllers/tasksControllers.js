import fs, { read } from 'fs'
import { readTasks, writeTasks } from '../utils/readWrite.js'
const tasksPath = './tasks.json'

export async function getTasks(req, res) {
    const tasks = await readTasks()
    res.json(tasks)
}

export async function getCompleted(req, res) {
    let tasks = await readTasks()
    const completed = req.query.completed
    if (completed === 'true'||completed==='false') {
        tasks = tasks.filter(task => task.completed === completed)
        if (tasks.length === 0) {
            res.send("nothing has found")
        }
        else {
            res.json(tasks)
        }
    }
    else{
        res.send('no such thing')
    }
}

export async function getTaskByPriority(req, res) {
    let tasks = await readTasks()
    const priority = req.query.priority
    tasks = tasks.filter(task => task.priority===priority)
    if (!priority) {
        res.send("Wrong priority")
    }
    res.json(tasks)
}

export async function getTaskById(req, res) {
    const tasks = await readTasks();
    const result = tasks.find((task) => task.id === parseInt(req.params.id));
    if (!result) res.status(404).send(`id - ${req.params.id} not found`);
    res.json(result);
}

export async function addTask(req,res) {
    const tasks = await readTasks();
    const maxId = users.length > 0 ? Math.max(...users.map(u => u.id)) : 0
    const newTask = {
        id:maxId + 1,
        ...req.body
    }
    tasks.push(newTask)
    await writeTasks(tasks)
    res.json(tasks)
}

export async function updateTask(req, res) {
    const tasks = await readTasks()
    const index = tasks.findIndex(task => task.id === parseInt(req.params.id))
    if (!index) return res.status(404).json({ message: "Task not found" })
    tasks[index] = {
        id:maxId + 1,
        ...req.body
    }
    await writeTasks(tasks)
    res.send(tasks)
}

export async function changeTaskStatus(req,res) {
    const tasks = await readTasks()
    const index = tasks.findIndex(task => task.id === parseInt(req.param.id))
    if (!index) {
        return res.status(404).json({ message: "Task not found" })
    }
    tasks[index].completed = !tasks[index].completed
    await writeTasks(tasks)
    res.json(tasks[index])
}

export async function deleteTask(req,res) {
    const tasks = await readTasks()
    const newList = tasks.filter(task => task.id !== parseInt(req.param.id))
    await writeTasks(tasks)
    res.json(tasks)
}