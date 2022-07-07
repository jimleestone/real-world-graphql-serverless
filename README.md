# real-world-graphql-serverless

A Real-World example backend using apollo-server, serverless, prisma and nexus

Clone this repo and install dependencies

```bash
yarn
```

Specified your mysql database url in a `.env` file
Migrate a dev database

```bash
yarn db:migrate
```

Generate prisma client

```bash
yarn generate:prisma
```

Run locally using serverless offline

```bash
yarn dev
```

Visit `http://localhost:3000/dev/graphql` for testing
Deploy to your AWS lambda (need configuring AWS access key and secret at first)

```bash
yarn deploy
```
