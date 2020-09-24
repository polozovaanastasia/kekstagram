'use strict';

(function () {
    var MAX_RATE = 100;
    var FILTER_BLUR = 3;
    var HEAT_MIN = 1;
    var HEAT_MAX = 3;

    var effectsContainer = document.querySelector('.effects-controls');
    var imgUploadPreview = document.querySelector('.img-upload__preview');
    var effectLevelValue = document.querySelector('.effect-level__value');
    var effectLevel = document.querySelector('.upload-effect-level');
    var effectLevelLine = document.querySelector('.upload-effect-level-line');
    var levelPin = document.querySelector('.upload-effect-level-pin');
    var levelVal = document.querySelector('.upload-effect-level-val');
    var styleEffect = 'none';
    var attachElement = document.querySelector('#upload-file');
    var uploadElement = document.querySelector('.upload-overlay');
    var closeUploadElement = document.querySelector('#upload-cancel');
  
    var attachChangeHandler = function (evt) {
      var previewImg = document.querySelector('.effect-image-preview');
      var levelLine = document.querySelector('.upload-effect-level')
      var input = evt.target;
      var reader = new FileReader();
      reader.onload = function () {
        var dataURL = reader.result;
        previewImg.src = dataURL;
      };
      reader.readAsDataURL(input.files[0]);
      window.utils.showElement(uploadElement);
      window.utils.hideElement(levelLine);
    }
    var closeUploadClickHandler = function (evt) {
      if (evt.type === 'click' || evt.keyCode === 27) {
        window.scaling.scaleControlValue.setAttribute('value', 100 + '%');
        window.scaling.scaleUploadPreview.style.transform = 'scale' + '(' + 1 + ')';
        window.utils.hideElement(uploadElement);
        attachElement.value = '';
        imgUploadPreview.style.filter = '';
      };
    };
    attachElement.addEventListener('change', attachChangeHandler);
    closeUploadElement.addEventListener('click', closeUploadClickHandler);
    document.addEventListener('keydown', closeUploadClickHandler);

    var changeEffects = function (evt) {
        imgUploadPreview.className = '';
        imgUploadPreview.style.filter = '';
        window.utils.hideElement(effectLevel);
        if (evt.target.value !== 'none') {
            levelPin.style.left = '100%';
            levelVal.style.width = '100%';
            window.utils.showElement(effectLevel);
        };
        styleEffect = evt.target.value;
        getLevelPin(styleEffect, 1) 
    };
    effectsContainer.addEventListener('change', function (evt) {
        changeEffects(evt);
    });
    levelPin.addEventListener('mousedown', function (evt) {
		evt.preventDefault();
        var startCoord = evt.clientX;
        var onMouseMove = function (moveEvt) {
            var shift = startCoord - moveEvt.clientX;
            startCoord = moveEvt.clientX;
            var newLeft = levelPin.offsetLeft - shift;
            if (newLeft < 0) {
                newLeft = effectLevelLine.offsetLeft + 'px';
            } else if (newLeft > effectLevelLine.getBoundingClientRect().width) {
                newLeft = effectLevelLine.getBoundingClientRect().width + 'px';
            };
            levelPin.style.left = newLeft + 'px';
            var point = Math.floor(newLeft * MAX_RATE / effectLevelLine.offsetWidth);
            levelVal.style.width = point + '%';
        }
        var upMouseHandler = function (upEvt) {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', upMouseHandler);
        }
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', upMouseHandler);
    })

    var getLevelPin = function (effect, value) {

        switch (effect) {
            case 'chrome':
                imgUploadPreview.style.filter = 'grayscale(' + value + ')';
                break;

            case 'sepia':
                imgUploadPreview.style.filter = 'sepia(' + value + ')';
                break;

            case 'marvin':
                imgUploadPreview.style.filter = 'invert(' + value * 100 + '%)';
                break;

            case 'phobos':
                imgUploadPreview.style.filter = 'blur(' + value * 3 + 'px)';
                break;

            case 'heat':
                imgUploadPreview.style.filter = 'brightness(' + (HEAT_MIN + (HEAT_MAX - HEAT_MIN) * value) + ')';

        };

    };

    document.addEventListener('mouseup', function () {
        var value = (levelPin.offsetLeft / effectLevelLine.clientWidth).toFixed(2);
        getLevelPin(styleEffect, value);

    })
})();