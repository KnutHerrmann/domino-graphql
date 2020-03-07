export const queryLogin = `
query($id: String!, $password: String!){
  customer(id: $id, password: $password) {
    id
    lastname
    firstname
    phone
    zipcode
    city
  }
}`;
