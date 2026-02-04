# Manual Page Capture Guide

The Brother store website uses advanced bot detection (Cloudflare) that blocks automated screenshot tools. Use one of these manual methods to capture the full page design.

## Method 1: Chrome DevTools (Recommended)

1. **Open Chrome** and navigate to:
   ```
   https://store.brother.co.uk/devices/label-printer/vc/vc500wcr?sc_src=corp
   ```

2. **Open DevTools:**
   - Press `F12` or `Ctrl+Shift+I` (Windows/Linux)
   - Press `Cmd+Option+I` (Mac)

3. **Capture Full Page Screenshot:**
   - Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac)
   - Type: `Capture full size screenshot`
   - Select "Capture full size screenshot"
   - The PNG will download automatically

4. **Convert to PDF** (if needed):
   - Open the PNG in an image viewer
   - Print to PDF using your system's print dialog

## Method 2: Browser Extension

### Chrome Extension: "Full Page Screen Capture"

1. Install from Chrome Web Store:
   - Search for "Full Page Screen Capture"
   - Install the extension

2. **Capture:**
   - Navigate to the page
   - Click the extension icon
   - Click "Capture"
   - Download the image

### Firefox Extension: "FireShot"

1. Install FireShot from Firefox Add-ons

2. **Capture:**
   - Navigate to the page
   - Click FireShot icon
   - Select "Capture Entire Page"
   - Save as PDF or PNG

## Method 3: Print to PDF

1. **Open the page** in your browser

2. **Open Print Dialog:**
   - Press `Ctrl+P` (Windows/Linux)
   - Press `Cmd+P` (Mac)

3. **Configure Settings:**
   - Destination: "Save as PDF"
   - Layout: Portrait
   - Paper size: A4 or Letter
   - Margins: None/Minimal
   - Background graphics: ✅ Enabled

4. **Save** the PDF

## Method 4: Online Tools

### Option A: Screenshot.guru
1. Visit: https://screenshot.guru/
2. Enter the URL
3. Select "Full Page"
4. Download the screenshot

### Option B: WebPage Screenshot
1. Visit: https://www.webpagescreenshot.info/
2. Enter the URL
3. Select "Full Page"
4. Download the result

## Method 5: Command Line (if you have access to a non-headless browser)

### Using Playwright with headed mode:

```bash
npx playwright install chromium
npx playwright codegen https://store.brother.co.uk/devices/label-printer/vc/vc500wcr
```

Then modify the generated script to take a screenshot.

## Recommended Approach

**For best results**, use **Method 1 (Chrome DevTools)** as it:
- Captures the exact rendered page
- Includes all CSS and styling
- Produces high-quality output
- Works without additional tools

## File Naming

Save the captured file as:
- `VC-500WCR-Page-Screenshot.pdf` (for PDF)
- `VC-500WCR-Page-Screenshot.png` (for PNG)

Place it in the `docs/` folder.

---

**Note:** The automated scripts (`screenshot-page.js` and `screenshot-page-stealth.js`) may continue to be blocked by the website's security measures. Manual capture ensures you get the actual page content without blocking messages.





