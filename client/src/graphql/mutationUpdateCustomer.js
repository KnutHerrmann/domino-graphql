export const mutationUpdateCustomer = `
mutation($id: String!, $password: String!, $input: CustomerInput) {
  updateCustomer(
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
