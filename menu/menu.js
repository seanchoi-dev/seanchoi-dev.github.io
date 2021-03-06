const KEY = 'AIzaSyAR92f5jYyCpeME_-k2venYrHXEbSDb7MY';
const imageWidth = 350;
const menuMap = {
  'name': 0,
  'description': 1,
  'img': 2,
  'rate': 3,
  'category': 4,
  'subcategory': 5,
}
const spaceRemover = name => name.replace(' ','');
const uniq = a => [...new Set(a)];
const isMobile = () => {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};
const clearEl = (el) => {
  while (el.firstChild) {
    el.removeChild(el.lastChild);
  }
}
const clearSearch = () => {
  const searchContainer = document.querySelector('.search-result');
  const menuContainer = document.querySelector('.menu-container');
  searchContainer.classList.add('hidden');
  menuContainer.classList.remove('hidden');
  setTimeout(() => {
    menuContainer.style.opacity = 1;
  }, 0);
  clearEl(searchContainer);
  const searchInput = document.getElementById('searchinput');
  searchInput.value = '';
}
const searchRun = (search) => {
  const searchContainer = document.querySelector('.search-result');
  const menuContainer = document.querySelector('.menu-container');
  if(!search) {
    clearSearch();
    return;
  }
  clearEl(searchContainer);
  const searchResultsIDs = [];
  searchWords = searchinput.value.trim().split(' ');
  const searchResultEl = document.createElement('div');
  searchResultEl.classList.add('search-results','scrolling-wrapper');
  const cardsEl = document.querySelectorAll('.card');
  cardsEl.forEach((card) => {
    uniq(searchWords).forEach((sWord) => {
      if(card.dataset.tags.includes(sWord)) searchResultsIDs.push(card.id);
    });
  });
  uniq(searchResultsIDs).forEach(id => {
    searchResultEl.append(document.getElementById(id).cloneNode(true));
  });
  if(!searchResultEl.innerHTML) {
    searchResultEl.innerHTML = `<div class="mx-auto my-3">검색 결과 없음</div>`;
  }
  clickToSearchEvent(searchResultEl.querySelectorAll('.search-tag'));
  const categoryHeader = document.createElement('div');
  categoryHeader.classList.add('category-header', 'border-bottom', 'd-flex', 'align-items-baseline');
  categoryHeader.innerHTML = '<h2>검색 결과</h2><a id="clear" class="ms-1 p-2" href="javascript:void(0)" onclick="clearSearch()">Clear</a>';
  searchContainer.append(categoryHeader);
  searchContainer.append(searchResultEl);
  searchContainer.classList.remove('hidden');
  menuContainer.classList.add('hidden');
  menuContainer.style.opacity = 0;
  setTimeout(() => {
    searchResultEl.style.opacity = 1;
  }, 0);
};

const calcStar = (n) => {
  const cal = Math.round(n*10/5)*.5;
  return cal.toString().replace('.', '-');
};

const buildCard = (data) => {
  const category = data[menuMap['category']] || '기타';
  let tags = [category, spaceRemover(data[menuMap['name']])];
  let ingredients = '';
  const imgURL = data[menuMap['img']] || `${window.location.origin}/lib/images/default-food-image.jpeg`;
  const imgURLModified = new URL(imgURL);
  imgURLModified.searchParams.set('w', imageWidth)
  console.log(imgURLModified.href);
  for(i=6; i<data.length; i++) {
    const ingredient = spaceRemover(data[i]);
    ingredients += `<div class="btn btn-secondary search-tag mx-1 mb-1" data-searchvalue="${ingredient}">${ingredient}</div>`;
    tags.push(ingredient);
  }
  let favorite = '';
  if(parseFloat(data[menuMap['rate']]) >= 4.5) {
    favorite = `<div class="favorite-label position-absolute"><div class="btn search-tag" data-searchvalue="추천"><img src="/lib/images/star.png"></div></div>`;
    tags.push('추천');
  }
  let subcategory = '';
  if(data[menuMap['subcategory']]) {
    subcategory = `<h6 class="subcategory-label search-tag fz-2 text-decoration-underline" data-searchvalue="${data[menuMap['subcategory']]}">${data[menuMap['subcategory']]}</h6>`;
    tags.push(data[menuMap['subcategory']]);
  } else {
    subcategory = `<h6 class="subcategory-label fz-2"></h6>`;
  }
  let rate = '';
  if(data[menuMap['rate']]) {
    rate = `<span class="a-icon a-star-medium-${calcStar(data[menuMap['rate']])}"></span>
    <span>${data[menuMap['rate']].length === 1 ? data[menuMap['rate']]+'.0': data[menuMap['rate']]}</span>`
  } else {
    rate = `<span></span><span>Unrated</span>`
  }
  const html = 
  `<div id="${spaceRemover(data[menuMap['name']])}" class="${category}-card card col-11 col-md-5 col-lg-3 col-xl-2 m-3 px-0 position-relative" data-tags="${tags}">
    <div class="object-fit-container card-img-top" style="background-image: url(${imgURLModified})">
      <div class="category-label position-absolute"><div class="btn search-tag" data-searchvalue="${category}">${category}</div></div>
      ${favorite}
    </div>
    <div class="card-body">
      ${subcategory}
      <h5 class="card-title">${data[menuMap['name']]}</h5>
      <p class="card-text text-secondary">${data[menuMap['description']]||''}</p>
      <div class="list-group-item d-flex justify-content-between">
        ${rate}
      </div>
    </div>
    <div class="ingredients card-body pt-0">
      ${ingredients}
    </div>
  </div>`;
  return html;
};

const buildCategory = (menu) => {
  Object.entries(menu).forEach((category) => {
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
};

const clickToSearchEvent = (searchEl) => {
  const searchInput = document.getElementById('searchinput');
  searchEl.forEach((el) => {
    const searchEvent = () => {
      searchInput.value = el.dataset.searchvalue;
      if(!isMobile()) searchInput.focus();
      searchRun(searchInput.value);
    }
    el.addEventListener('click', searchEvent);
    el.addEventListener('touch', searchEvent);
  });
}
const searchEventInit = () => {
  const searchInput = document.getElementById('searchinput');
  let timeout = null;
  searchInput.addEventListener('keyup', (e) => {
      clearTimeout(timeout);
      timeout = setTimeout(function () {
        searchRun(searchInput.value);
      }, 500);
  });
  const searchEl = document.querySelectorAll('.search-tag');
  clickToSearchEvent(searchEl);
};


const init = async () => {
  const menu = {};
  const res = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/1SaUGu_DNEL6qHEAn_MkYMf62zKpq5RwHFYmJavIlcxg/values/Sheet1?key=${KEY}`);
  const data = await res.json();
  let others = [];
  data.values.forEach((d, index) => {
    if(index === 0) {
      return;
    }
    if(d[menuMap['category']]) {
      if(!menu[d[menuMap['category']]]) menu[d[menuMap['category']]] = [];
      menu[d[menuMap['category']]].push(d);
    } else {
      others.push(d);
    }
  });
  if(others.length) {
    menu['기타'] = others;
  }
  // console.log(menu);
  buildCategory(menu);
  searchEventInit();
};

init();