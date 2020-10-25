const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

const AuthSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true }
});

const AuthModel = mongoose.model('Auth', AuthSchema);

class Auth {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  exempleFunction() {
    console.log('This is an example function');
  }
}

module.exports = Auth;