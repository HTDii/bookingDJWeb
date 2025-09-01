
import bcrypt from "bcryptjs/dist/bcrypt";
import db from '../models/index';
import { raw } from "body-parser";
import { where } from "sequelize";
import jwt from "jsonwebtoken";
import e from "express";
// import { User } from '../models';

const salt = bcrypt.genSaltSync(10);
let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phoneNumber: data.phoneNumber,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId
            })
            resolve('ok create a new user succeed');
        } catch (e) {
            reject(e);
        }
    })

}
// let loginData = () => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             let singinEr = await db.User.findOne({
//                 where: {email, password}
//             })
//             if(!singinEr) return resolve.status(400).json({});
//             else{
//                 resolve()
//             }
//         } catch (e) {
//             reject(e);
//         }
//     })

// }
let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    })

}
let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                raw: true,
            });
            resolve(users);
        } catch (e) {
            reject(e)
        }
    })
}
let getUserInfoById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
                raw: true,
            })
            if (user) {
                resolve(user)
            }
            else {
                resolve([])
            }
        } catch (e) {
            reject(e);
        }
    })
}
let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id }
            })
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                await user.save();
                let allUsers = await db.User.findAll();
                resolve(allUsers);
            } else {
                resolve();
            }
        } catch (e) {
            console.log(e);
        }
    })

}
let deleteUserById = (userID) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userID }
            })
            if (user) {
                await user.destroy();
            }
            resolve();
        } catch (e) {
            reject(e);
        }
    })
}
// let loginUser = async (data) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             console.log('debug body', data)
//             let userData = {};
//             let email = data.email;
//             let user = await db.User.findOne({
//                 where: { email: email },
//             })
//             if (user) {
//                 let checkPassword = bcrypt.compareSync(data.password, user.password);
//                 if (checkPassword) {
//                     userData.message = 'Login success!'
//                     userData.user = {
//                         id: user.id,
//                         email: user.email,
//                         firstName: user.firstName,

//                         lastName: user.lastName,
//                     }
//                     resolve(userData)
//                 } else {
//                     reject({ message: 'Wrong password!!!' })
//                 }
//             }
//             else {
//                 reject({ message: 'User not found!!!' })
//             }
//         } catch (e) {
//             reject(e);
//         }
//     })
// }
module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserInfoById: getUserInfoById,
    updateUserData: updateUserData,
    deleteUserById: deleteUserById,
    // loginUser: loginUser,
}