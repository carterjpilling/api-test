SELECT ct.class_name, st.last_name
FROM enrollment_table et
JOIN class_table ct ON ct.id = et.class_id
JOIN student_table st ON st.id = et.student_id
WHERE ct.class_name = $1;