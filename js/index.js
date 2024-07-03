const hash = window.location.hash;
if (hash.length !== 0) {
  const section = document.querySelector(hash);
  section.scrollIntoView();
}

const tabBtns = document.querySelectorAll('.tabs__btn');
tabBtns.forEach((tabBtn) => {
  tabBtn.addEventListener('click', () => {
    if (tabBtn.closest('.tabs__active-btn')) {
      return;
    }
    const prev = document.querySelector('.tabs__active-btn');
    const prevTabName = prev.innerHTML;
    const prevTab = document.querySelector(`#${prevTabName}`);
    prevTab.classList.remove('tabs__active-tab');
    setTimeout(() => {
      prevTab.classList.add('d-none');
    }, 100);
    const activeTab = document.querySelector(`#${tabBtn.innerHTML}`);
    prev.classList.remove('tabs__active-btn');
    tabBtn.classList.add('tabs__active-btn');
    activeTab.classList.remove('d-none');
    setTimeout(() => {
      activeTab.classList.add('tabs__active-tab');
    }, 150);
  })
})

const certificatesSwiper = new Swiper(".certificates__swiper", {
  cssMode: true,
  navigation: {
    nextEl: ".certificates__swiper-button-next",
    prevEl: ".certificates__swiper-button-prev",
  },
  pagination: {
    el: ".certificates__swiper-pagination",
    clickable: true,
  },
  mousewheel: true,
  keyboard: true,
  spaceBetween: 15,
});

const worksSwiper = new Swiper(".works__swiper", {
  navigation: {
    nextEl: ".works__swiper-button-next",
    prevEl: ".works__swiper-button-prev",
  },
  pagination: {
    el: ".works__swiper-pagination",
    clickable: true,
  },
  mousewheel: true,
  keyboard: true,
  spaceBetween: 15,
});

const feedbackSwiper = new Swiper(".feedback__swiper", {
  cssMode: true,
  navigation: {
    nextEl: ".feedback__swiper-button-next",
    prevEl: ".feedback__swiper-button-prev",
  },
  pagination: {
    el: ".feedback__swiper-pagination",
    clickable: true,
  },
  mousewheel: true,
  keyboard: true,
});

ymaps.ready(init);
function init() {
  let myMap = new ymaps.Map("myMap", {
    center: [51.671629, 39.402408],
    zoom: 12,
    controls: [],
    scroll: false,
  });

  const myPlacemark = new ymaps.Placemark([51.671629, 39.402408], {}, {
    iconLayout: 'default#image',
    iconImageHref: '../images/map-mark.png',
    iconImageSize: [40, 40],
  });

  const zoomControl = new ymaps.control.ZoomControl({});
  const geolocationControl = new ymaps.control.GeolocationControl({});

  myMap.behaviors.disable('scrollZoom');
  myMap.controls.add(zoomControl);
  myMap.controls.add(geolocationControl);
  myMap.geoObjects.add(myPlacemark);

  // отключаем элемменты управления при ширине экрана <= 768px
  const windowWidth = document.documentElement.clientWidth;
  if (windowWidth <= 768) {
    myMap.behaviors.disable('drag');
  } else {
    myMap.controls.remove(zoomControl);
    myMap.controls.remove(geolocationControl);
  }
}

// inputmask
const form = document.querySelector('.form');
const telSelector = form.querySelector('input[type="tel"]');
const inputMask = new Inputmask('+7 (999) 999-99-99');
inputMask.mask(telSelector);

// валидация
const validation = new JustValidate('.form');

validation
  .addField('.contacts__form-name-input', [
    {
      rule: 'minLength',
      value: 2,
    },
    {
      rule: 'maxLength',
      value: 15,
    },
    {
      rule: 'required',
      value: true,
      errorMessage: 'Введите имя!'
    }
  ])
  .addField('.contacts__form-phone-input', [
    {
      rule: 'required',
      value: true,
      errorMessage: 'Телефон обязателен',
    },
    {
      rule: 'function',
      validator: function () {
        const phone = telSelector.inputmask.unmaskedvalue();
        return phone.length === 10;
      },
      errorMessage: 'Введите корректный телефон',
    },
  ]).onSuccess((event) => {
    let formData = new FormData(event.target);
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          console.log('Отправлено');
        }
      }
    }

    xhr.open('POST', 'mail.php', true);
    xhr.send(formData);

    event.target.reset();

    // показываем модальное окно
    showModal();
  });

function showModal() {
  const modal = document.querySelector('.modal');
  const modalWindow = modal.querySelector('.modal__window');

  modal.classList.add('show');
  setTimeout(() => {
    modalWindow.classList.add('show');
  }, 100);

  const body = document.querySelector('body');
  body.classList.add('no-scroll');
}

function closeModal() {
  const modal = document.querySelector('.modal');
  const modalWindow = modal.querySelector('.modal__window');

  modalWindow.classList.remove('show');
  setTimeout(() => {
    modal.classList.remove('show');
  }, 100);

  const body = document.querySelector('body');
  body.classList.remove('no-scroll');
}

