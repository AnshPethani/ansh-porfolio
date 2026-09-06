/**
 * After the static export, write a tiny redirect at /ansh-porfolio/ so links
 * already shared in applications still land on the live site at the domain root.
 */
const fs = require("fs");
const path = require("path");

const outDir = path.join(__dirname, "..", "out", "ansh-porfolio");
const target = "https://anshpethani.github.io/";

const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="refresh" content="0;url=${target}" />
    <link rel="canonical" href="${target}" />
    <title>Redirecting to Ansh Pethani</title>
    <script>
      location.replace(${JSON.stringify(target)} + (location.hash || ""));
    </script>
  </head>
  <body>
    <p>
      This portfolio now lives at
      <a href="${target}">${target}</a>.
      Redirecting…
    </p>
  </body>
</html>
`;

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "index.html"), html);
console.log(`Wrote legacy redirect → ${target} at out/ansh-porfolio/index.html`);
