const express = require("express");
const fs = require("node:fs");

const router = express.Router();

const VIDEO_1 =
  "/Users/pnonghanvadra/Desktop/Other/Movies/Panchyat - Season 3/Panchayat.S03E01.Rangbaazi.1080p.AMZN.WEB-DL.DDP5.1.H.264.Vegamovies.to.mkv";

const VIDEO_2 =
  "/Users/pnonghanvadra/Desktop/Other/Movies/sample_video-mp4.mp4";

router.route("/video").get(async (req, res) => {
  const range = req.headers.range || "";

  if (!range) {
    return res.status(400).json({ message: "Requires Range header" });
  }

  const videoSize = fs.statSync(VIDEO_2).size;

  const CHUNK_SIZE = 10 ** 6; // 1MB
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

  const contentLength = end - start + 1;

  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };

  res.writeHead(206, headers);

  const videoStream = fs.createReadStream(VIDEO_2, { start, end });

  videoStream.pipe(res);
});

module.exports = router;
