const express = require('express');
const router = express.Router();

const {
  getNews,
  getSummary
} = require('../controllers/newsController');

router.get('/', getNews);
router.get('/summary', getSummary);

module.exports = router;