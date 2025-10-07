// scripts/addWatermark.js
import sharp from "sharp";
import fs from "fs";
import path from "path";

const folders = ["evento_downhill", "corrida_bh"];
const uploadsDir = path.join(process.cwd(), "public/uploads");

async function addWatermark() {
  for (const folder of folders) {
    const folderPath = path.join(uploadsDir, folder);
    const files = fs.readdirSync(folderPath).filter(f => /\.(jpe?g|png)$/i.test(f));

    for (const file of files) {
      const filePath = path.join(folderPath, file);
      const outputPath = path.join(folderPath, file); // sobrescreve a mesma foto

      const image = sharp(filePath);
      const { width, height } = await image.metadata();

      // Cria uma marca d'água SVG
      const svg = `
        <svg width="${width}" height="${height}">
          <text x="50%" y="50%" font-size="80" text-anchor="middle" fill="rgba(255,255,255,0.4)" font-family="Arial" dy=".35em">PRIMITIVE</text>
        </svg>
      `;

      await image
        .composite([{ input: Buffer.from(svg), gravity: "center" }])
        .toFile(outputPath);

      console.log(`Marca d'água aplicada em ${folder}/${file}`);
    }
  }
  console.log("Todas as fotos processadas!");
}

addWatermark();
