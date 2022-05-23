const KEY = 'AIzaSyAR92f5jYyCpeME_-k2venYrHXEbSDb7MY';

const init = async () => {
  const res = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/1SaUGu_DNEL6qHEAn_MkYMf62zKpq5RwHFYmJavIlcxg/values/Sheet1?key=${KEY}`);
  const data = await res.json();
  console.log(data.values);
}

init();