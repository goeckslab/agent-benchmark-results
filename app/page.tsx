"use client";

import { useState } from "react";

const benchmarks = {
  bixbench: {
    title: "BixBench Verified-50",
    meta: "50 tasks · 3 runs per model and environment",
    note: "Overall accuracy: Anycode 87.2% · Galaxy 87.7%",
    link: "https://goeckslab.github.io/galaxy-agent-benchmark/bixbench/",
    rows: [
      { model: "GPT-5.5", anycode: 90.0, galaxy: 91.3 },
      { model: "GPT-5.6 Sol", anycode: 89.3, galaxy: 90.7 },
      { model: "GPT-5.6 Luna", anycode: 88.7, galaxy: 86.7 },
      { model: "DeepSeek V4 Pro", anycode: 80.7, galaxy: 82.0 },
    ],
  },
  compbio: {
    title: "CompBioBench",
    meta: "100 tasks · 21 published replicates",
    note: "Three-run means. Some CompBioBench scores are predicted; Luna Galaxy is not yet published.",
    link: "https://goeckslab.github.io/galaxy-agent-benchmark/compbiobench/",
    rows: [
      { model: "GPT-5.6 Sol", anycode: 91.0, galaxy: 91.7 },
      { model: "GPT-5.5", anycode: 86.3, galaxy: 86.7 },
      { model: "DeepSeek V4 Pro", anycode: 84.3, galaxy: 84.3 },
      { model: "GPT-5.6 Luna", anycode: 85.0, galaxy: null },
    ],
  },
};

export default function Home() {
  const [selected, setSelected] = useState<keyof typeof benchmarks>("bixbench");
  const benchmark = benchmarks[selected];

  return (
    <main>
      <header>
        <b>Galaxy Agent Benchmarks</b>
        <a href="https://github.com/qchiujunhao/galaxy-agent-benchmarks">GitHub ↗</a>
      </header>

      <h1>Benchmark results</h1>
      <p className="subtitle">Anycode and Galaxy performance on computational biology tasks.</p>

      <div className="tabs" role="tablist" aria-label="Choose a benchmark">
        {Object.entries(benchmarks).map(([key, value]) => (
          <button key={key} role="tab" aria-selected={selected === key} onClick={() => setSelected(key as keyof typeof benchmarks)}>
            {value.title}
          </button>
        ))}
      </div>

      <section aria-live="polite">
        <div className="section-head">
          <div><h2>{benchmark.title}</h2><p>{benchmark.meta}</p></div>
          <a href={benchmark.link}>Full results ↗</a>
        </div>

        <div className="legend"><span><i className="anycode" /> Anycode</span><span><i className="galaxy" /> Galaxy</span></div>

        <div className="chart">
          {benchmark.rows.map((row) => (
            <div className="row" key={row.model}>
              <b>{row.model}</b>
              <div className="scores">
                <div><span>{row.anycode.toFixed(1)}%</span><i className="anycode" style={{ width: `${row.anycode}%` }} /></div>
                <div><span>{row.galaxy === null ? "Not published" : `${row.galaxy.toFixed(1)}%`}</span>{row.galaxy !== null && <i className="galaxy" style={{ width: `${row.galaxy}%` }} />}</div>
              </div>
            </div>
          ))}
        </div>

        <p className="note">{benchmark.note}</p>
      </section>
    </main>
  );
}
