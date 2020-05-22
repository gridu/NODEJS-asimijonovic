const gql = require('apollo-boost').gql;
const client = require('./apolloClient');

const createBookingMutation = gql`
     mutation($data: CreateBookingInput!) {
        createBooking(data: $data) {
            id
            price
            paid
            user
        }
    }
`;

const updateBookingMutation = gql`
     mutation($id: ID!, $data: UpdateBookingInput!) {
        updateBooking(id: $id, data: $data) {
            id
            price
            paid
        }
    }
`;

const deleteBookingMutation = gql`
     mutation($id: ID!) {
        deleteBooking(id: $id) {
            id
        }
    }
`;

const getBookingQuery = gql`
     query($query: QueryInput) {
        bookings(query: $query){
            id
            price
            paid
        }
    }
`;

const createBooking = async (bookingData, token) => {
    const variables = {
        data: bookingData
    }

    const { data } = await client.mutate({ 
        mutation: createBookingMutation, 
        variables,
        context: {
            token
        } 
    });

    return data.createBooking;
}

const updateBooking = async (id, bookingData, token) => {
    const variables = {
        id,
        data: bookingData
    }

    const { data } = await client.mutate({ 
        mutation: updateBookingMutation, 
        variables,
        context: {
            token
        } 
    });

    return data.updateBooking;
}

const getBookings = async (queryobj) => {
    const { data } = await client.query({ 
        query: getBookingQuery,
        variables: {
            query: queryobj
        }
    });

    return data.bookings;
}

const deleteBooking = async (id, token) => {
    const { data } = await client.mutate({ 
        mutation: deleteBookingMutation, 
        variables: {
            id
        },
        context: {
            token
        } 
    });

    return data.deleteBooking;
}

module.exports = {getBookings, createBooking, updateBooking, deleteBooking};

