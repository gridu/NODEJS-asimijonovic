# Natours Application

App url: https://natours-anasim.herokuapp.com/

GraphQL API: https://natours-anasim.herokuapp.com/graphql

Example of GraphQL request for getting all tours:

```
query {
  tours(query: {
    sort: "-duration",
    limit: 3
  }) {
    name
    slug
    duration
    maxGroupSize
    locations {
      type
      day
      description
      coordinates
    }
    reviews {
      rating
    }
    durationWeeks
    ratingsAverage
    ratingsQuantity
    price
    priceDiscount
    summary
    description
    secretTour
    difficulty
    guides {
      name,
      photo
    }
  }
}
```
