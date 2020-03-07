export const queryOrder = `
query($orderId: String!) {
  order(id: $orderId) {
    orderdatetime
    total
    tickets {
      seat
      performance {
        id
        date
        time
        show {
          id
          title
        }
        stage {
          name
        }
      }
    }
  }
}
`;
