export const queryPerformance = `
query($performanceId: String!) {
  performance(id: $performanceId) {
    date
    time
    price1
    price2
    price3
    tickets {
      seat
            order{
        customer {
          id
          phone
          zipcode
        }
      }

    }
    show {
      title
    }
    stage {
      name
      seats
      rows
      labels
      htmls
      width
      height
      zoomstart
      zoommin
      zoommax
    }
  }
}
`;

export const extra = `
      order {
        customer {
          id
          zipcode
          phone
        }
      }
`;
