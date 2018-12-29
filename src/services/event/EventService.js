class EventService {
  constructor() {
    this.events = [
      {
        id: 1,
        name: '2019 Pizza Fundraiser',
        description: 'optional',
        image: 'option url',
        startDate: '2019-01-15T00:00',
        endDate: '2019-01-20T16:30',
        items: [
          {
            id: 1,
            name: 'Cheese Pizza',
            description: 'optional',
            image: '/images/cheese.jpg',
            limit: 0,
            sold: 0,
            price: 12
          },
          {
            id: 2,
            name: 'Pepperoni Pizza',
            description: 'optional',
            image: '/images/pepperoni.jpg',
            limit: 0,
            sold: 0,
            price: 13
          },
          {
            id: 3,
            name: 'Sausage Pizza',
            description: 'optional',
            image: '/images/sausage.jpg',
            limit: 0,
            sold: 0,
            price: 13
          },
          {
            id: 4,
            name: 'Combo Pizza',
            description: 'optional',
            image: '/images/combo.jpg',
            limit: 0,
            sold: 0,
            price: 15
          }
        ]
      }
    ]
  }
}

export default new EventService()
