'use strict';

(function () {
  var pictures = [];
  var amountOfPicturesElements = 25;
  var minLikes = 15;
  var maxLikes = 200;
  var comments = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  var description = [
    'Тестим новую камеру!',
    'Затусили с друзьями на море',
    'Как же круто тут кормят',
    'Отдыхаем...',
    'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
    'Вот это тачка!'
  ];
  var picturesContainer = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture-template');

  // создаем массив фотографий:
  var generatePicturesArray = function (arrLength) {
    for (let i = 1; i <= arrLength; ++i) {
      pictures.push({
        url: 'photos/' + i + '.jpg',
        likes: window.utils.getValueInRange(minLikes, maxLikes),
        comments: window.utils.getRandomValues(comments),
        description: window.utils.getRandomValues(description),
      });
    };
  };
  generatePicturesArray(amountOfPicturesElements);

  var renderPictureElement = function (element) {
    picturesContainer.appendChild(element);
  }
  var createPictureElement = function () {
    pictures.forEach(function (item, i) {
      var newPictureElement = pictureTemplate.content.querySelector('.picture').cloneNode(true);
      var imgElement = newPictureElement.querySelector('.picture-img');
      var commentsElement = newPictureElement.querySelector('.picture-comments');
      var likesElement = newPictureElement.querySelector('.picture-likes');

      imgElement.src = item.url;
      commentsElement.textContent = item.comments.length;
      likesElement.textContent = item.likes;
      renderPictureElement(newPictureElement);
    });
  };
  createPictureElement();

  var bigPicture = document.querySelector('.gallery-overlay');
  var imgBigPictureElement = bigPicture.querySelector('.gallery-overlay-image');
  var likesBigPictureElement = bigPicture.querySelector('.likes-count');
  var commentsBigPictureElement = bigPicture.querySelector('.comments-count');

  var getBigPicture = function (evt) {
    evt.preventDefault();

    var index = evt.target.src.indexOf('photos');
    window.utils.showElement(bigPicture);
    imgBigPictureElement.src = evt.target.src;

    pictures.forEach(function (item, i) {
      debugger
      if (item.url === evt.target.src.slice(index)) {
        likesBigPictureElement.textContent = item.likes;
        commentsBigPictureElement.textContent = item.comments.length;
      };
    });
  };

  picturesContainer.addEventListener('click', getBigPicture);
  imgBigPictureElement.addEventListener('click', function(evt) {
    console.log('далее')
    console.log(evt)
  });

  var closeIconBigPicture = document.querySelector('.gallery-overlay-close');

  var closeBigPictureClickHandler = function (evt) {
    if (evt.type === 'click' || evt.keyCode === 27) {
      window.utils.hideElement(bigPicture);
    };
  };
  closeIconBigPicture.addEventListener('click', closeBigPictureClickHandler);
  document.addEventListener('keydown', closeBigPictureClickHandler);
})();
