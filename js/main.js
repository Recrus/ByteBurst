import watch from "../img/watch.png";
import pc from "../img/pc.png";
import eye from "../img/eye.svg";
import news1 from "../img/news1.png";
import news2 from "../img/news2.png";
import leo from "../img/leo.png";

const CASE_SLIDER_WRAPPER = '.case-slider__wrapper';
const NEWS_SLIDER_ITEMS = '.news-slider__items';

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
    imgSrc: pc,
    backgroundColor: "#AEDB23",
    clientName: "NuxtPC",
    clientLink: "#",
    stats: [
      { value: "+120%", description: "подписчиков на YouTube" },
      { value: "+50%", description: "увеличение прибыли в месяц" }
    ]
  }
];
const newsSlideData = [
  {
    mainImage: news1,
    authorAvatar: leo,
    authorName: "Леонид Дикаприй",
    views: 1357,
    title: "27 способов рассказать о проблемах в вашем аккаунте",
    link: "#"
  },
  {
    mainImage: news2,
    authorAvatar: leo,
    authorName: "Леонид Дикаприй",
    views: 701,
    title: "2 способа завоевать доверие",
    link: "#"
  },
  {
    mainImage: news1,
    authorAvatar: leo,
    authorName: "Леонид Дикаприй",
    views: 1232,
    title: "27 способов рассказать о проблемах в вашем аккаунте",
    link: "#"
  },
  {
    mainImage: news2,
    authorAvatar: leo,
    authorName: "Леонид Дикаприй",
    views: 2242,
    title: "2 способа рассказать о проблемах в вашем аккаунте",
    link: "#"
  }
];

document.addEventListener("DOMContentLoaded", () => {
  initSlider(CASE_SLIDER_WRAPPER, slideData, createCaseSlide, navigateCaseSlide);

  const sortedNews = newsSlideData.sort((a, b) => b.views - a.views);
  initSlider(NEWS_SLIDER_ITEMS, sortedNews, createNewsSlide, navigateNewsSlide);
});

function initSlider(containerSelector, data, slideCreator, navigator) {
  data.forEach(slideCreator);

  const nextButton = document.querySelector(`${containerSelector}-next`);
  const prevButton = document.querySelector(`${containerSelector}-prev`);

  if (nextButton && prevButton) {
    let slideIndex = 0;
    nextButton.addEventListener('click', () => navigator(++slideIndex));
    prevButton.addEventListener('click', () => navigator(--slideIndex));

    navigator(slideIndex);
  }
}

// Utility function to create elements
function createElement(tag, classNames = [], attributes = {}) {
  const element = document.createElement(tag);
  element.classList.add(...classNames);
  for (let attr in attributes) {
    element.setAttribute(attr, attributes[attr]);
  }
  return element;
}

function createCaseSlide(slide) {
  const sliderWrapper = document.querySelector(CASE_SLIDER_WRAPPER);
  if (!sliderWrapper) {
    console.error(`Element with selector ${CASE_SLIDER_WRAPPER} not found.`);
    return;
  }

  const slideElement = createElement('div', ['slide'], { style: `background-color: ${slide.backgroundColor}` });
  const contentElement = createElement('div', ['slide__content']);

  const titleElement = createElement('h2');
  titleElement.innerHTML = `<span>${slide.title}</span><br>${slide.subTitle}`;

  const imageElement = createElement('img', [], { src: slide.imgSrc, alt: slide.title });

  contentElement.append(titleElement, imageElement);
  slideElement.appendChild(contentElement);
  sliderWrapper.appendChild(slideElement);
}

function navigateCaseSlide(index) {
  const newIndex = generalNavigate(index, CASE_SLIDER_WRAPPER, '.slide', slideData.length);
  updateCaseSlideText(newIndex);
  return newIndex;
}

function updateCaseSlideText(index) {
  const slide = slideData[index];

  const slideTextContainer = document.querySelector('.slide-text');
  if (!slideTextContainer) return;

  const slideTextClient = slideTextContainer.querySelector(".slide-text__client");
  const slideTextStats = slideTextContainer.querySelector(".slide-text__stats-wrapper");

  if (slideTextClient && slideTextStats) {
    fadeOut(slideTextClient);
    fadeOut(slideTextStats);
  }

  setTimeout(() => {
    slideTextContainer.innerHTML = '';

    const clientElement = createClientElement(slide);
    slideTextContainer.appendChild(clientElement);

    const dividerElement = createDivider();
    slideTextContainer.appendChild(dividerElement);

    const statsElement = createStatsElement(slide);
    slideTextContainer.appendChild(statsElement);

    slideTextContainer.appendChild(dividerElement.cloneNode());

    if (slideTextClient && slideTextStats) {
      fadeIn(slideTextClient);
      fadeIn(slideTextStats);
    }

  }, 300);
}

