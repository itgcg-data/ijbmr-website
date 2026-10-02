# IJBMR website

Static website for The International Journal of Business and Management Research (IJBMR). Plain HTML, CSS and JavaScript, with no build step or server code. Open `index.html` in any browser to view it.

## Updating content

| To change… | Edit this file |
|---|---|
| Published issues (Publications page + home page) | `assets/issues.js` |
| PDF files of issues | Put them in the `issues/` folder, then link them in `assets/issues.js` |
| Editorial board (About page) | `assets/board.js` |
| Colours, fonts, spacing | `assets/styles.css` |
| Page text | the matching `.html` file |

The header and footer are repeated in every `.html` file. If you change them, change all seven pages (`index`, `menu`, `about`, `publications`, `standards`, `contact`, `404`).

### Adding an issue

Open `assets/issues.js` and add a line inside the brackets, newest first:

```js
window.IJBMR_ISSUES = [
  { title: "Volume 18, Issue 1", date: "2026", link: "issues/vol18-issue1.pdf" },
  { title: "Volume 17, Issue 2", date: "2025", link: "https://link-to-your-published-issue" },
];
```

- **PDF:** copy the file into `issues/` and use `issues/<file name>.pdf` as the link.
- **Already online:** paste the full web address as the link.

## Publishing (Netlify, free)

1. **Try it first:** go to <https://app.netlify.com/drop>, create a free account, and drag the website folder (the one containing `index.html`) onto the page. Within seconds you get a test address such as `ijbmr-123.netlify.app`. Check every page there.
2. **Before pointing ijbmr.org at it:** if ijbmr.org currently hosts your old site, download any issue PDFs that live there into the `issues/` folder first. Once the domain moves, the old site and its files stop being reachable.
3. **Connect the domain:** in Netlify open your site, then **Domain management → Add a domain**, and enter `ijbmr.org`. Netlify shows the DNS records to create. Add them where you bought the domain (GoDaddy, Namecheap, etc.):
   - `A` record for `@` pointing to the IP address Netlify shows
   - `CNAME` record for `www` pointing to your `….netlify.app` address

   Leave any existing `MX` (email) records alone. DNS changes take from a few minutes up to 48 hours.
4. **HTTPS:** Netlify issues a free certificate automatically once DNS is working (Domain management → HTTPS).
5. **Future updates:** in Netlify go to **Deploys** and drag the updated folder in again. You can also connect this GitHub repository so every change you push is published automatically.

## Before launch checklist

- [ ] Add your issues to `assets/issues.js`
- [ ] Add your editorial board to `assets/board.js`
- [ ] Confirm the policies on the Standards page (word limits, APA style, double-blind review, COPE, CC BY 4.0 licence, fees)
- [ ] Confirm the home page claims ("Published annually", "Double-blind", "CC BY 4.0", "Open access")
- [ ] Confirm the ISSN label (currently "ISSN: 1938-0429"; online or print?)
