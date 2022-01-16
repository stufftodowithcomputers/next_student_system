import { connectToDatabase } from "../../utils/database/mongodb";

export default async (req, res) => {
    if(req.method === 'POST') {
        const { db } = await connectToDatabase();

        db.collection('students').updateOne(
            {name: req.body.student},
            {
                $push: {
                    courses: {
                        name: req.body.name,
                        teacher: req.body.teacher,
                        room: req.body.room,
                    }
                }
            }
        );

        return res.status(200).json({message: 'worked'});
    }

    if(req.method === 'DELETE') {
        const { db } = await connectToDatabase();

        console.log('over here');

        db.collection('students').updateMany(
            { name: req.body.name },
            {
                $pull: {
                    courses: {
                        name: req.body.class_name
                    }
                }
            }
        );

        return res.status(200).json({message: 'worked'});
    }
}