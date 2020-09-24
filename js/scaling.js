'use strict';
(function (){
    var SCALE_STEP = 25;
    var MIN_SCALE = 25;
    var MAX_SCALE = 100;

    var controlSmaller = document.querySelector('.upload-resize-controls-button-dec');
    var controlBigger = document.querySelector('.upload-resize-controls-button-inc');
    var controlValue = document.querySelector('.upload-resize-controls-value');
    var uploadPreview = document.querySelector('.effect-image-preview');
    
    window.scaling = {
        scaleControlValue: controlValue,
        scaleUploadPreview: uploadPreview,
    };
    controlValue.setAttribute('value', MAX_SCALE + '%');
    function changeSize (value) {
        uploadPreview.style.transform = 'scale' + '(' + value / 100 + ')';
    }
    function changeScale(name, step) {
        var currentValue = parseInt(controlValue.getAttribute('value'));

        if(name === 'bigger' && currentValue < MAX_SCALE) {
            controlValue.setAttribute('value', currentValue + step + '%');
            changeSize(currentValue + step)
        }
        if(name === 'smaller' && currentValue > MIN_SCALE) {
            controlValue.setAttribute('value', currentValue - step + '%');
            changeSize(currentValue - step)
        }
    }
    controlSmaller.addEventListener('click', function() {
        changeScale('smaller', SCALE_STEP)
    });
    controlBigger.addEventListener('click', function() {
        changeScale('bigger', SCALE_STEP)
    });
})();