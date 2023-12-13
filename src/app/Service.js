import mongoose from 'mongoose';

class Service {
  constructor(model) {
    this.model = model;
    this.getAll = this.getAll.bind(this);
    this.insert = this.insert.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.get = this.get.bind(this);
    this.getOne = this.getOne.bind(this);
  }

  async getAll(query) {
    let { skip, limit } = query;
    // console.log(query);
    skip = skip ? Number(skip) : 0;
    limit = limit ? Number(limit) : 10;

    // eslint-disable-next-line no-param-reassign
    delete query.skip;
    // eslint-disable-next-line no-param-reassign
    delete query.limit;
    // console.log(skip);
    // console.log(limit);
    // eslint-disable-next-line no-underscore-dangle
    let id = query._id;
    if (id) {
      try {
        // eslint-disable-next-line no-underscore-dangle
        id = new mongoose.mongo.ObjectId(id);
      } catch (error) {
        // console.log('not able to generate mongoose id with content', id);
      }
    }

    try {
      const items = await this.model
        .find(query)
        .select(['-password'])
        .skip(skip)
        .limit(limit);
      const total = await this.model.countDocuments();

      return {
        error: false,
        statusCode: 200,
        data: items,
        total,
      };
    } catch (errors) {
      // console.error(errors);
      return {
        error: true,
        statusCode: 500,
        errors,
      };
    }
  }

  async insert(data) {
    try {
      let item = await this.model.create(data);
      item = await this.model.findById(item.id).select(['-password']);

      return {
        error: false,
        statusCode: 201,
        item,
      };
    } catch (error) {
      return {
        error: true,
        statusCode: 500,
        message: error || 'Not able to create item',
        errors: error.errors,
      };
    }
  }

  async update(id, data) {
    try {
      const item = await this.model.findByIdAndUpdate(id, data, { new: true });
      return {
        error: false,
        statusCode: 202,
        item,
      };
    } catch (error) {
      return {
        error: true,
        statusCode: 500,
        message: error,
      };
    }
  }

  async delete(id) {
    try {
      const item = await this.model.findByIdAndDelete(id);
      if (!item)
        return {
          error: true,
          statusCode: 404,
          message: 'item not found',
        };

      return {
        error: false,
        deleted: true,
        statusCode: 202,
        item,
      };
    } catch (error) {
      return {
        error: true,
        statusCode: 500,
        message: error,
      };
    }
  }

  async get(id) {
    try {
      const items = await this.model.findById(id).select(['-password']);
      return {
        error: false,
        statusCode: 200,
        data: items,
      };
    } catch (errors) {
      return {
        error: true,
        statusCode: 500,
        errors,
      };
    }
  }

  async getOne(where) {
    try {
      const items = await this.model.findOne(where).select(['-password']);
      return {
        error: false,
        statusCode: 200,
        data: items,
      };
    } catch (errors) {
      return {
        error: true,
        statusCode: 500,
        errors,
      };
    }
  }

  async getAllWithCondition(where) {
    try {
      const items = await this.model.find(where).select(['-password']);
      return {
        error: false,
        statusCode: 200,
        data: items,
      };
    } catch (errors) {
      return {
        error: true,
        statusCode: 500,
        errors,
      };
    }
  }
}

export default Service;
