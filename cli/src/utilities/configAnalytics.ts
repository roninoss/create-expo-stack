import { GoogleAuth } from 'google-auth-library';
import { google } from 'googleapis';
import {
  AuthenticationSelect,
  CliFlags,
  Internalization,
  NavigationSelect,
  NavigationTypes,
  PackageManager,
  SelectedComponents,
  StylingSelect
} from '../types';

const key_data =
  'eyJ0eXBlIjoic2VydmljZV9hY2NvdW50IiwicHJvamVjdF9pZCI6ImNyZWF0ZS1leHBvLXN0YWNrLWFuYWx5dGljcyIsInByaXZhdGVfa2V5X2lkIjoiNTdmZTc1OThmYTRkM2NkNWNhN2E0MmU4OGM1ZWYwMzdjODljNDI3NiIsInByaXZhdGVfa2V5IjoiLS0tLS1CRUdJTiBQUklWQVRFIEtFWS0tLS0tXG5NSUlFdkFJQkFEQU5CZ2txaGtpRzl3MEJBUUVGQUFTQ0JLWXdnZ1NpQWdFQUFvSUJBUURndnl6TTV3cFMrUnJRXG5hRmJBZmhwRU15dnhQK1IxV1p6Ykx1Nm1QblpsOVNvZmVHK0hHejdHWWNoZ29ScU9iaEk0MERpL1ZmblA0MVpEXG5kQVZTYXhMSlZSdm9ESHlEUkxRQzcrRE5TWWFEWlRSMXpIdGl6Z2M4UUhxbjV0Qmt0YXdWdWc5ZkhBUFk0MmtBXG4xcjlhdmttakNoM2sxSTNxdFhlbVlUQWt5Z09FZXVLbzJzbmptajcyNUZLRDBRREJKSlVhYnVyd3RrR1doV3pKXG5LaEd6YlNlb0JIeGJMemNlUDlGang1RFlTdW5oS2E1blFXdGRzS2dwdlgzSGthZEU2V0NYQjg1ZHd4MytHVGRVXG5ybnFUSTRRVWpWRHV3SnFaOEpWUEZjYUF2L0dlbHdUT1VGNGNROFQ4VWVadGtHUzN2L1hlRmROL1BTZGZYM0tZXG5CNVEwdXNtREFnTUJBQUVDZ2dFQU9KK0J5b2dGSGwxN1ozbDZMZG8zaE9vOWpuVVIrb3pleTR3Wi9WRnNaQWl1XG5HYXF1c3FQbkgzVWdWbFFRakVUb0cxOCtoTnBFNjU3enExL3VQVk1Uc3h6WndJOXd5V1BFVko4YURLNlRFTVN0XG5RR2FKeVoxdHpqelNpajNKVUM1RFVtQURvbXM4L3VaZ25LRCtLZjhhTDFVTHJnenRTbTU0M0RiTk9kK1pua1VjXG5zeDYzVXVQNmdVY0tiVDRhTVl3Wk5mL3BzUW9SMkdwaXdSQjhQd3hzS0x1Uk5qcC8rTHZuYXV4dkRvY1hvbHFRXG41UHFFYi9pOFlKMlJ3alI2THBUc3FIdWtIZ056ZytOci9JQnpUWDR5Y0V2OWh6bWw4VzVGOGRDd1IzQkYyV05XXG52VmFYZVRNY1ZFcWcxWS9TMDd0UUMrTlFuWHlFY0pSOGRVcW8zQU1qTVFLQmdRRDFkbE54TXlXYnRVSDZPaWx2XG4rbXF2OWdkSVZ1eVJWeEtydG9PcVlqd2gzWEVYZW9seU9Selhac0hvNlQ5b0NpZnRpenBQOXFmYkNWYVAzdk1BXG43OWl3cE4vUE1QY1NoeWtnR2RyR1ArRUY3ODV0amtLQ2dmSE9PbUxUbEp5Z3psdTFuUU1vcTcwOGdoeXd6MEtmXG5tekc4OVlHQ1RmaTMvSmQ5MWN3WU5IRHhrd0tCZ1FEcVpTN0ZYNEt2cjlpWll0Vko4VDRHNE0zUVJ2dWJRMUFoXG5Yd0ZVN2JDUzJ1M294cktlZnJPTFlCTHJsbXQ0Qk1tL2NLMVNteHBndHZrdEQ3WFVtcVdrUGRnRUhGaUxjcHoxXG5XS0tTKytpRHE4SXplZzUxMFBkcVAwbVNlY1R6cHk1V2hmMHJwTi9vVDY0YVJnVUVmaEZtZHdVYWZRcnlOY1B1XG5uMWlEa0loK1VRS0JnSEJWODhBbHdUdHVpOEJoNTk3b2d2VCtxcnlQazNxOGw3M2dMSWZJcDI1ME1yS2xFTXdtXG5tUzEzU0owNFNoMXFNSFhGTnkyclc0eWh6R3pSZ3ZMVjBaeWVDQk9CZkVHTmUrUEdFVnFUbDM4cERaY1QrUnBUXG5MLy9LdHJuUUZKSi9mbmN5WVdTMm5FZFo0Sm1HY1I0c1gybjBEWTQ5OHVyNC9iZklKYnlhRzJwakFvR0FkRG9DXG5EQ3JGRWJyZmE0ZWZmWS9iRXV3TUFqZ0FjVWZhaHdHbUZtZmFRNmU5aXN4a0s4Vmw0RG1laUNWSld2VDgyU25WXG5OLzNqQVl3WldLZk9vUUtpR2lQMFptMXIxcEhabEtzRHltQ1JOaUZJSmVCakpUYWVTSmZqTW5laEdyU09mS2JxXG5GK2NrZy94bXQyNTY5SFJTeW4xQUVaZHBneHIzOGU0ZnBQVlpTVkVDZ1lBWkw2K0pTdXoxY3BsaXloQ3lJU2NXXG5RWEFTMTNiRXMvbHd6MjhZT3ltN2JnMzVzZjdhOFBPMjBocGNPWnVERERySlpjME9LbG9tNXQzSHYxUDIreWNOXG5NczFQbnBqRjFEYlZ6ZFBDcm8xTkxKdTk4eEVYNWJXSXRDUkF1Q1hKUS90MWVKL3d6TThjbGhLYnRYVGdQTHl4XG5mSnViMERTWFpqUmtYUFNDcU0yb0t3PT1cbi0tLS0tRU5EIFBSSVZBVEUgS0VZLS0tLS1cbiIsImNsaWVudF9lbWFpbCI6ImNlcy1hbmFseXRpY3NAY3JlYXRlLWV4cG8tc3RhY2stYW5hbHl0aWNzLmlhbS5nc2VydmljZWFjY291bnQuY29tIiwiY2xpZW50X2lkIjoiMTEyMjg4MzM5NDYxNTA5NDM0MTcwIiwiYXV0aF91cmkiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20vby9vYXV0aDIvYXV0aCIsInRva2VuX3VyaSI6Imh0dHBzOi8vb2F1dGgyLmdvb2dsZWFwaXMuY29tL3Rva2VuIiwiYXV0aF9wcm92aWRlcl94NTA5X2NlcnRfdXJsIjoiaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vb2F1dGgyL3YxL2NlcnRzIiwiY2xpZW50X3g1MDlfY2VydF91cmwiOiJodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9yb2JvdC92MS9tZXRhZGF0YS94NTA5L2Nlcy1hbmFseXRpY3MlNDBjcmVhdGUtZXhwby1zdGFjay1hbmFseXRpY3MuaWFtLmdzZXJ2aWNlYWNjb3VudC5jb20iLCJ1bml2ZXJzZV9kb21haW4iOiJnb29nbGVhcGlzLmNvbSJ9';

