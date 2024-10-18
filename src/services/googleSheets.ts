import { google } from 'googleapis';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

export const initGoogleSheetsClient = async () => {
  const auth = new google.auth.GoogleAuth({
    scopes: SCOPES,
  });
  const authClient = await auth.getClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return google.sheets({ version: 'v4', auth: authClient as any });
};

export const listSheets = async (spreadsheetId: string) => {
  try {
    const sheets = await initGoogleSheetsClient();
    const response = await sheets.spreadsheets.get({
      spreadsheetId,
    });
    return response.data.sheets?.map((sheet) => sheet.properties?.title) || [];
  } catch (error) {
    console.error('Error listing sheets:', error);
    throw error;
  }
};

export const readSheet = async (spreadsheetId: string, range: string): Promise<string[][] | null> => {
  try {
    const sheets = await initGoogleSheetsClient();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });
    return response.data.values || null;
  } catch (error) {
    console.error('Error reading sheet:', error);
    throw error;
  }
};

export const writeToSheet = async (spreadsheetId: string, range: string, values: (string | number | boolean)[][]) => {
  try {
    const sheets = await initGoogleSheetsClient();
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption: 'USER_ENTERED',
      requestBody: { values },
    });
  } catch (error) {
    console.error('Error writing to sheet:', error);
    throw error;
  }
};
