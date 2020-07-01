module.exports = class StripeService {
  constructor() {
    this.config = require('./config')
    this.stripe = require('stripe')(this.config.live)
  }

  async pay(data) {
    const { paymentMethodId, paymentIntentId, description } = data
    let orderAmount = 0
    if (description === 'Spring Spec 2020') {
      orderAmount = data.tickets * 10 * 100
    }
    if (description === 'Theatre Camp 2020') {
      const today = Date.now()
      const earlybird = Date.parse('2020-05-01')
      let cost = 185
      if (today < earlybird) cost = 175
      orderAmount = data.campers * cost * 100
    }
    try {
      let intent
      if (paymentMethodId) {
        // Create new PaymentIntent with a PaymentMethod ID from the client.
        intent = await this.stripe.paymentIntents.create({
          amount: orderAmount,
          currency: 'usd',
          description,
          payment_method: paymentMethodId,
          confirmation_method: 'manual',
          confirm: true
          // If a mobile client passes `useStripeSdk`, set `use_stripe_sdk=true`
          // to take advantage of new authentication features in mobile SDKs
          // use_stripe_sdk: useStripeSdk
        })
        // After create, if the PaymentIntent's status is succeeded, fulfill the order.
      } else if (paymentIntentId) {
        // Confirm the PaymentIntent to finalize payment after handling a required action
        // on the client.
        intent = await stripe.paymentIntents.confirm(paymentIntentId)
        // After confirm, if the PaymentIntent's status is succeeded, fulfill the order.
      }
      return this.generateResponse(intent)
    } catch (e) {
      // Handle "hard declines" e.g. insufficient funds, expired card, etc
      // See https://stripe.com/docs/declines/codes for more
      return { error: e.message }
    }
  }

  generateResponse(intent) {
    // Generate a response based on the intent's status
    switch (intent.status) {
      case 'requires_action':
      case 'requires_source_action':
        // Card requires authentication
        return {
          requiresAction: true,
          clientSecret: intent.client_secret
        }
      case 'requires_payment_method':
      case 'requires_source':
        // Card was not properly authenticated, suggest a new payment method
        return {
          error: 'Your card was denied, please provide a new payment method'
        }
      case 'succeeded':
        // Payment is complete, authentication not required
        // To cancel the payment after capture you will need to issue a Refund (https://stripe.com/docs/api/refunds)
        console.log('💰 Payment received!')
        return { clientSecret: intent.client_secret }
    }
  }
}
