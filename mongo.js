const mongoose = require('mongoose');
const fs = require('fs').promises;
const _ = require('lodash');

const { AccountModel } = require('./schemas/Account');
const { MailModel } = require('./schemas/Mail');

mongoose
  .connect('mongodb://localhost/sqlToMongo',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    }
  )

let accountData = [];
let mailsData = [];
let entityMappingsData = [];

const migrate = async () => {
  const accs = await fs.readFile('./dump/accounts.json', 'utf-8');
  accountData = JSON.parse(accs.toString())

  for (let account of accountData) {
    let { user_id, nylas_account_id, email, provider,
      sync_state, cursor, nylas_token, mail_provider_token,
      is_active, createdAt, updatedAt } = account
    await AccountModel.create({
      userId: user_id,
      nylasAccountId: nylas_account_id,
      email,
      provider: provider || provider.length < 1 ? provider : '',
      cursor: cursor ? cursor : '',
      syncState: sync_state,
      nylasToken: nylas_token,
      mailProviderToken: mail_provider_token,
      isActive: is_active,
      createdAt: new Date(createdAt),
      updatedAt: new Date(updatedAt)
    })
  }

  const mails = await fs.readFile('./dump/mails.json', 'utf-8');
  mailsData = JSON.parse(mails.toString())

  const emaps = await fs.readFile('./dump/entityMappings.json', 'utf-8');
  entityMappingsData = JSON.parse(emaps.toString())

  for (let a of mailsData) {
    let e = _.find(entityMappingsData, { thread_id: a.thread_id })

    await MailModel.create({
      appId: e.app_id,
      organizationId: e.organization_id,
      messageId: a.message_id,
      threadId: e.thread_id,
      snippet: a.snippet,
      subject: a.subject,
      body: a.body,
      unread: a.unread === 1 ? true : false,
      starred: a.starred === 1 ? true : false,
      platformFileIds: a.platform_file_ids.length > 0 ? a.platform_file_ids.split(',') : [],
      createdAt: new Date(a.createdAt),
      updatedAt: new Date(a.updatedAt),
      fromEmail: {
        name: a.from_name,
        email: a.from_email,
        entity: e.from_entity,
        entityId: e.from_entity_id
      },
      toEmail: a.to_email.split(',').map(x => {
        return {
          name: '',
          email: x,
          entity: e.to_entity,
          entityId: e.to_entity_id
        }
      }),
      ccEmail: a.cc_email.split(',').map(x => {
        return {
          name: '',
          email: x ? x : '',
          entity: '',
          entityId: ''
        }
      }),
      bccEmail: a.bcc_email.split(',').map(x => {
        return {
          name: '',
          email: x ? x : '',
          entity: '',
          entityId: ''
        }
      }),
      replyToEmail: a.reply_to_email.split(',').map(x => {
        return {
          name: '',
          email: x ? x : '',
          entity: '',
          entityId: ''
        }
      })
    })
  }

}

migrate()