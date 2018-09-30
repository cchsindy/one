class VnnService {
  constructor() {
    this.axios = require('axios')
    this.parser = require('html-parser')
    this.config = require('./config')
    this.axios.defaults.baseURL = this.config.baseUrl
  }

  getPlayers() {
    this.axios
      .get(this.config.teams[1])
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

const vnn = new VnnService()
vnn.getPlayers()
