declare const gapi: {
  load: (api: string, callback: () => void) => void;
  client: {
    init: (config: {
      apiKey: string;
      clientId: string;
      discoveryDocs: string[];
      scope: string;
    }) => Promise<void>;
  };
};

export async function initializeGoogleAPI() {
  await new Promise<void>((resolve) => gapi.load('client', () => resolve()));
  await gapi.client.init({
    apiKey: 'YOUR_API_KEY',
    clientId: 'YOUR_CLIENT_ID',
    discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
    scope: 'https://www.googleapis.com/auth/drive.readonly',
  });
}
