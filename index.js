require('dotenv').config();

const express = require('express');
const path = require('path');

const newsRoutes = require('./routes/newsRoutes');

const app = express();

app.use(express.json());

// frontend
app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.use('/news', newsRoutes);

// home
app.get('/', async (req, res) => {
  try {
    const topic = req.query.topic || 'artificial intelligence';

    const response = await axios.get('https://newsapi.org/v2/everything', {
      params: {
        q: topic,
        language: 'en',
        pageSize: 10,
        apiKey: process.env.NEWS_API_KEY
      }
    });

    const articles = response.data.articles.map(a => ({
      title: a.title,
      source: a.source.name,
      url: a.url
    }));

    res.json({ articles });

  } catch (error) {
    res.status(500).json({ error: "Error fetching news" });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});