# npm-prepublish

Allows you use to use a continuous testing tool (such as **Travis**) to deploy to npm on every tag (or if you must keep `version` in your `package.json` you can use `npm-prepublish --lax`).

## Warning

In order to use this tool please **delete** the `version` key from your `package.json`.

## Installation

```sh
npm install --save-dev npm-prepublish
```

```yml
language: node_js
script: npm test
node_js:
- '0.10'
- '0.11'
before_deploy:
- ./bin/npm-prepublish.js --verbose
deploy:
  provider: npm
  email: "YOUR EMAIL ADDRESS"
  api_key: "YOUR API KEY"
  on:
    all_branches: true
    tags: true
    node: '0.10'
    repo: YOUR-GITHUB-USERNAME/YOUR-GITHUB-REPOSITORY
```
