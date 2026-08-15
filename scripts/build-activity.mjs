/**
 * Generates assets/activity.svg: two live charts from the GitHub API.
 *
 * Left, contribution activity by month over the last year. Right, the language
 * mix across work actually pushed recently.
 *
 * Two honesty decisions are baked in.
 *
 * Jupyter Notebook is folded into Python. GitHub counts them separately, which
 * splits one skill in half and lets "Jupyter Notebook 44%" read as though it
 * were a language. Notebook byte counts are also inflated by embedded output
 * images, so the split is misleading in both directions.
 *
 * The language mix covers repositories pushed since 2024 rather than all 54.
 * Measured across everything, the chart is dominated by 2018 coursework: R
 * Markdown knits alone put HTML at 20%, which describes a student rather than
 * the work. The window is stated on the card so the scoping is visible.
 */
import { writeFileSync } from "node:fs";

const ACCOUNTS = ["vedantmane12", "vedantmane"];
const PRIMARY = "vedantmane12";
const SINCE_YEAR = "2024";

const token = process.env.GITHUB_TOKEN;
const headers = {
  Accept: "application/vnd.github+json",
  "User-Agent": "vedantmane12-profile",
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
};

async function repos(user) {
  const out = [];
  for (let page = 1; page <= 4; page++) {
    const res = await fetch(`https://api.github.com/users/${user}/repos?per_page=100&page=${page}`, { headers });
    if (!res.ok) throw new Error(`${user}: ${res.status}`);
    const batch = await res.json();
    out.push(...batch);
    if (batch.length < 100) break;
  }
  return out;
}

/** Monthly contribution counts for the last 12 months. Needs a token. */
async function contributionsByMonth(user) {
  if (!token) return null;
  const to = new Date();
  // Exactly 365 days, not "the first of this month a year ago". That version
  // spanned up to 379 days, and contributionsCollection rejects any range over
  // a year, so the query errored and the card silently fell back every run.
  const from = new Date(to.getTime() - 364 * 86400000);
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `query($login:String!,$from:DateTime!,$to:DateTime!){
        user(login:$login){contributionsCollection(from:$from,to:$to){
          contributionCalendar{weeks{contributionDays{date contributionCount}}}}}}`,
      variables: { login: user, from: from.toISOString(), to: to.toISOString() },
    }),
  });
  if (!res.ok) {
    console.warn(`[activity] contributions query HTTP ${res.status}`);
    return null;
  }
  const json = await res.json();
  if (json.errors) console.warn("[activity] GraphQL errors:", JSON.stringify(json.errors));
  const weeks = json?.data?.user?.contributionsCollection?.contributionCalendar?.weeks;
  if (!weeks) {
    console.warn("[activity] no contribution calendar returned, falling back");
    return null;
  }
  const buckets = new Map();
  for (const w of weeks)
    for (const d of w.contributionDays)
      buckets.set(d.date.slice(0, 7), (buckets.get(d.date.slice(0, 7)) ?? 0) + d.contributionCount);
  return [...buckets.entries()].sort().slice(-12);
}

async function languageBytes(list) {
  const totals = new Map();
  for (const r of list) {
    try {
      const res = await fetch(r.languages_url, { headers });
      if (!res.ok) continue;
      for (const [k, v] of Object.entries(await res.json()))
        totals.set(k, (totals.get(k) ?? 0) + v);
    } catch {
      /* one repo failing should not lose the chart */
    }
  }
  // Notebooks are Python. Keeping them apart splits one skill in two.
  const nb = totals.get("Jupyter Notebook") ?? 0;
  if (nb) {
    totals.set("Python", (totals.get("Python") ?? 0) + nb);
    totals.delete("Jupyter Notebook");
  }
  return [...totals.entries()].sort((a, b) => b[1] - a[1]);
}

const all = (await Promise.all(ACCOUNTS.map(repos))).flat();
const own = all.filter((r) => !r.fork);
const recent = own.filter((r) => r.pushed_at.slice(0, 4) >= SINCE_YEAR);

let series = await contributionsByMonth(PRIMARY);
let seriesLabel = "CONTRIBUTIONS, LAST 12 MONTHS";
if (!series) {
  // Fallback with no token: repositories pushed per month, same shape, honest label.
  const b = new Map();
  const now = new Date();
  for (let i = 11; i >= 0; i--) {
    const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - i, 1));
    b.set(d.toISOString().slice(0, 7), 0);
  }
  for (const r of own) {
    const k = r.pushed_at.slice(0, 7);
    if (b.has(k)) b.set(k, b.get(k) + 1);
  }
  series = [...b.entries()];
  seriesLabel = "REPOSITORIES PUSHED, LAST 12 MONTHS";
}

const langs = await languageBytes(recent);
const langTotal = langs.reduce((n, [, v]) => n + v, 0) || 1;
const topLangs = langs.slice(0, 4);
const otherPct = 100 - topLangs.reduce((n, [, v]) => n + (100 * v) / langTotal, 0);

const W = 880, H = 250, PAD = 40;
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const MONTH = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

