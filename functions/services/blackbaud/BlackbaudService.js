class BlackbaudService {
  constructor() {}

  // import ssh2 from 'ssh2'
  // import csv from 'csv-parse'
  // import config from './blackbaud-config'
  // import firebase from 'firebase/app'
  // import 'firebase/firestore'
  // import fbConfig from './firebase-config'

  // export default class Blackbaud {
  //   constructor() {
  //     const my = firebase.initializeApp(fbConfig.my, 'my')

  //     this.config = config
  //     this.Client = ssh2.Client
  //     this.conn = new this.Client()
  //     this.csv = csv
  //     this.files = []
  //     this.data = []
  //     this.myStore = my.firestore()
  //     this.myStore.settings({ timestampsInSnapshots: true })
  //   }

  //   findSchedule(studentId) {
  //     return new Promise((resolve, reject) => {
  //       let ss = this.schedule.filter(s => s['Student ID'] === studentId)
  //       resolve(ss)
  //     })
  //   }

  //   async run() {
  //     console.log('process started')
  //     await this.openConnection()
  //     await this.getFiles()
  //     for (const file of this.files) {
  //       console.log('processing ' + file.filename)
  //       await this.getCSV(file.filename)
  //       let collection = ''
  //       switch (file.filename) {
  //         case 'Faculty Records.CSV':
  //           collection = 'bb_faculty'
  //           break
  //         case 'Individual Records.CSV':
  //           collection = 'bb_individuals'
  //           break
  //         case 'Student Records.CSV':
  //           collection = 'bb_students'
  //           break
  //       }
  //       await this.saveToStore(collection)
  //     }
  //     await this.closeConnection()
  //     console.log('process complete')
  //     return
  //   }

  //   async saveToStore(collection) {
  //     await new Promise((resolve, reject) => {
  //       try {
  //         const ts = Date.now()
  //         for (const d of this.data) {
  //           let docName = ''
  //           let doc = {}
  //           switch (collection) {
  //             case 'bb_faculty':
  //               docName = d['Record ID']
  //               let faculty = (d['Current teacher?'] == 'Yes') ? true : false
  //               doc = {
  //                 email: d['Contact number'].trim().toLowerCase(),
  //                 first: d['First name'].trim(),
  //                 last: d['Last name'].trim(),
  //                 title: d['Title 1'].trim(),
  //                 faculty: faculty,
  //                 synced: ts
  //               }
  //               break
  //             case 'bb_individuals':
  //               docName = d['Record ID']
  //               doc = {
  //                 email: d['Contact number'].trim().toLowerCase(),
  //                 first: d['First name'].trim(),
  //                 last: d['Last name'].trim(),
  //                 username: d['Online user ID'].trim(),
  //                 synced: ts
  //               }
  //               break
  //             case 'bb_students':
  //               docName = d['Student ID']
  //               doc = {
  //                 email: d['Contact number'].trim().toLowerCase(),
  //                 first: d['First name'].trim(),
  //                 last: d['Last name'].trim(),
  //                 nickname: d['Nickname'].trim(),
  //                 birthdate: d['Birth date'].trim(),
  //                 gender: d['Gender'].trim(),
  //                 grade: d['Current Grade'].trim(),
  //                 status: d['Current status'].trim(),
  //                 synced: ts
  //               }
  //               break
  //           }
  //           let docRef = this.myStore.doc(collection + '/' + docName)
  //           docRef.set(doc)
  //         }
  //         resolve()
  //       } catch (error) {
  //         reject(error)
  //       }
  //     })
  //   }

  //   async getCSV(file) {
  //     let self = this
  //     await new Promise((resolve, reject) => {
  //       this.conn.sftp(function(error, sftp) {
  //         if (error) {
  //           reject('sftp error')
  //         }

  //         const rstream = sftp.createReadStream('/46157/data/' + file)

  //         let data = ''
  //         rstream.on('data', chunk => {
  //           data += chunk
  //         })
  //         rstream.on('end', () => {
  //           self.csv(data, { columns: true }, (error, parsed) => {
  //             if (error) {
  //               reject('error parsing csv')
  //             }
  //             self.data = parsed
  //             resolve()
  //           })
  //         })
  //         rstream.on('error', error => {
  //           reject(error)
  //         })
  //       })
  //     })
  //   }

  //   async getFiles() {
  //     let self = this
  //     await new Promise((resolve, reject) => {
  //       this.conn.sftp(function(error, sftp) {
  //         if (error) {
  //           reject('sftp error')
  //         }
  //         sftp.readdir('/46157/data/', function(error, list) {
  //           if (error) {
  //             reject('readdir error')
  //           }
  //           self.files = list
  //           resolve()
  //         })
  //       })
  //     })
  //   }

  //   async closeConnection() {
  //     await new Promise(resolve => {
  //       this.conn.end()
  //       resolve()
  //     })
  //   }

  //   async openConnection() {
  //     await new Promise((resolve, reject) => {
  //       this.conn.on('ready', () => {
  //         resolve()
  //       }).connect(this.config)
  //       this.conn.on('error', error => {
  //         if (error) {
  //           reject('not able to connect')
  //         }
  //       })
  //     })
  //   }
  // }
}
