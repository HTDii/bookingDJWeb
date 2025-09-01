import db from '../models/index';
import CRUDService from '../services/CRUDService';
// import { loginUser } from '../services/CRUDService';
// const db = require('../models/index');
let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        console.log('---------')
        console.log(data)
        console.log('---------')
        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        });
    }
    catch (e) {
        console.log(_e)
    }

}

//quy dinh mot objetc gom
//object:{
//      key:'',
//      value:''
//}
let getCRUD = (req, res) => {
    return res.render('crud.ejs');
}
let postCRUD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body);
    console.log(message);
    return res.send('post crud form server');
}
let displayGetCRUD = async (req, res) => {
    let data = await CRUDService.getAllUser();
    return res.render('displayCRUD.ejs', {
        dataTable: data,
    })
}
let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userData = await CRUDService.getUserInfoById(userId);
        //check user data not found
        // let userData
        return res.render('editCRUD.ejs', {
            user: userData //gan gia tri userData cho user
        })
    }
    else {
        return res.send('Users not found!');
    }
}
let putCRUD = async (req, res) => {
    let data = req.body;
    let allUsers = await CRUDService.updateUserData(data);
    return res.render('displayCRUD.ejs', {
        dataTable: allUsers //gan gia tri userData cho user
    })
}
let deleteCRUD = async (req, res) => {
    let id = req.query.id;
    if (id) {
        await CRUDService.deleteUserById(id);
        return res.send('Delete the user succeed!')
    } else {
        return res.send('User not found!')
    }
}
// let handleLogin = async (req, res) => {
//     try {
//         let data = await loginUser(req.body);
//         return res.status(200).json(data);
//     } catch (e) {
//         console.log('error' + e.message || e)
//     }
// }
module.exports = {
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,
    // handleLogin: handleLogin,
}