function createClientElement(slide) {
  const clientDiv = createElement('div', ['slide-text__client']);

  const clientTitle = createElement('p', ['slide-text__client-title']);
  clientTitle.innerHTML = `Клиент: <span class="slide-text__client-name">${slide.clientName}</span>`;

  const clientLink = createElement('a', ['slide-text__client-link'], { href: slide.clientLink });
  clientLink.innerText = slide.clientName;

  const otherWorksLink = createElement('a', ['slide-text__other-works'], { href: "#" });
  otherWorksLink.innerText = "другие работы";

  clientDiv.append(clientTitle, clientLink, otherWorksLink);
  return clientDiv;
}

function createDivider() {
  const divider = createElement('hr');
  divider.className = "slide-text__divider";
  return divider;
}

function createStatsElement(slide) {
  const statsContainer = createElement('div', ['slide-text__stats-wrapper']);

  slide.stats.forEach(stat => {
    const statsDiv = createElement('div', ['slide-text__stats']);

    const h2 = createElement('h2', ['slide-text__stats-value']);
    h2.innerText = stat.value;
    statsDiv.appendChild(h2);

    const p = createElement('p', ['slide-text__stats-description']);
    p.innerText = stat.description;
    statsDiv.appendChild(p);

    statsContainer.appendChild(statsDiv);
  });

  return statsContainer;
}

function fadeOut(element) {
  element.classList.add('fade-out');
  element.classList.remove('fade-in');
}

function fadeIn(element) {
  element.classList.remove('fade-out');
  element.classList.add('fade-in');
  setTimeout(() => {
    element.classList.remove('fade-in');
  }, 300);
}


function createNewsSlide(slide) {
  const itemsContainer = document.querySelector(NEWS_SLIDER_ITEMS);

  const slideDiv = createElement('div', ['news-slider__item']);

  const mainImage = createElement('img', ['news-slider__item-image'], {src: slide.mainImage, alt: slide.title});

  const contentDiv = createElement('div', ['news-slider__item-content']);
  const authorDiv = createElement('div', ['news-slider__author']);

  const authorAvatar = createElement('img', ['news-slider__author-avatar'], {src: slide.authorAvatar, alt: slide.authorName});

  const authorInfoDiv = createElement('div', ['news-slider__author-info']);
  const authorName = createElement('h3', ['news-slider__author-name']);
  authorName.textContent = slide.authorName;

  const viewsDiv = createElement('div', ['news-slider__author-views']);
  const eyeIcon = createElement('img', [], {src: eye, alt: "Views"});
  const viewsCount = createElement('p');
  viewsCount.textContent = slide.views;

  viewsDiv.append(eyeIcon, viewsCount);
  authorInfoDiv.append(authorName, viewsDiv);
  authorDiv.append(authorAvatar, authorInfoDiv);

  const itemTitle = createElement('h2', ['news-slider__item-title']);
  itemTitle.textContent = slide.title;

  const itemLink = createElement('a', ['news-slider__item-link'], {href: slide.link});
  itemLink.textContent = ">>";

  contentDiv.append(authorDiv, itemTitle, itemLink);
  slideDiv.append(mainImage, contentDiv);

  itemsContainer.appendChild(slideDiv);
}

function navigateNewsSlide(index) {
  return generalNavigate(index, NEWS_SLIDER_ITEMS, '.news-slider__item', newsSlideData.length / 2, 50);
}

function generalNavigate(index, wrapperSelector, itemSelector, maxSlides, percentage = 100) {
  const sliderWrapper = document.querySelector(wrapperSelector);
  if (!sliderWrapper) {
    console.error(`Element with selector ${wrapperSelector} not found.`);
    return index;
  }

  index = ((index % maxSlides) + maxSlides) % maxSlides;

  const offset = -index * percentage;
  sliderWrapper.style.transform = `translateX(${offset}%)`;

  if (wrapperSelector === CASE_SLIDER_WRAPPER) {
    updateCaseSlideText(index);
  }

  return index;
}
