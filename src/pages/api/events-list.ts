import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

const eventsFile = path.join(process.cwd(), "events.json");

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!fs.existsSync(eventsFile)) fs.writeFileSync(eventsFile, JSON.stringify({ events: [] }, null, 2));
  const data = fs.readFileSync(eventsFile, "utf-8");
  res.status(200).json(JSON.parse(data));
}
