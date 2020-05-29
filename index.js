const app = require('express')()
const redis = require("redis");
const bodyParser = require('body-parser')
const client = redis.createClient();
const mediaServer = require('./media-server/MediaServer')
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const port = 5000

app.use(bodyParser.json())

const getKeys = (key) => {
    return new Promise((resolve, reject) => {
        client.hgetall(key, (err, obj) => {
            if(obj) resolve(obj)
        })
    })
}

io.on('connection', (socket) => {
    console.log('user connected');
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req, res, next) => {
    client.lrange('creators', 0, -1, (err, data) => {
        if (data) {
            let PromisesToMake = []
            data.map((key, index) => {
               PromisesToMake.push(getKeys(key))
            })
            var promises = Promise.all(PromisesToMake);
            promises.then(function(results) {
                res.send(results)
            });
        }
    })
})

app.post('/creator', (req, res, next) => {
    client.flushall()
    if (req.body) {
        const dataObject = req.body
        const hashKey = dataObject["user_id"].toString()
        let dataArray = []
        for (var key of Object.keys(dataObject)) {
            dataArray.push(key.toString())
            dataArray.push(dataObject[key].toString())
        }
        client.hmset(hashKey, dataArray)
        client.lpush("creators", hashKey)
    }
    res.status(200).send("Data Saved")
})

app.get('/get-gig/:id', (req, res, next) => {
    const id = req.params.id
    client.hgetall(id, (err, obj) => {
        if(obj) res.send(obj)
    })
})

http.listen(port, () => console.log("Backend Listening at ",port))