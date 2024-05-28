const { Schema, SchemaTypes } = require("verse.db");
const { db } = require("../Data/.config/BlogDB.versedb");

const PostsSchemaFileds = {
  title: {
    type: SchemaTypes.String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  description: {
    type: SchemaTypes.String,
    minlength: 20,
    maxlength: 150,
    required: false,
    default: ""
  },
  content: { type: SchemaTypes.String, required: false,
    default: "" },
  tags: {
    type: SchemaTypes.Array,
    required: false,
    minlength: 0,
    maxlength: 5,
    schema: {
      stringField: { type: SchemaTypes.String },
      numberField: { type: SchemaTypes.Number },
    },
    default: []
  },
  cover: {
    type: SchemaTypes.String,
    required: false,
    default: ""
  },
};

const PostsSchema = new Schema(PostsSchemaFileds);

module.exports = db.model("posts", PostsSchema);
