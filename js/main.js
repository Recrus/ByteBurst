import watch from "../img/watch.png";
import toy from "../img/pc.png";

document.addEventListener("DOMContentLoaded", initSlider);

const slideData = [
  {
    title: "Например,",
    subTitle: "Cоздали и продолжаем поддерживать интернет-магазин современной техники BigShop77",
    imgSrc: watch,
    backgroundColor: "#DED323",
    clientName: "BigStore77",
    clientLink: "#",
    stats: [
      { value: "-10%", description: "уменьшение расходов на рекламную компанию" },
      { value: "+30%", description: "увеличение количества заявок в сутки" }
    ]
  },
  {
    title: "Другой пример,",
    subTitle: "Помогли компании NuxtPC увеличить количество подписчиков и продажи",
    imgSrc: toy,
    backgroundColor: "#AEDB23",
    clientName: "NuxtPC",
    clientLink: "#",
    stats: [
      { value: "+120%", description: "подписчиков на YouTube" },
      { value: "+50%", description: "увеличение прибыли в месяц" }
    ]
  }
];


function initSlider() {
  slideData.forEach(createSlide);
  let slideIndex = 0;

  document.querySelector('.next-slide').addEventListener('click', () => {
    slideIndex = navigateSlide(++slideIndex);
  });

  document.querySelector('.prev-slide').addEventListener('click', () => {
    slideIndex = navigateSlide(--slideIndex);
  });

  navigateSlide(slideIndex);
}

function createElement(tag, classNames = [], attributes = {}) {
  const element = document.createElement(tag);
  element.classList.add(...classNames);
  for (let attr in attributes) {
    element.setAttribute(attr, attributes[attr]);
  }
  return element;
}

function createSlide(slide) {
  const sliderWrapper = document.querySelector('.slider-wrapper');

  const slideDiv = createElement('div', ['slide'], {style: `background-color: ${slide.backgroundColor}`});
  const contentDiv = createElement('div', ['slide__content']);
  const h2 = createElement('h2');
  h2.innerHTML = `<span>${slide.title}</span><br>${slide.subTitle}`;
  const img = createElement('img', [], {src: slide.imgSrc, alt: slide.title});

  contentDiv.append(h2, img);
  slideDiv.appendChild(contentDiv);
  sliderWrapper.appendChild(slideDiv);
}

function updateSlideText(index) {
  const slide = slideData[index];
  const slideTextContainer = document.querySelector('.slide-text');
  slideTextContainer.innerHTML = '';

  const clientDiv = createElement('div', ['slide-text__client']);
  const clientTitle = createElement('p', ['slide-text__client-title']);
  clientTitle.innerHTML = `Клиент: <span class="slide-text__client-name">${slide.clientName}</span>`;
  const clientLink = createElement('a', ['slide-text__client-link'], {href: slide.clientLink});
  clientLink.innerText = slide.clientName;
  const otherWorksLink = createElement('a', ['slide-text__other-works'], {href: "#"});
  otherWorksLink.innerText = "другие работы";

  clientDiv.append(clientTitle, clientLink, otherWorksLink);
  slideTextContainer.appendChild(clientDiv);

  const divider = document.createElement('hr');
  divider.className = "slide-text__divider";
  slideTextContainer.appendChild(divider);

  const statsContainer = document.createElement('div');
  statsContainer.className = "slide-text__stats-wrapper";
  slideTextContainer.appendChild(statsContainer);

  slide.stats.forEach(stat => {
    const statsDiv = document.createElement('div');
    statsDiv.className = "slide-text__stats";

    const h2 = document.createElement('h2');
      h2.className = "slide-text__stats-value";
      h2.innerText = stat.value;
      statsDiv.appendChild(h2);

      const p = document.createElement('p');
      p.className = "slide-text__stats-description";
      p.innerText = stat.description;
      statsDiv.appendChild(p);

      statsContainer.appendChild(statsDiv);
    });

    const divider2 = document.createElement('hr');
    divider2.className = "slide-text__divider";
    slideTextContainer.appendChild(divider2);

}

function navigateSlide(index) {
  console.log(index);
  const sliderWrapper = document.querySelector('.slider-wrapper');
  const slides = document.querySelectorAll('.slide');

  if (index >= slides.length) index = 0;
  if (index < 0) index = slides.length - 1;

  const offset = -index * 100;
  sliderWrapper.style.transform = `translateX(${offset}%)`;

  updateSlideText(index);

  return index;
}
