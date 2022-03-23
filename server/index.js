const path = require('path');
const express = require('express');

const {
  createNewPark,
  findParkByName,
  createNewIssue,
  getAllIssues,
  deleteIssue,
} = require('./db/queries');

const app = express();
const PORT = process.env.port || 3000;

app.use(express.static(path.join(__dirname, '../client/dist/')));
app.use(express.json());

app.get('/parks/issues', getAllIssues);

app.post('/parks/issues/delete', async (req, res) => {
  const del = await deleteIssue(req.body);
  res.status(201).send(del);
});

app.post('/parks/search', async (req, res) => {
  const park = await findParkByName(req.body);
  res.status(200).send(park);
});

app.post('/parks/issues', async (req, res) => {
  try {
    await createNewIssue(req.body);
  } finally {
    res.status(201).send(true);
  }
});

app.post('/parks', async (req, res) => {
  const check = await findParkByName({ data: req.body.data.parkName });
  if (check === null) {
    await createNewPark(req.body);
    res.status(201).send(true);
  } else {
    res.send(false);
  }
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
