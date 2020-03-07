export const queryHome = `
{
  performances(count: 3) {
    id
    date
    time
    show {
      id
      title
      subtitle
    }
    stage {
      name
    }
  }
}`;
