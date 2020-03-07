export const mutationBuyTickets = `
mutation($id: String!, $password: String!, $input: PurchaseInput) {
  buyTickets(
      id: $id, 
      password: $password, 
      input: $input
  )
  {
    id
    orderdatetime
    total
  }
}
`;
