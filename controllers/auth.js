const { response, request } = require("express");


const userLogin = async( req, res = response) => {
    res.status(200).json({
        state: 'not login',
        token: false
      });
};

module.exports = {
    userLogin
}