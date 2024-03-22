const express = require('express')
const app = express()
const { MongoClient } = require('mongodb')

let db
const url = 'mongodb+srv://whddnjs942:sa963852!!@imjw.aaaroyx.mongodb.net/?retryWrites=true&w=majority&appName=Imjw'
new MongoClient(url).connect().then((client)=>{
    console.log('DB연결성공')
    db = client.db('Imjw')
    app.listen(8080, () => {
        console.log('http://localhost:8080 에서 서버 실행중')
    })
}).catch((err)=>{
    console.log(err)
})

app.use(express.static(__dirname + '/public'))
app.set('view engine','ejs')

app.get('/', (요청, 응답) => {
  응답.sendFile(__dirname + '/test.html')
}) 

app.get('/intro', (요청, 응답) => {
    응답.sendFile(__dirname + '/intro.html')
    // db.collection('user').insertOne({title:'어쩌구'})
}) 

app.get('/shop', (요청, 응답) => {
    응답.send('쇼핑 페이지임미다')
}) 

app.get('/list', async (요청, 응답) => {
    let result = await db.collection('user').find().toArray()
    응답.render('list.ejs',{posts : result})
}) 
app.get('/time', async (요청, 응답) => {
    let time = new Date()
    응답.render('time.ejs',{time : time})
}) 