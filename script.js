'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className = '') {
  const html = `
        <article class="country ${className}">
            <img class="country__img" src="${data.flag}" />
            <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)}M people</p>
        <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><spans>💰</span>${
              data.currencies[0].name
            }</p>
            </div>
        </article>
      `;

  countriesContainer.insertAdjacentHTML('beforeend', html);

  countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} ${response.status}`);

    return response.json();
  });
};
///////////////////////////////////////
/*
const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    const html = `
    <article class="country">
        <img class="country__img" src="${data.flag}" />
        <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 10000000z
        ).toFixed(1)}M people</p>
    <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
        <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
        </div>
    </article>
  `;

    countriesContainer.insertAdjacentHTML('beforeend', html);

    countriesContainer.style.opacity = 1;
  });
};

getCountryData('nigeria'); 
getCountryData('usa');
getCountryData('portugal');


// ///////////////////////////////
// Call Back hell

const getCountryAndNeighbour = function (country) {
  // AJAX call country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    // Render neighbour country 1
    renderCountry(data);

    // Get neighbour country 2
    const neighbour = data.borders[1];

    if (!neighbour) return;

    // AJAX call country 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function () {
      const data2 = JSON.parse(this.responseText);
      console.log(data2);

      renderCountry(data2, 'neighbour');
    });
  });
};

getCountryAndNeighbour('nigeria');
// getCountryAndNeighbour('usa');
// getCountryAndNeighbour('portugal');


const getCountryData = function (country) {
  // country 1
  getJSON(`https://restcountries.com/v2/name/${country}`, 'Country not found')
    .then(data => {
      renderCountry(data[0]);

      let neighbour = data[0].borders;

      console.log(neighbour);

      if (!neighbour) throw new Error('No neighbour found');

      //   country 2
      [neighbour] = neighbour;

      return getJSON(
        `https://restcountries.com/v2/alpha/${neighbour}`,
        'Country not found'
      );
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.log(`${err} `);
      renderError(`Something went wrong ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });

  //   console.log(request);
};

btn.addEventListener('click', function () {
  getCountryData('nigeria');
});

const whereAmI = function (lat, lng) {
  fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
    .then(response => {
      if (!response.ok)
        throw new Error(`Problem with geocoding ${response.status}`);
      console.log(response);
      response.json();
    })
    .then(data => {
      console.log(data);
      console.log(` You are in ${data.city}, ${data.country}`);

      return fetch(`https://restcountries.com/v2/name/${data.country}`);
    })
    .then(response => {
      if (!response.ok)
        throw new Error(`Country not found! ${response.status}`);

      return response.json();
    })
    .then(data => renderCountry(data))
    .catch(err => console.log(`${err.message}`));
};

whereAmI(52.588, 13.381);
whereAmI(19.037, 72.073);
whereAmI(-33.933, 18.474);

console.log('start loop');
setTimeout(() => {
  console.log('After 0 sec');
}, 0);
Promise.resolve('resolved promise 1').then(res => console.log(res));
Promise.resolve('resolved promise 2').then(res => {
  for (let i = 0; i < 1000000000; i++);
  console.log(res);
});
console.log('stop loop');

const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('lottery is happening...');
  setTimeout(() => {
    if (Math.random() > 0.5) {
      resolve('You won money');
    } else {
      reject('You lost your money');
    }
  }, 2000);
});

lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

////////////////////////////////////
// promisify setTimeout
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

wait(1)
  .then(() => {
    console.log('1 second passed');
    return wait(2);
  })
  .then(() => {
    console.log('2 seconds passed');
    return wait(3);
  })
  .then(() => {
    console.log('3 seconds passed');
    return wait(4);
  })
  .then(() => {
    console.log('4 seconds passed');
    return wait(5);
  })
  .then(() => {
    console.log('5 seconds passed');
  });

Promise.resolve('abc').then(res => console.log(res));
Promise.reject('abc').catch(res => console.error(res));

/////////////////////////
const getPosition = function () {
  return new Promise(function (resolve, reject) {
navigator.geolocation.getCurrentPosition(
  position => resolve(position),
  err => reject(err)
);

    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = function () {
  getPosition()
    .then(pos => {
      const { latitude: lat, longitude: lng } = pos.coords;
      return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    })
    .then(response => {
      if (!response.ok)
        throw new Error(`Problem with geocoding ${response.status}`);
      console.log(response);
      response.json();
    })
    .then(data => {
      console.log(data);
      console.log(` You are in ${data.city}, ${data.country}`);

      return fetch(`https://restcountries.com/v3/name/${data.country}`);
    })
    .then(response => {
      if (!response.ok)
        throw new Error(`Country not found! ${response.status}`);

      return response.json();
    })
    .then(data => renderCountry(data))
    .catch(err => console.log(`${err.message}`));
};

btn.addEventListener('click', whereAmI);


///////////////Coding Challenge 2/////////////

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const imgContainer = document.querySelector('.images');

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const image = document.createElement('img');
    image.src = imgPath;

    image.addEventListener('load', function () {
      imgContainer.append(image);
      resolve(image);
    });

    image.addEventListener('error', function () {
      reject(new Error('Image not found!'));
    });
  });
};

let curImg;

