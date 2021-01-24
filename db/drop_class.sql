DELETE FROM enrollment_table
WHERE class_id = $1 AND student_id = $2;