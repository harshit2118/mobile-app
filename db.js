let insertMobile=(con,data)=>{
    let q1=`INSERT INTO mobiles VALUES(${data})`;
    con.query(q1,(err,result)=>{
        if(err)throw err;
        else{
            console.log("Database Updated");
        }
    });
}
let getAllMobiles=(con)=>{
    return new Promise((res,rej)=>{
        let q1=`SELECT * FROM mobiles ORDER BY name ASC`;
        con.query(q1,(err,result)=>{
        if(err){
            return rej(err);
        }
        let {rowCount,rows}=result;
        let mob=rows.map(x=>Object.assign({},x));
        return res(mob);
        });
    });
}
let updateMobile=(con,SET,WHERE)=>{
    console.log("On Update");
    console.log(SET);
    console.log(WHERE);
    let q1=`UPDATE mobiles SET ${SET} WHERE ${WHERE}`;
    con.query(q1,(err,result)=>{
        if(err){
            console.log(err);
        }
        console.log("Mobile Updated");
    });
}
let deleteMobile=(con,name)=>{
    let q1=`DELETE FROM mobiles WHERE name='${name}'`
    con.query(q1,(err,result)=>{
        if(err)throw err;
        console.log("Mobile deleted");
    });
}
exports.insertMobile=insertMobile;
exports.updateMobile=updateMobile;
exports.getAllMobiles=getAllMobiles;
exports.deleteMobile=deleteMobile;