const bixbench = [
  { model: "GPT-5.5", anycode: 90.0, galaxy: 91.3, runs: "" },
  { model: "GPT-5.6 Sol", anycode: 89.3, galaxy: 90.7, runs: "" },
  { model: "GPT-5.6 Luna", anycode: 88.7, galaxy: 86.7, runs: "" },
  { model: "DeepSeek V4 Pro", anycode: 80.7, galaxy: 82.0, runs: "" },
];

const compbio = [
  { model: "GPT-5.6 Sol", anycode: 91.0, galaxy: 91.7, runs: "A 88/90/95 · G 92/91/92" },
  { model: "GPT-5.5", anycode: 86.3, galaxy: 86.7, runs: "A 87/88/84 · G 84/89/87" },
  { model: "DeepSeek V4 Pro", anycode: 84.3, galaxy: 84.3, runs: "A 80/87/86 · G 83/87/83" },
  { model: "GPT-5.6 Luna", anycode: 85.0, galaxy: null, runs: "A 84/86/85 · Galaxy pending" },
];

function Results({ rows }: { rows: typeof compbio }) {
  return (
    <>
      <div className="chart" aria-label="Model accuracy comparison">
        {rows.map((row) => (
          <div className="chart-row" key={row.model}>
            <div className="model-name">{row.model}</div>
            <div className="bars">
              <div><span className="value">{row.anycode.toFixed(1)}%</span><i className="anycode" style={{ width: `${row.anycode}%` }} /></div>
              <div><span className="value">{row.galaxy === null ? "—" : `${row.galaxy.toFixed(1)}%`}</span>{row.galaxy !== null && <i className="galaxy" style={{ width: `${row.galaxy}%` }} />}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Model</th><th>Anycode</th><th>Galaxy</th><th>Difference</th></tr></thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.model}>
                <td><b>{row.model}</b>{row.runs && <small>{row.runs}</small>}</td>
                <td>{row.anycode.toFixed(1)}%</td>
                <td>{row.galaxy === null ? "Not published" : `${row.galaxy.toFixed(1)}%`}</td>
                <td>{row.galaxy === null ? "—" : `${row.galaxy - row.anycode >= 0 ? "+" : ""}${(row.galaxy - row.anycode).toFixed(1)} pp`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default function Home() {
  return (
    <>
      <header>
        <a className="brand" href="#top"><span>G</span> Galaxy Agent Benchmarks</a>
        <a href="https://github.com/goeckslab/galaxy-agent-benchmark">GitHub ↗</a>
      </header>

      <main id="top">
        <section className="intro">
          <p className="kicker">Computational biology benchmarks</p>
          <h1>AI agents on real scientific tasks.</h1>
          <p>
            We compare open-ended <b>Anycode</b> runs with reproducible <b>Galaxy</b> workflows.
            The same models solve the same data-heavy biology questions in both environments.
          </p>
        </section>

        <nav className="bench-nav" aria-label="Benchmark sections">
          <a href="#bixbench">BixBench Verified-50</a>
          <a href="#compbiobench">CompBioBench</a>
        </nav>

        <div className="legend"><span><i className="anycode" /> Anycode</span><span><i className="galaxy" /> Galaxy</span></div>

        <section className="benchmark" id="bixbench">
          <div className="section-head">
            <div>
              <p className="kicker">50 tasks · 1,200 runs · 3 repeats</p>
              <h2>BixBench Verified-50</h2>
            </div>
            <a href="https://goeckslab.github.io/galaxy-agent-benchmark/bixbench/">Full results ↗</a>
          </div>
          <p className="description">A curated set of realistic file-based questions across transcriptomics, phylogenetics, variants, CRISPR, statistics, and other computational biology domains.</p>
          <Results rows={bixbench} />
          <p className="note"><b>Overall:</b> Anycode 87.2% · Galaxy 87.7%. Galaxy improves the average by 0.5 percentage points, with different effects by model and task.</p>
        </section>

        <section className="benchmark" id="compbiobench">
          <div className="section-head">
            <div>
              <p className="kicker">100 tasks · 21 published replicates</p>
              <h2>CompBioBench</h2>
            </div>
            <a href="https://goeckslab.github.io/galaxy-agent-benchmark/compbiobench/">Full results ↗</a>
          </div>
          <p className="description">A 100-task benchmark of whether agents can independently use scientific tools and multi-step workflows to produce reproducible answers.</p>
          <Results rows={compbio} />
          <p className="note"><b>Coverage:</b> values are three-run means. Some replicate scores are predicted rather than official; the full results label each one. Luna Galaxy is incomplete and excluded.</p>
        </section>
      </main>

      <footer>
        <span>Results current as of August 26, 2026.</span>
        <div><a href="https://huggingface.co/datasets/goeckslab/galaxy-agent-benchmark-run-traces/tree/main/bixbench">BixBench traces ↗</a><a href="https://huggingface.co/datasets/qchiuj/compbiobench-agent-traces">CompBioBench traces ↗</a></div>
      </footer>
    </>
  );
}
