export const fetchData = async (payload) => {
  const params = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: payload,
  };
  try {
    const response = await fetch(window.location.origin.replace('4003', '4002') + '/graphql', params);
    const json = await response.json();
    const {errors, data} = json;
    return errors ? {error: errors[0].message} : data;
  } catch (error) {
    return {error: error.toString()};
  }
};

export const createPayload = (query, variables) => JSON.stringify({query, variables});
