<!-- Self-hosted so the design matches vedantmane.vercel.app, with no dependency
     on a third-party widget service staying up or under its rate limit. Alt
     text on these is deliberately descriptive: image alt is one of the few
     things on a GitHub profile that search engines actually index. -->
<img src="./assets/header.svg" width="100%"
     alt="Vedant Mane, Data Engineer and AI Developer based in Boston, Massachusetts, available to work. Building data platforms, dimensional warehousing and agentic AI.">

# Vedant Mane

## Data Engineer and AI Developer, Boston, MA

[Portfolio](https://vedantmane.vercel.app) &nbsp;·&nbsp; [LinkedIn](https://www.linkedin.com/in/vedant-mane/) &nbsp;·&nbsp; [Email](mailto:vedant12mane@gmail.com)

I build data platforms and the AI systems that run on top of them: batch and streaming ETL pipelines,
dimensional data warehouses on **Databricks** and **Snowflake**, and agentic AI with **LangGraph** and
**RAG**. Three years of production data engineering at **Tata Consultancy Services**, now finishing an
**MS in Information Systems at Northeastern University** in Boston.

Open to **Data Engineer**, **Analytics Engineer**, **Machine Learning Engineer** and **AI Engineer**
roles in Boston or remote.

---

## At a glance

<img src="./assets/stats.svg" width="100%"
     alt="Vedant Mane GitHub statistics: 55 repositories, contributions over the last twelve months, three or more years in production data engineering, most recent project shipped today.">

---

## What I work on

**Data engineering.** Batch and streaming pipelines on Databricks and Snowflake, orchestrated with
Apache Airflow, Azure Data Factory and dbt. Delta Live Tables, Auto Loader and Unity Catalog for
ingestion that survives schema drift, with data quality checks that quarantine bad rows rather than
dropping them.

**Dimensional warehousing.** Star schemas, slowly changing dimensions, surrogate keys and conformed
dimensions, built so a fact table and its dimensions agree by construction instead of by a
reconciliation query afterwards.

**Machine learning and reinforcement learning.** PyTorch and TensorFlow, parameter-efficient
fine-tuning with LoRA and PEFT, and reinforcement learning with PPO, deep Q-networks and Thompson
sampling.

**Agentic AI and retrieval.** LangGraph and CrewAI agent systems, retrieval-augmented generation over
vector stores including Pinecone and ChromaDB, document extraction with Mistral OCR and Docling, and
Model Context Protocol integrations.

**Cloud and delivery.** AWS, Azure and Google Cloud, containerised with Docker and Kubernetes, served
through FastAPI and Streamlit.

---

## Technical stack

<img src="./assets/stack.svg" width="100%"
     alt="Technical stack. Languages: Python, SQL, PL/SQL, TypeScript, Java, R. Data platforms: Databricks, Snowflake, Apache Spark, PySpark, Delta Live Tables, Auto Loader, Unity Catalog, Snowpark. Orchestration: Apache Airflow, Azure Data Factory, dbt, Snowflake Tasks, Snowflake Streams, GitHub Actions. Modelling: dimensional modelling, star schema, SCD Type 2, normalisation, data quality, DQX, Parquet. Databases: Oracle, PostgreSQL, Azure SQL, stored procedures, RBAC. Machine learning and reinforcement learning: PyTorch, TensorFlow, scikit-learn, Hugging Face, LoRA, PEFT, PPO, deep Q-networks, Thompson sampling, Gymnasium. Agents and retrieval: LangGraph, LangChain, CrewAI, MCP, RAG, Pinecone, ChromaDB, OpenAI embeddings. Document AI: Mistral OCR, Docling, PyMuPDF, Azure Document Intelligence. Cloud and serving: AWS, Azure, GCP, S3, Key Vault, Cloud Run, Docker, Kubernetes, FastAPI, Streamlit, Vercel. Analytics: Tableau, Power BI, Alteryx.">

---

## How I build data pipelines

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
countable rather than silently dropped, which is the difference between a data pipeline you can trust
and one whose totals merely look plausible.

---


## Contact

<img src="./assets/contact.svg" width="100%"
     alt="Contact Vedant Mane, Data Engineer and AI Developer. LinkedIn in/vedant-mane. Email vedant12mane@gmail.com. Portfolio vedantmane.vercel.app. Boston, Massachusetts. Available to work, open to data and AI roles.">

<!-- The card above is an image, so links inside it cannot be clicked. These are
     the real ones. -->
**[LinkedIn: in/vedant-mane](https://www.linkedin.com/in/vedant-mane/)** &nbsp;·&nbsp;
**[vedant12mane@gmail.com](mailto:vedant12mane@gmail.com)** &nbsp;·&nbsp;
**[vedantmane.vercel.app](https://vedantmane.vercel.app)**

Based in Boston, Massachusetts. Open to Data Engineer, Analytics Engineer, Machine Learning Engineer
and AI Engineer roles.

<sub>Pinned repositories below are a slice of the work. The <a href="https://vedantmane.vercel.app">portfolio</a> has the rest, each with an architecture diagram and the reasoning behind the build.</sub>
