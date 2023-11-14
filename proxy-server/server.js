const express = require('express');
const Parser = require('rss-parser');
const cors = require('cors');

const app = express();
const parser = new Parser();
const port = 4000; // You can choose any port

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Enable CORS for all routes

let fetch;

import('node-fetch').then(({ default: fetchModule }) => {
  fetch = fetchModule;
  // Rest of your server code that uses fetch
});

app.post('/feed', async (req, res) => {
  try {

    const { url } = req.body; // Assuming the URL is in the request body

    if (!url) {
      return res.status(400).send('URL is missing in the request body');
    }
    // Fetch the RSS feed
    const response = await fetch(url);
    const xml = await response.text();

    // Parse the XML to JSON
    const feed = await parser.parseString(xml);

    // Return the feed items as JSON
    res.json(feed);
  } catch (error) {
    console.error('Error fetching the feed:', error);
    res.status(500).send('Error fetching the feed');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
