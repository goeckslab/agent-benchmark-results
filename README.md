# Galaxy Agent Benchmarks

A compact public results site comparing AI agents in open-ended Anycode environments and reproducible Galaxy workflows.

The site covers:

- BixBench Verified-50: 50 file-based computational biology tasks, four model families, two environments, and three repeats.
- CompBioBench: 100 computational biology tasks with 21 currently published replicates.

## Run locally

```bash
npm install
npm run dev
```

Use `npm test` to build the production bundle and verify that both benchmark result sections render.

## Result sources

- [BixBench results](https://goeckslab.github.io/galaxy-agent-benchmark/bixbench/)
- [CompBioBench results](https://goeckslab.github.io/galaxy-agent-benchmark/compbiobench/)

The displayed results are current as of August 26, 2026. CompBioBench values mix official and explicitly labeled predicted replicate scores; GPT-5.6 Luna Galaxy runs remain incomplete and are excluded.
