import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import formidable, { File } from "formidable";

export const config = {
  api: {
    bodyParser: false, // obrigatória para upload de arquivos
  },
};

const uploadDir = path.join(process.cwd(), "public", "uploads");

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método não permitido" });
  }

  const form = formidable({ multiples: true, uploadDir: uploadDir, keepExtensions: true });

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ message: err.message });

    const eventSlug = fields.event as string;
    if (!eventSlug) return res.status(400).json({ message: "Evento não informado" });

    const eventPath = path.join(uploadDir, eventSlug);
    if (!fs.existsSync(eventPath)) fs.mkdirSync(eventPath, { recursive: true });

    const uploadedFiles: File[] = Array.isArray(files.file) ? files.file : [files.file as File];

    uploadedFiles.forEach(file => {
      const oldPath = file.filepath;
      const newPath = path.join(eventPath, file.originalFilename || file.newFilename);
      fs.renameSync(oldPath, newPath);
    });

    return res.status(200).json({ message: `${uploadedFiles.length} arquivo(s) enviado(s)` });
  });
};

export default handler;
