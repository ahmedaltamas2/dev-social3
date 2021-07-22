const express = require('express');
const router  = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config'); //jsonsecretkey
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

//take name email password and give token by creating user in db
router.post(
  '/',
  //using express validator
  check('name', 'Name is required').notEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check(
    'password',
    'Please enter a password with 6 or more characters'
  ).isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({email });

      if (user) {
        return res  //check if user exists
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

     

      user = new User({
        name,
        email,
        password
      });


      //bcrypt package for password hashing
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = { //as we want our token to have id 
        user: {
          id: user.id  //user._id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: '5 days' },
        (err, token) => {
          if (err) throw err;
          res.json({ token }); //send the token to client
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;