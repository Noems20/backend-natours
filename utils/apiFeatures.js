class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    // 1) Filtering
    // const queryObj = { ...req.query };
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    // 2) Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    // { duration: { gte: '5' }, difficulty: 'easy' } -> from query
    // { duration: { $gte: '5' }, difficulty: 'easy' } -> Regulara expression

    this.query.find(JSON.parse(queryStr));
    // let query = Tour.find(JSON.parse(queryStr));
    return this;
  }

  sort() {
    // 3) Sorting
    // if (req.query.sort) {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      // query.sort(sortBy);
      this.query.sort(sortBy);
    } else {
      // query.sort('-createdAt');
      this.query.sort('-createdAt');
    }
    return this;
  }

  limitFields() {
    // 4) Field limiting
    // if (this.query.fields) {
    if (this.queryString.fields) {
      // const fields = req.query.fields.split(',').join(' ');
      // query.select(fields);
      const fields = this.queryString.fields.split(',').join(' ');
      this.query.select(fields);
    } else {
      // query.select('-__v');
      this.query.select('-__v');
    }
    return this;
  }

  paginate() {
    // 5) Pagination
    //page=3&limit=10, 1-10 page 1, 11-20 page 2, 21-30 page 3

    // const page = req.query.page * 1 || 1;
    // const limit = req.query.limit * 1 || 100;
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;
    // query.skip(skip).limit(limit);
    this.query.skip(skip).limit(limit);

    return this;
  }
}

export default APIFeatures;
