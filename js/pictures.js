'use strict';

var PICTURE_PREFERENCIES = {
  pictureMinNumber: 1,
  pictureMaxNumber: 25,
  likesMaxNumber: 15,
  likesMinNumber: 200,
  commentsMinNumber: 1,
  commentsMaxNumber: 2,
  comments: ['Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!']
};

var getRandom = function (min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
};

var generateComments = function () {
  var generatedComments = [];
  var commentsCount = getRandom(PICTURE_PREFERENCIES.commentsMinNumber, PICTURE_PREFERENCIES.commentsMaxNumber);
  var counter = 0;
  do {
    var commentIndex = getRandom(0, PICTURE_PREFERENCIES.comments.length - 1);
    var comment = PICTURE_PREFERENCIES.comments[commentIndex];
    if (!generatedComments.includes(comment)) {
      generatedComments.push(PICTURE_PREFERENCIES.comments[commentIndex]);
      counter++;
    }
  } while (counter < commentsCount);
  return generatedComments;
};

var generatePictures = function () {
  var pictures = [];
  for (var i = PICTURE_PREFERENCIES.pictureMinNumber; i <= PICTURE_PREFERENCIES.pictureMaxNumber; i++) {
    pictures.push({
      url: 'photos/' + i + '.jpg',
      likes: getRandom(PICTURE_PREFERENCIES.likesMinNumber, PICTURE_PREFERENCIES.likesMaxNumber),
      comments: generateComments()
    });
  }
  return pictures;
};

var pictures = generatePictures();
var pictureTemplate = document.querySelector('#picture-template').content.querySelector('.picture');
var picturesBlock = document.querySelector('.pictures');
var uploadOverlay = document.querySelector('.upload-overlay');
var galleryOverlay = document.querySelector('.gallery-overlay');
var fragment = document.createDocumentFragment();

var renderPictures = function (picture) {
  var pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture img').src = picture.url;
  pictureElement.querySelector('.picture-comments').textContent = picture.comments.length;
  pictureElement.querySelector('.picture-likes').textContent = picture.likes;
  return pictureElement;
};

for (var i = 0; i < pictures.length; i++) {
  fragment.appendChild(renderPictures(pictures[i]));
}

uploadOverlay.classList.add('invisible');
picturesBlock.appendChild(fragment);

galleryOverlay.querySelector('.gallery-overlay-image').src = pictures[0].url;
galleryOverlay.querySelector('.likes-count').textContent = pictures[0].likes;
galleryOverlay.querySelector('.comments-count').textContent = pictures[0].comments.length;
galleryOverlay.classList.remove('invisible');
