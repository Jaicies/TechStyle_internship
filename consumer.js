const EventConsumer = require('@techstyle/node-event-consumer');

const brokerList = require('./constants').kafka.brokerList;
const caFile = require('./constants').kafka.caFile;

const CONSUMER_CLIENT_ID = 'node-example-consumer';
const ENVIRONMENT = 'production';

const eventConsumer = new EventConsumer(brokerList, CONSUMER_CLIENT_ID, ENVIRONMENT, caFile);

/**
 * Subscribe to each message
 * @param {string} groupId - Unique identifier for the consumer group
 * @param {string} topic - The topic to subscribe to
 * @param {function} callback - The function to use for consuming the message
 * @param {boolean} fromBeginning - Start from the beginning? default = false
 */
const subscribeToEachMessage = async (groupId, topic, callback, fromBeginning = false) => {
  await eventConsumer.subscribeToEachMessage(groupId, topic, callback, fromBeginning)
    .catch((ex) => console.error(`Error in consumer`, ex));
};

module.exports = {
  subscribeToEachMessage,
};

