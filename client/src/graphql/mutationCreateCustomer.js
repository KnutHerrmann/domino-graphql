export const mutationCreateCustomer = `
mutation($id: String!, $password: String!, $input: CustomerInput) {
  createCustomer(
      id: $id, 
      password: $password, 
      input: $input
  ) 
  {
    id
    lastname
    firstname
    phone
    zipcode
    city
  }
}
`;
