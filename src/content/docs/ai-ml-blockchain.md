---
title: "Artificial intelligence, machine learning and blockchain"
summary: What AI is and its types and branches, how machine learning learns from data, and how blockchain keeps a tamper-proof shared ledger — with uses in banking.
section: computer-intro
order: 4
tags: [computer-fundamentals, ai, machine-learning, blockchain, fintech]
updatedAt: "2026-10-07"
---

Three technologies are reshaping banking and almost every other industry.
**Artificial intelligence** makes machines perform tasks that need human-like
intelligence. **Machine learning** is the main way modern AI is built — by
learning patterns from data instead of following hand-written rules.
**Blockchain** is unrelated to the other two: it is a way for many parties to
share a record that no single party can secretly change.

## Artificial intelligence (AI)

**Artificial intelligence** is the branch of computer science concerned with
building machines and software that can **perceive, reason, learn, solve
problems, understand language and make decisions** — tasks that normally
require human intelligence.

### Brief history

| Year | Milestone |
| --- | --- |
| 1950 | **Alan Turing** publishes *Computing Machinery and Intelligence* and proposes the **Turing Test** |
| 1956 | The term "artificial intelligence" is coined by **John McCarthy** at the **Dartmouth Conference** — the birth of AI as a field. McCarthy is called the *father of AI* |
| 1958 | McCarthy creates **LISP**, the classic AI language |
| 1960s–80s | Expert systems; periods of reduced funding called "**AI winters**" |
| 1997 | IBM's **Deep Blue** beats world chess champion Garry Kasparov |
| 2011 | IBM **Watson** wins the quiz show *Jeopardy!* |
| 2012 | Deep learning breakthrough in image recognition (AlexNet) |
| 2016 | DeepMind's **AlphaGo** beats Go champion Lee Sedol |
| 2022 onward | **Generative AI** and large language models (ChatGPT, Claude, Gemini) reach the public |

### The Turing Test

A human judge holds text conversations with a hidden human and a hidden
machine. If the judge **cannot reliably tell which is the machine**, the
machine is said to have passed the test — showing behaviour indistinguishable
from a human's.

### Types of AI by capability

| Type | Also called | Description | Exists? |
| --- | --- | --- | --- |
| Narrow AI | Weak AI, ANI | Performs one specific task or a narrow range of tasks | **Yes** — all AI today: voice assistants, face recognition, chatbots, recommendation systems |
| General AI | Strong AI, AGI | Human-level intelligence across any intellectual task | No — a research goal |
| Super AI | ASI | Intelligence surpassing humans in every field | No — hypothetical |

### Types of AI by functionality

| Type | Description | Example |
| --- | --- | --- |
| Reactive machines | Respond to the current situation only; no memory | Deep Blue |
| Limited memory | Use recent past data to decide | Self-driving cars, most modern AI |
| Theory of mind | Would understand emotions and beliefs | Research stage |
| Self-aware | Would have consciousness | Hypothetical |

### Branches and applications of AI

| Branch | What it does | Examples |
| --- | --- | --- |
| Machine learning | Learns patterns from data | Credit scoring, fraud detection |
| Natural Language Processing (NLP) | Understands and generates human language | Chatbots, translation, spam filters, voice assistants |
| Computer vision | Interprets images and video | Face recognition, cheque scanning, OCR, number-plate reading |
| Expert systems | Mimic a human expert using a knowledge base and inference rules | Medical diagnosis (MYCIN), loan approval rules |
| Robotics | Machines that act in the physical world | Industrial robots, warehouse robots |
| Speech recognition | Converts speech to text | Siri, Alexa, Google Assistant |
| Generative AI | Creates new text, images, code, audio | ChatGPT, Claude, DALL·E, Midjourney |

**Parts of an expert system:** a **knowledge base** (facts and rules from
experts), an **inference engine** (applies the rules to reach conclusions)
and a **user interface**.

### AI in banking

- **Chatbots and virtual assistants** answering customer queries around the
  clock.
- **Fraud detection** — spotting unusual card or account activity in real
  time.
- **Credit scoring and loan underwriting** using wider data.
- **AML / KYC** — flagging suspicious transactions and verifying identity
  (e-KYC with face matching).
