export type StockData = {
  ticker: string;
  name: { en: string; ar: string };
  sector: { en: string; ar: string };
  price: number;
  change: number;
  q: number;
  v: "fair" | "above" | "below";
  shariah: "compliant" | "doubtful" | "non";
};

export const STOCKS: StockData[] = [
  { ticker: "ARMD", name: { en: "Armada Tech.", ar: "أرمادا تِك" }, sector: { en: "Technology", ar: "تقنية" }, price: 142.18, change: 2.34, q: 92, v: "fair", shariah: "compliant" },
  { ticker: "NEXV", name: { en: "NexVision Energy", ar: "نِكسفِجن للطاقة" }, sector: { en: "Energy", ar: "طاقة" }, price: 89.42, change: 0.86, q: 88, v: "below", shariah: "compliant" },
  { ticker: "LUMN", name: { en: "Lumen Industries", ar: "لومن للصناعات" }, sector: { en: "Industrials", ar: "صناعات" }, price: 58.20, change: -0.41, q: 81, v: "fair", shariah: "compliant" },
  { ticker: "HELX", name: { en: "Helix Health", ar: "هيلِكس هِلث" }, sector: { en: "Healthcare", ar: "رعاية صحية" }, price: 215.10, change: 1.18, q: 85, v: "above", shariah: "compliant" },
  { ticker: "ATLS", name: { en: "Atlas Foods", ar: "أطلس فودز" }, sector: { en: "Consumer", ar: "استهلاكي" }, price: 36.95, change: 0.62, q: 79, v: "fair", shariah: "compliant" },
  { ticker: "BCON", name: { en: "Beacon Insurance", ar: "بيكون للتأمين" }, sector: { en: "Insurance", ar: "تأمين" }, price: 44.12, change: -0.22, q: 76, v: "below", shariah: "doubtful" },
  { ticker: "ORBT", name: { en: "Orbit Logistics", ar: "أوربت للشحن" }, sector: { en: "Industrials", ar: "صناعات" }, price: 72.35, change: 1.04, q: 84, v: "fair", shariah: "compliant" },
  { ticker: "VANT", name: { en: "Vantage Telecom", ar: "فانتاج للاتصالات" }, sector: { en: "Communication", ar: "اتصالات" }, price: 28.78, change: 0.35, q: 70, v: "below", shariah: "compliant" },
  { ticker: "PRSM", name: { en: "Prism Labs", ar: "بريزم لابز" }, sector: { en: "Healthcare", ar: "رعاية صحية" }, price: 156.40, change: 0.92, q: 87, v: "above", shariah: "compliant" },
  { ticker: "KORE", name: { en: "Kore Materials", ar: "كور للمواد" }, sector: { en: "Materials", ar: "مواد أساسية" }, price: 52.18, change: -0.18, q: 73, v: "fair", shariah: "compliant" },
  { ticker: "VEGA", name: { en: "Vega Pharma", ar: "فيجا فارما" }, sector: { en: "Healthcare", ar: "رعاية صحية" }, price: 98.65, change: 1.45, q: 82, v: "fair", shariah: "compliant" },
  { ticker: "NOVA", name: { en: "NovaPay Fintech", ar: "نوفاباي" }, sector: { en: "Financials", ar: "مالية" }, price: 63.20, change: 0.55, q: 78, v: "below", shariah: "doubtful" },
];

export const STOCKS_BY_TICKER: Record<string, StockData> = STOCKS.reduce(
  (acc, s) => ({ ...acc, [s.ticker]: s }),
  {} as Record<string, StockData>
);

export function getStock(ticker: string): StockData | undefined {
  return STOCKS_BY_TICKER[ticker.toUpperCase()];
}
