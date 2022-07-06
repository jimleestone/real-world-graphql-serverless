# real-world-graphql-serverless

A Real-World example backend using apollo-server, serverless, prisma and nexus

- clone this repo and install dependencies
`yarn`
- specified your mysql database url in a `.env` file
- migrate a dev database
`yarn db:migrate`
- generate prisma client
`yarn generate:prisma`
- run locally using serverless offline
`yarn dev`
- visit `http://localhost:3000/dev/graphql` for testing
- deploy to your AWS lambda (need configuring AWS access key and secret at first)
`yarn deploy`
