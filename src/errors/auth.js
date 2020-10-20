export default ({ error }) => {
  console.log(error);
  return error.graphQLErrors[0].message == "Authentication Failed.";
};
