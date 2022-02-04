# hey

This is the svelte app (website) and the crawler directory is the web scraper I wrote to download all the pages. When you push to `master` the site auto redeploys on https://history-of-google.netlify.app. The only page is defined in `index.svelte`, use `npm i` to install dependencies and `npm run dev` to run the dev server. On line 31 I reference the public endpoint instead of localhost because relative paths wasn't working (?), so you'll need to change that to `localhost:3000/snapshots.json` if you want the snapshots to display in dev (make sure you change it back before you push).
