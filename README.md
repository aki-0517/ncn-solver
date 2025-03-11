# **Decentralized Solver Network (DSN)**

Welcome to the Decentralized Solver Network (DSN) project! This initiative leverages the Cambrian SDK to create a decentralized network of solvers that enhance the functionality of Automated Market Makers (AMMs), lending protocols, and liquid staking platforms. Our solvers focus on optimizing trading paths, rebalancing liquidity pools, and minimizing impermanent loss, thereby improving the overall user experience in decentralized finance (DeFi).

## **Table of Contents**

- [**Decentralized Solver Network (DSN)**](#decentralized-solver-network-dsn)
  - [**Table of Contents**](#table-of-contents)
  - [**Project Overview**](#project-overview)
  - [**Features**](#features)
  - [**Getting Started**](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Directory Structure](#directory-structure)
  - [**Usage**](#usage)
    - [Setting Up the AVS](#setting-up-the-avs)
    - [Configuring Operators](#configuring-operators)
    - [Deploying the Solver](#deploying-the-solver)

## **Project Overview**

In the rapidly evolving DeFi landscape, efficient management of liquidity and trading strategies is crucial. The DSN project addresses this need by implementing a decentralized network of solvers that automate and optimize various DeFi operations. By utilizing the Cambrian SDK, we ensure a secure and efficient framework that integrates seamlessly with existing DeFi protocols.

## **Features**

- **Automated Trading Path Optimization:** Enhances transaction efficiency by determining the most cost-effective trading routes.
- **Liquidity Pool Rebalancing:** Maintains optimal liquidity distribution across pools to maximize returns and minimize risks.
- **Impermanent Loss Minimization:** Implements strategies to reduce the temporary loss of funds experienced by liquidity providers.
- **Decentralized Governance:** Employs restakers and validators to ensure the network's security and integrity.

## **Getting Started**

Follow these instructions to set up and run the DSN project on your local machine.

### Prerequisites

- **Node.js:** Version 22.0.0 or higher.
- **Docker:** Version 20.0.0 or higher.
- **Cambrian CLI:** Install globally using npm.

  ```bash
  npm install --global @cambrianone/camb-client@latest
  ```

### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your-username/dsn-project.git
   cd dsn-project
   ```

2. **Install Dependencies:**

   Ensure all necessary packages are installed.

   ```bash
   npm install
   ```

### Directory Structure

```plaintext
dsn-project/
├── avs/
│   └── config.json
├── operators/
│   ├── operator1/
│   │   └── config.json
│   ├── operator2/
│   │   └── config.json
│   └── operator3/
│       └── config.json
└── payload/
    └── solver.js
```

- **avs/**: Contains configurations for the Aggregated Validator Service (AVS).
- **operators/**: Directories for each operator node, each with its own configuration.
- **payload/**: Contains the solver logic implemented in `solver.js`.

## **Usage**

### Setting Up the AVS

1. **Initialize the AVS:**

   Navigate to the `avs` directory and run the initialization command.

   ```bash
   cd avs
   camb init -t avs .
   ```

   During initialization, provide the following:

   - **AVS IP Address:** An IP address accessible by all operators.
   - **AVS HTTP Port:** An HTTP port accessible by all operators.
   - **AVS WS Port:** A WebSocket port accessible by all operators.

2. **Start the AVS:**

   Retrieve the AVS public key from the configuration file or initialization output and start the AVS.

   ```bash
   camb avs run -u <AVS_PUBLIC_KEY>
   ```

### Configuring Operators

1. **Initialize Operators:**

   For each operator, navigate to its directory and initialize it.

   ```bash
   cd operators/operator1
   camb init -t operator .
   ```

   Repeat for `operator2` and `operator3`.

2. **Configure Each Operator:**

   In each operator's `config.json`, set the following:

   - **AVS HTTP URL:** The HTTP endpoint of the AVS.
   - **AVS WS URL:** The WebSocket endpoint of the AVS.
   - **Oracle Update Method:** For example, `container-stream`.
   - **Oracle Update Image:** The Docker image name for the oracle update container.
   - **Cron Specification:** The schedule for running the oracle update container.

3. **Start Operators:**

   Retrieve each operator's voter public key from their configuration and start them.

   ```bash
   camb operator run -u <VOTER_PUBLIC_KEY>
   ```

### Deploying the Solver

1. **Implement Solver Logic:**

   In the `payload/solver.js` file, implement the solver's functionality, such as trading path optimization and liquidity management.

2. **Build the Payload Container:**

   Create a Docker image for the solver.

   ```bash
   cd payload
   docker build -t payload-solver .
   ```

3. **Run the Payload:**

   Deploy the solver container to the AVS.

   ```bash
   camb payload run-container -a <AVS_PUBLIC_KEY> -p [period_in_seconds] payload-solver
   ```

   Replace `[period_in_seconds]` with the desired execution interval.
