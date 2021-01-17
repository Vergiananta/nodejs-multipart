const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
// SysUser untuk mencari data user
const SysUser = require('../models/user.model');
const bcrypt = require('bcryptjs');
const logEvent = require('../event/myEmitter')
const {ERROR} = require('../constant/error-event.constant')
// AUTH SERVICE UNTUK COMPARE/matching USERNAME DAN PASSWORD, MENG GENERATE TOKEN DAN JWT
dotenv.config();

class AuthService {
    async authentication(user) {
        console.log(user, 'USER SERVICE');
        
        const {userName, userPassword} = user;
        let authUser;
        try {
            authUser = await SysUser.findOne({
                where: {
                    userName: userName
                }
            });
            const matchPassword = bcrypt.compareSync(userPassword, 
                authUser.userPassword);
            if (matchPassword) {
                const expiresIn = 10000;
                const accessToken = jwt.sign({id:'111'}, process.env.SECRET_KEY, 
                {
                    expiresIn: expiresIn
                });
                authUser = {
                    user: {
                        userId: authUser.id,
                        userName: authUser.userName,
                        fullName: authUser.fullName,
                        email: authUser.email
                    }, token: accessToken
                };
            } else {
                authUser = null
            }
        } catch (error) {
            logEvent.emit(ERROR, {
                logTitle: 'FAILED-GET-TOKEN',
                logMessage: error
            })
        }
        return authUser;
    }
}

module.exports = AuthService;