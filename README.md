<!-- Self-hosted, so it matches vedantmane.vercel.app and does not depend on a
     third-party widget service staying up or under its rate limit. -->
<img src="./assets/header.svg" alt="Vedant Mane, Data Engineer and AI Developer, Boston MA, available to work" width="100%">

I build data platforms and the AI systems that sit on top of them. Batch and streaming pipelines,
dimensional warehouses on Databricks and Snowflake, and agentic systems with LangGraph and RAG.

Currently finishing an **MS in Information Systems at Northeastern University**, after three years
building production data systems at **Tata Consultancy Services**.

**[See the full portfolio →](https://vedantmane.vercel.app)** &nbsp;·&nbsp; every project there has an
architecture write-up and the decisions behind it.

---

### What I actually care about

- **The number has to be checkable.** Every figure below traces back to a committed file, not an estimate.
- **Failure modes over happy paths.** Schema drift, unmatched joins, and re-runnable loads decide whether a pipeline survives contact with real data.
- **Read the code, not the README.** Several of the repos below describe things their own code does not do.

---

### Selected work

| Project | What it does | Measured |
| :--- | :--- | :--- |
| **[SEC Financial Data Engineering](https://vedantmane.vercel.app/projects/sec-financial-pipeline)** | Three parallel DAGs and dbt over SEC filings | 50M+ values, **0** quality failures across 30M+ rows, **81%** cost reduction |
| **[IMDb Entertainment Analytics](https://vedantmane.vercel.app/projects/imdb-analytics)** | Databricks DQX and DLT with bridge tables | **98M+** records, 24 tables, full run in **1m 48s** |
| **[Multi-Agentic Startup Intelligence](https://vedantmane.vercel.app/projects/venture-scope)** | Four independent agent loops over five scheduled DAGs | MCP integrated **two weeks** after the protocol went public |
| **[Mental Wellness Companion](https://vedantmane.vercel.app/projects/mental-wellness-rl)** | PPO and Thompson sampling, trained on generated personas | **0** safety violations across 476 episodes |
| **[NVIDIA Financial Report RAG](https://vedantmane.vercel.app/projects/nvidia-fin-rag)** | Chunking strategy treated as an experiment | **8,307** vectors, 1,847 pages, 85–92% retrieval relevance |
| **[Deep Q-Learning on Atari Kaboom](https://vedantmane.vercel.app/projects/atari-kaboom-dqn)** | Baseline measured first, one variable per run | **214%** over random, every run committed as JSON |

<sub>Ten more at **[vedantmane.vercel.app](https://vedantmane.vercel.app/#projects)**, including Azure Data Factory to Snowflake, LoRA fine-tuning, and an Oracle platform with access control in the database.</sub>

---

<img src="./assets/focus.svg" alt="Shipped projects by discipline: Data Engineering 8, AI Systems 4, Machine Learning 3, Databases 1" width="100%">

---

### How I tend to build things

GitHub renders this natively, so it stays readable in both light and dark:

```mermaid
flowchart LR
    A[Source]:::src --> B[Land raw]:::proc
    B --> C[Validate<br/>and quarantine]:::proc
    C --> D[(Dimensional<br/>model)]:::store
    D --> E[Serve]:::serve
    D --> F[Agents<br/>and RAG]:::serve
    C -. rejected rows kept,<br/>never dropped .-> G[(Quarantine)]:::store

    %% Stroke only, no fill or text colour. GitHub themes Mermaid from
    %% prefers-color-scheme, and hardcoding a dark fill would break that on
    %% light mode. The accent strokes read on both.
    classDef src fill:transparent,stroke:#8ba4ff,stroke-width:1.5px
    classDef proc fill:transparent,stroke:#8b949e,stroke-width:1.5px
    classDef store fill:transparent,stroke:#3355ff,stroke-width:1.5px
    classDef serve fill:transparent,stroke:#3fb950,stroke-width:1.5px
```

The branch to quarantine is the part that matters. A row that fails validation is written somewhere
countable rather than silently dropped, which is the difference between a pipeline you can trust and
one whose totals merely look plausible.

---

### Stack

**Data** &nbsp;
![Databricks](https://img.shields.io/badge/Databricks-FF3621?style=flat-square&logo=databricks&logoColor=white)
![Snowflake](https://img.shields.io/badge/Snowflake-29B5E8?style=flat-square&logo=snowflake&logoColor=white)
![Spark](https://img.shields.io/badge/Spark-E25A1C?style=flat-square&logo=apachespark&logoColor=white)
![Airflow](https://img.shields.io/badge/Airflow-017CEE?style=flat-square&logo=apacheairflow&logoColor=white)
![dbt](https://img.shields.io/badge/dbt-FF694B?style=flat-square&logoColor=white)
![Oracle](https://img.shields.io/badge/Oracle_PL%2FSQL-F80000?style=flat-square&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white)

**AI** &nbsp;
![PyTorch](https://img.shields.io/badge/PyTorch-EE4C2C?style=flat-square&logo=pytorch&logoColor=white)
![LangGraph](https://img.shields.io/badge/LangGraph-1C3C3C?style=flat-square&logo=langchain&logoColor=white)
![Hugging Face](https://img.shields.io/badge/Hugging_Face-FFD21E?style=flat-square&logo=huggingface&logoColor=black)
![Pinecone](https://img.shields.io/badge/Pinecone-1a1b20?style=flat-square&logoColor=white)
![CrewAI](https://img.shields.io/badge/CrewAI-FF5A50?style=flat-square&logo=crewai&logoColor=white)

**Cloud** &nbsp;
![AWS](https://img.shields.io/badge/AWS-232F3E?style=flat-square&logoColor=white)
![Azure](https://img.shields.io/badge/Azure-0078D4?style=flat-square&logoColor=white)
![GCP](https://img.shields.io/badge/GCP-4285F4?style=flat-square&logo=googlecloud&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white)
![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?style=flat-square&logo=kubernetes&logoColor=white)

---

### Reach me

[![Portfolio](https://img.shields.io/badge/Portfolio-vedantmane.vercel.app-8ba4ff?style=for-the-badge)](https://vedantmane.vercel.app)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logoColor=white)](https://www.linkedin.com/in/vedant-mane/)
[![Email](https://img.shields.io/badge/Email-1a1b20?style=for-the-badge&logo=gmail&logoColor=white)](mailto:vedant12mane@gmail.com)
