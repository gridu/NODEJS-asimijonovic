const gql = require('apollo-boost').gql;
const client = require('./apolloClient');

const createTourMutation = gql`
     mutation($data: CreateTourInput!) {
        createTour(data: $data) {
            id
            name
            duration
            price
            description
            summary
        }
    }
`;

const updateTourMutation = gql`
     mutation($id: ID!, $data: UpdateTourInput!) {
        updateTour(id: $id, data: $data) {
            id
            name
            summary
        }
    }
`;

const deleteTourMutation = gql`
     mutation($id: ID!) {
        deleteTour(id: $id) {
            id
        }
    }
`;

const getToursQuery = gql`
     query($query: QueryInput) {
        tours(query: $query){
            name
            summary
        }
    }
`;

const createTour = async (tourData, token) => {
    const variables = {
        data: tourData
    }

    const { data } = await client.mutate({ 
        mutation: createTourMutation, 
        variables,
        context: {
            token
        } 
    });

    return data.createTour;
}

const updateTour = async (id, tourData, token) => {
    const variables = {
        id,
        data: tourData
    }

    const { data } = await client.mutate({ 
        mutation: updateTourMutation, 
        variables,
        context: {
            token
        } 
    });

    return data.updateTour;
}

const deleteTour = async (id, token) => {
    const { data } = await client.mutate({ 
        mutation: deleteTourMutation, 
        variables: {
            id
        },
        context: {
            token
        } 
    });

    return data.deleteTour;
}

const getTours = async (queryobj) => {
    const { data } = await client.query({ 
        query: getToursQuery,
        variables: {
            query: queryobj
        }
    });

    return data.tours;
}

module.exports = {getTours, createTour, updateTour, deleteTour};

