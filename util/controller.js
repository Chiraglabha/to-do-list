// const startDate = new Date();
// startDate.setFullYear(startDate.getFullYear() - 1);
const { Op } = require("sequelize");




const todolist = require('../model/todolist');

async function insertItem(name) {

    await todolist.create({name});
    
}

async function getData(){
   const name1 = await todolist.findAll()

    return name1;
}

async function getDelete(id){

    const deleteData = await todolist.destroy( { where :  { id } } );

    return deleteData;
}

async function getUpdate(id, name){

    const udateData = await todolist.update( {name}, {where : { id } } );


    return udateData;
}


// async function getOneYearData(){
//     const findDate = await todolist.destroy({ 
//         where : { 
//             updatedAt : { 
//                 [Op.lt] : startDate
//             }
//         }
//     })

//     return findDate;
// }

async function  ascendingOrder(){
    const ascending = await todolist.findAll({
        order : [
            ['name', 'ASC'],
        ]
    });

    return ascending;
}

async function  descendingOrder(){
    const descending = await todolist.findAll({
        order : [
            ['name', 'DESC'],
        ]
    });

    return descending ;
}

async function searchItems(name){
    console.log(name);
    const search = await todolist.findAll({
        where :  { 
            name : {
            [Op.substring]: name
            }

        }         
    });
    return search;
}

module.exports =  { insertItem, getData, getDelete, getUpdate, ascendingOrder, descendingOrder, searchItems };