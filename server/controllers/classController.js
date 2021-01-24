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
  changeClassRoom: async (req, res) => {
    const db = req.app.get('db')
    const { classid } = req.params
    const { new_room } = req.body

    const [classCheck] = await db.check_class([classid])
    if (!classCheck) {
      return res.status(404).send('Class not found.')
    }

    await db.change_room([classid, new_room])

    res.sendStatus(200)
  },
  deleteClass: async (req, res) => {
    const db = req.app.get('db')
    const { classid } = req.params

    const [classCheck] = await db.check_class([classid])
    if (!classCheck) {
      return res.status(404).send('Class not found.')
    }

    await db.delete_class([classid])

    res.sendStatus(200)
  }
}