const { Schema, model } = require('mongoose');

const AccountSchema = new Schema({
  userId: {
    type: String,
    unique: true,
    required: true
  },
  nylasAccountId: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  provider: {
    type: String,
    required: false
  },
  syncState: {
    type: String,
    required: false
  },
  cursor: {
    type: String,
    required: false
  },
  nylasToken: {
    type: String,
    required: true
  },
  mailProviderToken: {
    type: String,
    required: false
  },
  isActive: {
    type: Boolean,
    default: true,
    required: false
  },
  createdAt: {
    type: Date,
    required: true
  },
  updatedAt: {
    type: Date,
    required: true
  }
})

exports.AccountModel = model('Account', AccountSchema);