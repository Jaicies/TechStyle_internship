const { Client } = require('@elastic/elasticsearch');
const client = new Client({ node: 'http://localhost:9200' })

const eventConsumer = require('./consumer');
const EVENT_DEFAULT_TOPIC = ''; // populate with event topic

const populateESIndex = async (index, data) => {
  console.log(`populating ES index with ${JSON.stringify(data)}`);
  await client.index ({
      index,
      body: data
  });
};

const consumptionCallback = (message) => {
  const value = JSON.parse((message['message'].value).toString());
  const elasticSearchCart = value.payload;

  populateESIndex('test-index-5', elasticSearchCart);
};

eventConsumer.subscribeToEachMessage('exampleGroupId', EVENT_DEFAULT_TOPIC, consumptionCallback,true);





// To insert test data into index
// populateESIndex ('test-index', mockdata)