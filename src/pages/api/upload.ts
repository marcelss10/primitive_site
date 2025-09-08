import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import fs from "fs";
import path from "path";
import sharp from "sharp";

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadDir = path.join(process.cwd(), "public/uploads");

// garante que a pasta existe
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end("Method Not Allowed");

  const form = formidable({ multiples: true, uploadDir, keepExtensions: true });

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: err.message });

    const uploadedFiles: string[] = [];

    const fileArray = Array.isArray(files.file) ? files.file : [files.file];

    for (const file of fileArray) {
      const oldPath = file.filepath;
      const newFileName = `${Date.now()}-${file.originalFilename}`;
      const newPath = path.join(uploadDir, newFileName);

      // aplica marca d’água
      await sharp(oldPath)
        .composite([{
          input: Buffer.from(
            `<svg height="100" width="500">
              <text x="0" y="80" font-size="60" fill="white" opacity="0.6">PRIMITIVE</text>
            </svg>`
          ),
          gravity: "southeast"
        }])
        .toFile(newPath);

      fs.unlinkSync(oldPath); // remove arquivo temporário
      uploadedFiles.push(`/uploads/${newFileName}`);
    }

    return res.status(200).json({ files: uploadedFiles });
  });
}
