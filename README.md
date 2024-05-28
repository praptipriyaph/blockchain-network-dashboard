# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


# Setting up Truffle and Deploying Smart Contracts

-Truffle Init
Command: truffle init

Description:
This command initializes a new Truffle project in the current directory. It sets up the basic directory structure and configuration files necessary for your Ethereum development. It creates folders for contracts, migrations, tests, and more.

-Truffle Compile
Command: truffle compile

Description:
This command compiles your Solidity smart contracts located in the contracts directory within your Truffle project. It transforms the human-readable Solidity code into bytecode that can be executed on the Ethereum Virtual Machine (EVM). The compiled artifacts are stored in the build/contracts directory.

-Truffle Migrate
Command: truffle migrate --network development

Description:
This command deploys your compiled smart contracts to the Ethereum network. The --network flag specifies the network you want to deploy to, in this case, development, which typically refers to a local blockchain setup for testing and development purposes. During migration, Truffle executes the migration scripts located in the migrations directory sequentially, deploying each contract to the specified network.
