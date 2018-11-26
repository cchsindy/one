module.exports = class AuthorizeNet {
  constructor() {
    this.ApiContracts = require('authorizenet').APIContracts
    this.ApiControllers = require('authorizenet').APIControllers
    this.SDKConstants = require('authorizenet').Constants
  }

  charge(transactionData) {
    console.log(transactionData)
  }
}
