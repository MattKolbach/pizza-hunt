const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

//pizza schema object
const PizzaSchema = new Schema(
  {
    pizzaName: {
      type: String,
      required: 'You forgot to name your pizza.', //or true
      trim: true,
    },
    createdBy: {
      type: String,
      required: 'Who is making this pizza?', //or true
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    },
    size: {
      type: String,
      required: true, //can't do a custom here without a custom function
      enum: ['Personal', 'Small', 'Medium', 'Large', 'Extra Large'],
      default: 'Large'
    },
    toppings: [],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
      }
    ]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    // prevents virtuals from creating duplicate of _id as `id`
    id: false
  }
);

// get total count of comments and replies on retrieval
PizzaSchema.virtual('commentCount').get(function() {
  return this.comments.reduce(
    (total, comment) => total + comment.replies.length + 1,
    0
  );
});

const Pizza = model('Pizza', PizzaSchema);

module.exports = Pizza;
