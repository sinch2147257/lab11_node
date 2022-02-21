const mysql=require('mysql2');
const express=require('express');
var app=express();
const parser=require('body-parser');
app.use(parser.json());
var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'$hreya24',
    database:'coffeehouse'
});
connection.connect((err)=>
{
    if(!err) 
    console.log('DB connected');
    else
    console.log('Error');
})
app.listen(5700,()=>console.log('server started...'));
app.get('/customerinformation',(req,res)=>
{
    connection.query('SELECT * FROM customer',(err,rows,fields)=>
    {
        if(!err)
        res.send(rows);
        else
        console.log("error");
    })
})
app.get('/customerinformation/:Customer_Name',(req,res)=>
{
    connection.query('SELECT * FROM customer WHERE Customer_Name=?',[req.params.Customer_Name],(err,rows,fields)=>
    {
        if(!err)
        res.send(rows);
        else
        console.log("error");
    })
})
app.get('/add',(req,res)=>
{
    var post={Id:111,email:'sinch@gmail.com',Customer_Name:'Sinch'};
    var sql='INSERT INTO customer SET ?';
    var query=connection.query(sql,post,(err,result)=>
    {
        if (err) throw err;
        res.send("Inserted Rows...");
    })
});

app.get('/update/:ID',(reqt,res)=>
{
    var name1='Aami'
    var sql=`update customer set Customer_Name='${name1}' where ID=${reqt.params.ID}`;
    var query=connection.query(sql,(err,result)=>
    {
        if(err) throw err;
        res.send("updated row.....")
    });
    
});

app.get('/delete/:ID',(reqt,res)=>
{

    var sql=`Delete from customers where ID=${reqt.params.ID}`;
    var query=connection.query(sql,(err,result)=>
    {
        if(err) throw err;
        res.send("deleted row.....")
    });
    
});