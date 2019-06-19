const express= require('express')
const {MongoClient, ObjectID}= require('mongodb')
const bodyParser= require('body-parser')
const assert= require('assert')
const app= express()
app.use(bodyParser.json())

const mongo_url='mongodb://localhost:27017'
const dataBase='List-Contact'
MongoClient.connect(mongo_url, { useNewUrlParser: true }, (err, client)=>{
    assert.equal(err, null, 'data base connexion field')
    console.log('mongodb connected')
    const db=client.db(dataBase)

app.post('/add_contact', (req, res)=>{
    let new_contact = req.body
    db.collection('Contacts').insertOne(new_contact, (err, data)=>{
        if(err) res.send('cant add contact')
        else res.send("contact aded")
    })
})

app.get('/contact',(req,res)=>{
db.collection('Contacts').find().toArray((err,data)=>{
   if(err)res.send('cant find contact')
   else res.send(data)     
            })
})
app.get('/contact/:id', (req ,res)=>{
    let serchId = ObjectID(req.params.id)
    db.collection('Contacts').findOne({_id: serchId}, (err, data)=>{
        if(err)res.send("cant found contact")
        else res.send(data)
    })
})

app.put('/modify_contact/:id', (req, res)=>{
    let id= ObjectID(req.params.id)
    let modify_prod= req.body
    db.collection('Contacts').findOneAndUpdate({_id : id}, {$set: {...modify_prod}}, (err, data)=>{
        if(err) res.send('cant update contact')
        else res.send(data)
    })
})
app.delete('/delete_contact/:id', (req, res)=>{
    let id= ObjectID(req.params.id) 
    db.collection('Contacts').findOneAndDelete({_id: id}, (err , data)=>{
        if(err) res.send('cant delete contact')
        else res.send('contact was deleted')
    })
})



})
               

app.listen(3009, (err)=>{
    if(err)console.log('server error')
    else console.log('server is running in port 3009')
})