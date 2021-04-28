const { verify } = require("jsonwebtoken");

module.exports = restrictedBy => (req, res, next) => {

  const token = req.headers.authorization;

  if (token) {
    verify(token, "KEEP IT SECRET", (err, decoded) => {
      if (err) {
        res.status(401).json(({ message: "Token is bad: " + err.message}))
      } else if(restrictedBy) {
        let message;
        switch(restrictedBy) {
          //only user with user_id may access
          case 'user_id':
            if (req.params.id != decoded.subject)
              message = 'You do not have access to that';
            break;
          //only admins may access
          case 'admin_only':
            if (decoded.username !== 'garrick')
              message = 'Admins only'
            break;
          case 'recipe_user':
            if(decoded.username !== req.recipe.contributor)
              message = 'You can only see and/or edit your own recipes'
            break;
          default:
            message = 'Access Restricted'
        }
        // if restricted send status 401
        if (message) {
          res.status(401).json({ message })

        } else {
          req.decodedToken = decoded
          next()
        }
      } else {
        // if no restrictedBy criteria and
        // token is valid, carry on
        req.decodedToken = decoded
        next()
      }
    })
  } else {
    res.status(401).json({ message: "Please provide token"})
  }
}