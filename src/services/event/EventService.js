class EventService {
  constructor() {
    this.events = []
  }

  getEvents(fs) {
    return new Promise(resolve => {
      const collection = fs.collection('events')
      collection.get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.events.push({
            ...doc.data(),
            id: doc.id
          })
        })
        resolve(this.events)
      })
    })
  }
}

export default new EventService()