// скрытие модального окна при клике по фону
document.addEventListener('click', (e) => {
  const target = e.target;
  if (target.closest('.modal') && !target.closest('.modal__window')) {
    closeModal();
  }
})

// скрытие модального окна через кнопку закрытия
const closeBtn = document.querySelector('.modal__close-btn');
closeBtn.addEventListener('click', () => {
  closeModal();
})

// сдвиг бабла тултипа от боковых границ страницы
const tooltips = document.querySelectorAll('.price__tooltip');
tooltips.forEach(tooltip => {
  // убираем предыдущие сдвиги
  const buble = tooltip.querySelector('.price__tooltip-bubble');
  const triangle = tooltip.querySelector('.price__tooltip-triangle');
  buble.style.transform = `translateX(0)`;
  triangle.style.transform = `translateX(0)`;
  // в качестве границ, при достижении которых начинаем сдвигать бабл, принимаем границы li
  const li = buble.closest('.price__item');
  // находим расстояние от боковых границ li до краев окна браузера
  const windowWidth = document.documentElement.clientWidth;
  const liIndentLeft = li.getBoundingClientRect().left;
  const liIndentRight = windowWidth - li.getBoundingClientRect().right;
  // находим расстояние от боковых границ бабла до краев окна браузера
  const bubleIndentLeft = buble.getBoundingClientRect().left;
  const bubleIndentRight = windowWidth - buble.getBoundingClientRect().right;
  // находим расстояние от боковых границ бабла до краев li
  const left = bubleIndentLeft - liIndentLeft;
  const right = bubleIndentRight - liIndentRight;
  // при отрицательном значении left () сдвигаем бабл
  if (left < 0) {
    buble.style.transform = `translateX(${Math.abs(left)}px)`;
    // и сдвигаем флажок бабла под тултип
    triangle.style.transform = `translateX(${left}px)`;
  }
  //аналогично справа (только отступ уже с отрицательным значением)
  if (right < 0) {
    buble.style.transform = `translateX(${right}px)`;
    triangle.style.transform = `translateX(${Math.abs(right)}px)`;
  }
});

// Прокрутка страницы при нажатии кнопки наверх
const upBtn = document.querySelector('.up-btn');
upBtn.addEventListener('click', () => {
  window.scrollTo(0, 0);
})

//gsap
gsap.registerPlugin(ScrollTrigger);
const tl = gsap.timeline

gsap.to('.curtain', {
  opacity: 0,
  display: 'none',
  delay: 1,
  duration: 1,
});

gsap.to('.nav', {
  opacity: 1,
  delay: 1,
  duration: 1,
});

gsap.from('.title__red-one', {
  opacity: 0,
  duration: 4,
  delay: 2,
});

gsap.from('.title__red-two', {
  opacity: 0,
  duration: 4,
  delay: 2.05,
});

gsap.from('.title__red-three', {
  opacity: 0,
  duration: 4,
  delay: 2.1,
});

gsap.from('.title__red-four', {
  opacity: 0,
  duration: 4,
  delay: 2.15,
});

gsap.from('.title__red-five', {
  opacity: 0,
  duration: 4,
  delay: 2.2,
});

gsap.from('.title__red-six', {
  opacity: 0,
  duration: 4,
  delay: 2.25,
});

gsap.from('.title__red-seven', {
  opacity: 0,
  duration: 4,
  delay: 2.3,
});

gsap.from('.about__img', {
  scrollTrigger: {
    trigger: '.about',
    markers: false,
    start: 'center bottom',
  },
  x: -500,
  opacity: 0,
  duration: 1,
  scrub: true,
})

gsap.from('.works__title', {
  scrollTrigger: {
    trigger: '.about',
    markers: false,
    start: 'top top',
  },
  y: 60,
  opacity: 0,
  duration: .5,
})

gsap.from('.works__swiper', {
  scrollTrigger: {
    trigger: '.about',
    markers: false,
    start: 'top top',
  },
  y: 60,
  opacity: 0,
  duration: .5,
  delay: .2
})

gsap.from('.details__left', {
  scrollTrigger: {
    trigger: '.details',
    markers: false,
    start: 'center bottom',
  },
  x: -300,
  opacity: 0,
  duration: 1,
})

gsap.from('.price__title', {
  scrollTrigger: {
    trigger: '.details',
    markers: false,
    start: 'center center',
  },
  y: 60,
  opacity: 0,
  duration: .5,
})

gsap.from('.price__list', {
  scrollTrigger: {
    trigger: '.details',
    markers: false,
    start: 'center center',
  },
  y: 60,
  opacity: 0,
  duration: .5,
  delay: .2
})

gsap.from('.certificates__title', {
  scrollTrigger: {
    trigger: '.price',
    markers: false,
    start: 'center center',
  },
  y: 60,
  opacity: 0,
  duration: .5,
})

