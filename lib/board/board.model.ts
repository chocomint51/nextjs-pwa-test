import mongoose, { Schema, models } from "mongoose";

export const BoardSchema = new Schema({
  seq: {
    type: Number,
    default: 0,
  },
  boardId: {
    type: Number,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const Board = models?.Board || mongoose.model("Board", BoardSchema);
export default Board;
