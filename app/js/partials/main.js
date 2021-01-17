
$('input[type="tel"]').inputmask({
    mask: "+7(999)999-99-99",
    showMaskOnHover: false,
    showMaskOnFocus: true
});

var getPopupHeader = function() {
    var btn = document.querySelector('.popup-btn');
    var form = document.querySelector('.header-popup-form');

    btn.addEventListener('click', function() {
        form.classList.toggle('open');
    });
};

getPopupHeader();

var getPopup = function() {
    const btn = document.querySelector('.open-popup');
    const overlay = document.getElementById('modal-overlay');
    const popup = document.getElementById('modal-form');

    if (btn) {
        btn.addEventListener('click', function() {
            overlay.classList.add('open');
            popup.classList.add('open');
        });

        overlay.addEventListener('click', function () {
            this.classList.remove('open');
            popup.classList.remove('open');
        });
    }

};

getPopup();

var getFixForm = function() {
    var form = document.querySelector('.form-insurance');
    var formDumpy = document.querySelector('.form-insurance-empty');
    var wrapper = document.querySelector('.form-insurance-wrapper');

    window.addEventListener('scroll', function() {
        var scrollTop = window.pageYOffset;
    
        if (scrollTop > formDumpy.offsetTop) {
            form.classList.add('fixed');
            formDumpy.style.height = form.clientHeight + 'px';
        } else {
            form.classList.remove('fixed');
            formDumpy.style.height = '0px';
        }
    });
    
};

// getFixForm();

var getOpenForm = function() {
    var formWrapper = document.querySelector('.form-insurance-wrapper_mobile');
    
    if (formWrapper) {
        var form = formWrapper.querySelector('.form-insurance');
        var btn = document.getElementById('open-mobile-form');

        btn.addEventListener('click', function (e) {
        
            var ch = form.clientHeight,
                sh = form.scrollHeight,
                isCollapsed = !ch,
                noHeightSet = !form.style.height;
    
                formWrapper.classList.add('open')
                form.classList.add('open');
                form.style.height = (isCollapsed || noHeightSet ? sh : 0) + "px";
        });
    }    
};

getOpenForm();

var getDropdownCity = function() {
    let dropdowns = document.querySelectorAll('.dropdown-city');

    for (let dropdown of dropdowns) {
            
        dropdown.addEventListener('click', function(e) {
            var currentCity = dropdown.querySelector('.dropdown-city__current');
            var listCity = dropdown.querySelector('.dropdown-city__list');

            if (e.target === currentCity) {
                listCity.classList.toggle('open');
            }
        });
    }
}
getDropdownCity();

$('select').styler({
    selectPlaceholder: '',
    selectSmartPositioning: true
});

var setPositionNum = function(slider) {
    var rangeSlider = slider;
    var posSum = rangeSlider.find('.irs-single');
    var rangeCirle = rangeSlider.find('.irs-handle.single');
    var rangeSliderNote = rangeSlider.parent().children('.main-input-field__label');
    var rangeSliderNoteLeft = rangeSliderNote.offset().left;

    var posSumBoxWidth = posSum.width();
    var rangeCirleLeft = rangeCirle.offset().left;
    
    if (rangeCirleLeft - rangeSliderNoteLeft < rangeSliderNote.width() + posSumBoxWidth / 2) {
        posSum.addClass('stop-left');
    } else {
        posSum.removeClass('stop-left');
    }
    
    if (rangeCirleLeft - rangeSliderNoteLeft  >= rangeSlider.width() - posSumBoxWidth) {
        posSum.addClass('stop-right');
    } else {
        posSum.removeClass('stop-right');
    }
};

var setNewCircle = function(slider) {
    var rangeCirle = slider.find('.irs-handle.single');
    rangeCirle.append('<div class="handle-sircle"></div>');
};

var stickyCircle = function(data, slider) {
    var circle = slider.find('.irs-handle');
    
    if (data.from === data.max) {
        circle.addClass('endMax');
    } else {
        circle.removeClass('endMax');
    }

    if (data.from === data.min) {
        circle.addClass('endMin');
    } else {
        circle.removeClass('endMin');
    }
};

