const KEY = 'AIzaSyAR92f5jYyCpeME_-k2venYrHXEbSDb7MY';
const menuMap = {
  'name': 0,
  'description': 1,
  'img': 2,
  'rate': 3,
  'category': 4,
  'subcategory': 5,
  'ingredients': 6,
}

const buildCard = (data) => {
  const subcategory = data[menuMap['subcategory']] ? `<li class="list-group-item d-flex justify-content-between"><span>Subcategory:</span><span>${data[menuMap['subcategory']]}</span></li>` : '';
  const html = 
  `<div class="card col-4 m-3 px-0" style="width: 18rem;">
    <img src="${data[menuMap['img']]}" class="card-img-top" alt="${data[menuMap['name']]}">
    <div class="card-body">
      <h5 class="card-title">${data[menuMap['name']]}</h5>
      <p class="card-text">${data[menuMap['description']]}</p>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item d-flex justify-content-between"><span>Category:</span><span>${data[menuMap['category']]}</span</li>
      ${subcategory}
      <li class="list-group-item d-flex justify-content-between"><span>Rate:</span><span>${data[menuMap['rate']]}</span></li>
    </ul>
    <div class="card-body">
      <a href="#" class="card-link">Card link</a>
      <a href="#" class="card-link">Another link</a>
    </div>
  </div>`;
  return html;
}

const buildCategory = (menu) => {
  Object.entries(menu).forEach((category, index) => {
    const menuContainer = document.querySelector('.menu-container');
    const categoryDiv = document.createElement('div');
    categoryDiv.classList.add('category', 'row', 'justify-content-center');
    categoryDiv.id = category[0];
    let cards = '';
    category[1].forEach(d => {
      cards += buildCard(d)
    });
    console.log(cards);
    categoryDiv.innerHTML = cards;
    menuContainer.append(categoryDiv);
  });
}
const init = async () => {
  const menu = {};
  const res = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/1SaUGu_DNEL6qHEAn_MkYMf62zKpq5RwHFYmJavIlcxg/values/Sheet1?key=${KEY}`);
  const data = await res.json();
  data.values.forEach((d, index) => {
    if(index === 0) {
      return;
    }
    if(!menu[d[menuMap['category']]]) {
      menu[d[menuMap['category']]] = [];
    }
    menu[d[menuMap['category']]].push(d);
  });
  buildCategory(menu);
}


init();