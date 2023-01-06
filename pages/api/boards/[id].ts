import type { NextApiRequest, NextApiResponse } from "next";
import Board from "../../../lib/board/board.model";
import dbConnect from "../../../lib/db/dbConnect";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    try {
      dbConnect();
      const boards = Board;
      const id = req.query.id;
      console.log("id", id);

      const board = await boards.find({ _id: id });

      res.status(200).json(board);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else if (req.method === "PUT") {
    try {
      dbConnect();
      const boards = Board;
      const id = req.query.id;
      const { title, content } = req.body;
      const board = await boards.findOneAndUpdate(
        {
          _id: id,
        },
        {
          title,
          content,
        },
        {
          new: true,
        },
      );
      res.status(200).json({ message: "Board updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else if (req.method === "DELETE") {
    try {
      dbConnect();
      const boards = Board;
      const id = req.query.id;
      const board = await boards.findOne({
        _id: id,
      });
      await board.remove();
      res.status(200).json({ message: "Board deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else if (req.method === "OPTIONS") {
    res.status(200).end();
  }
}
