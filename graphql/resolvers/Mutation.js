const tourController = require('../../controllers/tourController');
const authController = require('../../controllers/authController')
const bookingController = require('../../controllers/bookingController')

const Mutation = {
    // Tour
    async updateTour(parent, { id, data }, ctx, info) {
        return await tourController.updateTour({
            params: {
                id: id
            },
            body: data
        });
    },
    async createTour(parent, { data }, ctx, info) {
        return await tourController.createTour({
            body: data
        });
    },
    async deleteTour(parent, { id }, ctx, info) {
        await tourController.deleteTour({
            params: {
                id: id
            }
        });
    },


    // User
    async signUp(parent, { data }, ctx, info) {
        return await authController.signup({
            ...ctx.req,
            body: data
        });
    },
    async login(parent, { data }, ctx, info) {
        return await authController.login({
            body: data
        }, ctx.res); // response is needed to set cookie
    },
    async forgotPassword(parent, { email }, ctx, info) {
        return await authController.forgotPassword({
            email
        });
    },
    async resetPassword(parent, { data }, ctx, info) {
        return await authController.resetPassword({
            body: data,
            params: data.token
        });
    },


    // Booking
    async createBooking(parent, { data }, ctx, info) {
        return await bookingController.createBooking({
            body: data
        });
    },
    async updateBooking(parent, { id, data }, ctx, info) {
        return await bookingController.updateBooking({
            params: {
                id: id
            },
            body: data
        });
    },

};

module.exports = Mutation;