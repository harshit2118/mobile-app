let mobileData=[
    {name:"Galaxy S21 Ultra",brand:"Samsung",RAM:"8GB",ROM:"256GB",os:"Android",price:110000,image:"https://i.ibb.co/q0tJws6/samsung-galaxy-s21-ultra-5g-1.jpg"},
    {name:"MI 11X",brand:"Xiaomi",RAM:"6GB",ROM:"128GB",os:"Android",price:27000,image:"https://i.ibb.co/pbLgcT0/xiaomi-mi11x-1.jpg"},
    {name:"iPhone 12 pro",brand:"Apple",RAM:"6GB",ROM:"256GB",os:"IOS",price:125000,image:"https://i.ibb.co/bFDLWyC/iphone-12-PNG25.png"},
    {name:"iPhone 11 pro",brand:"Apple",RAM:"4GB",ROM:"64GB",os:"IOS",price:95000,image:"https://i.ibb.co/sqPpmzc/iphone-11-PNG33.png"},
    {name:"Galaxy S20 FE",brand:"Samsung",RAM:"6GB",ROM:"128GB",os:"Android",price:47800,image:"https://i.ibb.co/HCt4g3n/3-78.png"},
    {name:"X7 MAX",brand:"Realme",RAM:"6GB",ROM:"128GB",OS:"Android",price:27990,image:"https://i.ibb.co/j4MDVmk/f1f88212aab1509d825c269938414f686bdb6f8e.jpg"},
    {name:"Redmi Note 10",brand:"Xiaomi",RAM:"6GB",ROM:"128GB",os:"Android",price:12500,image:"https://i.ibb.co/XW6Xp6P/xiaomi-redmi-note10-11.jpg"},
    {name:"8 Pro",brand:"Realme",RAM:"6GB",ROM:"128GB",os:"Android",price:18500,image:"https://i.ibb.co/xhnKbB1/realme-8-pro-1.jpg"},
    {name:"A52",brand:"Samsung",RAM:"6GB",ROM:"128GB",os:"Android",price:25000,image:"https://i.ibb.co/3sNGnT2/samsung-galaxy-a52-5g-10.jpg"},
];
let insertData=(data)=>mobileData.unshift(data);
let removeMobile=(name)=>{
    let index=mobileData.findIndex(x=>x.name==name);
    mobileData.splice(index,1);
    return mobileData;
}
let updateArr=(index,data)=>mobileData[index]=data;
module.exports.mobileData=mobileData;
exports.updateMobile=updateArr;
exports.removeMobile=removeMobile;
exports.insertData=insertData;