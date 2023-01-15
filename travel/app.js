const express = require('express');
const db = require('./database');
db.connect();

const app = express();
const path = require('path');
app.use('/static', express.static(path.join(__dirname, 'static')));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(upload.array());
const PORT = 8000;
app.listen(PORT, () =>
    console.log(`server started at ${PORT}`));

//Requests
const router = express.Router();

app.use('/', router);

app.get("/",(req,res)=>{
    return res.render("index");
})
app.get('/index2.html', (req, res) => {
    res.render('index2');
   });
app.get('/index.html', (req, res) => {
    res.render('index');
   });
app.get('/index3.html', (req, res) => {
    res.render('index3');
   });
router.post('/test', (req, res) => {
    console.log("body  : ",req.body);
    db.query("INSERT INTO details VALUES( " + db.escape(req.body.id) + ","+ db.escape(req.body.traveldate) +","+ db.escape(req.body.name)+","+ db.escape(req.body.contact)  +","+ db.escape(req.body.email) +","+ db.escape(req.body.from) +","+ db.escape(req.body.to)+","+ db.escape(req.body.inter1)+","+ db.escape(req.body.inter2)+","+ db.escape(req.body.inter3)+","+ db.escape(req.body.inter4)+");")
});

router.get('/test2',(req,res)=>{
    res.render('temp')
})

router.post('/test3', (req, res, next) => {


    db.query("SELECT * FROM details WHERE (start =" + db.escape(req.body.from)+ ")AND((end in ("+db.escape(req.body.inter1)+","+db.escape(req.body.to)+","+db.escape(req.body.inter2)+","+db.escape(req.body.inter3)+","+db.escape(req.body.inter4)+"))OR(inter1 in ("+db.escape(req.body.inter1)+","+db.escape(req.body.to)+","+db.escape(req.body.inter2)+","+db.escape(req.body.inter3)+","+db.escape(req.body.inter4)+"))OR(inter2 in ("+db.escape(req.body.inter1)+","+db.escape(req.body.to)+","+db.escape(req.body.inter2)+","+db.escape(req.body.inter3)+","+db.escape(req.body.inter4)+"))OR(inter3 in ("+db.escape(req.body.inter1)+","+db.escape(req.body.to)+","+db.escape(req.body.inter2)+","+db.escape(req.body.inter3)+","+db.escape(req.body.inter4)+"))OR(inter4 in ("+(db.escape(req.body.inter1))+","+db.escape(req.body.to)+","+db.escape(req.body.inter2)+","+db.escape(req.body.inter3)+","+db.escape(req.body.inter4)+"))) ;", (err,rows,fields) => 
   {
        if(err) throw err;
        else{
            console.log(rows)
            console.log("done");
            res.render('index3',{data:rows})
        }
    }
    )
}
)




