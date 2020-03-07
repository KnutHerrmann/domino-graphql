export const queryTickets = `
{
  performances {
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
}`;
