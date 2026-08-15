/**
 * Generates assets/stack.svg: a categorised chip grid of the technical stack,
 * every chip carrying a mark.
 *
 * Three kinds of mark, because "a logo for everything" is not actually
 * available:
 *
 *   1. Real brand logo, from simple-icons, in the brand's own colour.
 *   2. Monogram tile, for brands simple-icons has dropped over trademark.
 *      AWS, Azure, Oracle, dbt, Pinecone, Tableau and Power BI are all in this
 *      group, which is the same reason the old shields.io badges rendered
 *      blank. A coloured monogram reads as deliberate where a missing glyph
 *      read as broken.
 *   3. Outlined diamond, for methods. Star Schema and SCD Type 2 have no logo
 *      because they are not products, and inventing one would be worse than
 *      marking them honestly as techniques.
 *
 * Layout is computed, so adding an entry is one line and rows re-wrap.
 */
import { writeFileSync } from "node:fs";
import { createRequire } from "node:module";

// Resolved from this repo's own node_modules. An earlier version pointed at an
// absolute path on one machine, which meant the script only ran there.
const require = createRequire(import.meta.url);
const si = require("simple-icons");

/** simple-icons exports siPascalcase of the lowercase alphanumeric slug. */
const icon = (slug) => si["si" + slug.replace(/^./, (c) => c.toUpperCase())];

/**
 * name: [simple-icons slug] | {mono, hex} | null for a method.
 * Where a sub-product has no mark of its own it borrows its platform's, which
 * is how Delta Live Tables shows the Databricks logo.
 */
const MARKS = {
  Python: "python", TypeScript: "typescript", R: "r", Java: "openjdk",
  SQL: { mono: "SQL", hex: "#4479A1" }, "PL/SQL": { mono: "PL", hex: "#F80000" },

  Databricks: "databricks", Snowflake: "snowflake", "Apache Spark": "apachespark",
  PySpark: "apachespark", "Delta Live Tables": "databricks", "Auto Loader": "databricks",
  "Unity Catalog": "databricks", Snowpark: "snowflake",

  "Apache Airflow": "apacheairflow", "Azure Data Factory": { mono: "ADF", hex: "#0078D4" },
  dbt: { mono: "dbt", hex: "#FF694B" }, "Snowflake Tasks": "snowflake",
  "Snowflake Streams": "snowflake", "GitHub Actions": "githubactions",

  "Dimensional Modelling": null, "Star Schema": null, "SCD Type 2": null,
  Normalisation: null, "Data Quality": null, DQX: "databricks", Parquet: "apacheparquet",

  Oracle: { mono: "OR", hex: "#F80000" }, PostgreSQL: "postgresql",
  "Azure SQL": { mono: "AZ", hex: "#0078D4" }, "Stored Procedures": null, RBAC: null,

  PyTorch: "pytorch", TensorFlow: "tensorflow", "scikit-learn": "scikitlearn",
  "Hugging Face": "huggingface", LoRA: "huggingface", PEFT: "huggingface",
  PPO: null, "Deep Q-Networks": null, "Thompson Sampling": null, Gymnasium: "openaigym",

  LangGraph: "langchain", LangChain: "langchain", CrewAI: "crewai",
  MCP: "modelcontextprotocol", RAG: null, Pinecone: { mono: "PC", hex: "#5C5CFF" },
  ChromaDB: { mono: "CH", hex: "#FF6F61" }, "OpenAI Embeddings": { mono: "AI", hex: "#8ba4ff" },

  "Mistral OCR": "mistralai", Docling: { mono: "DL", hex: "#0F62FE" }, PyMuPDF: "python",
  "Azure Document Intelligence": { mono: "DI", hex: "#0078D4" },

  AWS: { mono: "AWS", hex: "#FF9900" }, Azure: { mono: "AZ", hex: "#0078D4" },
  GCP: "googlecloud", S3: { mono: "S3", hex: "#569A31" },
  "Key Vault": { mono: "KV", hex: "#0078D4" }, "Cloud Run": "googlecloud",
  Docker: "docker", Kubernetes: "kubernetes", FastAPI: "fastapi",
  Streamlit: "streamlit", Vercel: "vercel",

  Tableau: { mono: "TB", hex: "#E97627" }, "Power BI": { mono: "PBI", hex: "#F2C811" },
  Alteryx: { mono: "AX", hex: "#0078C8" },
};

