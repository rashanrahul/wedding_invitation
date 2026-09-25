# Connect RSVP to Google Sheets

The RSVP form posts to a Google Apps Script web app. `Code.gs` writes each reply to a sheet tab named `RSVPs`.

1. Open your Sheet and select **Extensions > Apps Script**.
2. Replace the Apps Script editor contents with `Code.gs` from this folder, then save. The Sheet ID is already configured.
3. Select **Deploy > New deployment**. Choose **Web app**, set **Execute as** to **Me**, and set access to **Anyone** so guests can RSVP without signing in. Deploy and approve Google's authorization prompt.
4. Copy the deployed web app URL ending in `/exec`.
5. In `script.js`, set `RSVP_ENDPOINT` to that URL, for example:

   ```js
   const RSVP_ENDPOINT = "https://script.google.com/macros/s/DEPLOYMENT_ID/exec";
   ```

6. Publish the updated invitation. New RSVPs will append a timestamp, name, attendance, guest count, and dietary notes to the `RSVPs` tab.

The public web app accepts RSVP submissions but does not expose the Sheet itself. The browser cannot read Google's response, so confirm the first test submission appears in the Sheet.