import type { NextApiRequest, NextApiResponse } from "next";
import Board from "../../../lib/board/board.model";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = Number(req.query.id);
  const boards = Board;
  console.log("id", id);
  const board = boards.find({ id });

  if (board) {
    res.status(200).json([board]);
  } else {
    res.status(404).end();
  }
}
