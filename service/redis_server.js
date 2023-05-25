class redis_server {
    constructor() {
        this.redis = require('redis');
        this.client = this.redis.createClient();
        this.client.on('connect', function() {
            console.log('Redis client connected');
        });
        this.client.on('error', function (err) {
            console.log('Something went wrong ' + err);
        });
    }

    set(key, value) {
        this.client.set(key, value, this.redis.print);
    }

    get(key) {
        this.client.get(key, function (error, result) {
            if (error) {
                console.log(error);
                throw error;
            }
            console.log('GET result ->' + result);
        });
    }
}

module.exports = redis_server;