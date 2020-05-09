const bookingController = require('../../controllers/bookingController');
const tourController = require('../../controllers/tourController');
const userController = require('../../controllers/userController');

const Query = {
    async tours(parent, { data }, ctx, info) {
        return await tourController.getAllTours({
            query: data
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
    }
}

module.exports = Query;