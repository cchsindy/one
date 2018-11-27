const anet = require('./services/authorizenet/AuthorizeNetService')

const cc = new anet()

cc.charge({ data: 'null' })
