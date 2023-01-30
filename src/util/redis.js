const redis = require('redis')

const client = redis.createClient();
client.on('connect', err => console.log('redis connection'));

client.connect();
module.exports = client