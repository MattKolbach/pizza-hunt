//import dependencies
const dateFormat = require('../utils/dateFormat'); //links to file so we can call dateFormat()
const { Schema, model } = require("mongoose");
//Schema constructor, model function imported

//create the schema
const PizzaSchema = new Schema(
  {
    pizzaName: {
      type: String,
    },
    createdBy: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal) //every time we retrieve a pizza, the createdAt value will be formatted by the dateFormat() function (dateFormat.js)
    },
    size: {
      type: String,
      default: "Large",
    },
    toppings: [],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  
  {
    toJSON: {
      virtuals: true, //this lets PizzaSchema know it can use virtuals
      getters: true //this lets PizzaSchema know it should use getters (see createdAt get:)
    },
    id: false,
  }
);

//get total count of comments and replies on retrieval
PizzaSchema.virtual("commentCount").get(function () {
  return this.comments.length;
});

//create the Pizza model using the PizzaSchema
const Pizza = model("Pizza", PizzaSchema);

//export the Pizza model
module.exports = Pizza;
