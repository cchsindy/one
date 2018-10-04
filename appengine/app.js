const express = require('express')
const PubSub = require('@google-cloud/pubsub')

const pubsubClient = new PubSub({
  projectId: process.env.GOOGLE_CLOUD_PROJECT
})

const app = express()
app.get('/publish/:topic', async (req, res) => {
  const topic = req.params['topic']
  try {
    await pubsubClient
      .topic(topic)
      .publisher()
      .publish(Buffer.from('anything here'))
    res
      .status(200)
      .send('Published to ' + topic)
      .end()
  } catch (e) {
    console.log('oops: ' + e)
    res
      .status(500)
      .send('' + e)
      .end()
  }
})

app.get('/', (req, res) => {
  res
    .status(200)
    .send('GAE App running!')
    .end()
})

const PORT = process.env.PORT || 6060
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})
