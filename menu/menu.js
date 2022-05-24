const KEY = 'AIzaSyAR92f5jYyCpeME_-k2venYrHXEbSDb7MY';
const menuMap = {
  'name': 0,
  'description': 1,
  'img': 2,
  'rate': 3,
  'category': 4,
  'subcategory': 5,
}
const calcStar = (n) => {
  const cal = Math.round(n*10/5)*.5;
  return cal.toString().replace('.', '-');
}
const buildCard = (data) => {
  let ingredients = '';
  for(i=6; i<data.length; i++) {
    ingredients += `<div class="btn btn-secondary mx-1 mb-1">${data[i]}</div>`;
  }
  let recommend = '';
  if(parseFloat(data[menuMap['rate']]) >= 4.5) {
    recommend = `<div class="recommend-label position-absolute"><div class="btn"><img src="/lib/images/star.png"></div></div>`;
  }
  const html = 
  `<div class="${data[menuMap['category']]}-card card col-12 col-md-5 col-lg-3 m-3 px-0 position-relative">
    <div class="object-fit-container card-img-top" style="background-image: url(${data[menuMap['img']]})">
      <div class="category-label position-absolute"><div class="btn">${data[menuMap['category']]}</div></div>
      ${recommend}
    </div>
    <div class="card-body">
      <h6 class="subcategory-label fz-2 text-decoration-underline">${data[menuMap['subcategory']]}</h6>
      <h5 class="card-title">${data[menuMap['name']]}</h5>
      <p class="card-text text-secondary">${data[menuMap['description']]}</p>
      <div class="list-group-item d-flex justify-content-between">
        <span class="a-icon a-star-medium-${calcStar(data[menuMap['rate']])}"></span>
        <span>${data[menuMap['rate']].length === 1 ? data[menuMap['rate']]+'.0': data[menuMap['rate']]}</span>
      </div>
    </div>
    <div class="ingredients card-body pt-0">
      ${ingredients}
    </div>
  </div>`;
  return html;
}

const buildCategory = (menu) => {
  Object.entries(menu).forEach((category, index) => {
    const menuContainer = document.querySelector('.menu-container');
    const categoryDiv = document.createElement('div');
    categoryDiv.classList.add('category', category[0], 'mb-5');
    categoryDiv.id = category[0];

    const categoryHeader = document.createElement('div');
    categoryHeader.classList.add('category-header', 'border-bottom');
    categoryHeader.innerHTML = `<h2>${category[0]}</h2>`;

    const cardsEl = document.createElement('div');
    cardsEl.classList.add('cards', 'scrolling-wrapper');
    
    let cards = '';
    category[1].forEach(d => {
      cards += buildCard(d);
    });
    cardsEl.innerHTML = cards;

    categoryDiv.append(categoryHeader);
    categoryDiv.append(cardsEl);
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