createImage('img/img-1.jpg')
  .then(img => {
    curImg = img;
    console.log('Image 1 loaded');
    return wait(2);
  })
  .then(() => {
    curImg.style.display = 'none';
    return createImage('img/img-2.jpg');
  })
  .then(img => {
    curImg = img;
    console.log('Image 1 loaded');
    return wait(2);
  })
  .then(() => {
    curImg.style.display = 'none';
    return createImage('img/img-3.jpg');
  })
  .then(img => {
    curImg = img;
    console.log('Image 1 loaded');
    return wait(2);
  })
  .then(() => (curImg.style.display = none))
  .catch(err => imgContainer.append(err.message));


const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async function () {
  // Geolocation
  try {
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    //reverse Geocoding
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    if (!resGeo.ok) throw new Error('Problem getting location data');

    const dataGeo = await resGeo.json();

    // country data
    const res = await fetch(
      `https://restcountries.com/v2/name/${dataGeo.country}`
    );
    if (!res.ok) throw new Error('Problem getting country');

    const data = await res.json();
    renderCountry(data[0]);

    return `You are in ${dataGeo.city}, ${dataGeo.country}`;
  } catch (err) {
    renderError(`${err.message}!`);

    // reject promise returned from async function
    throw err;
  }
};

console.log('1; will get location');
// whereAmI();
// console.log('First');
// console.log('2; finished getting location');

(async function () {
  try {
    const city = await whereAmI();
    console.log(`2: ${city}`);
  } catch (err) {
    console.log(`2: ${err.message}`);
  }
  console.log(`3: finished getting location`);
})();


const get3Countries = async function (c1, c2, c3) {
  try {
    // const [data1] = await getJSON(`https://restcountries.com/v2/name/${c1}`);
    // const [data2] = await getJSON(`https://restcountries.com/v2/name/${c2}`);
    // const [data3] = await getJSON(`https://restcountries.com/v2/name/${c3}`);

    // console.log([data1.capital, data2.capital, data3.capital]);

    const data = await Promise.all([
      getJSON(`https://restcountries.com/v2/name/${c1}`),
      getJSON(`https://restcountries.com/v2/name/${c2}`),
      getJSON(`https://restcountries.com/v2/name/${c3}`),
    ]);

    console.log(data.map(d => d[0].capital));
  } catch (err) {
    console.error(err);
  }
};

get3Countries('portugal', 'nigeria', 'tanzania');


// Promise.race

(async function () {
  const res = await Promise.race([
    getJSON(`https://restcountries.com/v2/name/italy`),
    getJSON(`https://restcountries.com/v2/name/portugal`),
    getJSON(`https://restcountries.com/v2/name/nigeria`),
  ]);
  console.log(res);
})();

const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(() => {
      reject(new Error('Request took too long'));
    }, sec * 1000);
  });
};

Promise.race([
  getJSON(`https://restcountries.com/v2/name/nigeria`),
  timeout(0.03),
])
  .then(res => console.log(res[0]))
  .catch(err => console.error(err));

// Promise.allsettled
Promise.allSettled([
  Promise.reject('rejected'),
  Promise.resolve('resolved'),
  Promise.reject('success'),
]).then(r => console.log(r));

// Promise.any
Promise.any([
  Promise.reject('rejected'),
  Promise.resolve('resolved'),
  Promise.reject('success'),
]).then(r => console.log(r));
*/

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const imgContainer = document.querySelector('.images');

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const image = document.createElement('img');
    image.src = imgPath;

    image.addEventListener('load', function () {
      imgContainer.append(image);
      resolve(image);
    });

    image.addEventListener('error', function () {
      reject(new Error('Image not found!'));
    });
  });
};

// let curImg;

// createImage('img/img-1.jpg')
//   .then(img => {
//     curImg = img;
//     console.log('Image 1 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     curImg.style.display = 'none';
//     return createImage('img/img-2.jpg');
//   })
//   .then(img => {
//     curImg = img;
//     console.log('Image 1 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     curImg.style.display = 'none';
//     return createImage('img/img-3.jpg');
//   })
//   .then(img => {
//     curImg = img;
//     console.log('Image 1 loaded');
//     return wait(2);
//   })
//   .then(() => (curImg.style.display = none))
//   .catch(err => imgContainer.append(err.message));

///////////////////3RD CODING CHALLENGE/////////////

// PART 1
const loadPause = async function () {
  try {
    // Load image 1
    let img = await createImage('img/img-1.jpg');
    console.log('Image 1 loaded');
    await wait(2);
    img.style.display = 'none';

    // Load image 2
    img = await createImage('img/img-2.jpg');
    console.log('Image 2 loaded');
    await wait(2);
    img.style.display = 'none';

    // Load image 3
    img = await createImage('img/img-3.jpg');
    console.log('Image 3 loaded');
    await wait(2);
    img.style.display = 'none';
  } catch (err) {
    console.log(err);
  }
};

// loadPause();

// PART 2
const loadAll = async function (imgArr) {
  try {
    const imgs = imgArr.map(async img => await createImage(img));

    const imgsEl = await Promise.all(imgs);
    imgsEl.forEach(img => img.classList.add('parallel'));
  } catch (err) {
    console.log(err);
  }
};

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
