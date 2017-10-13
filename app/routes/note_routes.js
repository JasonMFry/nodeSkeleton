const ObjectID = require('mongodb').ObjectID;

module.exports = async function(app, db) {
  // find all
  app.get('/notes', (req, res) => {
    db.collection('notes').find((err, items) => {
      if (err) {
        res.send({ 'error': `An error occurred when trying to retrieve all notes\n${err}` });
      } else {
        items.toArray().then(arrayOfNotes => {
          res.send(arrayOfNotes);
        });
      }
    });
  });
  // find one
  app.get('/notes/:id', (req, res) => {
    const noteId = req.params.id;
    const details = { '_id': new ObjectID(noteId) };
    db.collection('notes').findOne(details, (err, item) => {
      if (err) {
        res.send({ 'error': `An error occurred when trying to retrieve ${noteId}\n${err}`});
      } else {
        res.send(item);
      }
    });
  });
  // create one
  app.post('/notes', (req, res) => {
    const note = { text: req.body.body, title: req.body.title }
    db.collection('notes').insertOne(note, (err, result) => {
      if (err) {
        res.send({ 'error': `An error has occurred when trying to add a note\n${err}` });
      } else {
        res.send(result.ops[0]);
      }
    });
  });
  // update one
  app.put('/notes/:id', (req, res) => {
    const noteId = req.params.id;
    const details = { '_id': new ObjectID(noteId) };
    const note = { text: req.body.body, title: req.body.title };
    db.collection('notes').findOneAndUpdate(details, note, (err, item) => {
      if (err) {
        res.send({ 'error': `An error occured when trying to update note ${noteId}\n${err}`});
      } else {
        res.send(note);
      }
    });
  });
  // delete one
  app.delete('/notes/:id', (req, res) => {
    const noteId = req.params.id;
    const details = { '_id': new ObjectID(noteId) };
    db.collection('notes').findOneAndDelete(details, (err, item) => {
      if (err) {
        res.send({ 'error': `An error occured when trying to delete ${noteId}`})
      } else {
        res.send(`Note ${noteId} deleted.`);
      }
    });
  });
};
