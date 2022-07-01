const express = require('express');
const {
  create,
  addStage,
  addJob,
  getBoards,
  getStages,
} = require('../controllers/board.controller');
const AuthMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/create', create);
router.post('/addStage/:boardId', addStage);
router.post('/addJob/:stageId', addJob);
router.get('/getBoards/:userId', getBoards);
router.get('/getStages/:boardId', getStages);

module.exports = router;