$('.range-slider-1').ionRangeSlider({
    extra_classes: 'range-slider',
    min: 50000,
    max: 1000000,
    from: 200000,
    step: 50000,
    onStart: function (data) {
        var slider = data.slider
        setNewCircle(slider);
        stickyCircle(data, slider);
        setPositionNum(slider);
    },
    onChange: function (data) {
        var slider = data.slider
        stickyCircle(data, slider);
        setPositionNum(slider);
    }
});

$('.range-slider-2').ionRangeSlider({
    extra_classes: 'range-slider',
    min: 50000,
    max: 1000000,
    from: 200000,
    step: 50000,
    onStart: function (data) {
        var slider = data.slider
        setNewCircle(slider);
        stickyCircle(data, slider);
        setPositionNum(slider);
    },
    onChange: function (data) {
        var slider = data.slider
        stickyCircle(data, slider);
        setPositionNum(slider);
    }
});

var getValueSelect = function() {
    var form = document.querySelector('.form-insurance');
    if (form) {
        var selects = form.querySelectorAll('select');
    
        for (item of selects) {
            
            item.addEventListener('change', function() {
                if(this.value !== '') {
                    this.parentNode.classList.add('value');
                } else {
                    this.parentNode.classList.remove('value');
                }
            })
        }
    }
};

getValueSelect()

var setValueSelect = function() {
    var forms = document.querySelectorAll('.form-insurance');
    if (forms[0]) {
        for (var form of forms) {
            var values = form.querySelectorAll('.main-input-field__set-value li');
        
            for (value of values) {
                value.addEventListener('click', function() {
                    var select = this.parentNode.parentNode.parentNode.querySelector('select');
                    var options = select.options;
        
                    for (var option of options) {
                        if (option.value === this.dataset.selectValue) {
                            select.value = this.dataset.selectValue;
                            select.dispatchEvent(new Event('change'));
                        }
                    }        
                });
            }
        }   
    }
}

setValueSelect();

// скрипт для решения проблемы со 100% высотой
    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01;

    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    // We listen to the resize event
    window.addEventListener('resize', () => {
        // We execute the same script as before
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    });


var getOpenMenu = function() {
    var burger = document.getElementById('burger-menu');
    var menu = document.querySelector('.main-header__menu');

    burger.addEventListener('click', function() {
        menu.classList.add('open');
        document.body.classList.add('-no-scroll');
    });

    menu.addEventListener('click', function(e) {
        if (e.target === this) {
            menu.classList.remove('open');
            document.body.classList.remove('-no-scroll');
        }
    });

};

getOpenMenu();

autosize(document.querySelector('textarea'));

var getFocusValue = function() {
    var form = document.querySelector('.contacts-form');
    if (form) {
        var inputList = form.querySelectorAll('.form-input');

        inputList.forEach(function(el) {
            var input = el.querySelector('input') ? el.querySelector('input') : el.querySelector('textarea');

            input.addEventListener('focus', function() {
                this.parentElement.classList.add('form-input_focus');
            });

            input.addEventListener('blur', function() {
                if (input.value !== '') {
                    this.parentElement.classList.add('form-input_focus');
                } else {
                    this.parentElement.classList.remove('form-input_focus');
                }
            });
        });
    }
};

getFocusValue();


var getOpenOfferDescr = function() {
    var offerList = document.querySelector('.offers-block__list');

    if (offerList) {
        var offerItems = offerList.querySelectorAll('.offers-block__item');

        for (let item of offerItems) {

            const btn = item.querySelector('.btn-more');

            if (btn) {
                const descr = item.querySelector('.offer-descr');

                btn.addEventListener('click', function (e) {

                    for (let item of offerItems) {
                        const descr = item.querySelector('.offer-descr');
                        descr.style.height = 0 + "px";
                        item.querySelector('.btn-more').classList.remove('open');
                    }

                    let ch = descr.clientHeight,
                        sh = descr.scrollHeight,
                        isCollapsed = !ch,
                        noHeightSet = !descr.style.height;

                    if (isCollapsed || noHeightSet) {
                        descr.style.height = sh + "px";
                        this.classList.add('open');
                    } else {
                        descr.style.height = 0 + "px";
                        this.classList.remove('open');
                    }
                });
            }
        }
    }
};

getOpenOfferDescr();