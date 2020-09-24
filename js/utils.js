'use strict';

(function () {
    window.utils = {
        getValueInRange: function (min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;
        },
        getRandomValues: function (array) {
            var min = 0;
            var max = array.length;
            min = Math.ceil(min);
            max = Math.floor(max);
            var index = Math.floor(Math.random() * (max - min)) + min;
            return array[index];
        },
        showElement: function (element) {
            element.classList.remove('hidden');
        },
        hideElement: function (element) {
            element.classList.add('hidden');
        } 
    }
})();