UPDATE student_table
SET gpa = $1
WHERE id = $2
returning *;
