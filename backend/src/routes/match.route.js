import { Router } from "express";
import {
  createMatchSchema,
  listMatchQuerySchema,
} from "../validation/match.validation.js";
import { getMatchStatus } from "../utils/matchStatus.util.js";
import { prisma } from "../db/PrismaClient.js";

export const matchRouter = Router();

const MAX_LIMIT = 100;

//------------------------------------
matchRouter.get("/", async (req, res) => {
  const parsed = listMatchQuerySchema.safeParse(req.query);

  if (!parsed.success) {
    return res.status(400).json({
      error: "Invalid Query.",
      details: JSON.stringify(parsed.error.issues),
    });
  }

  const limit = Math.min(parsed.data.limit ?? 50, MAX_LIMIT);

  try {
    const data = await prisma.match.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
    });

    res.status(200).json({ data });
  } catch (err) {
    res.status(500).json({ error: "Failed to list matches." });
  }
});

//---------------------------------------------
matchRouter.post("/", async (req, res) => {
  const parsed = createMatchSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      error: "Invalid Payload",
      details: JSON.stringify(parsed.error.issues),
    });
  }
  try {
    const user = await prisma.match.create({
      data: {
        ...parsed.data,
        startTime: new Date(parsed.data.startTime),
        endTime: new Date(parsed.data.endTime),
        homeScore: parsed.data.homeScore ?? 0,
        awayScore: parsed.data.awayScore ?? 0,
        status: getMatchStatus(parsed.data.startTime, parsed.data.endTime),
      },
    });

    res.status(201).json({ data: user });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: "Failed to create match.", details: JSON.stringify(err) });
  }
});
