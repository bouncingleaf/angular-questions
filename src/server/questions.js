import uuid from 'uuid';
import { connectDB } from './connect-db';

// See https://www.npmjs.com/package/dompurify
const createDOMPurify = require("dompurify");
const { JSDOM } = require("jsdom");
const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

export const questionRoutes = app => {

  /**
   * Loads the full list of questions, or a subset
   * Send pageNumber in the body to load a subset
   * Default pageSize is 20 questions
   */
  app.get('/question-list', async (req, res) => {
    const pageNumber = parseInt(DOMPurify.sanitize(req.query.pageNumber), 10);
    let pageSize = parseInt(DOMPurify.sanitize(req.query.pageSize), 10);
    pageSize = !pageSize || isNaN(pageSize) ? 20 : pageSize;
    const skips = pageSize * (pageNumber - 1)

    let db = await connectDB();
    let questions = pageNumber ?
      await db.collection('questions').find({}).skip(skips).limit(pageSize).toArray() :
      await db.collection('questions').find({}).toArray();
    res.send(questions);
  });

  /**
   * Get a single question by ID
   */
  app.get('/question/:id', async (req, res) => {
    let id = DOMPurify.sanitize(req.params.id);
    let db = await connectDB();
    let question = await db.collection('questions').findOne({id});
    question ?
      res.send(question) :
      res.status(404).send('Not found');
  });

  /**
   * Update a single question
   * Will create the question if the id is not found
   */
  app.post('/question/:id', async (req, res) => {
    let id = DOMPurify.sanitize(req.params.id) || uuid();
    let { questionName, answer, distractors } = req.body.question;
    let db = await connectDB();
    try {
      await db.collection('questions').updateOne(
        {id},
        {$set:
          {
            "question": questionName,
            "answer": answer,
            "distractors": distractors
          }
        },
        {upsert: true}
      );
    }
    catch (e) {
      console.log('update error', e);
    }
  });

  /**
   * Delete a question by ID
   */
  app.delete('/question/:id', async (req, res) => {
    let id = DOMPurify.sanitize(req.params.id);
    let db = await connectDB();
    try {
      await db.collection('questions').deleteOne({id});
    }
    catch (e) {
      console.log('delete error', e);
    }
  })
}
