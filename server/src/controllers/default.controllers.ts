import { RequestHandler } from "express";
import { apiKey } from "../main";
import { getZonesService } from "../services/zones.service";

export const getDefault: RequestHandler = async (req, res, next) => {
  const reqApiKey = req.header("api-key");
  if (reqApiKey !== apiKey) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  res.status(200);
};