# npm-prepublish

Allows you use to use a continuous testing tool (such as **Travis**) to deploy to npm on every semver-y tag.

This means you can use GitHub releases or git tags and have Travis deploy automagically for you to the npm registry.

## Warning

In order to use this tool please **set** the `version` key from your `package.json` to `0.0.0` (this is because npm will refuse to install any package that doesn't have a version number - [issue raised here](https://github.com/npm/npm/issues/7105) - or if you must keep the real `version` in your `package.json` you can use `npm-prepublish --lax` and `npm-prepublish` will skip this check).

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
- npm-prepublish --verbose
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

I recommend running `travis setup npm` and then adding the following lines to your `.travis.yml` file.

```yml
before_deploy:
- npm-prepublish --verbose
```

Under `on:`

```yml
all_branches: true
tags: true
```

You only need to specify `node` if you are testing on multiple versions of node.

## Credits and collaboration ##

The lead developer of **npm-prepublish** is [Matt Andrews](http://twitter.com/andrewsmatt) at FT Labs. All open source code released by FT Labs is licenced under the MIT licence. We welcome comments, feedback and suggestions.  Please feel free to raise an issue or pull request.
