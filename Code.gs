const SPREADSHEET_ID = "1bwDJz5lhZ9YEw9UqFMFlDezW9Lov7MawyOCmKx04UZ0";
const RSVP_SHEET_NAME = "RSVPs";
const SONG_REQUESTS_SHEET_NAME = "Song Requests";

function doPost(event) {
  try {
    const submission = JSON.parse(event.postData.contents);
    if (submission.type === "song") {
      const song = cleanCell(submission.song, 250);
      if (!song) {
        throw new Error("A song suggestion is required.");
      }

      const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
      const sheet = spreadsheet.getSheetByName(SONG_REQUESTS_SHEET_NAME) || spreadsheet.insertSheet(SONG_REQUESTS_SHEET_NAME);
      if (sheet.getLastRow() === 0) {
        sheet.appendRow(["Submitted at", "Song suggestion"]);
      }
      sheet.appendRow([new Date(), song]);
      return jsonResponse({ success: true });
    }

    const rsvp = submission;
    const name = cleanCell(rsvp.name, 150);
    const mobile = cleanCell(rsvp.mobile, 30);
    const attendance = String(rsvp.attendance || "");
    const guests = Number(rsvp.guests);
    const dietary = cleanCell(rsvp.dietary, 500);

    if (!name || !["joyfully accepts", "regretfully declines"].includes(attendance)) {
      throw new Error("A name and valid attendance selection are required.");
    }
    
    if (!mobile) {
      throw new Error("Mobile number is required.");
    }
    if (![1, 2].includes(guests)) {
      throw new Error("Guest count must be 1 or 2.");
    }

    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName(RSVP_SHEET_NAME) || spreadsheet.insertSheet(RSVP_SHEET_NAME);
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Submitted at", "Name", "Mobile", "Attendance", "Guests", "Dietary notes"]);
    }
    sheet.appendRow([new Date(), name, mobile, attendance, guests, dietary]);

    return jsonResponse({ success: true });
  } catch (error) {
    console.error(error);
    return jsonResponse({ success: false, error: String(error.message || error) });
  }
}

function cleanCell(value, maxLength) {
  const text = String(value || "").trim().slice(0, maxLength);
  return /^[=+@\-]/.test(text) ? `'${text}` : text;
}

function jsonResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}