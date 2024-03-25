const express = require('express')
const app = express()
const { MongoClient,ObjectId  } = require('mongodb')

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
app.use(express.json())
app.use(express.urlencoded({extended:true})) 

app.get('/', (요청, 응답) => {
  응답.render('main.ejs')
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
    응답.render('list.ejs',{result : result})
}) 
app.get('/edit/:id', async (요청, 응답) => {
    let result = await db.collection('user').findOne({_id: new ObjectId(요청.params.id)})
    console.log(result)
    응답.render('edit.ejs',{result : result})
}) 
app.post('/contentedit',async (요청,응답)=>{
    console.log(요청.body)
    try{
        db.collection('user').updateOne(
            {_id: new ObjectId(요청.body._id)},
            {$set : {title : 요청.body.title,content : 요청.body.content}}
            )
        응답.redirect('/list')
    }catch(e){
        응답.status(400).send('뭔가 잘못됨')
    }
})

app.get('/write', (요청, 응답) => {
    응답.render('write.ejs')
}) 
app.post('/add', async (요청,응답)=>{
    console.log(요청.body)
    
    try{
        if(요청.body.title == ''){
            응답.send('제목다시쓰세용')
        }else{
            await db.collection('user').insertOne({title:요청.body.title , content:요청.body.content})
            응답.redirect('/list')
        }
    }catch(e){
        console.log(e)
        응답.status(500).redirect('/write')
    }
})

app.get('/time', async (요청, 응답) => {
    let time = new Date()
    응답.render('time.ejs',{time : time})
}) 
app.get('/detail/:id', async(요청, 응답) => {
    try{
        let result = await db.collection('user').findOne({_id : new ObjectId(요청.params.id)}) 
        if(result == null){
            응답.status(400).send('url이 이상해요')
        }
        응답.render('detail.ejs',{result : result})
    }
    catch(e){
        console.log(e)
        응답.status(400).send('url이 이상해요')
    }
}) 