/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
import ApolloBoost, { gql } from 'apollo-boost';

// with default url for graphql
const apolloClient = new ApolloBoost();

const loginMutation = gql`
    mutation($email: String!, $password: String!) {
      login(data:{
          email: $email
          password: $password
        }) {
          token
          user {
            name
            photo
          }
        }
      }
  `
  
export const login = async (email, password) => {
  const variables = {
    email,
    password
  }

  apolloClient.mutate({ mutation: loginMutation, variables }).then(response => {
    console.log('resp', response);

    showAlert('success', 'Logged in successfully!');
    window.setTimeout(() => {
      location.assign('/');
    }, 1500);

  }).catch(error => showAlert('error', error))

}

export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: '/api/v1/users/logout'
    });
    if ((res.data.status = 'success')) location.reload(true);
  } catch (err) {
    console.log(err.response);
    showAlert('error', 'Error logging out! Try again.');
  }
}