// ---- left panel: monthly bars ----
const chartX = PAD, chartW = 470, chartTop = 92, chartH = 96;
const peak = Math.max(1, ...series.map(([, v]) => v));
const slot = chartW / series.length;
const barW = Math.min(26, slot - 8);
let bars = "";
series.forEach(([month, value], i) => {
  const h = Math.max(2, Math.round((value / peak) * chartH));
  const x = Math.round(chartX + i * slot + (slot - barW) / 2);
  const y = chartTop + chartH - h;
  bars +=
    `      <g><rect x="${x}" y="${y}" width="${barW}" height="${h}" rx="3" fill="#3355ff" opacity="0.9">` +
    `<animate attributeName="height" from="0" to="${h}" dur="0.7s" begin="${(0.2 + i * 0.05).toFixed(2)}s" fill="freeze" calcMode="spline" keySplines="0.16 1 0.3 1"/>` +
    `<animate attributeName="y" from="${chartTop + chartH}" to="${y}" dur="0.7s" begin="${(0.2 + i * 0.05).toFixed(2)}s" fill="freeze" calcMode="spline" keySplines="0.16 1 0.3 1"/>` +
    `</rect>` +
    `<text x="${x + barW / 2}" y="${chartTop + chartH + 16}" text-anchor="middle" font-size="9" fill="#4a4b55">${MONTH[Number(month.slice(5, 7)) - 1]}</text></g>\n`;
});
const total = series.reduce((n, [, v]) => n + v, 0);

// ---- right panel: language mix ----
const lx = 570, lw = 270;
const COLORS = ["#8ba4ff", "#3355ff", "#4ade80", "#f0a500", "#5a5a64"];
let rows = "";
topLangs.forEach(([name, bytes], i) => {
  const pct = (100 * bytes) / langTotal;
  const y = 100 + i * 30;
  const w = Math.max(3, Math.round((pct / 100) * lw));
  rows +=
    `      <g><text x="${lx}" y="${y - 4}" font-size="11.5" fill="#c9cad2">${esc(name)}</text>` +
    `<text x="${lx + lw}" y="${y - 4}" text-anchor="end" font-family="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace" font-size="10.5" fill="#6e6e78">${pct.toFixed(1)}%</text>` +
    `<rect x="${lx}" y="${y}" width="${lw}" height="6" rx="3" fill="#15161c"/>` +
    `<rect x="${lx}" y="${y}" width="${w}" height="6" rx="3" fill="${COLORS[i]}">` +
    `<animate attributeName="width" from="0" to="${w}" dur="0.8s" begin="${(0.35 + i * 0.1).toFixed(2)}s" fill="freeze" calcMode="spline" keySplines="0.16 1 0.3 1"/></rect></g>\n`;
});

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${esc(seriesLabel.toLowerCase())}, ${total} total. Language mix across repositories pushed since ${SINCE_YEAR}: ${topLangs.map(([n, b]) => `${n} ${((100 * b) / langTotal).toFixed(0)} percent`).join(", ")}.">
  <title>GitHub activity</title>
  <!-- GENERATED by scripts/build-activity.mjs. Edit that, not this file. -->
  <clipPath id="cardA"><rect width="${W}" height="${H}" rx="14"/></clipPath>

  <g clip-path="url(#cardA)" font-family="Helvetica Neue, Helvetica, Arial, sans-serif">
    <rect width="${W}" height="${H}" fill="#08090b"/>

    <text x="${PAD}" y="44" font-family="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
          font-size="11.5" letter-spacing="2" fill="#5a5a64">${esc(seriesLabel)}</text>
    <text x="${PAD}" y="72" font-size="26" font-weight="700" letter-spacing="-0.8" fill="#f1f1f2">${total.toLocaleString("en-US")}</text>

    <text x="${lx}" y="44" font-family="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
          font-size="11.5" letter-spacing="2" fill="#5a5a64">LANGUAGE MIX</text>
    <text x="${lx}" y="70" font-family="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
          font-size="9.5" letter-spacing="0.8" fill="#3f4048">SINCE ${SINCE_YEAR} &#183; NOTEBOOKS AS PYTHON</text>

${bars}${rows}
    <text x="${lx}" y="${100 + topLangs.length * 30 + 6}" font-size="10.5" fill="#4a4b55">Other ${otherPct.toFixed(1)}%</text>

    <text x="${PAD}" y="${H - 18}" font-family="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
          font-size="9.5" letter-spacing="1.1" fill="#3f4048">UPDATED ${new Date().toISOString().slice(0, 10)} &#183; GENERATED FROM THE GITHUB API</text>

    <rect width="${W}" height="${H}" rx="14" fill="none" stroke="#212229" stroke-width="1"/>
  </g>
</svg>
`;

writeFileSync(new URL("../assets/activity.svg", import.meta.url), svg);
console.log(
  `activity.svg: ${seriesLabel.toLowerCase()} total ${total}; languages from ${recent.length} repos pushed since ${SINCE_YEAR}\n  ` +
    topLangs.map(([n, b]) => `${n} ${((100 * b) / langTotal).toFixed(1)}%`).join(", "),
);