- **Risk management**, algorithmic trading and forecasting.
- **Process automation** — reading documents, cheques and forms; **RPA
  (Robotic Process Automation)** for repetitive back-office tasks.
- Personalised product recommendations.

### Benefits and risks

| Benefits | Risks and concerns |
| --- | --- |
| Speed and accuracy; works 24/7 | **Bias** — unfair decisions learned from biased data |
| Handles huge data volumes | **Lack of explainability** — "black box" decisions |
| Reduces repetitive work and cost | Privacy and data protection |
| Better decisions and personalisation | Job displacement |
| Reduces human error | Errors and "hallucinations" in generative AI; deepfakes and misuse |

## Machine learning (ML)

**Machine learning** is a subset of AI in which computers **learn from data
and improve with experience without being explicitly programmed** for every
case (Arthur Samuel, 1959, who coined the term).

```text diagram: AI, ML and deep learning
  ┌───────────────────────────────────────────────────────────┐
  │ ARTIFICIAL INTELLIGENCE — any technique that makes         │
  │ machines act intelligently (including hand-written rules)  │
  │   ┌───────────────────────────────────────────────────┐   │
  │   │ MACHINE LEARNING — learns patterns from data       │   │
  │   │   ┌───────────────────────────────────────────┐   │   │
  │   │   │ DEEP LEARNING — many-layered neural         │   │   │
  │   │   │ networks; powers vision, speech, LLMs       │   │   │
  │   │   └───────────────────────────────────────────┘   │   │
  │   └───────────────────────────────────────────────────┘   │
  └───────────────────────────────────────────────────────────┘
```

### Traditional programming vs machine learning

```text diagram: rules in, or rules out
  Traditional programming:   data + rules (program)  ──►  output

  Machine learning:          data + expected output  ──►  rules (model)
                             then: new data + model  ──►  prediction
```

### Types of machine learning

| Type | Learns from | Goal | Examples |
| --- | --- | --- | --- |
| **Supervised** | **Labelled** data — inputs with correct answers | Predict the label for new inputs | Spam vs not spam, loan default yes/no, house price |
| **Unsupervised** | **Unlabelled** data | Find hidden structure or groups | Customer segmentation, anomaly detection |
| **Reinforcement** | **Rewards and penalties** from interacting with an environment | Learn the best sequence of actions | Game playing (AlphaGo), robotics, self-driving |
| Semi-supervised | A little labelled, much unlabelled data | Combine both | Image labelling at scale |

**Supervised learning** has two main tasks:

- **Classification** — predicts a **category** (fraud / genuine; approve /
  reject). Algorithms: logistic regression, decision tree, random forest,
  support vector machine (SVM), k-nearest neighbours (KNN), naive Bayes.
- **Regression** — predicts a **number** (price, sales, credit limit).
  Algorithms: linear regression, polynomial regression.

**Unsupervised learning** tasks:

