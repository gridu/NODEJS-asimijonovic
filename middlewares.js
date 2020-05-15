const authController = require('./controllers/authController');
const tourController = require('./controllers/tourController');
const AuthError = require('apollo-server-express').AuthenticationError;
const UserInputError = require('apollo-server-express').UserInputError;

const commonFns = {
    async updateAndResizeTourImages(resolve, parent, args, context, info) {        
        try {
            if (context.req.files && 
                (context.req.files.imageCover || context.req.files.images)) {
                tourController.uploadTourImages(context.req, context.res, () => {throw new Error('Error in uploading image.')});
                tourController.resizeTourImages(context.req, context.res);
            }
            return resolve(parent, args, context, info);
        
        } catch({message}) {
            throw new UserInputError(message);
        }
    }
}

const getProtectAndRestrictToFn = (...roles) => {
    return async (resolve, parent, args, context, info) => {
        try {
            await authController.protect(context.req, context.res);
            authController.restrictTo(roles).call(this, context.req, context.res, null);

            return resolve(parent, args, context, info);
        
        } catch({message}) {
            throw new AuthError(message);
        }
    };
  };

const authMiddleware = {
    Query: {
        mounthlyPlan: getProtectAndRestrictToFn('admin', 'lead-guide', 'guide')
    },
    Mutation: {
        updateTour: getProtectAndRestrictToFn('admin', 'lead-guide'),
        createTour: getProtectAndRestrictToFn('admin', 'lead-guide'),
        deleteTour: getProtectAndRestrictToFn('admin', 'lead-guide'),
        getBooking: getProtectAndRestrictToFn('admin', 'lead-guide'),
        createBooking: getProtectAndRestrictToFn('admin', 'lead-guide'),
        updateBooking: getProtectAndRestrictToFn('admin', 'lead-guide'),
        deleteBooking: getProtectAndRestrictToFn('admin', 'lead-guide')
    }
}

const middlewares = {
    Mutation: {
        updateTour: commonFns.updateAndResizeTourImages
    }
}

module.exports = [authMiddleware, middlewares];