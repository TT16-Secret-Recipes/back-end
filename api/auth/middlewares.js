const bcrypt = require('bcrypt')
const User = require('../users/model')

//check password and check if username already in database
const validate = async (req, res, next) => {
  const { username, password } = req.body
  
  const [user] = await User.findBy({ username })

  if (username && password){
    if (req.url === '/register' && user) {
      res.status(400).json({ message: "That username is taken" })
    } else if (req.url === '/login' && !user) {
      res.status(400).json({ message: "Invalid credentials" })
    } else {
      next()
    }
  } else {
    res.status(400).json({ message: "Please provide a username and password" })
  }
}

const hash = async (req, res ,next) => {
  const { password } = req.body
  const hash = bcrypt.hashSync(password, 10)
  req.body.password = hash
  next()
}

const authenticate = async (req, res ,next) => {
  const { username, password } = req.body
  const [user] = await User.findBy({ username })

  if (bcrypt.compareSync(password, user.password)) {
    req.user = user
    next()
  } else {
    res.status(401).json({ message: "Invalid credentials!" })
  }
}

module.exports = {
  validate,
  hash,
  authenticate
}