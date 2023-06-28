# quickstart

A basic Bun + Express Server

It runs on port 3000, and exposes a basic CRUD set on a resource called 'User', alongside a minimal validation.

User collection is saved in-memory, so at each server reboot, the collection is reset.

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run start
```

This project was created using `bun init` in bun v0.6.11. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
