module.exports = class AuthorizeNet {
  constructor() {
    this.ApiContracts = require('authorizenet').APIContracts
    this.ApiControllers = require('authorizenet').APIControllers
    this.SDKConstants = require('authorizenet').Constants
    this.config = require('./config')
  }

  charge(transactionData) {
    return new Promise((resolve, reject) => {
      try {
        let merchantAuthenticationType = new this.ApiContracts.MerchantAuthenticationType()
        merchantAuthenticationType.setName(this.config.apiLoginKey)
        merchantAuthenticationType.setTransactionKey(this.config.transactionKey)

        let creditCard = new this.ApiContracts.CreditCardType()
        creditCard.setCardNumber(transactionData.ccNumber)
        creditCard.setExpirationDate(transactionData.ccExpiration)
        creditCard.setCardCode(transactionData.ccCode)

        let paymentType = new this.ApiContracts.PaymentType()
        paymentType.setCreditCard(creditCard)

        let orderDetails = new this.ApiContracts.OrderType()
        orderDetails.setDescription(transactionData.description)

        let billTo = new this.ApiContracts.CustomerAddressType()
        billTo.setFirstName(transactionData.firstName)
        billTo.setLastName(transactionData.lastName)
        billTo.setAddress(transactionData.address)
        billTo.setCity(transactionData.city)
        billTo.setState(transactionData.state)
        billTo.setZip(transactionData.zip)
        billTo.setCountry('USA')
        billTo.setPhoneNumber(transactionData.phone)
        // email is not showing in Authorize.NET downloads
        billTo.setEmail(transactionData.email)

        let transactionSetting1 = new this.ApiContracts.SettingType()
        transactionSetting1.setSettingName('duplicateWindow')
        transactionSetting1.setSettingValue('120')

        let transactionSetting2 = new this.ApiContracts.SettingType()
        transactionSetting2.setSettingName('recurringBilling')
        transactionSetting2.setSettingValue('false')

        let transactionSettingList = []
        transactionSettingList.push(transactionSetting1)
        transactionSettingList.push(transactionSetting2)

        let transactionSettings = new this.ApiContracts.ArrayOfSetting()
        transactionSettings.setSetting(transactionSettingList)

        let transactionRequestType = new this.ApiContracts.TransactionRequestType()
        transactionRequestType.setTransactionType(
          this.ApiContracts.TransactionTypeEnum.AUTHCAPTURETRANSACTION
        )
        transactionRequestType.setPayment(paymentType)
        transactionRequestType.setAmount(transactionData.amount)
        transactionRequestType.setOrder(orderDetails)
        transactionRequestType.setBillTo(billTo)
        transactionRequestType.setTransactionSettings(transactionSettings)

        let createRequest = new this.ApiContracts.CreateTransactionRequest()
        createRequest.setMerchantAuthentication(merchantAuthenticationType)
        createRequest.setTransactionRequest(transactionRequestType)

        let ctrl = new this.ApiControllers.CreateTransactionController(
          createRequest.getJSON()
        )
        //Defaults to sandbox
        ctrl.setEnvironment(this.SDKConstants.endpoint.production)

        let self = this

        ctrl.execute(() => {
          let responseData = {
            transactionId: null,
            responseCode: null,
            messageCode: null,
            description: 'Unknown error occurred.'
          }
          let apiResponse = ctrl.getResponse()
          let response = new self.ApiContracts.CreateTransactionResponse(
            apiResponse
          )
          if (response !== null) {
            if (
              response.getMessages().getResultCode() ===
              this.ApiContracts.MessageTypeEnum.OK
            ) {
              if (response.getTransactionResponse().getMessages() !== null) {
                responseData.transactionId = response
                  .getTransactionResponse()
                  .getTransId()
                responseData.responseCode = response
                  .getTransactionResponse()
                  .getResponseCode()
                responseData.messageCode = response
                  .getTransactionResponse()
                  .getMessages()
                  .getMessage()[0]
                  .getCode()
                responseData.description = response
                  .getTransactionResponse()
                  .getMessages()
                  .getMessage()[0]
                  .getDescription()
              } else {
                if (response.getTransactionResponse().getErrors() !== null) {
                  responseData.transactionId = null
                  responseData.responseCode = response
                    .getTransactionResponse()
                    .getResponseCode()
                  responseData.messageCode = response
                    .getTransactionResponse()
                    .getErrors()
                    .getError()[0]
                    .getErrorCode()
                  responseData.description = response
                    .getTransactionResponse()
                    .getErrors()
                    .getError()[0]
                    .getErrorText()
                }
              }
            }
          }
          resolve(responseData)
        })
      } catch (error) {
        reject(error)
      }
    })
  }
}
