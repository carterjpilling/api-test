module.exports = {
  newStudent: async (req, res) => {
    const db = req.app.get('db')
    const { first_name, last_name, home_state } = req.body

    const student = await db.new_student([first_name, last_name, home_state])

    res.status(200).send(student)
  },
  getAllStudents: async (req, res) => {
    const db = req.app.get('db')

  },
  getOneStudent: async (req, res) => {

  },
  editStudentDetails: async (req, res) => {

  },
  deleteStudent: async (req, res) => {

  }
}