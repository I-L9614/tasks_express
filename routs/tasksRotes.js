import express from 'express'
import * as taskControllers from '../controllers/tasksControllers.js'

const router = express.Router()

router.route('/')
    .get(taskControllers.getTasks)
    .post(taskControllers.addTask)


router.route('/:id')
    .get(taskControllers.getTaskById)
    .put(taskControllers.updateTask)
    .delete(taskControllers.deleteTask)


router.route('/filter')
    .get(taskControllers.getCompleted)
    // .get(taskControllers.getTaskByPriority)


router.route('/:id/toggle')
    .patch(taskControllers.changeTaskStatus)

export default router