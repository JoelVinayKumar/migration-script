const { Schema, model } = require('mongoose');

const EntitySchema = new Schema({
  name: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true
  },
  entity: {
    type: String,
    required: false
  },
  entityId: {
    type: String,
    required: false
  }
}, {
  _id: false
});

const FileSchema = new Schema({
  title: {
    type: String,
    required: false
  },
  uuid: {
    type: String,
    required: true
  }
}, {
  _id: false
});

const MailSchema = new Schema({
  appId: {
    type: String,
    required: true
  },
  fromEmail: {
    type: EntitySchema,
    required: true
  },
  toEmail: {
    type: [EntitySchema],
    required: true
  },
  ccEmail: {
    type: [EntitySchema],
    required: false
  },
  bccEmail: {
    type: [EntitySchema],
    required: false
  },
  replyToEmail: {
    type: [EntitySchema],
    required: false
  },
  subject: {
    type: String,
    required: false
  },
  body: {
    type: String,
    required: true
  },
  unread: {
    type: Boolean,
    default: true,
    required: false
  },
  starred: {
    type: Boolean,
    default: false,
    required: false
  },
  snippet: {
    type: String,
    required: false
  },
  platformFileIds: {
    type: [FileSchema],
    required: false
  },
  messageId: {
    type: String,
    unique: true,
    required: false
  },
  threadId: {
    type: String,
    required: false
  },
  organizationId: {
    type: String,
    required: true
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

exports.MailModel = model('Mail', MailSchema);