const GROUPS = [
  ["Languages", ["Python", "SQL", "PL/SQL", "TypeScript", "Java", "R"]],
  ["Data platforms", ["Databricks", "Snowflake", "Apache Spark", "PySpark", "Delta Live Tables", "Auto Loader", "Unity Catalog", "Snowpark"]],
  ["Orchestration", ["Apache Airflow", "Azure Data Factory", "dbt", "Snowflake Tasks", "Snowflake Streams", "GitHub Actions"]],
  ["Modelling", ["Dimensional Modelling", "Star Schema", "SCD Type 2", "Normalisation", "Data Quality", "DQX", "Parquet"]],
  ["Databases", ["Oracle", "PostgreSQL", "Azure SQL", "Stored Procedures", "RBAC"]],
  ["ML and RL", ["PyTorch", "TensorFlow", "scikit-learn", "Hugging Face", "LoRA", "PEFT", "PPO", "Deep Q-Networks", "Thompson Sampling", "Gymnasium"]],
  ["Agents and retrieval", ["LangGraph", "LangChain", "CrewAI", "MCP", "RAG", "Pinecone", "ChromaDB", "OpenAI Embeddings"]],
  ["Document AI", ["Mistral OCR", "Docling", "PyMuPDF", "Azure Document Intelligence"]],
  ["Cloud and serving", ["AWS", "Azure", "GCP", "S3", "Key Vault", "Cloud Run", "Docker", "Kubernetes", "FastAPI", "Streamlit", "Vercel"]],
  ["Analytics", ["Tableau", "Power BI", "Alteryx"]],
];

const W = 880, PAD = 40, LABEL_W = 168;
const CHIP_H = 28, MARK = 14, MARK_GAP = 7, CHIP_GAP = 7, ROW_GAP = 9, GROUP_GAP = 16;
const FONT = 11.5;

