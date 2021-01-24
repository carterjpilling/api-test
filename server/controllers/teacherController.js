module.exports = {
  newTeacher: async (req, res) => {
    const db = req.app.get('db')
    const { last_name } = req.body

    await db.new_teacher([last_name])
    res.sendStatus(200)
  },
  getAllTeachers: async (req, res) => {
    const db = req.app.get('db')
    const teachers = await db.get_all_teachers([])
    res.status(200).send(teachers)
  },
  getOneTeacher: async (req, res) => {
    const db = req.app.get('db')
    const { teacherid } = req.params

    const [teacher] = await db.get_one_teacher([teacherid])

    if (!teacher) {
      res.status(404).send('Teacher not found.')
    }
    res.status(200).send(teacher)
  },
  deleteTeacher: async (req, res) => {
    const db = req.app.get('db')
    const { teacherid } = req.params

    await db.delete_teacher([teacherid])
    res.sendStatus(200)
  }
}