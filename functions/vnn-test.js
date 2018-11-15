const VNN = require('./services/vnn/VnnService')

const vnn = new VNN()

async function get() {
  let p = await vnn.getPlayers()
  console.log(p)
}

get()

// vnn.getPlayers().then(result => {
//   console.log(result)
// })
