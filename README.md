# Mini Message Board

A message board built with Express and EJS, with persistent messages stored in Neon PostgreSQL.

[Live Demo](https://message-board.message-board.workers.dev)

## Features

- View messages with author names and dates.
- Submit new messages with server-side validation.
- Open individual message details.
- Keep messages across server restarts and deployments.

## Built With

Node.js, Express, EJS, PostgreSQL, node-postgres, plain CSS, Cloudflare Workers, and Neon.

## Run Locally

```bash
npm install
```

Create `.env` in the project root:

```dotenv
DATABASE_URL=your_postgresql_connection_string
```

Create the database table and sample messages:

```bash
node --env-file=.env db/populatedb.js
```

Start the development server:

```bash
npm run dev
```

### Run in the Workers runtime

Copy `.env` to `.dev.vars`, then run:

```bash
npm run dev:worker
```

## Deployment

Set the database secret and deploy:

```bash
npx wrangler login
npx wrangler secret put DATABASE_URL
npx wrangler deploy
```

Wrangler automatically compiles the EJS templates before deployment.
.