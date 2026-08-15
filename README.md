<!-- Self-hosted, so it matches vedantmane.vercel.app and does not depend on a
     third-party widget service staying up or under its rate limit. -->
<img src="./assets/header.svg" alt="Vedant Mane, Data Engineer and AI Developer, Boston MA, available to work" width="100%">

I build data platforms and the AI systems that sit on top of them. Batch and streaming pipelines,
dimensional warehousing on Databricks and Snowflake, and agentic systems with LangGraph and RAG.

Currently finishing an **MS in Information Systems at Northeastern University**, after three years
building production data systems at **Tata Consultancy Services**.

**[Portfolio, with architecture write-ups →](https://vedantmane.vercel.app)**

---

<img src="./assets/stats.svg" alt="54 repositories, on GitHub since 2018, 3 plus years in production, 3 clouds shipped on" width="100%">

---

### How I work

- **The number has to be checkable.** If I quote a figure, it traces to a committed file rather than an estimate.
- **Failure modes over happy paths.** Schema drift, unmatched joins and re-runnable loads are what decide whether a pipeline survives contact with real data.
- **Read the code, not the README.** Documentation drifts from behaviour faster than anyone expects, including my own.
- **Cost is a design constraint.** Warehouse spend and GPU memory belong in the design, not in the invoice you read later.

---

### How I tend to build things

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

The branch to quarantine is the part that matters. A row that fails validation gets written somewhere
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

<sub>Pinned repositories below are a slice of the work. The portfolio has the rest, with architecture diagrams and the reasoning behind each build.</sub>
