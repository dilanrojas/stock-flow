# stock-flow
Project | Software Development III

## UI Design

[Stich](https://stitch.withgoogle.com/projects/10518011282484899449)

## Backlog

[Jira](https://www.atlassian.com/es/software/jira)

## Project's structure

```bash
stock-flow/
├── lib/
│   ├── api/             # API services and request handlers
│   ├── constants/       # Global constants, enums, and configuration values
│   ├── types/           # Shared TypeScript interfaces and types
│   └── utils/           # Helper and utility functions
│
├── public/              # Static assets served directly by Vite
│
├── src/
│   ├── components/
│   │   ├── categories/  # Category-related components
│   │   ├── dashboard/   # Dashboard widgets, charts, and summary components
│   │   ├── movements/   # Inventory movement components (entries, exits, adjustments)
│   │   ├── products/    # Product management components
│   │   ├── sales/       # Sales-related components
│   │   ├── sidebar/     # App's navigation sidebar menu
│   │   └── ui/          # Reusable UI components (buttons, tables, modals, inputs, etc.)
│   │
│   ├── layouts/         # App's reusable layouts
│   │
│   ├── app.css          # Global application styles
│   ├── app.tsx          # Root application component
│   └── main.tsx         # Application entry point
│
├── README.md            # Project documentation and setup instructions
├── biome.json           # Biome configuration (formatter, linter, and code quality rules)
├── index.html           # Main HTML entry point used by Vite
├── package.json         # Project dependencies, scripts, and metadata
├── pnpm-lock.yaml       # Locked dependency versions for reproducible installs
├── tsconfig.app.json    # TypeScript configuration for the application source
├── tsconfig.json        # Base TypeScript configuration shared across the project
├── tsconfig.node.json   # TypeScript configuration for Node.js tooling and Vite
└── vite.config.ts       # Vite configuration (plugins, aliases, build, and dev server settings)
```

## 

## Executing this project locally

### Requirements

  - [NodeJS](https://nodejs.org/en)
  - [pnpm](https://pnpm.io/) // Optional, but recommended. Install using `npm install -g pnpm`

### Clone this repo

```
git clone https://github.com/dilanrojas/stock-flow
cd stock-flow
```

### Install dependencies

Using npm

```
npm install
```

Using pnpm (better)

```
pnpm install
```

### Initialize stock-flow

```bash
pnpm run dev
```

### Get to work

#### The right branch

Check your current branch with this command. It must output your branch `feature/{name}` marked with '*' --> `* feature/{name}`.

```git
git branch
```

If it doesn't output your branch. Switch it.

```git
git checkout feature/{name}
```

Check the first command again. If it outputs the right branch, you're all set. Follow the instructions bellow for submitting changes whenever you finish your work.

## Biome check

Before creating a commit, make sure the code passes Biome checks and formatting:

```bash
pnpm biome check .
```

If Biome reports formatting issues, automatically fix them with:

```bash
pnpm biome check --write .
```

Run these commands before every commit to ensure consistent code style and code quality across the project.

#### Save changes and create a commit

```git
git add .
git commit -m "feat | issue | ui: {description}"
```

#### Push your changes

```git
git push # Make you're on your brach
```

#### Stay up to date with the main | development branch

```git
git checkout main | development
git pull
git checkout feature/{name}
git merge main | development
git push
```

### Page navigation

#### useNavigate (react's hook)

useNavigate is used when navigation depends on custom logic (login, validation).

```jsx
import { useNavigate } from "react-router-dom";

export default function UsageExample() {
  const navigate = useNavigate();

  const handleClick = () => {
    if (condition) {
      navigate("/home"); // redirect
    } else {
      alert("Condition not met");
    }
  };

  return (
    <h1>Page content</h1>
  )
}
```

#### Link component

Link is used for user navigation (menus, buttons, nav bar).

```jsx
import { Link } from 'react-router-dom';

export default function UsageExample() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to='/products'>Products</Link> // redirects to /products page as defined inside <Routes />
            <Link to='/profile'>My profile</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
```
