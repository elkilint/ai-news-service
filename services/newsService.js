const axios = require('axios');

exports.fetchNews = async (topic) => {
  const response = await axios.get('https://newsapi.org/v2/everything', {
    params: {
      q: topic,
      language: 'en',
      pageSize: 10,
      apiKey: process.env.NEWS_API_KEY
    }
  });

  return {
    articles: response.data.articles.map(a => ({
      title: a.title,
      source: a.source.name,
      url: a.url
    }))
  };
};