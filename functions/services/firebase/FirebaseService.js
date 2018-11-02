module.exports = class FirebaseService {
  constructor() {
    this.my = firebase.initializeApp(this.config)
    this.myStore = this.my.firestore()
    this.myStore.settings({
      timestampsInSnapshots: true
    })
  }

  async saveToStore(collection, data) {
    await new Promise((resolve, reject) => {
      try {
        const ts = Date.now()
        for (const d of data) {
          let docName = ''
          let doc = {}
          switch (collection) {
            case 'bb_faculty':
              docName = d['Record ID']
              doc = {
                email: d['Contact number'].trim().toLowerCase(),
                first: d['First name'].trim(),
                last: d['Last name'].trim(),
                title: d['Title 1'].trim(),
                faculty: d['Current teacher?'] === 'Yes' ? true : false,
                synced: ts
              }
              break
            case 'bb_individuals':
              docName = d['Record ID']
              doc = {
                email: d['Contact number'].trim().toLowerCase(),
                first: d['First name'].trim(),
                last: d['Last name'].trim(),
                username: d['Online user ID'].trim(),
                synced: ts
              }
              break
            case 'bb_students':
              docName = d['Student ID']
              doc = {
                email: d['Contact number'].trim().toLowerCase(),
                first: d['First name'].trim(),
                last: d['Last name'].trim(),
                nickname: d['Nickname'].trim(),
                birthdate: d['Birth date'].trim(),
                gender: d['Gender'].trim(),
                grade: d['Current Grade'].trim(),
                status: d['Current status'].trim(),
                synced: ts
              }
              break
          }
          let docRef = this.myStore.doc(collection + '/' + docName)
          docRef.set(doc)
        }
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  }
}
