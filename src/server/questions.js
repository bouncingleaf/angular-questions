import uuid from 'uuid';
// import md5 from 'md5';
import { connectDB } from './connect-db';

export const questionRoutes = app => {

  // Loads the full list of questions
  app.get('/question-list', async (req, res) => {
    // let {username, password} = req.body;
    let db = await connectDB();
    let questions = await db.collection('users').find({}).toArray();
    // let user = await collection.findOne({name: username});
    // if (!user) {
    //   return res.status(500).send("User not found");
    // }
    // let hash = md5(password);
    // let passwordCorrect = hash === user.passwordHash;

    // if(!passwordCorrect) {
    //   return res.status(500).send("Password incorrect");
    // }

    let token = uuid();
    // authenticationTokens.push({
    //   token,
    //   userID: user.id
    // });

    res.send({token, questions});
  });
}
