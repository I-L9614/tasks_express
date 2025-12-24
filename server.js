import express from 'express';
import route from './routs/tasksRotes.js'
const app = express();
const PORT = 3000;

app.use(express.json());

// app.get("/", (req, res) => {
//   res.json({ message: "Blog API is running", version: "1.0.0" });
//   console.log("pinging root");
// });

app.use('/tasks',route)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})