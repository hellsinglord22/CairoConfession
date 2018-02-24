const express = require('express'),
  router = express.Router(),
  jwt = require('jsonwebtoken');

//protect route with verify token middleware
router.post('/post', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretKey', (err, authData) => {
    if(err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: 'post it',
        authData
      });
    }
  });
});

router.post('/login', (req, res) => {
  const user = {
    id: 1,
    username: 'sally',
    email: 'sally@gmail.com'
  }

  jwt.sign({user: user}, 'secretKey', { expiresIn: '30s'}, (err, token) => {
    res.json({
      token: token
    });
  });
});

function verifyToken(req, res, next) {
  //get auth header value
  const bearerHeader = req.headers.authorization;
  //check if bearer is undefined

  if(typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');

    //get token from array
    const bearerToken = bearer[1];
    //set the token

    req.token = bearerToken;
    //next middleware
    next();
  } else {
    //forbidden
    res.sendStatus(403);
  }
}

module.exports = router;