- **Clustering** — groups similar items (k-means, hierarchical clustering).
- **Association** — finds items that occur together ("customers who bought X
  also bought Y"; apriori algorithm).
- **Dimensionality reduction** — simplifies data with many features (PCA).

### The machine learning workflow

```text diagram: building an ML model
  1. Define the problem   ──►  2. Collect data  ──►  3. Clean and prepare data
                                                              │
  6. Deploy and monitor  ◄──  5. Evaluate model  ◄──  4. Train the model
                                    │                 (on the training set)
                                    └── tested on unseen data (test set)
```

Data is usually split into a **training set** (to learn from, ~70–80 %) and a
**test set** (to check performance on unseen data, ~20–30 %).

### Key terms

| Term | Meaning |
| --- | --- |
| Dataset | The collection of examples used to learn |
| Feature | An input variable (age, income, transaction amount) |
| Label / target | The answer to predict (default: yes / no) |
| Model | The learned function that maps features to predictions |
| Training | Adjusting the model to fit the data |
| Overfitting | The model memorises training data, including noise, and performs badly on new data |
| Underfitting | The model is too simple to capture the pattern |
| Accuracy | Share of predictions that are correct |
| Neural network | A model of layers of connected "neurons", loosely inspired by the brain |
| Deep learning | Neural networks with many hidden layers |

### Neural networks and deep learning

```text diagram: a simple neural network
    input layer        hidden layers        output layer
    (features)                              (prediction)
       ○ ─────────┐   ○ ───── ○
       ○ ─────────┼─► ○ ───── ○ ─────────►  ○  fraud?
       ○ ─────────┘   ○ ───── ○
    each connection has a weight that training adjusts
```

**Deep learning** uses networks with many hidden layers and needs large data
and powerful hardware (**GPUs**). Specialised designs include **CNNs**
(convolutional networks, for images), **RNNs** (for sequences) and
**transformers** — the architecture behind large language models such as
ChatGPT and Claude.

### Popular ML tools

**Python** is the leading language, with libraries such as scikit-learn,
TensorFlow, PyTorch, Keras, NumPy and pandas. R is also used for statistics.

## Blockchain

A **blockchain** is a **decentralised, distributed digital ledger** that
records transactions in **blocks** linked together in a chain using
**cryptographic hashes**. Copies of the ledger are held by many computers
(**nodes**), and once data is recorded it is practically **impossible to
change**.

### History

| Year | Milestone |
| --- | --- |
| 1991 | Stuart Haber and W. Scott Stornetta describe a cryptographically secured chain of timestamped documents |
| 2008 | **Satoshi Nakamoto** (pseudonym, identity unknown) publishes the **Bitcoin** white paper |
| 2009 | The Bitcoin network launches with the first ("genesis") block |
| 2015 | **Ethereum** (Vitalik Buterin) launches with **smart contracts** |

### How a blockchain is structured

```text diagram: blocks linked by hashes
  ┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
  │ Block 1 (genesis)│     │ Block 2          │     │ Block 3          │
  │ data: tx…        │     │ data: tx…        │     │ data: tx…        │
  │ timestamp        │     │ timestamp        │     │ timestamp        │
  │ prev hash: 0000  │  ┌─►│ prev hash: 7A3F  │  ┌─►│ prev hash: C91B  │
  │ hash:      7A3F ─┼──┘  │ hash:      C91B ─┼──┘  │ hash:      52DE  │
  └──────────────────┘     └──────────────────┘     └──────────────────┘

  Change any data in block 2 → its hash changes → block 3's "prev hash"
  no longer matches → the chain is visibly broken
```

Each block contains:

- **Data** — the transactions or records.
- **Timestamp** — when the block was created.
- **Hash** — a unique digital fingerprint of the block (e.g. SHA-256).
- **Previous block's hash** — the link that forms the chain.
- **Nonce** — a number used in mining (in proof of work).

### How a transaction is added

```text diagram: life of a blockchain transaction
  1. A user starts a transaction and signs it with their private key
  2. It is broadcast to the peer-to-peer network of nodes
  3. Nodes validate it (valid signature, enough balance)
  4. Valid transactions are grouped into a new block
  5. Nodes agree on the block through a consensus mechanism
  6. The block is added to the chain; every node updates its copy
  7. The transaction is complete — and permanent
```

### Key features

| Feature | Meaning |
| --- | --- |
| Decentralisation | No central authority; control is shared by the network |
| Distributed ledger | Every node keeps a full copy of the records |
| Immutability | Recorded data cannot be altered without redoing every later block and convincing most of the network |
| Transparency | Participants can see the transactions (in public blockchains) |
| Security | Cryptographic hashing and digital signatures |
| Consensus | Nodes agree on which transactions are valid |
| Peer-to-peer | Transfers happen directly between parties without an intermediary |

### Consensus mechanisms

| Mechanism | How agreement is reached | Used by |
| --- | --- | --- |
| Proof of Work (PoW) | Miners compete to solve a hard computational puzzle; the winner adds the block and earns a reward. Energy-intensive | Bitcoin |
| Proof of Stake (PoS) | Validators are chosen according to the coins they lock up ("stake"); far less energy | Ethereum (since 2022), Cardano |
| Delegated PoS, Proof of Authority, PBFT | A limited set of trusted or elected validators | Private and consortium chains |

### Types of blockchain

| Type | Who can join | Example |
| --- | --- | --- |
| Public (permissionless) | Anyone can read, write and validate | Bitcoin, Ethereum |
| Private (permissioned) | One organisation controls who participates | Hyperledger Fabric inside a company |
| Consortium (federated) | A group of organisations shares control | R3 Corda among banks |
| Hybrid | Mix of public and private | Dragonchain |

### Smart contracts

A **smart contract** is a program stored on a blockchain that **executes
automatically when agreed conditions are met** — for example, releasing a
payment once delivery is confirmed — with no intermediary. Ethereum
popularised them.

### Uses of blockchain

| Area | Use |
| --- | --- |
| Cryptocurrency | Bitcoin, Ethereum and other digital currencies |
| Banking and finance | Cross-border payments and remittances, trade finance and letters of credit, interbank settlement, shared KYC records |
| Supply chain | Tracking goods from origin to shop |
| Government | Land records, digital identity, voting |
| Healthcare | Secure, shareable medical records |
| Others | Digital certificates, NFTs, insurance claims |

### Blockchain, cryptocurrency and CBDC

- **Blockchain** is the underlying technology; **cryptocurrency** is one
  application of it. Blockchain is not the same thing as Bitcoin.
- A **CBDC (Central Bank Digital Currency)** is a digital form of a country's
  official currency issued by its central bank — unlike cryptocurrency, it is
  legal tender backed by the state. Nepal Rastra Bank has been studying a
  CBDC for Nepal.

> [!WARNING]
> **Cryptocurrency transactions, trading and mining are illegal in Nepal.**
> Nepal Rastra Bank has declared crypto transactions illegal under the
> Foreign Exchange (Regulation) Act and the Nepal Rastra Bank Act, and the
> ban was reinforced in 2021. Blockchain technology itself is not banned.

### Advantages and limitations

| Advantages | Limitations |
| --- | --- |
| Tamper-proof records; strong security | **Scalability** — slower than central databases (Bitcoin ≈ 7 transactions/s) |
| No single point of failure | **High energy use** with proof of work |
| Transparency and traceability | Immutability means mistakes cannot be easily reversed |
| Removes intermediaries; lower cost | Regulatory uncertainty |
| Faster cross-border settlement | Lost private key = lost assets |
| Builds trust between parties who do not trust each other | Data privacy concerns on public chains |

## AI vs ML vs blockchain at a glance

| | Artificial intelligence | Machine learning | Blockchain |
| --- | --- | --- | --- |
| What | Machines performing intelligent tasks | A subset of AI that learns from data | A decentralised, tamper-proof ledger |
| Main aim | Mimic human intelligence | Make predictions from data | Secure, trustworthy shared records |
| Key idea | Reasoning, perception, decisions | Training models on data | Hash-linked blocks, consensus |
| Coined / introduced | John McCarthy, 1956 | Arthur Samuel, 1959 | Satoshi Nakamoto (Bitcoin), 2008 |
| Banking use | Chatbots, fraud detection | Credit scoring, fraud models | Remittances, trade finance |

## Quick revision

> [!TIP]
> **One-line answers.** AI = machines doing tasks that need human
> intelligence; term coined by John McCarthy (1956); Turing Test (1950). All
> AI today is narrow (weak) AI. ML = learning from data — supervised
> (labelled), unsupervised (unlabelled), reinforcement (rewards). Deep
> learning = many-layered neural networks. Blockchain = decentralised,
> immutable ledger of hash-linked blocks; Bitcoin by Satoshi Nakamoto (2008);
> smart contracts by Ethereum.

> [!IMPORTANT]
> Traps that show up in multiple-choice questions: deep learning ⊂ ML ⊂ AI,
> never the reverse; **classification** predicts a category, **regression** a
> number; **clustering** is unsupervised; **overfitting** means good on
> training data but poor on new data; the **father of AI** is John McCarthy,
> while Alan Turing proposed the Turing Test; blockchain and Bitcoin are
> **not** the same; Bitcoin uses **proof of work**, Ethereum now uses **proof
> of stake**; each block stores the **previous block's hash**; the first block
> is the **genesis block**; cryptocurrency is **illegal in Nepal**.
