export async function analyzePair(pair, timeframe) {
  const res = await fetch(`https://api.exchangerate.host/latest?base=${pair.slice(0,3)}&symbols=${pair.slice(3,6)}`);
  const data = await res.json();
  const rate = data.rates[pair.slice(3,6)];

  let signal = "WAIT";
  if (rate > 1.05) signal = "BUY";
  else if (rate < 0.95) signal = "SELL";
  return `${signal} @ ${rate.toFixed(4)}`;
}
