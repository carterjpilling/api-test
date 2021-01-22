module.exports = {
  getClasses: async (req, res) => {
    const db = req.app.get('db')
    const classes = await db.get_classes([])

    res.status(200).send(classes)
  },
  addClass: async (req, res) => {
    const db = req.app.get('db')
    const { new_class } = req.body
    await db.add_class([new_class])

    res.sendStatus(200)
  },
  changeClassTeacher: async (req, res) => {
    //Still need to work on this one.
    const db = req.app.get('db')
    const { id } = req.params
    const { new_teacher } = req.body

    await db.change_teacher([id, new_teacher])

    res.sendStatus(200)
  },
  deleteClass: async (req, res) => {
    const db = req.app.get('db')
    const { id } = req.params

    await db.delete_class([id])

    res.sendStatus(200)
  }
}