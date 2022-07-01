const { StatusCodes } = require('http-status-codes');
const Board = require('../models/board.model');
const Stage = require('../models/stage.model');

exports.create = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: 'please provide name',
    });
  }

  if (!req.userId) {
    return res.status(StatusCodes.FORBIDDEN).json({
      msg: 'Unauthorized',
    });
  }

  const board = new Board({
    name,
    user: req.userId,
  });

  await board.save();

  res.status(StatusCodes.CREATED).json(board);
};

// add Stage
exports.addStage = async (req, res) => {
  const { name } = req.body;
  const { boardId } = req.params;

  if (!req.userId) {
    return res.status(StatusCodes.FORBIDDEN).json({
      msg: 'Unauthorized',
    });
  }

  if (!name) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: 'please provide name',
    });
  }

  const stage = new Stage({
    name,
    board: boardId,
  });

  await stage.save();

  res.status(StatusCodes.CREATED).json({ stage });
};

exports.addJob = async (req, res) => {
  const { stageId } = req.params;
  const { company, title } = req.body;

  if (!req.userId) {
    return res.status(StatusCodes.FORBIDDEN).json({
      msg: 'Unauthorized',
    });
  }

  if (!company) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: 'please provide company',
    });
  }

  if (!title) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: 'please provide title',
    });
  }

  const addedJob = await Stage.findOneAndUpdate(
    { _id: stageId },
    {
      $push: { jobs: req.body },
    },
    {
      new: true,
    }
  );

  res.status(StatusCodes.CREATED).json({ addedJob });
};

exports.getBoards = async (req, res) => {
  const { userId } = req.params;

  if (userId != req.userId) {
    return res.status(StatusCodes.FORBIDDEN).json({
      msg: 'Unauthorized',
    });
  }

  const boards = await Board.find({ user: userId });

  res.status(StatusCodes.OK).json({
    // count: boards.length,
    boards,
  });
};

exports.getStages = async (req, res) => {
  const { boardId } = req.params;

  if (!req.userId) {
    return res.status(StatusCodes.FORBIDDEN).json({
      msg: 'Unauthorized',
    });
  }

  const stages = await Stage.find({ board: boardId });

  res.status(StatusCodes.OK).json({
    count: stages.length,
    stages,
  });
};
