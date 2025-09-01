// import { loginUser } from '../services/CRUDService';

import userService from "../services/userService";
let handleLogin = async (req, res) => {
    console.log('body ====>', req.body)

    let email = req.body.email;
    let password = req.body.password;
    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing inputs parameter!'
        })
    }
    //     try {
    //         let email = await loginUser(req.body.email);
    //         let password = req.body.password;
    //         return res.status(200).json(
    //             { yourEmail: email }
    //         );
    //     } catch (e) {
    //         console.log('error' + e.message || e)

    //     }
    let userData = await userService.handleUserLogin(email, password);
    return res.status(200).json({
        // errCode: 0,
        // message: 'hello world',
        // yourEmail: email
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData ? userData : {},
    })
}


module.exports = {
    handleLogin: handleLogin
}