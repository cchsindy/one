module.exports = class BlackbaudService {
  constructor() {
    this.ssh2 = require('ssh2')
    this.Client = this.ssh2.Client
    this.conn = new this.Client()
    this.csv = require('csv-parse')
    this.config = require('./config')
    this.files = []
    this.data = []
  }

  findSchedule(studentId) {
    return new Promise((resolve, reject) => {
      let ss = this.schedule.filter(s => s['Student ID'] === studentId)
      resolve(ss)
    })
  }

  async run() {
    console.log('process started')
    await this.openConnection()
    await this.getFiles()
    for await (const file of this.files) {
      console.log('processing ' + file.filename)
      this.getCSV(file.filename)
      let collection = ''
      switch (file.filename) {
        case 'Faculty Records.CSV':
          collection = 'bb_faculty'
          break
        case 'Individual Records.CSV':
          collection = 'bb_individuals'
          break
        case 'Student Records.CSV':
          collection = 'bb_students'
          break
      }
      //this.saveToStore(collection)
    }
    await this.closeConnection()
    console.log('process complete')
    return
  }

  async getCSV(file) {
    let self = this
    await new Promise((resolve, reject) => {
      this.conn.sftp((error, sftp) => {
        if (error) {
          reject(error)
        }

        const rstream = sftp.createReadStream('/46157/data/' + file)

        let data = ''
        rstream.on('data', chunk => {
          data += chunk
        })
        rstream.on('end', () => {
          self.csv(
            data,
            {
              columns: true
            },
            (error, parsed) => {
              if (error) {
                reject(error)
              }
              self.data = parsed
              resolve()
            }
          )
        })
        rstream.on('error', error => {
          reject(error)
        })
      })
    })
  }

  async getFiles() {
    let self = this
    await new Promise((resolve, reject) => {
      this.conn.sftp((error, sftp) => {
        if (error) {
          reject(error)
        }
        sftp.readdir('/46157/data/', (error, list) => {
          if (error) {
            reject(error)
          }
          self.files = list
          resolve()
        })
      })
    })
  }

  async closeConnection() {
    await new Promise(resolve => {
      this.conn.end()
      resolve()
    })
  }

  async openConnection() {
    await new Promise((resolve, reject) => {
      this.conn
        .on('ready', () => {
          resolve()
        })
        .connect(this.config)
      this.conn.on('error', error => {
        if (error) {
          reject(error)
        }
      })
    })
  }
}
