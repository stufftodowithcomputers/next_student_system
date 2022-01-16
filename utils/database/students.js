import { connectToDatabase } from "./mongodb";

export async function getAllStudents() {
    const { db } = await connectToDatabase();
    const students = await db
    .collection("students")
    .find({})
    .toArray();

    return JSON.parse(JSON.stringify(students));
}

export async function getAllStudentsIds() {
    const students = await getAllStudents();

    return students.map((student) => {
        return {
            params: {
                id: student._id,
            }
        }
    })
}

export async function getStudentData(id) {
    const students = await getAllStudents();
    return students.filter((student) => id === student._id);
}

export async function authenticate(email, password) {
    // Admin access
    if(email === "admin" && password === "admin") {
        return {
            id: 1,
            name: 'admin',
            email: 'admin@admin.com'
        }
    }

    // // Student
    try {
        var { db } = await connectToDatabase();

        var student = await db
        .collection('students')
        .find({ "email": email, })
        .toArray();
        student = student[0];
        
        if(password == student.password) return {
            id: student._id,
            name: student.name,
            email: student.email,
        }
    } catch {
        return null;
    }
}