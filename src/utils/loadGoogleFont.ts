import { readFile } from "node:fs/promises";

async function loadGoogleFont(
  font: string,
  text: string,
  weight: number
): Promise<ArrayBuffer | null> {
  const API = `https://fonts.googleapis.com/css2?family=${font}:wght@${weight}&text=${encodeURIComponent(text)}`;

  try {
    const css = await (
      await fetch(API, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1",
        },
      })
    ).text();

    const resource = css.match(
      /src: url\((.+?)\) format\('(opentype|truetype)'\)/
    );

    if (!resource) return null;

    const res = await fetch(resource[1]);

    if (!res.ok) return null;

    return res.arrayBuffer();
  } catch {
    return null;
  }
}

async function loadGoogleFonts(
  text: string
): Promise<
  Array<{ name: string; data: ArrayBuffer; weight: number; style: string }>
> {
  const fontsConfig = [
    {
      name: "IBM Plex Mono",
      font: "IBM+Plex+Mono",
      weight: 400,
      style: "normal",
    },
    {
      name: "IBM Plex Mono",
      font: "IBM+Plex+Mono",
      weight: 700,
      style: "bold",
    },
  ];

  const fonts = await Promise.all(
    fontsConfig.map(async ({ name, font, weight, style }) => {
      const data = await loadGoogleFont(font, text, weight);
      return data ? { name, data, weight, style } : null;
    })
  );

  const resolvedFonts = fonts.filter(font => font !== null);
  if (resolvedFonts.length > 0) return resolvedFonts;

  // Fallback for offline builds where Google Fonts cannot be fetched.
  const localFallbackFonts = [
    {
      name: "DejaVu Sans",
      path: "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
      weight: 400,
      style: "normal",
    },
    {
      name: "DejaVu Sans",
      path: "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
      weight: 700,
      style: "bold",
    },
  ] as const;

  const fallbackFonts = await Promise.all(
    localFallbackFonts.map(async font => {
      try {
        const file = await readFile(font.path);
        return {
          name: font.name,
          data: file.buffer.slice(
            file.byteOffset,
            file.byteOffset + file.byteLength
          ),
          weight: font.weight,
          style: font.style,
        };
      } catch {
        return null;
      }
    })
  );

  return fallbackFonts.filter(font => font !== null);
}

export default loadGoogleFonts;
