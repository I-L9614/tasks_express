import express from 'express';
import fs from 'fs/promises';
import { readTasks,writeTasks } from './utils/readWrite.js';
const app = express();
const PORT = 3000;

app.use(express.json());






app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})