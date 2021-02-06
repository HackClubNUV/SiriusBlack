'use-strict'
const { google } = require('googleapis');
require('dotenv').config();

API_KEY = process.env.GOOGLEAPIKEY;
//console.log(process.env.GOOGLEAPIKEY);

DISCOVERY_URL =
    'https://commentanalyzer.googleapis.com/$discovery/rest?version=v1alpha1';

    module.exports  = async (comment) => {
      const client = await google.discoverAPI(DISCOVERY_URL);
      const analyzeRequest = {
        comment: {
          text: comment,
        },
        requestedAttributes: {
          // PROFANITY: {},
          TOXICITY: {},
          // FLIRTATION: {},
          // SPAM: {}
        },
      };
      const response = await client.comments.analyze( {
        key: API_KEY,
        resource: analyzeRequest,
      });
      let data = response.data.attributeScores;
      let a;
      return Object.values(data).map(level => level.summaryScore.value);
}

