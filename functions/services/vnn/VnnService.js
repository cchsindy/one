module.exports = class VnnService {
  constructor() {
    this.axios = require('axios')
    this.parser = require('html-parser')
    this.config = require('./config')
    this.vnn = this.axios.create({
      baseURL: this.config.baseUrl
    })
  }

  getTeamPlayers(teamUrl) {
    return new Promise((resolve, reject) => {
      this.vnn
        .get(teamUrl)
        .then(response => {
          let players = []
          this.parser.parse(response.data, {
            attribute: function(name, value) {
              if (name === 'data-student') players.push(value)
            }
          })
          resolve(players)
          return
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
    })
  }

  async checkPlayerNames(canvas) {
    for (const team of this.config.teams) {
      let players = await this.getTeamPlayers(team.url)
      for (const player of players) {
        let id = await canvas.getUser(player)
        console.log(player + ' => ' + id)
      }
    }
    console.log('Name Check complete.')
  }

  async runEligibilityCheck(canvas, sparkpost) {
    for (const team of this.config.teams) {
      // scrape players from VNN roster page
      let players = await this.getTeamPlayers(team.url)
      // get courses and grades for each player in Canvas
      let ineligible = []
      for (const player of players) {
        let failing = await canvas.getCoursesFailing(player)
        if (failing.length)
          ineligible.push({
            player,
            failing
          })
      }
      // email list of players with Fs
      let html = '<html><body><h1>' + team.name + ' Player Eligibility</h1>'
      for (const i of ineligible) {
        html += '<h2>' + i.player + ' is failing:</h2>'
        for (const f of i.failing) {
          html +=
            '<p>' + f.name + ' - ' + f.section + ' with a ' + f.grade + '%.</p>'
        }
      }
      if (ineligible.length === 0)
        html += '<p><i>All players are eligible!</i></p>'
      html += '</body></html>'
      sparkpost.send('CCHS Athletic Player Eligibility', html, team.emails)
      // console.log(ineligible)
    }
    console.log('Eligibility Check complete.')
  }
}
