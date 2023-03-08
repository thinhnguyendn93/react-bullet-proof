# Source base

## Table of contents

### Project Structure

    .
    ├── assets
    │   ├── fonts               # Font icons
    │   ├── icons               # Favicon files
    │   ├── data                # Data sources
    │   ├── images              # Image files ( SVG, PNG, JPG )
    ├── i18n                    # Translate languages
    │   ├── en.json
    │   ├── vi.json
    ├── dist                    # Build folder for dev-server watch source code
    ├── public                  # Build folder for deploy production
    ├── environments            # Deploy environments
    ├── src
    │   ├── api                 # API Request
    │   ├── components          # React Components
    │   ├── modals              # Modal view
    │   ├── config              # Config router, constant
    │   ├── containers          # Container subview for page ( include by component view, modal view, etc... )
    │   ├── pages               # Page view for each routes
    │   ├── store               # Root store for app
    │   ├── styles              # Define styles with scss files
    │   ├── types               # Define types for each module
    │   ├── utils               # Define helper functions
    │   ├── main.ts
    ├── .env                    # ENV config for webpack builder ( API, APP_URL, NODE_ENV, PORT, etc... )
    ├── .env.development        # ENV config info ( helpful clone to .env file )
    ├── .eslintignore           # Ignore validate EsLint some files
    ├── .eslintrc               # EsLint config
    ├── .nvmrc                  # Project nodejs version
    ├── .prettierignore         # Ignore validate Prettier some files
    ├── .prettierrc             # Prettier config
    ├── .stylelintrc            # Stylelint config
    ├── index.html
    ├── package.json
    ├── tsconfig.json           # Typescript config
    ├── vite.config.ts          # Vite config
    ├── yarn.lock
    └── ...

### Install project dependencies

- Install [Yarn](https://yarnpkg.com/) latest version
- Install Nodejs 10 ( Should be use [NVM](https://github.com/nvm-sh/nvm) for install NodeJS )

### Install package dependencies for Editor tool

- Eslint
- CSSlint
- Typescript
- Linter
- Linter EsLint
- Prettier

### Builder Info

- React
- Antd
- Vite
- Typescript
- ESLint / TSLint / Stylint

### Run project

- Use nodejs version 10
- `Clone .env.development to .env file`

```
APP_URL=
API_URL=
NODE_ENV=development
PORT=3000
DEBUG=false
SSR=false
SSR_PORT=5000
```

- Install node_modules `yarn install`
- Run server-dev local `yarn dev`
  - `NODE_ENV=development`
- Build production `yarn build`
  - `NODE_ENV=production`
