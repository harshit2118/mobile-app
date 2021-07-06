var express=require('express');
const {Client}=require('pg');
var app=express();
app.use(express.json());
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
    next();
});
//Establishing Connection
const con=new Client({
    user:"cvprwocukbfbju",
    password:"9a6810348dea9eba35fe4bcf837d26d0898bdf8c15a102b51bb364c75e5d965c",
    database:"d3nm7ksem2sapu",
    port:5432,
    host:"ec2-35-169-188-58.compute-1.amazonaws.com",
    ssl:{rejectUnauthorized:false}
});
con.connect(()=>{
    console.log("Postgres Database is Connected");
});
/********REST API IMPLEMENTATION*********/
var getMobiles=require('./db').getAllMobiles;
var updateMobile=require('./db').updateMobile;
var insertMobile=require('./db').insertMobile;
var deleteMobile=require('./db').deleteMobile;
//var list=require('./mobileData').mobileData;
//var updateMobile=require('./mobileData').updateMobile;
//var removeMobile=require('./mobileData').removeMobile;
//var insertMobile=require('./mobileData').insertData;
//GET API
app.get('/mobiles',async(req,res)=>{
    try{
        let list=await getMobiles(con);
        let ram=req.query.ram;
        let rom=req.query.rom;
        let brand=req.query.brand;
        let os=req.query.os;
        let price=req.query.price;
        let outArr=[...list];
        let page=req.query.page;
        if(!page){
            page=1;
        }
        if(ram){
            let ramArr=ram.split(",");
            outArr=outArr.filter(x=>ramArr.find(x2=>x2===x.ram));
        }
        if(rom){
            let romArr=rom.split(",");
            outArr=outArr.filter(x=>romArr.find(x2=>x2==x.rom));
        }
        if(brand){
            let brandArr=brand.split(",");
            outArr=outArr.filter(x=>brandArr.find(x2=>x2===x.brand));
        }
        if(os){
            outArr=outArr.filter(x=>x.os===os);
        }
        if(price){
            outArr=price=="<5000"?outArr.filter(x=>parseInt(x.price)<5000)
            :price=="5-10k"?outArr.filter(x=>(parseInt(x.price)>=5000&&parseInt(x.price)<10000))
            :price=="10-20k"?outArr.filter(x=>(parseInt(x.price)>=10000&&parseInt(x.price)<20000))
            :outArr.filter(x=>parseInt(x.price)>=20000);
        }
        let resultArr=pagination(outArr,page);
        //console.log(resultArr);
        res.json({
            page:page,
            items:resultArr,
            totalItems:resultArr.length,
            totalNum:outArr.length
        })
    }catch(e){
        console.log(e);
        res.status(500).send("Error");
    }

});
app.get('/mobile/:name',async(req,res)=>{
    try{
        let list=await getMobiles(con);
        let name=req.params.name;
        let mobileJSON=list.find(x=>x.name==name);
        if(mobileJSON){
            res.send(mobileJSON)
        }
        else{
            res.status(404).send("Mobile not found")
        }
    }catch(e){
        console.log(e);
        res.status(500).send("Error");
    }
});

//PUTAPI
app.put("/editMobile/:name",async(req,res)=>{
    try{
        console.log("On Edit API")
        let list=await getMobiles(con);
        let mobName=req.params.name;
        const updatedMobile=req.body;
        let {name,price,brand,ram,rom,os}=updatedMobile;
        let setParam=`price=${price},brand='${brand}',ram='${ram}',rom='${rom}',os='${os}'`;
        let whereParam=`name='${name}'`
        let index=list.findIndex(x=>x.name==mobName);
        if(index>=0){
            updateMobile(con,setParam,whereParam);
            res.send(updatedMobile);
        }
        else{
            res.status(404).send("Mobile not found!!!")
        }
    }catch(e){
        console.log(e);
        res.status(500).send("Error");
    }
});
//DELETE API
app.delete('/removeMobie/:name',async(req,res)=>{
    try{  
        let list=await getMobiles(con);  
        let name=req.params.name;
        let mobile=list.find(x=>x.name===name);
        if(mobile){
            deleteMobile(con,name);
            res.send( mobile.brand+" "+mobile.name+" is removed");
        }
        else{
            res.status(404).send("Mobile not found!!!");
        }
    }catch(e){
        console.log(e);
        res.status(500).send("Error");
    }
});
//POST API
app.post("/addMobile",async (req,res)=>{
    try{
        let list=await getMobiles(con);   
        const data=req.body;
        let {name,price,brand,ram,rom,os}=data;
        let mobile=`'${name}',${price},'${brand}','${ram}','${rom}','${os}'`;
        //console.log("iN POST");
        //console.log(mobile);
        let index=list.find(x=>x.name==mobile.name);
        if(!index){
            insertMobile(con,mobile);
            res.send(data);
        }
        else{
            res.status(400).send("Mobile already exist!!!")
        }
    }catch(e){
        console.log(e);
        res.status(500).send(error)
    }
});
//console.log(list);
const port=2450;
let pagination=(arr,page)=>{
    const totalLength=arr.length;
    const perPage=5;
    let resArr=arr;
    resArr=resArr.slice(page*perPage-perPage,page*perPage);
    return resArr;
}
app.listen(port,()=>console.log("Server is running in ",port));