export const mutationChangePassword = `
mutation($id: String!, $password: String!, $newPassword: String!) {
  changePassword(
      id: $id, 
      password: $password, 
      newPassword: $newPassword
  )
  {
    id
  }
}
`;
