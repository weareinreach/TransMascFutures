<h1 align="center">
  <a href="https://github.com/weareinreach/GLAAD">
  <picture>
  <source media="(prefers-color-scheme: dark)" srcset=".github/images/InReach_Logo_White_RGB-1024x384.webp">
  <img alt="InReach Logo" src=".github/images/InReach_Logo_Color_RGB-1024x384.webp" height=100>
</picture>
  <picture>
  <source media="(prefers-color-scheme: dark)" srcset=".github/images/Glaad_White.svg">
  <img alt="InReach Logo" src=".github/images/Glaad_Black.svg" height=100>
</picture>
  </a>
</h1>

<div align="center">
  <br />
  <!-- <a href="#about"><strong>Explore the screenshots »</strong></a> -->
  <br />
  <br />
  <a href="https://github.com/weareinreach/GLAAD/issues/new?assignees=&labels=bug&template=01_BUG_REPORT.md&title=bug%3A+">Report a Bug</a>
</div>

<div align="center">
<br />

[![Project license](https://img.shields.io/badge/license-GPLv3-red?style=flat-square)](LICENSE)
[![code with love by InReach](https://img.shields.io/badge/%3C%2F%3E%20with%20%E2%99%A5%20by-InReach-ff1414.svg?style=flat-square)](https://github.com/weareinreach)

</div>

<details open="open">
<summary>Table of Contents</summary>

- [About](#about)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Support](#support)
- [Project assistance](#project-assistance)
- [Contributing](#contributing)
- [Authors & contributors](#authors--contributors)
- [Security](#security)
- [License](#license)
- [Acknowledgements](#acknowledgements)

</details>

---

## About

**InReach** is the world’s first tech platform matching LGBTQ+ people with safe, verified resources.

InReach is for the entire diverse LGBTQ+ community – including asylum seekers and refugees, undocumented and other immigrants, young people experiencing homelessness, those facing family or community rejection due to their identity, and other transgender and non-binary people in need of safe resources.

### Built With

- [T3 Stack](https://create.t3.gg/) [[Docs]](https://create.t3.gg/en/introduction)
  - [Next.js](https://nextjs.org/) [[Docs]](https://nextjs.org/docs/getting-started)
  - [Prisma](https://www.prisma.io/) [[Docs]](https://www.prisma.io/docs)
  - [tRPC](https://trpc.io/) [[Docs]](https://trpc.io/docs)
  - [Next-Auth](https://next-auth.js.org/) [[Docs]](https://next-auth.js.org/getting-started/introduction)
  - [TypeScript](https://www.typescriptlang.org/) [[Docs]](https://www.typescriptlang.org/docs/)
- [Mantine](https://mantine.dev/) [[Docs]](https://mantine.dev/pages/getting-started/)
- [Storybook](https://storybook.js.org/) [[Docs]](https://storybook.js.org/docs/7.0/react/get-started/introduction)
- [pnpM](https://pnpm.io/) [[Docs]](https://pnpm.io/motivation)

## Getting Started

### Prerequisites

This project uses [`pnpm`](https://pnpm.io/) to manage packages. To install, run the command:

```bash
npm -g install pnpm
```

or follow the instructions on [pnpm's installation page](https://pnpm.io/installation).

### Installation

To install the required packages & dependencies:

```bash
pnpm install
```

## Usage

To start the development live servers:

```bash
pnpm dev      # Starts Next.js
pnpm dev:ui   # Starts Storybook for UI component development
```

Next.js based projects will be available at `http://localhost:3000`

Storybook will be available at `http://localhost:6006`

A [Docker Compose](https://docs.docker.com/compose/) file has been provided to spin up a local PostgreSQL instance.
To start/stop a local database:

```bash
pnpm db:up               # Starts the database
pnpm db:down             # Stops the database

pnpm db:migrate          # Generate a Prisma migration
pnpm db:migrate:apply    # Apply a Prisma migration to a dev instance

pnpm db:deploy           # Apply a Prisma migration to a prod instance
```

More information about Prisma migrations can be found [here](https://www.prisma.io/docs/concepts/components/prisma-migrate/migrate-development-production)

## Support

Reach out to the maintainer at one of the following places:

- [GitHub issues](https://github.com/weareinreach/GLAAD/issues/new?assignees=&labels=question&template=04_SUPPORT_QUESTION.md&title=support%3A+)
- Contact options listed on [this GitHub profile](https://github.com/weareinreach)

## Project assistance

If you want to say **thank you** or/and support active development of InReach:

- Add a [GitHub Star](https://github.com/weareinreach/GLAAD) to the project.
- Tweet about InReach.
- Write interesting articles about the project on [Dev.to](https://dev.to/), [Medium](https://medium.com/) or your personal blog.

Together, we can make InReach **better**!

## Contributing

First off, thanks for taking the time to contribute! Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make will benefit everybody else and are **greatly appreciated**.

Please read [our contribution guidelines](https://github.com/weareinreach/.github/blob/main/CONTRIBUTING.md), and thank you for being involved!

## Authors & contributors

The original setup of this repository is by [InReach](https://github.com/weareinreach).

For a full list of all authors and contributors, see [the contributors page](https://github.com/weareinreach/GLAAD/contributors).

## Security

InReach follows good practices of security, but 100% security cannot be assured.
InReach is provided **"as is"** without any **warranty**. Use at your own risk.

_For more information and to report security issues, please refer to our [security documentation](https://github.com/weareinreach/.github/blob/main/SECURITY.md)._

## License

This project is licensed under the **GNU General Public License v3**.

See [LICENSE](LICENSE) for more information.

## Acknowledgements

[![Powered by Vercel](.github/images/powered-by-vercel.svg)](https://vercel.com/?utm_source=in-reach&utm_campaign=oss)