const keys = Buffer.from(key_data, 'base64').toString('utf-8');

export async function storeConfigAnalytics({
  timestamp,
  cesVersion,
  authType,
  internalization,
  nativeWindUIComponents = [],
  navigationLibrary,
  navigationType,
  packageManager,
  packageManagerVersion,
  stylingLibrary,
  eas,
  importAlias,
  noGit,
  noInstall,
  overwrite,
  os,
  osPlatform,
  osArch,
  osRelease
}: {
  timestamp: string;
  cesVersion: string;
  authType?: AuthenticationSelect;
  navigationLibrary?: NavigationSelect;
  navigationType?: NavigationTypes;
  stylingLibrary?: StylingSelect;
  packageManager: PackageManager;
  packageManagerVersion: string;
  internalization?: Internalization;
  nativeWindUIComponents?: SelectedComponents[];
  os: string;
  osPlatform: string;
  osArch: string;
  osRelease: string;
} & Partial<CliFlags>) {
  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
    console.log('Skipping analytics in development or test environment');
    return;
  }

  try {
    const auth = new GoogleAuth({
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      credentials: JSON.parse(keys)
    });

    const service = google.sheets({ version: 'v4', auth });

    const result = await service.spreadsheets.values.append({
      spreadsheetId: '1Nav_XXi8stJjaBBK8bX0CebRF5QKXU25BZc57I06yGQ',
      range: 'Sheet1!A:A',
      valueInputOption: 'RAW',
      requestBody: {
        values: [
          [
            timestamp ?? '',
            cesVersion ?? '',
            navigationLibrary ?? '',
            navigationType ?? '',
            stylingLibrary ?? '',
            packageManager,
            packageManagerVersion ?? '',
            internalization ?? '',
            nativeWindUIComponents?.join(',') ?? '',
            authType ?? '',
            eas ? 'true' : 'false',
            importAlias ? 'true' : 'false',
            noGit ? 'true' : 'false',
            noInstall ? 'true' : 'false',
            overwrite ? 'true' : 'false',
            os ?? '',
            osPlatform ?? '',
            osArch ?? '',
            osRelease ?? ''
          ]
        ]
      },
      insertDataOption: 'INSERT_ROWS'
    });

    console.log(`${result.data.updates.updatedCells} cells appended.`);

    // return result;
  } catch (err) {
    console.warn('analytics API returned an error: ' + err);
  }
}
