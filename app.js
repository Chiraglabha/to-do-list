const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const todolist = require('./model/todolist');
const { insertItem, getData, getDelete, getUpdate, ascendingOrder, descendingOrder, searchItems } = require('./util/controller');
const schedule = require('node-schedule');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('views', __dirname + '/views');
app.set('view engine', 'twig');

// schedule.scheduleJob('10 * * * *', function(){
//     getOneYearData();
// });

app.post('/list', async function(req, res){

    try{
        const name1 = req.body.name;
        const todolist = await insertItem(name1);
        res.redirect('/');
    } 
    catch(err) {
        console.log(err);
        res.status(500).json({
        error: err,
        });
    }

});


app.get('/', async function(req, res){
    try{
        const allName = await getData();
        res.render('index', {
            datas : allName
        })
    } catch(err) {
        res.status(500).json({
        error: err,
        });
    }
});

app.get('/delete/:id', async function(req, res){
    try{
        console.log( req.params.id );
        const deleteData = await getDelete( req.params.id );
        res.redirect('/')
    } catch(err){
        console.log(err);
        res.status(500).json({
            error : err
        })
    }
})

app.patch('/update/:id', async function(req, res){
    try{
        const name = req.body.name;
        const updateData = await getUpdate( req.params.id, name );
        res.status(200).json({
        })
    } catch(err){
        console.log(err);
        res.status(500).json({
            error : err
        })
    }
})

app.get('/up', async function(req, res){
    try{
        const asc = await ascendingOrder();
        res.render('index', {
            datas : asc,
        });
    } catch(err){
        res.status(500).json({
            error : err
        })
    }
});

app.get('/down', async function(req, res){
    try{
        const desc = await descendingOrder();
        res.render('index', {
            datas : desc,
        });
    } catch(err){
        res.status(500).json({
            error : err
        })
    }
});

app.post('/searchItem', async function(req, res){
    try{
        const name = req.body.search;
        const search = await searchItems(name);
        console.log(search);
        res.render('index', {
            datas : search
        });
    }catch(err){
        res.status(500).json({
            error : err
        })
    }
})


app.listen(3000, function() {
    console.log("Server Started");
});