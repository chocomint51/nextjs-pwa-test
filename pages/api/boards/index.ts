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

      const allBoards = await boards.find({});

      res.status(200).json(allBoards);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else if (req.method === "POST") {
    try {
      dbConnect();
      const boards = Board;
      const { title, content } = req.body;
      const board = new boards({ title, content });
      await board.save();
      res.status(200).json({ message: "Board created successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else if (req.method === "OPTIONS") {
    res.status(200).end();
  }
}
