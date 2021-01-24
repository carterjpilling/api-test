
async function checkStudent(id, db) {
  const student = await db.get_one_student([id])
  console.log(student)
  return [student]
}

async function checkClass(id) {
  const db = req.app.get('db')
  const classCheck = await db.check_class([classid])
  return classCheck
}

module.exports = {
  getAllEnrollments: async (req, res) => {
    const db = req.app.get('db')
    const enrollments = await db.get_all_enrollments([])

    res.status(200).send(enrollments)
  },
  getOneClassEnrollments: async (req, res) => {
    const db = req.app.get('db')
    const { enrollmentid } = req.params
    const class_list = await db.get_one_enrollment([enrollmentid])

    res.status(200).send(class_list)
  },
  enrollStudent: async (req, res) => {
    const db = req.app.get('db')
    const { studentid, classid } = req.params


    const [studentcheck] = await db.get_one_student([studentid])
    if (!studentcheck) {
      return res.status(404).send('Student not found.')
    }

    const [classCheck] = await db.check_class([classid])
    if (!classCheck) {
      return res.status(404).send('Class not found.')
    }

    await db.enroll_student([classid, studentid])


    res.sendStatus(200)
  },
  dropClassEnrollment: async (req, res) => {
    const db = req.app.get('db')
    const { studentid, classid } = req.params


    const [studentcheck] = await db.get_one_student([studentid])
    if (!studentcheck) {
      return res.status(404).send('Student not found.')
    }

    const [classCheck] = await db.check_class([classid])
    if (!classCheck) {
      return res.status(404).send('Class not found.')
    }

    await db.drop_class([classid, studentid])

    res.sendStatus(200)

  }
}