const textWidth = (s) => {
  let w = 0;
  for (const ch of s) {
    if (/[A-Z0-9]/.test(ch)) w += FONT * 0.64;
    else if (/[ilIjt.,'\-]/.test(ch)) w += FONT * 0.31;
    else if (/[mwMW]/.test(ch)) w += FONT * 0.86;
    else w += FONT * 0.545;
  }
  return w;
};
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const stats = { logo: 0, mono: 0, method: 0, lightened: 0 };

/** Draws the 14px mark at (x, y), top-left aligned. */
function mark(name, x, y) {
  const spec = MARKS[name];
  if (typeof spec === "string") {
    const ic = icon(spec);
    if (ic) {
      stats.logo++;
      const s = MARK / 24;
      // Several brands are pure black (Java via OpenJDK, MCP, Vercel), which is
      // invisible on a #101116 chip. Anything below a luminance floor is drawn
      // in the body text colour instead of its brand colour.
      const [r, g, b] = [0, 2, 4].map((i) => parseInt(ic.hex.slice(i, i + 2), 16) / 255);
      const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      const fill = lum < 0.18 ? "#c9cad2" : `#${ic.hex}`;
      if (lum < 0.18) stats.lightened++;
      return `<g transform="translate(${x},${y}) scale(${s.toFixed(4)})"><path d="${ic.path}" fill="${fill}"/></g>`;
    }
  }
  if (spec && typeof spec === "object") {
    stats.mono++;
    const fs = spec.mono.length >= 3 ? 6.4 : 7.6;
    return `<g transform="translate(${x},${y})"><rect width="${MARK}" height="${MARK}" rx="3.5" fill="${spec.hex}" opacity="0.16"/>` +
      `<text x="${MARK / 2}" y="${MARK / 2 + 3.1}" text-anchor="middle" font-size="${fs}" font-weight="700" fill="${spec.hex}">${esc(spec.mono)}</text></g>`;
  }
  stats.method++;
  // A method, not a product. Outlined diamond, deliberately quiet.
  const c = MARK / 2;
  return `<g transform="translate(${x},${y})"><path d="M${c} 2.4 L${MARK - 2.4} ${c} L${c} ${MARK - 2.4} L2.4 ${c} Z" fill="none" stroke="#5a5a64" stroke-width="1.3"/></g>`;
}

const chipsX = PAD + LABEL_W, chipsMax = W - PAD;
let y = 88, body = "", delay = 0.15;

for (const [label, items] of GROUPS) {
  const startY = y;
  let x = chipsX, lines = 1, chips = "";

  for (const item of items) {
    const w = Math.round(12 + MARK + MARK_GAP + textWidth(item) + 12);
    if (x + w > chipsMax) { x = chipsX; y += CHIP_H + ROW_GAP; lines++; }
    chips +=
      `      <g opacity="1"><animate attributeName="opacity" values="0;1" dur="0.45s" begin="${delay.toFixed(2)}s" fill="freeze"/>` +
      `<rect x="${x}" y="${y}" width="${w}" height="${CHIP_H}" rx="6.5" fill="#101116" stroke="#22242e"/>` +
      mark(item, x + 12, y + (CHIP_H - MARK) / 2) +
      `<text x="${x + 12 + MARK + MARK_GAP}" y="${y + 18.5}" font-size="${FONT}" fill="#c9cad2">${esc(item)}</text></g>\n`;
    x += w + CHIP_GAP;
    delay += 0.012;
  }

  const labelY = startY + ((lines - 1) * (CHIP_H + ROW_GAP)) / 2 + 19;
  body += `    <text x="${PAD}" y="${labelY}" font-family="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace" ` +
    `font-size="10" letter-spacing="1.2" fill="#5a5a64">${esc(label.toUpperCase())}</text>\n${chips}`;
  y += CHIP_H + GROUP_GAP;
  delay += 0.03;
}

const H = y + PAD - GROUP_GAP;
const count = GROUPS.reduce((n, [, i]) => n + i.length, 0);

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Technical stack. ${GROUPS.map(([l, i]) => `${l}: ${i.join(", ")}`).join(". ")}.">
  <title>Technical stack</title>
  <!-- GENERATED by scripts/build-stack.mjs. Edit that, not this file. -->
  <clipPath id="cardT"><rect width="${W}" height="${H}" rx="14"/></clipPath>

  <g clip-path="url(#cardT)" font-family="Helvetica Neue, Helvetica, Arial, sans-serif">
    <rect width="${W}" height="${H}" fill="#08090b"/>

    <text x="${PAD}" y="44" font-family="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
          font-size="11.5" letter-spacing="2" fill="#5a5a64">TECHNICAL STACK</text>
    <text x="${W - PAD}" y="44" text-anchor="end" font-family="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
          font-size="10" letter-spacing="1.2" fill="#3f4048">${count} &#183; USED IN SHIPPED WORK</text>
    <line x1="${PAD}" y1="62" x2="${W - PAD}" y2="62" stroke="#1a1b22" stroke-width="1"/>

${body}
    <rect width="${W}" height="${H}" rx="14" fill="none" stroke="#212229" stroke-width="1"/>
  </g>
</svg>
`;

writeFileSync(new URL("../assets/stack.svg", import.meta.url), svg);
console.log(
  `stack.svg: ${count} entries across ${GROUPS.length} groups, ${H}px tall\n` +
    `  ${stats.logo} brand logos (${stats.lightened} lightened for contrast), ${stats.mono} monograms, ${stats.method} methods`,
);
