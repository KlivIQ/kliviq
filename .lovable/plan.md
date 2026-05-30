## Plan: Set new SVG as favicon

1. Copy `user-uploads://kliviq-icon-3.svg` → `public/favicon.svg`.
2. Delete `public/favicon.ico` so browsers don't fall back to it.
3. Update `index.html` `<link rel="icon">` to point to `/favicon.svg` with `type="image/svg+xml"`.