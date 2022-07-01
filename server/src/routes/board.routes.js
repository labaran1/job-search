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

router.post('/create', AuthMiddleware, create);
router.post('/addStage/:boardId', AuthMiddleware, addStage);
router.post('/addJob/:stageId', AuthMiddleware, addJob);
router.get('/getBoards/:userId', AuthMiddleware, getBoards);
router.get('/getStages/:boardId', AuthMiddleware, getStages);

module.exports = router;
