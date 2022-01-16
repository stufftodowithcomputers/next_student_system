import { connectToDatabase } from "../../utils/database/mongodb";

export default async (req, res) => {
    if(req.method == 'POST') {
        const { db } = await connectToDatabase();


        if(req.body.action === 'Note') {
            db.collection('students').updateOne(
                { 'name': req.body.name },
                {
                    $push: {
                        notes: {
                            action: req.body.action,
                            title: req.body.title,
                            comment: req.body.comment,
                            signed: req.body.signed,
                            date: new Date(),
                        }
                    }
                }
            )
    
            return res.status(200).send('well done');
        }
        
        const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
        const month = new Date().getMonth();

        if(req.body.action == 'Positive') {
            db.collection('students').updateOne(
                { 
                    'name': req.body.name,
                    'behaviour.id': monthNames[month],
                },
                {
                    $inc: {
                        'behaviour.$.positive': req.body.amount,
                    }
                }
            )
            
            return res.status(200).send('well done');
        }

        if(req.body.action == 'Negative') {
            db.collection('students').updateOne(
                { 
                    'name': req.body.name,
                    'behaviour.id': monthNames[month],
                },
                {
                    $inc: {
                        'behaviour.$.negative': req.body.amount,
                    }
                }
            )

            return res.status(200).send('well done');
        }
    }
}