const db = require('../db/db')

class TodoController {
    async getTodo(req, res) {
        const todoList = await db.query("SELECT * from list where user_id = $1", [req.user.id])
        res.json({
            success: true,
            tasks: todoList.rows
        })
    }
    async createTodo(req, res) {
        if (!req.body.task) {
            return res.json({
                success: false,
                err: "no task"
            })
        }
        const newTodo = await db.query("INSERT INTO list (task, user_id, status) values ($1, $2, 0) RETURNING *", [req.body.task, req.user.id])
        res.json({
            success: true,
            created: newTodo.rows[0]
        })
    }
    async deleteTodo(req, res) {
        if (!req.query.id) {
            return res.json({
                success: false,
                err: "no id"
            })
        }

        const deleteStatus = await db.query("DELETE FROM list WHERE id = $1", [req.query.id])

        res.json({
            success: (deleteStatus.rowCount > 0)
        })
    }
    async updateTodo(req, res) {
        if (!req.body.id) {
            return res.json({
                success: false,
                err: "no id"
            })
        }
        const statusTask = await db.query("SELECT status  from list where id = $1", [req.body.id])
        if(statusTask.rowCount === 0) {
            return res.json({
                success: false,
                err: "no task with id " + req.body.id
            })
        }
        let newStatus = statusTask.rows[0].status === 0 ? 1:0;
        const updateStatus = await db.query("UPDATE list SET status = $1 WHERE id = $2", [newStatus, req.body.id])
        if(updateStatus.rowCount === 0) {
            return res.json({
                success: false
            })
        } else {
            return res.json({
                success: true,
                status: newStatus
            })
        }
    }
}

module.exports = new TodoController();
