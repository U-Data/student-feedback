require('newrelic');
const express = require('express');
const redis = require('redis');
const bodyParser = require('body-parser');
const path = require('path');

const { getReviewData, addReview, removeReview, updateReview } = require('./serverModel.js');

const app = express();
const PORT = 3001;

const client = redis.createClient(6379,'ec2-18-224-22-205.us-east-2.compute.amazonaws.com');
 
client.on('error', (err) => {
  console.log(`Error: ${err}`);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/courses/:courseId', express.static(path.join(__dirname, '/../public/')));

app.get('/:courseId/reviews', (req, res) => {
  const { courseId } = req.params;
  getReviewData(courseId, client, res);
});

app.post('/:courseId/reviews', (req, res) => {
  const { courseId } = req.params;
  addReview(courseId, req.body, res);
});

app.delete('/:courseId/reviews', (req, res) => {
  const { reviewId } = req.body;
  removeReview(reviewId, res);
});

app.put('/:courseId/reviews', (req, res) => {
  const { reviewId, review } = req.body;
  updateReview(reviewId, review, res);
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
