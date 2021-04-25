const bcrypt = require('bcrypt')
const db = require('../data/db-config')
const User = require('../users/model')

//check password and check if username already in database
const validate = async (req, res, next) => {
  const { username, password, email } = req.body
  
  const [user] = await User.findBy({ username })

  let user_email
  if (email)
    [user_email] = await User.findBy({ email })

  if (username && password){
    if (req.url === '/register' && email && (user || user_email)) {
      res.status(400).json({ 
        message: `That ${user ? 'username' : 'email' } is taken`
      })
    } else if (req.url === '/login' && !user) {
      res.status(400).json({ 
        message: "Invalid credentials" 
      })
    } else {
      next()
    }
  } else {
    res.status(400).json({ message: "Please provide an email, username, and password" })
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
  const [user] = await db('users').where({ username })

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