gsap.from('.certificates__swiper', {
  scrollTrigger: {
    trigger: '.price',
    markers: false,
    start: 'center center',
  },
  y: 60,
  opacity: 0,
  duration: .5,
  delay: .2
})

gsap.from('.feedback__title', {
  scrollTrigger: {
    trigger: '.feedback',
    markers: false,
    start: 'center bottom',
  },
  y: 60,
  opacity: 0,
  duration: .5,
})

gsap.from('.feedback__swiper', {
  scrollTrigger: {
    trigger: '.feedback',
    markers: false,
    start: 'center bottom',
  },
  y: 60,
  opacity: 0,
  duration: .5,
  delay: .2
})

gsap.from('.contacts__title', {
  scrollTrigger: {
    trigger: '.feedback',
    markers: false,
    start: 'center center',
  },
  y: 60,
  opacity: 0,
  duration: .5,
})

gsap.from('.contacts__wrapper', {
  scrollTrigger: {
    trigger: '.feedback',
    markers: false,
    start: 'center center',
  },
  y: 70,
  opacity: 0,
  duration: .5,
  delay: .2
})

gsap.from('.up-btn', {
  scrollTrigger: {
    trigger: '.price',
    markers: false,
    start: 'bottom bottom',
    scrub: true,
  },
  opacity: 0,
})

gsap.from('.header', {
  scrollTrigger: {
    trigger: '.header',
    markers: false,
    start: 'bottom top',
    scrub: true,
  },

  background: 'transparent',
})

// бургер
const burgerBtn = document.querySelector('.burger-btn');
burgerBtn.addEventListener('click', () => {
  burgerBtn.classList.toggle('transformed');
  const burgerMenu = document.querySelector('.header__nav');
  burgerMenu.classList.toggle('nav-is-open');
  const body = document.querySelector('body');
  body.classList.toggle('no-scroll');

  // закрытие бургера при клике вне его
  document.addEventListener('click', (e) => {
    if (e.target.closest('.header__nav') || e.target.closest('.burger-btn')) {
      return;
    }
    else {
      burgerMenu.classList.remove('nav-is-open');
      body.classList.remove('no-scroll');
      burgerBtn.classList.remove('transformed');
    }
  })
  // закрытие бургера после клика на ссылку навигации
  const navLinks = burgerMenu.querySelectorAll('.nav__link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      burgerMenu.classList.remove('nav-is-open');
      body.classList.remove('no-scroll');
      burgerBtn.classList.remove('transformed');
    })
  });
})

// скрытие хэдера
const header = document.querySelector('.header');
headerShowHideWhenScrolling(header);

function headerShowHideWhenScrolling(header) {
  if (document.documentElement.clientWidth <= 768) {
    let lastScroll = 0;
    let headerHeight = window.getComputedStyle(header, null).height;
    // при ресайзе заново получаем высоту header (полезно если высота хэдера адаптивно меняется)
    window.addEventListener('resize', () => {
      headerHeight = window.getComputedStyle(header, null).height;
    })
    const defaultOffset = headerHeight.replace('px', '');
    const scrollPosition = () => window.pageYOffset || document.documentElement.scrollTop;
    const isHidden = () => header.classList.contains('js-header-hidden');
    window.addEventListener('scroll', () => {
      // прокрутка вниз
      if (scrollPosition() > lastScroll && !isHidden() && scrollPosition() > defaultOffset) {
        header.classList.add('js-header-hidden');
        header.style.transform = `translateY(-${headerHeight})`;
      } else if (scrollPosition() < lastScroll && isHidden()) {
        header.classList.remove('js-header-hidden');
        header.style.transform = 'translateY(0px)';
      }
      lastScroll = scrollPosition();
    })
  }

  return header;
}

// lazyload
const lazyImages = document.querySelectorAll('img[data-src], source[data-srcset]');
const windowHeight = document.documentElement.clientHeight;

const lazyImagesPositions = [];
if (lazyImages.length > 0) {
  lazyImages.forEach(img => {
    if (img.dataset.src || img.dataset.srcset) {
      lazyImagesPositions.push(img.getBoundingClientRect().top + scrollY);
      lazyScrollCheck();
    }
  })
}

function lazyscroll() {
  if (document.querySelectorAll('img[data-src], source[data-srcset]').length > 0) {
    lazyScrollCheck();
  }
}

function lazyScrollCheck() {
  const imgIndex = lazyImagesPositions.findIndex(item => scrollY > item - windowHeight);
  if (imgIndex >= 0) {
    if (lazyImages[imgIndex].dataset.src) {
      lazyImages[imgIndex].src = lazyImages[imgIndex].dataset.src;
      lazyImages[imgIndex].removeAttribute('data-src');
    } else if (lazyImages[imgIndex].dataset.srcset) {
      lazyImages[imgIndex].srcset = lazyImages[imgIndex].dataset.srcset;
      lazyImages[imgIndex].removeAttribute('data-srcset');
    }
    delete lazyImagesPositions[imgIndex];
  }
}

window.addEventListener('scroll', lazyscroll);
