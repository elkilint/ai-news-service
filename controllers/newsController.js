const newsService = require('../services/newsService');

exports.getNews = async (req, res) => {
  try {
    const topic = req.query.topic || 'artificial intelligence';

    const data = await newsService.fetchNews(topic);

    res.json(data);

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

exports.getSummary = async (req, res) => {
  try {
    const data = await newsService.fetchNews('artificial intelligence');

    const summary = data.articles
      .slice(0, 3)
      .map(a => a.title)
      .join('. ');

    res.json({
      summary
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};