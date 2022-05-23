const CLIENT_ID = '977242394815-o5umfp0j882gr9bjnc39jqf17u596rf4.apps.googleusercontent.com';
const API_KEY = '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';
const SCOPES = 'https://www.googleapis.com/auth/spreadsheets.readonly';
const KEY = 'AIzaSyAR92f5jYyCpeME_-k2venYrHXEbSDb7MY';

const init = () => {
  fetch('https://sheets.googleapis.com/v4/spreadsheets/1SaUGu_DNEL6qHEAn_MkYMf62zKpq5RwHFYmJavIlcxg?key=AIzaSyAR92f5jYyCpeME_-k2venYrHXEbSDb7MY')
  .then(response => response.json())
  .then(data => console.log(data));
}
init();