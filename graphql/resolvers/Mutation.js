const tourController = require('../../controllers/tourController');
const authController = require('../../controllers/authController')
const bookingController = require('../../controllers/bookingController')
const reviewController = require('../../controllers/reviewController')
const userController = require('../../controllers/userController')

const Mutation = {
    // Tour
    async updateTour(parent, { id, data }, ctx, info) {
        return await tourController.updateTour({
            params: {
                id
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
                id
            }
        });
    },


    // User
    async signUp(parent, { data }, ctx, info) {
        return await authController.signup(
            {
                ...ctx.req,
                body: data
            }, 
            ctx.res);
    },
    async login(parent, { data }, ctx, info) {
        return await authController.login({
            body: data
        }, ctx.res); // response is needed to set cookie
    },
    async updateUser(parent, { id }, ctx, info) {
        return await userController.updateUser({
            params: {
                id
            }
        });
    },
    async deleteUser(parent, { id, data }, ctx, info) {
        return await userController.deleteUser({
            params: {
                id
            },
            body: data
        });
    },
    async forgotPassword(parent, { email }, ctx, info) {
        return await authController.forgotPassword({
            email
        })
    },
    async resetPassword(parent, { data }, ctx, info) {
        return await authController.resetPassword({
            body: data,
            params: data.token
        })
    },


    // Booking
    async createBooking(parent, { data }, ctx, info) {
        return await bookingController.createBooking({
            body: data
        })
    },
    async updateBooking(parent, { id, data }, ctx, info) {
        return await bookingController.updateBooking({
            params: {
                id
            },
            body: data
        })
    },
    async deleteBooking(parent, { id }, ctx, info) {
        return await bookingController.deleteBooking({
            params: {
                id
            }
        })
    },

    
    // Review
    async createReview(parent, { data }, ctx, info) {
        return await reviewController.createReview({
            body: data
        });
    },
    async updateReview(parent, { id, data }, ctx, info) {
        return await reviewController.updateReview({
            params: {
                id
            },
            body: data
        })
    },
    async deleteReview(parent, { id }, ctx, info) {
        return await reviewController.deleteReview({
            params: {
                id
            }
        })
    }
};

module.exports = Mutation;