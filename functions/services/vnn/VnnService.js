module.exports = class VnnService {
  constructor() {
    this.axios = require('axios')
    this.parser = require('html-parser')
    this.config = require('./config')
    this.vnn = this.axios.create({
      baseURL: this.config.baseUrl
    })
  }

  getPlayers() {
    this.vnn
      .get(this.config.teams[5].url)
      .then(response => {
        let players = []
        this.parser.parse(response.data, {
          attribute: function(name, value) {
            if (name === 'data-student') players.push(value)
          }
        })
        console.log(players)
        return
      })
      .catch(error => {
        console.log(error)
      })
  }
}

const vs = new VnnService()
vs.getPlayers()
