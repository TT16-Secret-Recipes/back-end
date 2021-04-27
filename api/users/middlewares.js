const db = require("../data/db-config")

const checkUserExists = async (req, res, next) => {
    const { id } = req.params
    const user = await db('users').where({ id: id }).first()
    if(!user){
      res.status(400).json('incorrect user info')
      // return
    }
    next()
};



module.exports = {
    checkUserExists,
};
