const client = require('./apolloClient');
const { gql } = require('apollo-boost');

const signupMutation = gql`
    mutation($data: CreateUserInput!) {
        signUp(data: $data) {
            token
            user {
                name
                email
                role
            }
        }
    }
`;

const loginMutation = gql`
    mutation($data: LoginUserInput!) {
        login(data: $data) {
            token
            user {
                id
                name
                email
            }      
        }
    }
`;

const getAllUsersQuery = gql`
    query($query: QueryInput) {
        users(query: $query) {
            id
        }
    }
`;

const getUserQuery = gql`
    query($id: ID!) {
        user(id: $id) {
            id
            name
            email
        }
    }
`;

const userWithAdminRole = {
    name: "Ana Simijonovic",
    email: "ana_admin@gmail.com",
    password: "test1234",
    passwordConfirm: "test1234",
    role: "admin"
}

const signup = async (user = {}) => {
    const { data } = await client.mutate({
        mutation: signupMutation,
        variables: {
            data: {
                name: userWithAdminRole.name,
                email: userWithAdminRole.email,
                password: userWithAdminRole.password,
                passwordConfirm: userWithAdminRole.passwordConfirm,
                ...user
            }
        },
    });

    return data.signUp;
};

const login = async (user = {}) => {
    const { data } = await client.mutate({
        mutation: loginMutation,
        variables: {
            data: {
                email: userWithAdminRole.email,
                password: userWithAdminRole.password,
                ...user
            },
        },
    });

    return data.login;
};

const getAllUsers = async (queryobj, token) => {
    const res = await client.query({
        query: getAllUsersQuery,
        variables: {
            query: queryobj
        },
        context: {
            token
        },
    });

    return res.data.users;
};

module.exports = {signup, login, getAllUsers};