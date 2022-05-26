var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))
const url = "mongodb+srv://admin:q7NYWoDAe163q3vb@cluster0.71ngi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))

app.post("/sign_up",(req,res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var yearOfGrad = req.body.phno;
    var interest = req.body.cars;

    var data = {
        "name": name,
        "email" : email,
        "year": yearOfGrad,
        "intrest" : interest
    }

    db.collection('newsdbs').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
        return res.redirect('f.html');

    });
})


app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('index.html');
}).listen(3001);


console.log("Listening on PORT 3001");