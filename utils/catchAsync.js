export const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next); // .catch(next) calls with the error next(err)
  };
};

export default catchAsync;
