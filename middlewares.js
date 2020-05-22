const authController = require('./controllers/authController');
const tourController = require('./controllers/tourController');
const AuthError = require('apollo-server-express').AuthenticationError;
const UserInputError = require('apollo-server-express').UserInputError;


const updateAndResizeTourImages = async (resolve, parent, args, context, info) => {        
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

const protectAndRestrict = (...roles) => {
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

const protect = async (resolve, parent, args, context, info) => {
    try {
        await authController.protect(context.req, context.res);
        return resolve(parent, args, context, info);
        
    } catch({message}) {
        throw new AuthError(message);
    }
}

const authMiddleware = {
    Query: {
        mounthlyPlan: protectAndRestrict('admin', 'lead-guide', 'guide'),
        booking: protectAndRestrict('admin', 'lead-guide'),
        users: protectAndRestrict('admin'),
        review: protect
    },
    Mutation: {
        updateTour: protectAndRestrict('admin', 'lead-guide'),
        createTour: protectAndRestrict('admin', 'lead-guide'),
        deleteTour: protectAndRestrict('admin', 'lead-guide'),
        createBooking: protectAndRestrict('admin', 'lead-guide'),
        updateBooking: protectAndRestrict('admin', 'lead-guide'),
        deleteBooking: protectAndRestrict('admin', 'lead-guide'),
        createReview: protectAndRestrict('user'),
        updateReview: protectAndRestrict('admin', 'user'),
        deleteReview: protectAndRestrict('admin', 'user'),
        updateUser: protectAndRestrict('admin'),
        deleteUser: protectAndRestrict('admin')
    }
}

const middlewares = {
    Mutation: {
        updateTour: updateAndResizeTourImages
    }
}

module.exports = [authMiddleware, middlewares];