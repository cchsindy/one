const anet = require('./services/authorizenet/AuthorizeNetService')

const cc = new anet()

cc.charge({
  ccNumber: '4242424242424242',
  ccExpiration: '0822',
  ccCode: '999',
  description: 'Product Description',
  firstName: 'Ellen',
  lastName: 'Johnson',
  address: '14 Main Street',
  city: 'Pecan Springs',
  state: 'TX',
  zip: '44628',
  amount: '10.25'
})
