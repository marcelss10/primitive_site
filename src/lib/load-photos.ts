import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const uploadsDir = path.join(process.cwd(), "public/uploads");

  if (!fs.existsSync(uploadsDir)) {
    return res.status(200).json({ photos: [] });
  }

  // Lê todas as subpastas (eventos)
  const folders = fs.readdirSync(uploadsDir).filter(f =>
    fs.statSync(path.join(uploadsDir, f)).isDirectory()
  );

  const photos = [];

  folders.forEach(folder => {
    const files = fs.readdirSync(path.join(uploadsDir, folder))
      .filter(f => /\.jpg$/i.test(f)); // só JPG

    files.forEach((file, idx) => {
      photos.push({
        id: `${folder}-${idx}`,
        src: `/uploads/${folder}/${file}`,
        alt: `${folder} ${idx + 1}`,
        event: folder,
        date: new Date().toLocaleDateString(),
        likes: 0,
        downloads: 0,
      });
    });
  });

  res.status(200).json({ photos });
}
