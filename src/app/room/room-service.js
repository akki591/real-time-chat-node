import mongoose from 'mongoose';
import Service from '../Service';

class RoomService extends Service {
  constructor(model) {
    super(model);
  }

  async getAll(userId) {
    try {
      const rooms = await this.model.aggregate([
        {
          $match: {
            users: {
              $elemMatch: {
                $eq: mongoose.Types.ObjectId(userId),
              },
            },
          },
        },
        {
          $addFields: {
            userId: {
              $arrayElemAt: [
                {
                  $filter: {
                    input: '$users',
                    as: 'user',
                    cond: { $ne: ['$$user', mongoose.Types.ObjectId(userId)] },
                  },
                },
                0,
              ],
            },
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'user',
          },
        },
        {
          $lookup: {
            from: 'messages',
            let: { roomId: '$_id' },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ['$roomId', '$$roomId'] },
                },
              },
              {
                $sort: { createdAt: -1 },
              },
              {
                $limit: 1,
              },
            ],
            as: 'message',
          },
        },
        {
          $lookup: {
            from: 'messages',
            let: { roomId: '$_id', receiverId: mongoose.Types.ObjectId(userId) },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ['$roomId', '$$roomId'] },
                      { $eq: ['$receiver', '$$receiverId'] },
                      { $eq: ['$isView', false] },
                    ],
                  },
                },
              },
              {
                $count: 'count',
              },
            ],
            as: 'unreadCount',
          },
        },
        {
          $project: {
            _id: 1,
            unreadCount: {
              $cond: {
                if: { $eq: [{ $size: '$unreadCount' }, 0] },
                then: 0,
                else: { $arrayElemAt: ['$unreadCount.count', 0] },
              },
            },
            user: {
              $arrayElemAt: [
                {
                  $map: {
                    input: '$user',
                    as: 'u',
                    in: {
                      _id: '$$u._id',
                      firstName: '$$u.firstName',
                      lastName: '$$u.lastName',
                      userName: '$$u.userName',
                      createdAt: '$$u.createdAt',
                      updatedAt: '$$u.updatedAt',
                      __v: '$$u.__v',
                    },
                  },
                },
                0,
              ],
            },
            message: { $arrayElemAt: ['$message', 0] },
            createdAt: 1,
            updatedAt: 1,
            __v: 1,
          },
        },
      ]);

      const response = {
        error: false,
        statusCode: 200,
        data: rooms,
      };
      return response;
    } catch (err) {
      const response = {
        error: true,
        statusCode: 400,
        message: 'Something went wrong, Please try again.',
        errors: err,
      };
      return response;
    }
  }
}

export default RoomService;
