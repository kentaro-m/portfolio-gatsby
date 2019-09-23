# portfolio-gatsby

## :arrow_forward: Usage

### Create a new site
```
$ npm install -g gatsby-cli
$ gatsby new portfolio-gatsby https://github.com/kentaro-m/portfolio-gatsby
```

### Develop the site locally
```bash
$ npm install
$ npm run develop
```

Open at `http://localhost:8000` in the browser.

## :rocket: Deploy

### Deploy to GitHub Pages using GitHub Actions

Add the `pathPrefix` to `gatsby-config.js`.

```js
module.exports = {
  pathPrefix: `/repo-name`,
}
```

Update the build script to `package.json`.

```diff
-"build": "gatsby build",
+"build": "gatsby build --prefix-paths",
```

Add secrets to repository settings.

- **GITHUB_API_TOKEN**
  - Use for fetch repository data from GitHub.
  - Scope: `public_repo`
- **QIITA_API_TOKEN**
  - Use for fetch article data from Qiita.
  - Scope: `read_qiita`
- **RSS2JSON_API_TOKEN**
  - Use for fetch slide data from Speaker Deck.
- **GH_TOKEN**
  - Use for deploy to GitHub Pages
  - Scope: `repo`

Create the workflow file like `deploy.yml` and add it to `.github/workflows`. 

```yml
name: Deploy

on:
  push:
    branches:
      - master

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v1

      - name: setup node 10.x
        uses: actions/setup-node@v1
        with:
          node-version: '10.x'

      - name: install
        run: npm install

      - name: build
        run: npm run build
        env:
          GITHUB_API_TOKEN: ${{ secrets.GITHUB_API_TOKEN }}
          QIITA_API_TOKEN: ${{ secrets.QIITA_API_TOKEN }}
          RSS2JSON_API_TOKEN: ${{ secrets.RSS2JSON_API_TOKEN }}

      - name: deploy
        uses: peaceiris/actions-gh-pages@v2.3.2
        env:
          PERSONAL_TOKEN: ${{ secrets.GH_TOKEN }}
          PUBLISH_BRANCH: gh-pages
          PUBLISH_DIR: ./public
```

Push your changes to the master branch and start the build for deploy to GitHub Pages.

## :memo: Licence
MIT
