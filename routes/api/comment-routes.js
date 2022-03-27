const router = require('express').Router();
const { addComment, removeComment, addReply, removeReply } = require('../../controllers/comment-controller');

//POST route /api/comments/<pizzaId>
router
.route('/:pizzaId')
.post(addComment);

//DELETE route /api/comments/<pizzaId>/<commentId>
router
.route('/:pizzaId/:commentId')
.put(addReply)//PUT route (replies to comments) /api/comments/<pizzaId>/<commentId>
.delete(removeComment);

//DELETE route (reply to comment) "Go to this pizza, then look at this particular comment, then delete this one reply."
router
.route('/:pizzaId/:commentId/:replyId')
.delete(removeReply);



module.exports = router;
