const {google} = require('googleapis');
require('dotenv').config();

API_KEY = process.env.GOOGLEAPIKEY;
//console.log(process.env.GOOGLEAPIKEY);
DISCOVERY_URL =
    'https://commentanalyzer.googleapis.com/$discovery/rest?version=v1alpha1';



const xyz = () => {
  google.discoverAPI(DISCOVERY_URL)
    .then(client => {
      const analyzeRequest = {
        comment: {
          text: 'Fuck you',
        },
        requestedAttributes: {
          PROFANITY: {},
          TOXICITY: {},
          FLIRTATION: {},
          SPAM: {}
        },
      };

      client.comments.analyze(
          {
            key: API_KEY,
            resource: analyzeRequest,
          },
          (err, response) => {
            if (err) throw err;
            let data = response.data.attributeScores;
            let { PROFANITY, TOXICITY, FLIRTATION, SPAM} = data;
            const p = PROFANITY.summaryScore.value;
            const t = TOXICITY.summaryScore.value;
            const f = FLIRTATION.summaryScore.value;
            const s = SPAM.summaryScore.value;
            console.log(p, f, t, s);
            return [p, f, t, s]
          });
    })
    .catch(err => {
      throw err;
    });
  }

  async function fun(){
      let dataarray = [];
      dataarray = await xyz();
      console.log(dataarray, "1");
  }
  fun();
module.exports = google;