module.exports = class AuthorizeNet {
  constructor() {
    this.ApiContracts = require('authorizenet').APIContracts
    this.ApiControllers = require('authorizenet').APIControllers
    this.SDKConstants = require('authorizenet').Constants
  }

  charge(transactionData) {
    console.log(transactionData)
    let merchantAuthenticationType = new this.ApiContracts.MerchantAuthenticationType()
    merchantAuthenticationType.setName('5KP3u95bQpv')
    merchantAuthenticationType.setTransactionKey('346HZ32z3fP4hTG2')

    let creditCard = new this.ApiContracts.CreditCardType()
    creditCard.setCardNumber('4242424242424242')
    creditCard.setExpirationDate('0822')
    creditCard.setCardCode('999')

    let paymentType = new this.ApiContracts.PaymentType()
    paymentType.setCreditCard(creditCard)

    let orderDetails = new this.ApiContracts.OrderType()
    orderDetails.setDescription('Product Description')

    let billTo = new this.ApiContracts.CustomerAddressType()
    billTo.setFirstName('Ellen')
    billTo.setLastName('Johnson')
    billTo.setAddress('14 Main Street')
    billTo.setCity('Pecan Springs')
    billTo.setState('TX')
    billTo.setZip('44628')
    billTo.setCountry('USA')

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
    transactionRequestType.setAmount(15.5)
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
    //ctrl.setEnvironment(this.SDKConstants.endpoint.production);

    let self = this

    ctrl.execute(() => {
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
            console.log(
              'Successfully created transaction with Transaction ID: ' +
                response.getTransactionResponse().getTransId()
            )
            console.log(
              'Response Code: ' +
                response.getTransactionResponse().getResponseCode()
            )
            console.log(
              'Message Code: ' +
                response
                  .getTransactionResponse()
                  .getMessages()
                  .getMessage()[0]
                  .getCode()
            )
            console.log(
              'Description: ' +
                response
                  .getTransactionResponse()
                  .getMessages()
                  .getMessage()[0]
                  .getDescription()
            )
          } else {
            console.log('Failed Transaction.')
            if (response.getTransactionResponse().getErrors() !== null) {
              console.log(
                'Error Code: ' +
                  response
                    .getTransactionResponse()
                    .getErrors()
                    .getError()[0]
                    .getErrorCode()
              )
              console.log(
                'Error message: ' +
                  response
                    .getTransactionResponse()
                    .getErrors()
                    .getError()[0]
                    .getErrorText()
              )
            }
          }
        } else {
          console.log('Failed Transaction. ')
          if (
            response.getTransactionResponse() !== null &&
            response.getTransactionResponse().getErrors() !== null
          ) {
            console.log(
              'Error Code: ' +
                response
                  .getTransactionResponse()
                  .getErrors()
                  .getError()[0]
                  .getErrorCode()
            )
            console.log(
              'Error message: ' +
                response
                  .getTransactionResponse()
                  .getErrors()
                  .getError()[0]
                  .getErrorText()
            )
          } else {
            console.log(
              'Error Code: ' +
                response
                  .getMessages()
                  .getMessage()[0]
                  .getCode()
            )
            console.log(
              'Error message: ' +
                response
                  .getMessages()
                  .getMessage()[0]
                  .getText()
            )
          }
        }
      } else {
        console.log('Null Response.')
      }
    })
  }
}
