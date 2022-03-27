const { Schema, model, Types } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const ReplySchema = new Schema(
  {
    //set custom id to avoid confusion with parent comment _id
    replyId: {
      type: Schema.Types.ObjectId, //this comes from importing the Types object from mongoose
      default: () => new Types.ObjectId(),
    },
    replyBody: {
      type: String,
    },
    writtenBy: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal), //getter
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const CommentSchema = new Schema(
  {
    writtenBy: {
      type: String,
    },
    commentBody: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal), //getter
    },
    //use ReplySchema to validate data for a reply
    replies: [ReplySchema],
  },
  {
    toJSON: {
      virtuals: true, //reply count is the virtual
      getters: true,
    },
    id: false,
  }
);

CommentSchema.virtual('replyCount').get(function() {
    return this.replies.length;
});


const Comment = model("Comment", CommentSchema);

module.exports = Comment;
