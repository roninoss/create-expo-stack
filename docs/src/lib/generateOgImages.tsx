import satori, { type SatoriOptions } from "satori";
import { Resvg } from "@resvg/resvg-js";
import { type CollectionEntry } from "astro:content";
import postOgImage from "./og-templates/post";
import fs from "fs";
import path from "path";

const fetchFonts = async () => {
  // Bold Font
  const fontBold = fs.readFileSync(
    path.resolve("./public/fonts/Inter-ExtraBold.ttf"),
  );
  return { fontBold };
};

const { fontBold } = await fetchFonts();

const options: SatoriOptions = {
  width: 1200,
  height: 630,
  embedFont: true,
  fonts: [
    {
      name: "Inter-ExtraBold",
      data: fontBold,
      weight: 600,
      style: "normal",
    },
  ],
};

function svgBufferToPngBuffer(svg: string) {
  const resvg = new Resvg(svg);
  const pngData = resvg.render();
  return pngData.asPng();
}

export async function generateOgImageForPost(post: CollectionEntry<"docs">) {
  const svg = await satori(postOgImage(post), options);
  return svgBufferToPngBuffer(svg);
}
