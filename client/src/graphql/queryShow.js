export const queryShow = `
query($showId: String!) {
  show(id: $showId) {
    title
    subtitle
    description
    performances {
      id
      date
      time
      stage {
        name
      }
    }
  }
}
`;
