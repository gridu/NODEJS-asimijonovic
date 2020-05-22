const bookingController = require('../../controllers/bookingController');
const tourController = require('../../controllers/tourController');
const reviewController = require('../../controllers/reviewController');
const userController = require('../../controllers/userController');

const Query = {
    async tours(parent, { query }, ctx, info) {
        return await tourController.getAllTours({
            query
        });
    },
    async tour(parent, { id }, ctx, info) {
        return await tourController.getTour({
            params: {
                id: id
            }
        });
    },
    async top5cheapTours(parent, args, ctx, info) {
        return await tourController.getAllTours({
            query: {
                limit: '5',
                sort: '-ratingsAverage,price',
                fields: 'name,price,ratingsAverage,summary,difficulty'
            }
        });
    },
    async tourStats(parent, args, ctx, info) {
        return await tourController.getTourStats();
    },
    async mounthlyPlan(parent, { year }, ctx, info) {
        return await tourController.getMonthlyPlan({
            params: {
                year: year
            }
        });
    },
    async toursWithin(parent, { distance, latlng, unit }, ctx, info) {
        return await tourController.getToursWithin({
            params: {
                distance,
                latlng,
                unit
            }
        });
    },
    async toursDistances(parent, { latlng, unit }, ctx, info) {
        return await tourController.getDistances({
            params: {
                latlng,
                unit
            }
        });
    },

    // Booking
    async booking(parent, { id }, ctx, info) {
        return await bookingController.getBooking({
            params: {
                id: id
            }
        });
    },
    async bookings(parent, { query }, ctx, info) {
        return await bookingController.getAllBookings({
            query
        });
    },

    // Review
    async review(parent, { id }, ctx, info) {
        return await reviewController.getReview({
            params: {
                id: id
            }
        });
    },
    async reviews(parent, { query }, ctx, info) {
        return await reviewController.getAllReviews({
            query
        });
    },

    // User
    async users(parent, { query }, ctx, info) {
        return await userController.getAllUsers({
            query
        });
    },
}

module.exports = Query;