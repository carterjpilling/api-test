

CREATE TABLE student_table(
id SERIAL PRIMARY KEY,
first_name TEXT NOT NULL,
last_name TEXT NOT NULL,
home_state TEXT,
GPA NUMERIC
);

CREATE TABLE enrollment_table(
class_id INT REFERENCES class_table(id),
student_id INT REFERENCES student_table(id)
);

CREATE TABLE class_table(
id SERIAL PRIMARY KEY,
class_name TEXT,
teacher_id INT REFERENCES teachers(id)
);