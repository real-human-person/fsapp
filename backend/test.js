const express = require('express')

const app = express()

const cors = require('cors')

const bodyParser = require('body-parser')

const fs = require('fs');

const https = require('https')
const http = require('http')


const options = {
  key: fs.readFileSync('./selfsigned.key'),
  cert: fs.readFileSync('./selfsigned.crt')
};


var MongoClient = require('mongodb').MongoClient
var url = "mongodb://localhost:27017/testApp"

app.use(cors())

app.use(bodyParser.json())



app.post('/tits', cors(), (req,res)=>{


    MongoClient.connect(url, (err,db)=>{
        if(err) throw err
        var testApp = db.db("testApp")
        testApp.collection('users').find({'name': req.body.params}).toArray((err,result)=>{
            if(err)console.log(err)
            res.send(result)
        })
        db.close()
    })
})

app.post('/comments', cors(), (req, res)=>{
    MongoClient.connect(url, (err, db)=>{
        if(err) throw err
        var testApp = db.db("testApp")
        testApp.collection('comments').insertOne({'userId': req.body.params.userId, 'title': req.body.params.title, 'comment': req.body.params.comment, 'date': new Date()}).then((err,result)=>{
            if(err)console.log(err)
            res.send(result)
        })
        db.close()
    })
})

app.get('/users', cors(),(req,res)=>{
        MongoClient.connect(url, (err,db)=>{
            if(err) throw err
            var testApp = db.db("testApp")
            testApp.collection('users').find().toArray((err,result)=>{
                if(err)console.log(err)
                res.send(result)
            })
            db.close()
        })
})

app.get('/comments', cors(), (req,res)=>{
    MongoClient.connect(url, (err,db)=>{
        if(err) throw err
        var testApp = db.db("testApp")
        testApp.collection('comments').find().toArray((err,result)=>{
            if(err)console.log(err)
            res.send(result)
        })
        db.close()
    })
})

app.get('/', (req, res)=>{
    res.send("TEST!")
});

app.get('/test', (req, res)=>{
    res.send("tssssttt")
})

app.get('/tits', (req,res)=>{
    res.send('ttt')
})

app.get('*', (req, res)=>{
    res.send("nope!")

})

const port = 3003



var server = http.createServer(options, app,(req, res) => {
    res.writeHead(200);
    res.end('hello world\n');
})

server.listen(port, ()=>{
    console.log(`listening on port ${port}`)
})
