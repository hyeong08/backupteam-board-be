const redis = require('redis')

const client = redis.createClient();

client.on('error', err => console.log('Redis Client Error', err));
client.on('connect', err => console.log('connection'));

(async () => {
    await client.connect();
    console.log("connect!!")
    // await client.set('key', 'value!');
    const value = await client.get('a');
	console.log(value) // value
})()