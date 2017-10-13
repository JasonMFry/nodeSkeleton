const ObjectID = require('mongodb').ObjectID;

module.exports = async function(app, db) {
  app.get('/notes', (req, res) => {
    db.collection('notes').find((err, items) => {
      if (err) {
        res.send({ 'error': 'An error occurred when trying to retrieve all notes' });
      } else {
        items.toArray().then(arrayOfNotes => {
          res.send(arrayOfNotes);
        });
      }
    });
  });
  app.get('/notes/:id', (req, res) => {
    const noteId = req.params.id;
    const details = { '_id': new ObjectID(noteId) };
    db.collection('notes').findOne(details, (err, item) => {
      if (err) {
        res.send({ 'error': `An error occurred when trying to retrieve ${noteId}`});
      } else {
        res.send(item);
      }
    });
  });

  app.post('/notes', (req, res) => {
    const note = { text: req.body.body, title: req.body.title }
    db.collection('notes').insert(note, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(result.ops[0]);
      }
    });
  });

  app.put('/notes/:id', (req, res) => {
    const noteId = req.params.id;
    const details = { '_id': new ObjectID(noteId) };
    const note = { text: req.body.body, title: req.body.title };
    db.collection('notes').update(details, note, (err, item) => {
      if (err) {
        res.send({ 'error': `An error occured when trying to update note ${noteId}`});
      } else {
        res.send(note);
      }
    });
  });

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
