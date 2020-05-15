const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');

exports.deleteOne = Model =>
  async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return (new AppError('No document found with that ID', 404));
    }
  };

exports.updateOne = Model =>
  async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!doc) {
      throw new AppError('No document found with that ID', 404);
    }

    return doc;
  };

exports.createOne = Model =>
  async (req, res, next) => {
    return await Model.create(req.body);
  };

exports.getOne = (Model, popOptions) =>
  async (req, res, next) => {
    console.log('u getone')
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    return doc;
  };

exports.getAll = Model =>
  async (req, res, next) => {
    // To allow for nested GET reviews on tour (hack)
    let filter = {};
    if (req.params && req.params.tourId) filter = { tour: req.params.tourId };

    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    // const doc = await features.query.explain();

    const doc = await features.query;

    return doc;
  };
