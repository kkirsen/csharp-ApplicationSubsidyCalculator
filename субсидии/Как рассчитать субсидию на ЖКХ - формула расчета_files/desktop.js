/* trace:src/widget/1.1/js/desktop.js */
(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
exports.defaults = {};

exports.set = function(name, value, options) {
    // Retrieve options and defaults
    var opts = options || {};
    var defaults = exports.defaults;

    // Apply default value for unspecified options
    var expires  = opts.expires  || defaults.expires;
    var domain   = opts.domain   || defaults.domain;
    var path     = opts.path     !== undefined ? opts.path     : (defaults.path !== undefined ? defaults.path : '/');
    var secure   = opts.secure   !== undefined ? opts.secure   : defaults.secure;
    var httponly = opts.httponly !== undefined ? opts.httponly : defaults.httponly;
    var samesite = opts.samesite !== undefined ? opts.samesite : defaults.samesite;

    // Determine cookie expiration date
    // If succesful the result will be a valid Date, otherwise it will be an invalid Date or false(ish)
    var expDate = expires ? new Date(
        // in case expires is an integer, it should specify the number of days till the cookie expires
        typeof expires === 'number' ? new Date().getTime() + (expires * 864e5) :
            // else expires should be either a Date object or in a format recognized by Date.parse()
            expires
    ) : 0;

    // Set cookie
    document.cookie = name.replace(/[^+#$&^`|]/g, encodeURIComponent)                // Encode cookie name
            .replace('(', '%28')
            .replace(')', '%29') +
        '=' + value.replace(/[^+#$&/:<-\[\]-}]/g, encodeURIComponent) +                  // Encode cookie value (RFC6265)
        (expDate && expDate.getTime() >= 0 ? ';expires=' + expDate.toUTCString() : '') + // Add expiration date
        (domain   ? ';domain=' + domain     : '') +                                      // Add domain
        (path     ? ';path='   + path       : '') +                                      // Add path
        (secure   ? ';secure'               : '') +                                      // Add secure option
        (httponly ? ';httponly'             : '') +                                      // Add httponly option
        (samesite ? ';samesite=' + samesite : '');                                       // Add samesite option
};

exports.get = function(name) {
    var cookies = document.cookie.split(';');

    // Iterate all cookies
    while(cookies.length) {
        var cookie = cookies.pop();

        // Determine separator index ("name=value")
        var separatorIndex = cookie.indexOf('=');

        // IE<11 emits the equal sign when the cookie value is empty
        separatorIndex = separatorIndex < 0 ? cookie.length : separatorIndex;

        var cookie_name = decodeURIComponent(cookie.slice(0, separatorIndex).replace(/^\s+/, ''));

        // Return cookie value if the name matches
        if (cookie_name === name) {
            return decodeURIComponent(cookie.slice(separatorIndex + 1));
        }
    }

    // Return `null` as the cookie was not found
    return null;
};

exports.erase = function(name, options) {
    exports.set(name, '', {
        expires:  -1,
        domain:   options && options.domain,
        path:     options && options.path,
        secure:   0,
        httponly: 0}
    );
};

exports.all = function() {
    var all = {};
    var cookies = document.cookie.split(';');

    // Iterate all cookies
    while(cookies.length) {
        var cookie = cookies.pop();

        // Determine separator index ("name=value")
        var separatorIndex = cookie.indexOf('=');

        // IE<11 emits the equal sign when the cookie value is empty
        separatorIndex = separatorIndex < 0 ? cookie.length : separatorIndex;

        // add the cookie name and value to the `all` object
        var cookie_name = decodeURIComponent(cookie.slice(0, separatorIndex).replace(/^\s+/, ''));
        all[cookie_name] = decodeURIComponent(cookie.slice(separatorIndex + 1));
    }

    return all;
};

},{}],2:[function(require,module,exports){
'use strict';

module.exports = {
    create: function () {
        if (document.querySelector('.text-ad') == null) {
            var div = document.createElement('div');
            div.className           = 'text-ad';
            div.id                  = 'detect_ad_promo_lexprofit';
            div.style.width         = 1 + 'px';
            div.style.height        = 1 + 'px';
            div.style.position      = 'absolute';
            div.style.left          = 0 + 'px';
            div.style.bottom        = 0 + 'px';
            div.style.border        = 'none';
            div.style.opacity       = 0;
            div.style.background    = 'none';

            document.querySelector('body').appendChild(div);
        }
    },

    is_turned_on: function () {
        var d = document.getElementById('detect_ad_promo_lexprofit');

        if(d.style.display == "none" || d.style.display == "hidden" || d.style.visibility == "hidden" || d.offsetHeight == 0)
            return true;
        else
            return false;
    }
};
},{}],3:[function(require,module,exports){
'use strict';

module.exports = {
    get_type: function () {
        var d = navigator.userAgent || navigator.vendor || window.opera;

        if (d && /Android|BlackBerry|iPhone|iPad|iPod|Opera\sMini|IEMobile/i.test(d)) {
            if(/(android|bbd+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(d) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(d.substr(0,4))) {
                return 'mobile';
            }
            else {
                return 'tablet';
            }
        }
        else {
            return 'desktop';
        }
    }
};
},{}],4:[function(require,module,exports){
'use strict';

function GoogleAutocomplete(input) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    this.input = input;
    this.options = {
        country: options.country || 'ru',
        language: options.language || 'ru-RU',
        prefix: options.prefix || '',
        position: options.position || 'bottom'
    };

    this.append();

    if (typeof this.input !== "undefined") {
        this.el = null;
        this.container = null;

        this.className = (this.options.prefix ? this.options.prefix + '-' : '') + 'google-autocomplete';

        this.init();

        this.registerEvents();
    }
}

GoogleAutocomplete.prototype.init = function () {
    if (this.el === null) {
        this.el = document.createElement('div');
        this.el.className = this.className;

        this.input.parentNode.insertBefore(this.el, this.input);

        this.el.appendChild(this.input);

        this.container = document.createElement('ul');
        this.container.className = this.className + '-container';
        this.container.style.position = 'absolute';

        this.el.appendChild(this.container);
    }
};

GoogleAutocomplete.prototype.registerEvents = function () {
    var _this = this;

    this.input.addEventListener('input', function (e) {
        _this.search(e)
    });

    this.el.addEventListener('click', function (e) {
        _this.choose(e)
    });

    document.addEventListener('click', function (e) {
        _this.close(e)
    });
};

GoogleAutocomplete.prototype.getAutocompleteService = function () {
    if (typeof googleAutoCompleteService === "undefined") {
        window.googleAutoCompleteService = new google.maps.places.AutocompleteService();
    }

    return googleAutoCompleteService;
};

GoogleAutocomplete.prototype.addClass = function (elem, name) {
    var arr = [];
    arr = elem.className.split(' ');

    if (arr.indexOf(name) == -1) {
        elem.className += (elem.className != '' ? ' ' : '') + name;
    }
};

GoogleAutocomplete.prototype.removeClass = function (elem, name) {
    var classes = elem.className.split(' ');
    for (var i = 0; i < classes.length; i++) {
        if (classes[i] == name) {
            classes.splice(i, 1);
            i--;
        }
    }
    elem.className = classes.join(' ');
};

GoogleAutocomplete.prototype.show = function () {
    this.addClass(this.el, this.className + '-open');

    this.container.style.top = (this.options.position == 'bottom' ? this.input.offsetHeight : ('-' + (this.container.offsetHeight - 2))) + 'px';
};

GoogleAutocomplete.prototype.hide = function () {
    this.removeClass(this.el, this.className + '-open');
    this.clear();
};

GoogleAutocomplete.prototype.clear = function () {
    this.container.innerHTML = '';
};

GoogleAutocomplete.prototype.search = function (e) {
    var _this = this;

    if (typeof google !== "undefined" && typeof e.target !== "undefined" && e.target.value.length >= 1) {
        var value = e.target.value;

        value = (/[A-Za-z]/.test(value)) ? this.changeKeyboardLayout(value) : value;

        this.getAutocompleteService().getPlacePredictions({
            input: value,
            types: ['(cities)'],
            componentRestrictions: {
                country: this.options.country
            }
        }, function (predictions, status) {
            _this.getPredictions(predictions, status, e.target, value)
        });
    } else {
        this.hide();
    }

    e.stopPropagation();
};

GoogleAutocomplete.prototype.getPredictions = function (predictions, status, el, value) {
    var _this = this;

    this.clear();

    value = value.trim();

    if (value.length > 2 && this.options.country == 'ru') {
        var filtered = this.locations.filter(function (item) {
            return item.main.toLowerCase().indexOf(value) === 0;
        }).splice(0, 3);

        var formatted = filtered.map(function (item) {
            return {
                'structured_formatting': {
                    'main_text': item.main,
                    'secondary_text': item.secondary
                }
            };
        });

        predictions = formatted.concat(predictions).splice(0, 5);
    }

    if (status === google.maps.places.PlacesServiceStatus.OK && predictions.length > 0) {
        predictions.forEach(function (prediction) {
            var item = document.createElement('li');

            var span = document.createElement('span');
            span.innerText = prediction.structured_formatting.main_text;
            item.appendChild(span);

            if (prediction.structured_formatting.secondary_text) {
                item.innerHTML += ', ' + prediction.structured_formatting.secondary_text;
            }

            _this.container.appendChild(item);
        });

        this.show();
    } else {
        this.hide();
    }
};

GoogleAutocomplete.prototype.changeKeyboardLayout  = function (value) {
    /*
    var keys = {
        'q': 'й', 'w': 'ц', 'e': 'у', 'r': 'к', 't': 'е', 'y': 'н', 'u': 'г', 'i': 'ш', 'o': 'щ', 'p': 'з', '[': 'х', ']': 'ъ',
        'a': 'ф', 's': 'ы', 'd': 'в', 'f': 'а', 'g': 'п', 'h': 'р', 'j': 'о', 'k': 'л', 'l': 'д', ';': 'ж', '\'': 'э',
        'z': 'я', 'x': 'ч', 'c': 'с', 'v': 'м', 'b': 'и', 'n': 'т', 'm': 'ь', ',': 'б', '.': 'ю'
    };
    */

    var keys = {'shch':'щ','ya':'я','yu':'ю','ch':'ч','sh':'ш','zh':'ж','a':'а','b':'б','v':'в','g':'г','d':'д','e':'е','z':'з','i':'и','j':'й','k':'к','l':'л','m':'м','n':'н','o':'о','p':'п','r':'р','s':'с','t':'т','u':'у','f':'ф','h':'х','c':'ц','y':'ы','`':'ь','\'':'ъ'};

    value = value.toLowerCase();

    for (var key in keys) {
        value = value.replace(key, keys[key]);
    }

    return value;
};

GoogleAutocomplete.prototype.locations = [
    {"main": "Крым", "secondary": ""},
    {"main": "Симферополь", "secondary": "Респ Крым"},
    {"main": "Алушта", "secondary": "Респ Крым"},
    {"main": "Джанкой", "secondary": "Респ Крым"},
    {"main": "Евпатория", "secondary": "Респ Крым"},
    {"main": "Керчь", "secondary": "Респ Крым"},
    {"main": "Красноперекопск", "secondary": "Респ Крым"},
    {"main": "Саки", "secondary": "Респ Крым"},
    {"main": "Армянск", "secondary": "Респ Крым"},
    {"main": "Феодосия", "secondary": "Респ Крым"},
    {"main": "Судак", "secondary": "Респ Крым"},
    {"main": "Ялта", "secondary": "Респ Крым"},
    {"main": "Бахчисарай", "secondary": "Бахчисарайский р-н, Респ Крым"},
    {"main": "Научный", "secondary": "Бахчисарайский р-н, Респ Крым"},
    {"main": "Куйбышево", "secondary": "Бахчисарайский р-н, Респ Крым"},
    {"main": "Большое Садовое", "secondary": "Бахчисарайский р-н, Респ Крым"},
    {"main": "Высокое", "secondary": "Бахчисарайский р-н, Респ Крым"},
    {"main": "Малое Садовое", "secondary": "Бахчисарайский р-н, Респ Крым"},
    {"main": "Новоульяновка", "secondary": "Бахчисарайский р-н, Респ Крым"},
    {"main": "Танковое", "secondary": "Бахчисарайский р-н, Респ Крым"},
    {"main": "Почтовое", "secondary": "Бахчисарайский р-н, Респ Крым"},
    {"main": "Заветное", "secondary": "Бахчисарайский р-н, Респ Крым"},
    {"main": "Зубакино", "secondary": "Бахчисарайский р-н, Респ Крым"},
    {"main": "Казанки", "secondary": "Бахчисарайский р-н, Респ Крым"},
    {"main": "Малиновка", "secondary": "Бахчисарайский р-н, Респ Крым"},
    {"main": "Нововасильевка", "secondary": "Бахчисарайский р-н, Респ Крым"},
    {"main": "Новопавловка", "secondary": "Бахчисарайский р-н, Респ Крым"},
    {"main": "Приятное Свидание", "secondary": "Бахчисарайский р-н, Респ Крым"},
    {"main": "Растущее", "secondary": "Бахчисарайский р-н, Респ Крым"},
    {"main": "Самохвалово", "secondary": "Бахчисарайский р-н, Респ Крым"},
    {"main": "Севастьяновка", "secondary": "Бахчисарайский р-н, Респ Крым"},
    {"main": "Стальное", "secondary": "Бахчисарайский р-н, Респ Крым"},
    {"main": "Тополи", "secondary": "Бахчисарайский р-н, Респ Крым"},
    {"main": "Белогорск", "secondary": "Белогорский р-н, Респ Крым"},
    {"main": "Зуя", "secondary": "Белогорский р-н, Респ Крым"},
    {"main": "Баланово", "secondary": "Белогорский р-н, Респ Крым"},
    {"main": "Барабаново", "secondary": "Белогорский р-н, Респ Крым"},
    {"main": "Верхние Орешники", "secondary": "Белогорский р-н, Респ Крым"},
    {"main": "Владимировка", "secondary": "Белогорский р-н, Респ Крым"},
    {"main": "Литвиненково", "secondary": "Белогорский р-н, Респ Крым"},
    {"main": "Нижние Орешники", "secondary": "Белогорский р-н, Респ Крым"},
    {"main": "Петрово", "secondary": "Белогорский р-н, Респ Крым"},
    {"main": "Украинка", "secondary": "Белогорский р-н, Респ Крым"},
    {"main": "Азовское", "secondary": "Джанкойский р-н, Респ Крым"},
    {"main": "Вольное", "secondary": "Джанкойский р-н, Респ Крым"},
    {"main": "Старый Крым", "secondary": "Кировский р-н, Респ Крым"},
    {"main": "Кировское", "secondary": "Кировский р-н, Респ Крым"},
    {"main": "Красногвардейское", "secondary": "Красногвардейский р-н, Респ Крым"},
    {"main": "Видное", "secondary": "Красногвардейский р-н, Респ Крым"},
    {"main": "Октябрьское", "secondary": "Красногвардейский р-н, Респ Крым"},
    {"main": "Щелкино", "secondary": "Ленинский р-н, Респ Крым"},
    {"main": "Ленино", "secondary": "Ленинский р-н, Респ Крым"},
    {"main": "Багерово", "secondary": "Ленинский р-н, Респ Крым"},
    {"main": "Ивановка", "secondary": "Ленинский р-н, Респ Крым"},
    {"main": "Нижнегорский", "secondary": "Нижнегорский р-н, Респ Крым"},
    {"main": "Зеленое", "secondary": "Нижнегорский р-н, Респ Крым"},
    {"main": "Линейное", "secondary": "Нижнегорский р-н, Респ Крым"},
    {"main": "Первомайское", "secondary": "Первомайский р-н, Респ Крым"},
    {"main": "Макаровка", "secondary": "Первомайский р-н, Респ Крым"},
    {"main": "Пшеничное", "secondary": "Первомайский р-н, Респ Крым"},
    {"main": "Упорное", "secondary": "Первомайский р-н, Респ Крым"},
    {"main": "Раздольное", "secondary": "Раздольненский р-н, Респ Крым"},
    {"main": "Новоселовское", "secondary": "Раздольненский р-н, Респ Крым"},
    {"main": "Северное", "secondary": "Раздольненский р-н, Респ Крым"},
    {"main": "Новофедоровка", "secondary": "Сакский р-н, Респ Крым"},
    {"main": "Гвардейское", "secondary": "Симферопольский р-н, Респ Крым"},
    {"main": "Красная Зорька", "secondary": "Симферопольский р-н, Респ Крым"},
    {"main": "Маленькое", "secondary": "Симферопольский р-н, Респ Крым"},
    {"main": "Софиевка", "secondary": "Симферопольский р-н, Респ Крым"},
    {"main": "Новый Сад", "secondary": "Симферопольский р-н, Респ Крым"},
    {"main": "Молодежное", "secondary": "Симферопольский р-н, Респ Крым"},
    {"main": "Солнечное", "secondary": "Симферопольский р-н, Респ Крым"},
    {"main": "Николаевка", "secondary": "Симферопольский р-н, Респ Крым"},
    {"main": "Винницкое", "secondary": "Симферопольский р-н, Респ Крым"},
    {"main": "Ключевое", "secondary": "Симферопольский р-н, Респ Крым"},
    {"main": "Александровка", "secondary": "Симферопольский р-н, Респ Крым"},
    {"main": "Петровка", "secondary": "Симферопольский р-н, Респ Крым"},
    {"main": "Раздолье", "secondary": "Симферопольский р-н, Респ Крым"},
    {"main": "Тепловка", "secondary": "Симферопольский р-н, Респ Крым"},
    {"main": "Советский", "secondary": "Советский р-н, Респ Крым"},
    {"main": "Черноморское", "secondary": "Черноморский р-н, Респ Крым"}
];

GoogleAutocomplete.prototype.close = function (e) {
    if (! this.el.contains(e.target)) {
        this.hide();
    }
};

GoogleAutocomplete.prototype.choose = function (e) {
    var value = '';

    if (this.container.contains(e.target) && (e.target.tagName.toLowerCase() === 'span' || e.target.tagName.toLowerCase() === 'li')) {
        value = e.target.tagName.toLowerCase() === 'li' ? e.target.textContent : e.target.parentNode.textContent;

        this.input.value = value;
        this.hide();
    }
};

GoogleAutocomplete.prototype.append = function () {
    if (typeof isGoogleAutocompleteAppend === "undefined") {
        window.isGoogleAutocompleteAppend = true;

        if (typeof google === "undefined" || typeof google.maps === "undefined" || typeof google.maps.places === "undefined") {
            var s = document.createElement('script');
            s.src = ('https:' === document.location.protocol ? 'https' : 'http') + '://maps.googleapis.com/maps/api/js?key=AIzaSyCsIh81aTZ2FDgVtfAG95tbNnHcbnqhgJM&signed_in=true&libraries=places&language=' + this.options.language;
            s.type = 'text/javascript';
            s.async = 'true';
            document.body.appendChild(s);
        }
    }
};

// GoogleAutocomplete.append();

module.exports = GoogleAutocomplete;

},{}],5:[function(require,module,exports){
'use strict';

module.exports = {
    get_parents: function (elem, selector) {

        // Element.matches() polyfill
        if (!Element.prototype.matches) {
            Element.prototype.matches =
                Element.prototype.matchesSelector ||
                Element.prototype.mozMatchesSelector ||
                Element.prototype.msMatchesSelector ||
                Element.prototype.oMatchesSelector ||
                Element.prototype.webkitMatchesSelector ||
                function(s) {
                    var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                        i = matches.length;
                    while (--i >= 0 && matches.item(i) !== this) {}
                    return i > -1;
                };
        }

        // Set up a parent array
        var parents = [];

        // Push each parent element to the array
        for ( ; elem && elem !== document; elem = elem.parentNode ) {
            if (selector) {
                if (elem.matches(selector)) {
                    parents.push(elem);
                }
                continue;
            }
            parents.push(elem);
        }

        // Return our parent array
        return (parents.length >= 1 ? parents[0] : null);
    },
    addClass: function (elem, name) {
        var arr = [];
        arr = elem.className.split(' ');

        if (arr.indexOf(name) == -1) {
            elem.className += (elem.className != '' ? ' ' : '') + name;
        }
    },
    removeClass: function (elem, name) {
        var classes = elem.className.split(' ');

        for (var i = 0; i < classes.length; i++) {
            if (classes[i] == name) {
                classes.splice(i, 1); // удалить класс
                i--; // (*)
            }
        }
        elem.className = classes.join(' ');
    },
    serialize: function (form) {

        if (!form || form.nodeName !== "FORM") {
            return;
        }
        var i, j, q = [];
        for (i = form.elements.length - 1; i >= 0; i = i - 1) {
            if (form.elements[i].name === "") {
                continue;
            }
            switch (form.elements[i].nodeName) {
                case 'INPUT':
                    switch (form.elements[i].type) {
                        case 'text':
                        case 'tel':
                        case 'email':
                        case 'hidden':
                        case 'password':
                        case 'button':
                        case 'reset':
                        case 'submit':
                            q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
                            break;
                        case 'checkbox':
                        case 'radio':
                            if (form.elements[i].checked) {
                                q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
                            }
                            break;
                        case 'file':
                            break;
                    }
                    break;
                case 'TEXTAREA':
                    q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
                    break;
                case 'SELECT':
                    switch (form.elements[i].type) {
                        case 'select-one':
                            q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
                            break;
                        case 'select-multiple':
                            for (j = form.elements[i].options.length - 1; j >= 0; j = j - 1) {
                                if (form.elements[i].options[j].selected) {
                                    q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].options[j].value));
                                }
                            }
                            break;
                    }
                    break;
                case 'BUTTON':
                    switch (form.elements[i].type) {
                        case 'reset':
                        case 'submit':
                        case 'button':
                            q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
                            break;
                    }
                    break;
            }
        }

        return q.join("&");

    },

    hasClass: function (elem, className) {
        return elem.className && new RegExp("(^|\\s)" + className + "(\\s|$)").test(elem.className);
    },

    /*
    closest: function(el, selector) {
        var matchesFn;

        // find vendor prefix
        ['matches','webkitMatchesSelector','mozMatchesSelector','msMatchesSelector','oMatchesSelector'].some(function(fn) {
            if (typeof document.body[fn] == 'function') {
                matchesFn = fn;
                return true;
            }
            return false;
        })

        var parent;

        // traverse parents
        while (el) {
            parent = el.parentElement;
            if (parent && parent[matchesFn](selector)) {
                return parent;
            }
            el = parent;
        }

        return null;
    },
    */

    ajaxGET: function (url, params, callback) {
        
        var params_str = "";
        for (var key in params) {
            if (params_str != "") {
                params_str += "&";
            }
            params_str += key + "=" + encodeURIComponent(params[key]);
        }
        
        var dataType = (arguments.length == 4 && arguments[3] !== undefined) ? arguments[3] : false;
        
        var xhr = new XMLHttpRequest();
        xhr.open('GET', (url + '?' + params_str), true);
        
        xhr.onload = function() {
          if (xhr.status >= 200 && xhr.status < 400) {
            // Success!
            // var data = JSON.parse(xhr.responseText);
            callback((dataType == 'json' ? JSON.parse(xhr.responseText) : xhr.responseText));
          } else {
            // We reached our target server, but it returned an error
            callback({});
          }
        };
        
        xhr.onerror = function() {
          // There was a connection error of some sort
          callback({});
        };
        
        xhr.send();
    },
    
    ajaxPOST: function(url, params, callback) {
        
        /*
        var params_str = "";
        for (var key in params) {
            if (params_str != "") {
                params_str += "&";
            }
            params_str += key + "=" + encodeURIComponent(params[key]);
        }
        */
        var dataType = (arguments.length == 4 && arguments[3] !== undefined) ? arguments[3] : false;
        
        var xhr = new XMLHttpRequest();
        
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        // xhr.timeout = 1000;

        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 400) {
                callback((dataType == 'json' ? JSON.parse(xhr.responseText) : xhr.responseText));
            } else {
                callback({});
            }
        };

        xhr.ontimeout = function () {
            callback({});
        };

        xhr.onerror = function () {
            callback({});
        };

        xhr.send(params);
    }
    
};
},{}],6:[function(require,module,exports){
'use strict'

function extend(dest, src) {
    if (src) {
        var props = Object.keys(src)
        for (var i = 0, l = props.length; i < l; i++) {
            dest[props[i]] = src[props[i]]
        }
    }
    return dest
}

function copy(obj) {
    return extend({}, obj)
}

var ESCAPE_CHAR = '\\'

var DIGIT_RE = /^\d$/

var DEFAULT_PLACEHOLDER_CHAR = '_'
var DEFAULT_FORMAT_CHARACTERS = {
    '9': {
        validate: function(char) { return DIGIT_RE.test(char) }
    }
}

/**
 * @param {string} source
 * @patam {?Object} formatCharacters
 */
function Pattern(source, formatCharacters, placeholderChar, isRevealingMask) {
    if (!(this instanceof Pattern)) {
        return new Pattern(source, formatCharacters, placeholderChar)
    }

    /** Placeholder character */
    this.placeholderChar = placeholderChar || DEFAULT_PLACEHOLDER_CHAR
    /** Format character definitions. */
    this.formatCharacters = formatCharacters || DEFAULT_FORMAT_CHARACTERS
    /** Pattern definition string with escape characters. */
    this.source = source
    /** Pattern characters after escape characters have been processed. */
    this.pattern = []
    /** Length of the pattern after escape characters have been processed. */
    this.length = 0
    /** Index of the first editable character. */
    this.firstEditableIndex = null
    /** Index of the last editable character. */
    this.lastEditableIndex = null
    /** Lookup for indices of editable characters in the pattern. */
    this._editableIndices = {}
    /** If true, only the pattern before the last valid value character shows. */
    this.isRevealingMask = isRevealingMask || false

    this._parse()
}

Pattern.prototype._parse = function parse() {
    var sourceChars = this.source.split('')
    var patternIndex = 0
    var pattern = []

    for (var i = 0, l = sourceChars.length; i < l; i++) {
        var char = sourceChars[i]
        if (char === ESCAPE_CHAR) {
            if (i === l - 1) {
                throw new Error('InputMaskCore: pattern ends with a raw ' + ESCAPE_CHAR)
            }
            char = sourceChars[++i]
        }
        else if (char in this.formatCharacters) {
            if (this.firstEditableIndex === null) {
                this.firstEditableIndex = patternIndex
            }
            this.lastEditableIndex = patternIndex
            this._editableIndices[patternIndex] = true
        }

        pattern.push(char)
        patternIndex++
    }

    if (this.firstEditableIndex === null) {
        throw new Error(
            'InputMaskCore: pattern "' + this.source + '" does not contain any editable characters.'
        )
    }

    this.pattern = pattern
    this.length = pattern.length
}

/**
 * @param {Array<string>} value
 * @return {Array<string>}
 */
Pattern.prototype.formatValue = function format(value) {
    var valueBuffer = new Array(this.length)
    var valueIndex = 0

    for (var i = 0, l = this.length; i < l; i++) {
        if (this.isEditableIndex(i)) {
            if (this.isRevealingMask &&
                value.length <= valueIndex &&
                !this.isValidAtIndex(value[valueIndex], i)) {
                break
            }
            valueBuffer[i] = (value.length > valueIndex && this.isValidAtIndex(value[valueIndex], i)
                ? this.transform(value[valueIndex], i)
                : this.placeholderChar)
            valueIndex++
        }
        else {
            valueBuffer[i] = this.pattern[i]
            // Also allow the value to contain static values from the pattern by
            // advancing its index.
            if (value.length > valueIndex && value[valueIndex] === this.pattern[i]) {
                valueIndex++
            }
        }
    }

    return valueBuffer
}

/**
 * @param {number} index
 * @return {boolean}
 */
Pattern.prototype.isEditableIndex = function isEditableIndex(index) {
    return !!this._editableIndices[index]
}

/**
 * @param {string} char
 * @param {number} index
 * @return {boolean}
 */
Pattern.prototype.isValidAtIndex = function isValidAtIndex(char, index) {
    return this.formatCharacters[this.pattern[index]].validate(char)
}

Pattern.prototype.transform = function transform(char, index) {
    var format = this.formatCharacters[this.pattern[index]]
    return typeof format.transform == 'function' ? format.transform(char) : char
}

function InputMaskCore(options) {
    if (!(this instanceof InputMaskCore)) { return new InputMaskCore(options) }
    options = extend({
        formatCharacters: null,
        pattern: null,
        isRevealingMask: false,
        placeholderChar: DEFAULT_PLACEHOLDER_CHAR,
        selection: {start: 0, end: 0},
        value: ''
    }, options)

    if (options.pattern == null) {
        throw new Error('InputMaskCore: you must provide a pattern.')
    }

    if (typeof options.placeholderChar !== 'string' || options.placeholderChar.length > 1) {
        throw new Error('InputMaskCore: placeholderChar should be a single character or an empty string.')
    }

    this.placeholderChar = options.placeholderChar
    this.formatCharacters = options.formatCharacters
    this.setPattern(options.pattern, {
        value: options.value,
        selection: options.selection,
        isRevealingMask: options.isRevealingMask
    })
}

// Editing

/**
 * Applies a single character of input based on the current selection.
 * @param {string} char
 * @return {boolean} true if a change has been made to value or selection as a
 *   result of the input, false otherwise.
 */
InputMaskCore.prototype.input = function input(char) {
    // Ignore additional input if the cursor's at the end of the pattern
    if (this.selection.start === this.selection.end &&
        this.selection.start === this.pattern.length) {
        return false
    }

    var selectionBefore = copy(this.selection)
    var valueBefore = this.getValue()

    var inputIndex = this.selection.start

    // If the cursor or selection is prior to the first editable character, make
    // sure any input given is applied to it.
    if (inputIndex < this.pattern.firstEditableIndex) {
        inputIndex = this.pattern.firstEditableIndex
    }

    // Bail out or add the character to input
    if (this.pattern.isEditableIndex(inputIndex)) {
        if (!this.pattern.isValidAtIndex(char, inputIndex)) {
            return false
        }
        this.value[inputIndex] = this.pattern.transform(char, inputIndex)
    }

    // If multiple characters were selected, blank the remainder out based on the
    // pattern.
    var end = this.selection.end - 1
    while (end > inputIndex) {
        if (this.pattern.isEditableIndex(end)) {
            this.value[end] = this.placeholderChar
        }
        end--
    }

    // Advance the cursor to the next character
    this.selection.start = this.selection.end = inputIndex + 1

    // Skip over any subsequent static characters
    while (this.pattern.length > this.selection.start &&
    !this.pattern.isEditableIndex(this.selection.start)) {
        this.selection.start++
        this.selection.end++
    }

    // History
    if (this._historyIndex != null) {
        // Took more input after undoing, so blow any subsequent history away
        this._history.splice(this._historyIndex, this._history.length - this._historyIndex)
        this._historyIndex = null
    }
    if (this._lastOp !== 'input' ||
        selectionBefore.start !== selectionBefore.end ||
        this._lastSelection !== null && selectionBefore.start !== this._lastSelection.start) {
        this._history.push({value: valueBefore, selection: selectionBefore, lastOp: this._lastOp})
    }
    this._lastOp = 'input'
    this._lastSelection = copy(this.selection)

    return true
}

/**
 * Attempts to delete from the value based on the current cursor position or
 * selection.
 * @return {boolean} true if the value or selection changed as the result of
 *   backspacing, false otherwise.
 */
InputMaskCore.prototype.backspace = function backspace() {
    // If the cursor is at the start there's nothing to do
    if (this.selection.start === 0 && this.selection.end === 0) {
        return false
    }

    var selectionBefore = copy(this.selection)
    var valueBefore = this.getValue()

    // No range selected - work on the character preceding the cursor
    if (this.selection.start === this.selection.end) {
        if (this.pattern.isEditableIndex(this.selection.start - 1)) {
            if(this.pattern.isRevealingMask){
                this.value.splice(this.selection.start - 1)
            } else {
                this.value[this.selection.start - 1] = this.placeholderChar
            }
        } else {
            this.selection.start--
            this.selection.end--

            if (! this.pattern.isEditableIndex(this.selection.start - 1)) {
                this.selection.start--
                this.selection.end--
            }

            if(this.pattern.isRevealingMask){
                this.value.splice(this.selection.start - 1)
            } else {
                this.value[this.selection.start - 1] = this.placeholderChar
            }
        }
        this.selection.start--
        this.selection.end--
    }
    // Range selected - delete characters and leave the cursor at the start of the selection
    else {
        var end = this.selection.end - 1
        while (end >= this.selection.start) {
            if (this.pattern.isEditableIndex(end)) {
                this.value[end] = this.placeholderChar
            }
            end--
        }
        this.selection.end = this.selection.start
    }

    // History
    if (this._historyIndex != null) {
        // Took more input after undoing, so blow any subsequent history away
        this._history.splice(this._historyIndex, this._history.length - this._historyIndex)
    }
    if (this._lastOp !== 'backspace' ||
        selectionBefore.start !== selectionBefore.end ||
        this._lastSelection !== null && selectionBefore.start !== this._lastSelection.start) {
        this._history.push({value: valueBefore, selection: selectionBefore, lastOp: this._lastOp})
    }
    this._lastOp = 'backspace'
    this._lastSelection = copy(this.selection)

    return true
}

/**
 * Attempts to paste a string of input at the current cursor position or over
 * the top of the current selection.
 * Invalid content at any position will cause the paste to be rejected, and it
 * may contain static parts of the mask's pattern.
 * @param {string} input
 * @return {boolean} true if the paste was successful, false otherwise.
 */
InputMaskCore.prototype.paste = function paste(input) {
    // This is necessary because we're just calling input() with each character
    // and rolling back if any were invalid, rather than checking up-front.
    var initialState = {
        value: this.value.slice(),
        selection: copy(this.selection),
        _lastOp: this._lastOp,
        _history: this._history.slice(),
        _historyIndex: this._historyIndex,
        _lastSelection: copy(this._lastSelection)
    }

    // If there are static characters at the start of the pattern and the cursor
    // or selection is within them, the static characters must match for a valid
    // paste.
    if (this.selection.start < this.pattern.firstEditableIndex) {
        for (var i = 0, l = this.pattern.firstEditableIndex - this.selection.start; i < l; i++) {
            if (input.charAt(i) !== this.pattern.pattern[i]) {
                return false
            }
        }

        // Continue as if the selection and input started from the editable part of
        // the pattern.
        input = input.substring(this.pattern.firstEditableIndex - this.selection.start)
        this.selection.start = this.pattern.firstEditableIndex
    }

    for (i = 0, l = input.length;
         i < l && this.selection.start <= this.pattern.lastEditableIndex;
         i++) {
        var valid = this.input(input.charAt(i))
        // Allow static parts of the pattern to appear in pasted input - they will
        // already have been stepped over by input(), so verify that the value
        // deemed invalid by input() was the expected static character.
        if (!valid) {
            if (this.selection.start > 0) {
                // XXX This only allows for one static character to be skipped
                var patternIndex = this.selection.start - 1
                if (!this.pattern.isEditableIndex(patternIndex) &&
                    input.charAt(i) === this.pattern.pattern[patternIndex]) {
                    continue
                }
            }
            extend(this, initialState)
            return false
        }
    }

    return true
}

InputMaskCore.prototype.delete = function del() {
    // If the cursor is at the start there's nothing to do
    if (this.selection.start === 0 && this.selection.end === 0) {
        return false
    }

    var selectionBefore = copy(this.selection)
    var valueBefore = this.getValue()

    // No range selected - work on the character preceding the cursor
    if (this.selection.start === this.selection.end) {
        if (! this.pattern.isEditableIndex(this.selection.start)) {
            this.selection.start++
            this.selection.end++
        }

        if (this.pattern.isRevealingMask){
            this.value.splice(this.selection.start)
        } else {
            this.value[this.selection.start] = this.placeholderChar;
            this.setValue(' ' + this.getRawValue().replace(this.placeholderChar, ''));
        }
    }
    // Range selected - delete characters and leave the cursor at the start of the selection
    else {
        var end = this.selection.end - 1
        while (end >= this.selection.start) {
            if (this.pattern.isEditableIndex(end)) {
                this.value[end] = this.placeholderChar
            }
            end--
        }
        this.selection.end = this.selection.start
    }

    // History
    if (this._historyIndex != null) {
        // Took more input after undoing, so blow any subsequent history away
        this._history.splice(this._historyIndex, this._history.length - this._historyIndex)
    }
    if (this._lastOp !== 'delete' ||
        selectionBefore.start !== selectionBefore.end ||
        this._lastSelection !== null && selectionBefore.start !== this._lastSelection.start) {
        this._history.push({value: valueBefore, selection: selectionBefore, lastOp: this._lastOp})
    }
    this._lastOp = 'delete'
    this._lastSelection = copy(this.selection)

    return true
}

// Getters & setters

InputMaskCore.prototype.setPattern = function setPattern(pattern, options) {
    options = extend({
        selection: {start: 0, end: 0},
        value: ''
    }, options)
    this.pattern = new Pattern(pattern, this.formatCharacters, this.placeholderChar, options.isRevealingMask)
    this.setValue(options.value)
    this.emptyValue = this.pattern.formatValue([]).join('')
    this.selection = options.selection
    this._resetHistory()
}

InputMaskCore.prototype.setValue = function setValue(value) {
    if (value == null) {
        value = ''
    }
    this.value = this.pattern.formatValue(value.split(''))
}

InputMaskCore.prototype.getValue = function getValue() {
    if(this.pattern.isRevealingMask){
        this.value = this.pattern.formatValue(this.getRawValue().split(''))
    }
    return this.value.join('')
}

InputMaskCore.prototype.getRawValue = function getRawValue() {
    var rawValue = []
    for (var i = 0; i < this.value.length; i++) {
        if (this.pattern._editableIndices[i] === true) {
            rawValue.push(this.value[i])
        }
    }
    return rawValue.join('')
}

InputMaskCore.prototype._resetHistory = function _resetHistory() {
    this._history = []
    this._historyIndex = null
    this._lastOp = null
    this._lastSelection = copy(this.selection)
}

InputMaskCore.Pattern = Pattern

'use strict'

function InputMask (input, options) {
    this.input = input || null;
    this.mask = options.mask || null;
    this.placeholder = options.placeholder || '_';

    this.core = null;

    var self = this;

    this.input.addEventListener('keydown', function (e) { self.keyDown(e) });
    this.input.addEventListener('keypress', function (e) { self.keyPress(e) });
    this.input.addEventListener('keyup', function (e) { self.keyUp(e) });
    this.input.addEventListener('textInput', function (e) { self.textInput(e) });
    this.input.addEventListener('mouseup', function (e) { self.mouseUp(e) });
    this.input.addEventListener('focusout', function (e) { self.focusOut(e) });
    this.input.addEventListener('cut', function (e) { self.cut(e) });
    this.input.addEventListener('copy', function (e) { self.copy(e) });
    this.input.addEventListener('paste', function (e) { self.paste(e) });

    this.init();
}

InputMask.prototype.init = function init() {
    try {
        this.core = new InputMaskCore({
            pattern: this.mask,
            placeholderChar: this.placeholder
        });

        this.core.selection = {
            start: this.core.pattern.firstEditableIndex,
            end: this.core.pattern.firstEditableIndex
        };

        if (this.input.value != '') {
            this.core.setValue(this.input.value);
            this.update();
        }
    } catch (e) {
        console.error(e);
    }
}

InputMask.prototype.keyDown = function keyDown(e) {
    this.setInputSelection();

    if (! (e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40 || e.keyCode == 8)) {
        this.setCaretPosition();
    }

    if (e.ctrlKey && e.keyCode == 65) {
        this.core.selection = {
            start: 0,
            end: this.core.value.length
        };
    }

    switch (e.keyCode) {
        // backspace
        case 8:
            e.preventDefault();

            if (this.core.selection.start > this.core.pattern.firstEditableIndex || this.core.selection.start !== this.core.selection.end) {
                this.core.backspace();
            }

            break;

        // left arrow
        case 37:
            e.preventDefault();

            if (this.core.selection.start > this.core.pattern.firstEditableIndex && this.input.selectionStart === this.input.selectionEnd) {
                this.input.selectionStart -= 1;
            }

            this.core.selection = {
                start: this.input.selectionStart,
                end: this.input.selectionStart
            };

            break;

        // right arrow
        case 39:
            e.preventDefault();

            if (this.input.selectionStart === this.input.selectionEnd) {
                this.input.selectionEnd += 1;
            }

            this.core.selection = {
                start: this.input.selectionEnd,
                end: this.input.selectionEnd
            };

            break;

        // end
        case 35:
            e.preventDefault();

            this.core.selection = {
                start: this.core.value.length,
                end: this.core.value.length
            };

            break;

        // home
        case 36:
            e.preventDefault();

            this.core.selection = {
                start: this.core.pattern.firstEditableIndex,
                end: this.core.pattern.firstEditableIndex
            };

            break;

        //delete
        case 46:
            e.preventDefault();

            if (this.core.selection.start < this.core.pattern.firstEditableIndex && this.core.selection.start === this.core.selection.end) {
                this.core.selection = {
                    start: this.core.pattern.firstEditableIndex,
                    end: this.core.pattern.firstEditableIndex
                };
            }

            if (this.core.selection.end <= this.core.value.length || this.core.selection.start !== this.core.selection.end) {
                this.core.delete();
            }

            break;
    }

    this.update();
}

InputMask.prototype.keyPress = function keyPress(e) {
    // works only on Desktop
    if (e.ctrlKey) return; // Fix FF copy/paste issue
    // IE & FF are not trigger textInput event, so we have to force it
    /* eslint-disable */
    var isIE = /*@cc_on!@*/false || !!document.documentMode; //by http://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser
    /* eslint-enable */
    var isFirefox = typeof InstallTrigger !== 'undefined';

    if (isIE || isFirefox) {
        e.preventDefault();
        e.data = e.key;
        this.textInput(e);
    }
}

InputMask.prototype.textInput = function textInput(e) {
    if (e.preventDefault) {
        e.preventDefault()
    }

    this.core.input(e.data);
    this.update();
}

InputMask.prototype.keyUp = function keyUp(e) {
    if (e.keyCode === 9) {
        return;
    }

    this.core.setValue(e.target.value);

    this.update();
}

InputMask.prototype.cut = function cut(e) {
    e.preventDefault();

    if (this.input.selectionStart !== this.input.selectionEnd) {
        try {
            document.execCommand('copy');
        } catch (e) {
            console.error(e);
        }

        this.core.backspace();
        this.update();
    }
}

InputMask.prototype.copy = function copy() {}

InputMask.prototype.paste = function paste(e) {
    e.preventDefault();

    if (this.core.selection.start < this.core.pattern.firstEditableIndex && this.core.selection.start === this.core.selection.end) {
        this.core.selection = {
            start: this.core.pattern.firstEditableIndex,
            end: this.core.pattern.firstEditableIndex
        };
    }

    if (this.core.selection.start < this.core.pattern.firstEditableIndex && this.core.selection.start !== this.core.selection.end) {
        this.core.selection.start = this.core.pattern.firstEditableIndex;
    }

    this.core.paste(e.clipboardData.getData('text'));

    this.update();
}

InputMask.prototype.update = function update() {
    if (this.input.value !== this.core.getValue()) {
        this.input.value = this.core.getValue();
    }

    this.input.selectionStart = this.core.selection.start;
    this.input.selectionEnd = this.core.selection.end;
}

InputMask.prototype.isEmpty = function isEmpty() {
    return this.core.getValue() === this.core.emptyValue;
}

InputMask.prototype.focusOut = function focusOut() {
    if (this.isEmpty()) {
        this.input.value = '';

        this.core.selection = {
            start: 0,
            end: 0
        };
    }
}

InputMask.prototype.setInputSelection = function setInputSelection() {
    this.core.selection = {
        start: this.input.selectionStart,
        end: this.input.selectionEnd
    };
}

InputMask.prototype.mouseUp = function mouseUp() {
    this.setInputSelection();
    this.setCaretPosition();

    if (this.isEmpty() && this.input.selectionStart === this.input.selectionEnd) {
        this.core.selection = {
            start: this.core.pattern.firstEditableIndex,
            end: this.core.pattern.firstEditableIndex
        };

        this.update();
    }
}

InputMask.prototype.setCaretPosition = function setCaretPosition() {
    var lastPosition = 0;

    for (var i = 0; i < this.core.value.length; i++) {
        if (this.core.value[i] != this.core.placeholderChar && this.core.pattern.isEditableIndex(i)) {
            lastPosition = i + 1;
        }
    }

    for (var i = lastPosition; i < this.core.value.length; i++) {
        if (this.core.pattern.isEditableIndex(i)) {
            lastPosition = i;
            break;
        }
    }

    if (this.core.selection.start == this.core.selection.end) {
        if (this.core.selection.start > lastPosition && this.core.pattern.isEditableIndex(lastPosition)) {
            this.core.selection = {
                start: lastPosition,
                end: lastPosition
            };

            this.update();
        }
    }
}

module.exports = InputMask;

},{}],7:[function(require,module,exports){
;(function(window, undefined) {
    "use strict";

    function extend() {
        for(var i=1; i < arguments.length; i++) {
            for(var key in arguments[i]) {
                if(arguments[i].hasOwnProperty(key)) {
                    arguments[0][key] = arguments[i][key];
                }
            }
        }
        return arguments[0];
    }

    var pluginName = "tinyscrollbar"
        ,   defaults = {
            axis: 'y'
            ,   wheel: true
            ,   wheelSpeed: 40
            ,   wheelLock: true
            ,   touchLock: true
            ,   trackSize: false
            ,   thumbSize: false
            ,   thumbSizeMin: 20
        }
    ;

    function Plugin($container, options) {
        /**
         * The options of the carousel extend with the defaults.
         *
         * @property options
         * @type Object
         * @default defaults
         */
        this.options = extend({}, defaults, options);

        /**
         * @property _defaults
         * @type Object
         * @private
         * @default defaults
         */
        this._defaults = defaults;

        /**
         * @property _name
         * @type String
         * @private
         * @final
         * @default 'tinyscrollbar'
         */
        this._name = pluginName;

        var self = this
            ,   $body = document.querySelectorAll("body")[0]
            ,   $viewport = $container.querySelectorAll(".lexprofit-project-scroll-viewport")[0]
            ,   $overview = $container.querySelectorAll(".lexprofit-project-scroll-overview")[0]
            ,   $scrollbar = $container.querySelectorAll(".lexprofit-project-scroll")[0]
            ,   $track = $scrollbar.querySelectorAll(".lexprofit-project-scroll-track")[0]
            ,   $thumb = $scrollbar.querySelectorAll(".lexprofit-project-scroll-thumb")[0]

            ,   mousePosition = 0
            ,   isHorizontal = this.options.axis === 'x'
            ,   hasTouchEvents = ("ontouchstart" in document.documentElement)
            ,   wheelEvent = "onwheel" in document.createElement("div") ? "wheel" : // Modern browsers support "wheel"
            document.onmousewheel !== undefined ? "mousewheel" : // Webkit and IE support at least "mousewheel"
                "DOMMouseScroll" // let's assume that remaining browsers are older Firefox

            ,   sizeLabel = isHorizontal ? "width" : "height"
            ,   posiLabel = isHorizontal ? "left" : "top"
            ,   moveEvent = document.createEvent("HTMLEvents")
        ;

        moveEvent.initEvent("move", true, true);

        /**
         * The position of the content relative to the viewport.
         *
         * @property contentPosition
         * @type Number
         * @default 0
         */
        this.contentPosition = 0;

        /**
         * The height or width of the viewport.
         *
         * @property viewportSize
         * @type Number
         * @default 0
         */
        this.viewportSize = 0;

        /**
         * The height or width of the content.
         *
         * @property contentSize
         * @type Number
         * @default 0
         */
        this.contentSize = 0;

        /**
         * The ratio of the content size relative to the viewport size.
         *
         * @property contentRatio
         * @type Number
         * @default 0
         */
        this.contentRatio = 0;

        /**
         * The height or width of the content.
         *
         * @property trackSize
         * @type Number
         * @default 0
         */
        this.trackSize = 0;

        /**
         * The size of the track relative to the size of the content.
         *
         * @property trackRatio
         * @type Number
         * @default 0
         */
        this.trackRatio = 0;

        /**
         * The height or width of the thumb.
         *
         * @property thumbSize
         * @type Number
         * @default 0
         */
        this.thumbSize = 0;

        /**
         * The position of the thumb relative to the track.
         *
         * @property thumbPosition
         * @type Number
         * @default 0
         */
        this.thumbPosition = 0;

        /**
         * Will be true if there is content to scroll.
         *
         * @property hasContentToSroll
         * @type Boolean
         * @default false
         */
        this.hasContentToSroll = false;

        /**
         * @method _initialize
         * @private
         */
        function _initialize() {
            self.update();
            _setEvents();

            return self;
        }

        /**
         * You can use the update method to adjust the scrollbar to new content or to move the scrollbar to a certain point.
         *
         * @method update
         * @chainable
         * @param {Number|String} [scrollTo] Number in pixels or the values "relative" or "bottom". If you dont specify a parameter it will default to top
         */
        this.update = function(scrollTo) {
            var sizeLabelCap = sizeLabel.charAt(0).toUpperCase() + sizeLabel.slice(1).toLowerCase();
            var scrcls = $scrollbar.className;

            this.viewportSize = $viewport['offset'+ sizeLabelCap];
            this.contentSize = $overview['scroll'+ sizeLabelCap];
            this.contentRatio = this.viewportSize / this.contentSize;
            this.trackSize = this.options.trackSize || this.viewportSize;
            this.thumbSize = Math.min(this.trackSize, Math.max(this.options.thumbSizeMin, (this.options.thumbSize || (this.trackSize * this.contentRatio))));
            this.trackRatio = (this.contentSize - this.viewportSize) / (this.trackSize - this.thumbSize);
            this.hasContentToSroll = this.contentRatio < 1;

            $scrollbar.className = this.hasContentToSroll ? scrcls.replace(/disable/g, "") : scrcls.replace(/ disable/g, "") + " disable";

            switch (scrollTo) {
                case "bottom":
                    this.contentPosition = Math.max(this.contentSize - this.viewportSize, 0);
                    break;

                case "relative":
                    this.contentPosition = Math.min(Math.max(this.contentSize - this.viewportSize, 0), Math.max(0, this.contentPosition));
                    break;

                default:
                    this.contentPosition = parseInt(scrollTo, 10) || 0;
            }

            this.thumbPosition = self.contentPosition / self.trackRatio;

            _setCss();

            return self;
        };

        /**
         * @method _setCss
         * @private
         */
        function _setCss() {
            $thumb.style[posiLabel] = self.thumbPosition + "px";
            $overview.style[posiLabel] = -self.contentPosition + "px";
            $scrollbar.style[sizeLabel] = self.trackSize + "px";
            $track.style[sizeLabel] = self.trackSize + "px";
            $thumb.style[sizeLabel] = self.thumbSize + "px";
        }

        /**
         * @method _setEvents
         * @private
         */
        function _setEvents() {
            if(hasTouchEvents) {
                $viewport.ontouchstart = function(event) {
                    if(1 === event.touches.length) {
                        _start(event.touches[0]);
                        event.stopPropagation();
                    }
                };
            }
            else {
                $thumb.onmousedown = function(event) {
                    event.stopPropagation();
                    _start(event);
                };

                $track.onmousedown = function(event) {
                    _start(event, true);
                };
            }

            window.addEventListener("resize", function() {
                self.update("relative");
            }, true);

            if(self.options.wheel && window.addEventListener) {
                $container.addEventListener(wheelEvent, _wheel, false );
            }
            else if(self.options.wheel) {
                $container.onmousewheel = _wheel;
            }
        }

        /**
         * @method _isAtBegin
         * @private
         */
        function _isAtBegin() {
            return self.contentPosition > 0;
        }

        /**
         * @method _isAtEnd
         * @private
         */
        function _isAtEnd() {
            return self.contentPosition <= (self.contentSize - self.viewportSize) - 5;
        }

        /**
         * @method _start
         * @private
         */
        function _start(event, gotoMouse) {
            if(self.hasContentToSroll) {
                var posiLabelCap = posiLabel.charAt(0).toUpperCase() + posiLabel.slice(1).toLowerCase();
                mousePosition = gotoMouse ? $thumb.getBoundingClientRect()[posiLabel] : (isHorizontal ? event.clientX : event.clientY);

                $body.className += " lexprofit-project-noSelect";

                if(hasTouchEvents) {
                    document.ontouchmove = function(event) {
                        if(self.options.touchLock || _isAtBegin() && _isAtEnd()) {
                            event.preventDefault();
                        }
                        _drag(event.touches[0]);
                    };
                    document.ontouchend = _end;
                }
                else {
                    document.onmousemove = _drag;
                    document.onmouseup = $thumb.onmouseup = _end;
                }

                _drag(event);
            }
        }

        /**
         * @method _wheel
         * @private
         */
        function _wheel(event) {
            if(self.hasContentToSroll) {
                var evntObj = event || window.event
                    ,   wheelSpeedDelta = -(evntObj.deltaY || evntObj.detail || (-1 / 3 * evntObj.wheelDelta)) / 40
                    ,   multiply = (evntObj.deltaMode === 1) ? self.options.wheelSpeed : 1
                ;

                self.contentPosition -= wheelSpeedDelta * multiply * self.options.wheelSpeed;

                self.contentPosition = Math.min((self.contentSize - self.viewportSize), Math.max(0, self.contentPosition));
                self.thumbPosition = self.contentPosition / self.trackRatio;

                $container.dispatchEvent(moveEvent);

                $thumb.style[posiLabel] = self.thumbPosition + "px";
                $overview.style[posiLabel] = -self.contentPosition + "px";

                if(self.options.wheelLock || _isAtBegin() && _isAtEnd()) {
                    evntObj.preventDefault();
                }
            }
        }

        /**
         * @method _drag
         * @private
         */
        function _drag(event) {
            if(self.hasContentToSroll)
            {
                var mousePositionNew = isHorizontal ? event.clientX : event.clientY
                    ,   thumbPositionDelta = hasTouchEvents ? (mousePosition - mousePositionNew) : (mousePositionNew - mousePosition)
                    ,   thumbPositionNew = Math.min((self.trackSize - self.thumbSize), Math.max(0, self.thumbPosition + thumbPositionDelta))
                ;

                self.contentPosition = thumbPositionNew * self.trackRatio;

                $container.dispatchEvent(moveEvent);

                $thumb.style[posiLabel] = thumbPositionNew + "px";
                $overview.style[posiLabel] = -self.contentPosition + "px";
            }
        }


        /**
         * @method _end
         * @private
         */
        function _end() {
            self.thumbPosition = parseInt($thumb.style[posiLabel], 10) || 0;

            $body.className = $body.className.replace(" lexprofit-project-noSelect", "");
            document.onmousemove = document.onmouseup = null;
            $thumb.onmouseup = null;
            $track.onmouseup = null;
            document.ontouchmove = document.ontouchend = null;
        }

        return _initialize();
    }

    /**
     * @class window.tinyscrollbar
     * @constructor
     * @param {Object} [$container] Element to attach scrollbar to.
     * @param {Object} options
     @param {String} [options.axis='y'] Vertical or horizontal scroller? ( x || y ).
     @param {Boolean} [options.wheel=true] Enable or disable the mousewheel.
     @param {Boolean} [options.wheelSpeed=40] How many pixels must the mouswheel scroll at a time.
     @param {Boolean} [options.wheelLock=true] Lock default window wheel scrolling when there is no more content to scroll.
     @param {Number} [options.touchLock=true] Lock default window touch scrolling when there is no more content to scroll.
     @param {Boolean|Number} [options.trackSize=false] Set the size of the scrollbar to auto(false) or a fixed number.
     @param {Boolean|Number} [options.thumbSize=false] Set the size of the thumb to auto(false) or a fixed number
     @param {Boolean} [options.thumbSizeMin=20] Minimum thumb size.
     */
    var tinyscrollbar = function($container, options) {
        return new Plugin($container, options);
    };
    
    /*
    if(typeof define == 'function' && define.amd) {
        define(function(){ return tinyscrollbar; });
    }
    else if(typeof module === 'object' && module.exports) {
        module.exports = tinyscrollbar;
    }
    else {
        window.tinyscrollbar = tinyscrollbar;
    }
    */
    module.exports = tinyscrollbar;

})(window);

},{}],8:[function(require,module,exports){
'use strict';

module.exports = {
    set: function () {
        (function (d, w, c) {
            (w[c] = w[c] || []).push(function() {
                try {
                    w.yaCounter40882064 = new Ya.Metrika({
                        id:40882064,
                        clickmap:true,
                        trackLinks:true,
                        accurateTrackBounce:true,
                        webvisor:false
                    });
                } catch(e) { }
            });

            var n = d.getElementsByTagName("script")[0],
                s = d.createElement("script"),
                f = function () { n.parentNode.insertBefore(s, n); };

            s.type = "text/javascript";
            s.async = true;
            s.src = "https://mc.yandex.ru/metrika/watch.js";

            if (w.opera == "[object Opera]") {
                d.addEventListener("DOMContentLoaded", f, false);
            } else { f(); }

        })(document, window, "yandex_metrika_callbacks");
    },
    addNoscript: function () {
        document.querySelector('body').insertAdjacentHTML('beforeend', '<noscript><div><img src="https://mc.yandex.ru/watch/40882064" style="position:absolute; left:-9999px;" alt="" /></div></noscript>');
    }
};
},{}],9:[function(require,module,exports){
var device              = require('./../../../Device.js');
var helpers             = require('./../../../Helpers.js');
var DetectAd            = require('./../../../DetectAdblock.js');
var cookies             = require('./../../../BrowserCookies.js');
var yMetrika            = require('./../../../YandexMetrikaDefault.js');
var InputMask           = require('./../../../InputMask.js');
var GoogleAutocomplete  = require('./../../../GoogleAutocomplete.js');
var TinyScrollbar       = require('./../../../TinyScrollbar.js');

yMetrika.set();

function LPWidget(el) {
    this.options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    this.$el = el;

    this.$el_wrap           = this.$el.querySelector('.lexprofit-widget-wrap');
    this.$form              = this.$el.querySelector('.lexprofit-widget-chat-form');
    this.$question          = this.$el.querySelector('.lexprofit-widget-chat-textarea');
    this.$header            = this.$el.querySelector('.lexprofit-widget-header');
    this.$hide              = this.$header.querySelector('.lexprofit-widget-header-button-hide');
    this.$loader            = this.$el.querySelector('.lexprofit-widget-loader');
    this.$success           = this.$el.querySelector('.lexprofit-widget-success');
    this.$scroll            = this.$el.querySelector('.lexprofit-widget-chat-scroll-wrap');
    this.$messages          = this.$scroll.querySelector('.lexprofit-widget-chat-msg-wrap');
    this.$image             = this.$el.querySelector('.lexprofit-widget-header-robot-image');

    this.$helper            = this.$el.querySelector('.lexprofit-widget-chat-textarea-valid');
    this.$chat_footer       = this.$el.querySelector('.lexprofit-widget-chat-footer');
    this.$buttons           = this.$el.querySelector('.lexprofit-widget-switch-method');
    this.$animation_phone   = this.$el.querySelector('.lexprofit-animation-phone');
    this.$animation_notice  = this.$el.querySelector('.lexprofit-widget-header-notice');
    this.$animation_typing  = this.$el.querySelector('.lexprofit-widget-chat-robot-typing');
    this.$chat              = this.$el.querySelector('.lexprofit-widget-chat');
    this.$call              = this.$el.querySelector('.lexprofit-widget-order-call');

    this.$header_call       = this.$el.querySelector('.lexprofit-widget-header-call');
    this.$header_chat       = this.$el.querySelector('.lexprofit-widget-header-chat');

    this.$sound             = this.$el.querySelector('#lexprofit-widget-sound');
    this.$tooltip           = this.$el.querySelector('.lexprofit-widget-robot-message-wrap');
    this.$modal_window      = this.$el.nextElementSibling.querySelector('#lexprofit-widget-window');
    this.$modal_mask        = this.$el.nextElementSibling.nextElementSibling.nextElementSibling;

    this.$modal_window_reason   = this.$el.nextElementSibling.nextElementSibling.querySelector('#lexprofit-widget-window-reason-hide');
    this.$modal_btn_reason      = this.$modal_window_reason.querySelectorAll('.lexprofit-widget-window-reason-hide-elem');
    this.$btn_setting           = this.$el.querySelector('#lexprofit-widget-setting-wrap');
    this.$msg_offer_call        = this.$el.querySelector('.lexprofit-widget-robot-msg-offer-call-wrap');

    this.$link_personal_data    = this.$el.querySelectorAll('.lexprofit-widget-link-personal-data');
    this.$offer                 = this.$el.querySelector('.lexprofit-widget-offer');
    this.$widget_inner          = this.$el.querySelector('.lexprofit-widget-inner');

    this.$widget                = el;


    this.pid        = this.options.data.pid;
    this.debug      = (this.options.debug == 1 ? true : false);
    this.is_sound   = (((typeof this.options.data.widget.is_sound != 'undefined' && this.options.data.widget.is_sound == 1) || typeof this.options.data.widget.is_sound == 'undefined') ? true : false);
    this.show_city  = (typeof this.options.data.widget.show_city != 'undefined' && this.options.data.widget.show_city == 1 ? true : false);

    this.init();
}

LPWidget.prototype = {
    documentWidth: (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth),
    documentHeight: (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight),
    history:{
        'chat' : {}
    },
    ym: null,
    ga: null,
    goals: {},
    first_messages: false,
    dialog: [
        { 'message' : 'Здравствуйте! Я юрист-консультант сайта. Чем я могу вам помочь?', 'delay' : '2000' },
        { 'message' : 'моя консультация бесплатна, задавайте вопросы', 'delay' : '5000' },
        { 'message' : 'Напишите, что вас интересует, и я вам обязательно помогу.', 'delay' : '1500' },
        { 'message' : 'Я могу вас проконсультировать по телефону. Так будет намного быстрее.', 'delay' : '4000' },
        { 'message' : 'Сейчас всплывет форма. Укажите в ней свои контактные данные.', 'delay' : '4000' },
    ],
    dialog_modal: [
        { 'message' : 'Здравствуйте. Я могу бесплатно вас проконсультировать. Введите ваш вопрос, и в течение 5 минут я дам ответ.', 'delay' : '2000' },
    ],
    dialog_offer_call: {
        'message'   : '',
        'delay'     : '4000'
    },
    first_open_call:false,
    offer_call_delay: 0,
    personal_data_content: 'СОГЛАСИЕ НА  ОБРАБОТКУ ПЕРСОНАЛЬНЫХ ДАННЫХ <br /><br /> Я выражаю согласие на обработку своих персональных данных без оговорок и ограничений и подтверждаю, что, давая такое согласие, действую свободно, по своей воле и в своих интересах. <br /><br /> 1. Целью предоставления мною персональных данных для последующей обработки их Компанией является получение информационных, консультационных услуг от Клиентов Компании. Компания обрабатывает персональные данные в целях указанных в настоящем согласии, а также анализирует обезличенные автоматически собираемые данные с целью совершенствования работы сайта, оценки эффективности рекламных компаний, сбора статистики активности на Сайте. Кроме того, Компания имеет право использовать персональные данные в иных целях, не противоречащих законодательству РФ. <br /><br /> 2. Я осознаю и соглашаюсь с тем, что настоящее согласие предоставляется на осуществление любых действий по обработке моих персональных данных, которые необходимы для достижения указанных целей, как с использованием средств автоматизации, так и без таковых, включая без ограничения: сбор, систематизацию, накопление, хранение, уточнение (обновление, изменение), получение от третьих лиц, использование, распространение (в том числе передача), обезличивание, блокирование, уничтожение, трансграничную передачу персональных данных, а также осуществление любых иных действий с моими персональными данными с учетом норм Федерального закона №152 «О персональных данных» от 27.07.2006 г. <br /><br /> 3. Подписание мною настоящего согласия (путём проставления галочки в соответствующем боксе) распространяется на следующие персональные данные: имя; контактный номер телефона; адрес электронной почты (E-mail), автоматически собираемые данные (IP-адрес, cookies, информация о географическом положении, логи и данные передаваемые веб-страницей и сервером), а также другие данные предоставляемые мною по собственному усмотрению. <br /><br /> 4. Компания не проверяет достоверность предоставленных мною персональных данных. Компания исходит из того, что предоставленная мною персональная информация является достоверной и достаточной. Я осознаю, что несу ответственность за предоставление персональных данных третьего лица в соответствии с действующим законодательством. <br /><br /> 5. Я даю согласие на раскрытие Компанией моих персональных данных Клиентам Компании в целях оказания информационных, консультационных услуг. Персональные данные передаются в соответствии с законодательством РФ. В случае, когда Компания передает мои персональные данные третьим лицам, она требует от третьих лиц соблюдение конфиденциальности моих персональных данных. <br /> В случае если Компания считает, что принятые ей меры не могут обеспечить полную защиту персональных данных при передаче, в т.ч. трансграничной, я соглашаюсь с тем, что мои персональные данные будут переданы в обезличенном виде, в случае если это не повлечет за собой неисполнимость услуг. <br /><br /> 6. Обработка осуществляется в соответствии с требованиями Федерального закона № 152 «О персональных данных» от 27.07.2006г. и Политикой конфиденциальности. Я подтверждаю, что ознакомлен с Политикой конфиденциальности, размещённой на сайте Компании. <br /><br /> 7. При обработке Персональных данных Компания принимает меры по защите Персональных данных в соответствии с действующим законодательством. Компания постоянно совершенствует методы защиты персональных данных, включая правовые, организационные и технические меры безопасности. <br /><br /> 8. Настоящее согласие действует до достижения целей обработки персональных данных. По окончании обработки моих персональных данных Компания, по истечении предусмотренных действующим законодательством сроков хранения документов, содержащих персональные данные, обеспечивает их уничтожение. <br /><br /> 9. Я подтверждаю, что проинформирован о том, что в любой момент в течение всего срока действия настоящего согласия, я вправе отозвать последнее путем направления обращения в адрес Компании и соглашаюсь, что она обязана прекратить обработку персональных данных и уничтожить эти данные в течение 30 (тридцати) календарных дней с момента получения указанного обращения. При этом я осознаю и принимаю, что такой отзыв может повлечь окончание предоставления мне услуг от Компании.',
    opened: false,
    method: '',
    message: '',
    success: false,
    interval_method_change: null,
    notice_count: 0,
    interval_link_edit : false,
    interval_tooltip: null,
    interval_client:null,
    interval_open_widget:null,
    count_delay_open:0,
    support_localstorage: true,
    count_tooltip:0,
    robot_welcome : false,
    call_timeout : {
        'wave_1'    : null,
        'wave_2'    : null,
        'wave_3'    : null,
        'phone'     : null,
        'stop'      : null
    },
    call_disabled: false,
    stop_client_message: true,
    opened_modal: false,
    msg_id:0,
    modal_active: false,
    init_msg_modal: false,
    widget_hover:false,
    is_typing_city:false,
    ymEventActions : [],
    screen: {},

    clear_t: {},
    // form_sent_lead:false,

    phoneMask : null,
    phonePlaceholder : null,

    LexprofitWidgetOffer: {},

    init: function() {
        var _this = this;

        if(this.options.telephone.length != 0 && typeof this.options.telephone.length == 'undefined')
            this.dialog_offer_call['message'] = 'Возможно, вам удобнее позвонить? <br /> Наша горячая линия: <br /> <a href="tel:' + (this.options.telephone['phone'].substring(0, 1) == '8' ? '' : '+') + this.options.telephone['phone'] + '" class="lexprofit-widget-robot-msg-phone">' + this.options.telephone['label'] + ' ' + (this.options.telephone['ext'] != '' ? ('&nbsp;<span>' + this.options.telephone['ext'] + '</span>') : '') + '</a>';

        if(this.is_history()) {
            this.history = JSON.parse(cookies.get('lexprofit_history' + this.pid));
        }

        this.support_localstorage = this.is_localstorage() ? true : false;

        if (window.HTMLAudioElement && typeof this.$sound.canPlayType != 'undefined') {
            if (this.$sound.canPlayType('audio/mpeg')) {
                this.$sound.setAttribute('src', '//' + this.options.host + '/widget/1.1/sounds/sound2.mp3');
                this.$sound.load();
            }
            else if (this.$sound.canPlayType('audio/ogg')) {
                this.$sound.setAttribute('src', '//' + this.options.host + '/widget/1.1/sounds/sound2.ogg');
                this.$sound.load();
            }
        }

        window.addEventListener('load', function() {
            for (var prop in window) {
                if (window.hasOwnProperty(prop)) {
                    if (prop.indexOf('yaCounter') != -1 && typeof window[prop] != 'undefined' && typeof window[prop]._clickmap != 'undefined') {
                        if(window[prop]._clickmap.counterId != null && window[prop]._clickmap.counterId != '40882064')
                            _this.ym = window[prop];
                    }
                }
            }
            _this.ga = typeof ga != 'undefined' ? ga.getAll().shift().b.data.values[':trackingId'] : '';
        });

        this.options.city           = this.show_city ? this.options.city : '';
        this.options.robot['title'] = this.show_city ? (this.options.city.length > 19 ? 'Юрист' : 'Юрист-консультант') : this.options.robot['title'];

        this.$question.addEventListener('input', function() {
            _this.analytics('lexprofit-question-typing');
        });

        this.$chat.querySelector('form').addEventListener('input', function() {
            _this.analytics('lexprofit-contact-typing');
            _this.offer_call_delay = 0;
        });

        this.$call.querySelector('form').addEventListener('input', function() {
            _this.analytics('lexprofit-contact-typing');
            _this.offer_call_delay = 0;
        });

        this.message_timestamp();

        this.$header.querySelector('.lexprofit-widget-header-robot-name').textContent = this.options.robot['name'];

        this.$header.querySelector('.lexprofit-widget-header-robot-title .lexprofit-widget-header-robot-title-txt').textContent = this.options.robot['title'];

        this.$header_chat.querySelector('.lexprofit-widget-header-hover-robot-name').textContent = this.options.robot['name'];

        this.$header_chat.querySelector('.lexprofit-widget-header-hover-robot-title').textContent = this.options.robot['title'];

        this.$header.querySelector('.lexprofit-widget-header-robot-avatar').setAttribute('src', '//' + this.options.host + '/widget/1.1/images/people/' + this.options.robot['image'] + '?53452412355');

        this.$header_chat.querySelector('.lexprofit-widget-header-hover-robot-avatar').setAttribute('src', '//' + this.options.host + '/widget/1.1/images/people/' + this.options.robot['image'] + '?53452412355');

        this.$modal_window.querySelector('.lexprofit-widget-window-robot-avatar').setAttribute('src', '//' + this.options.host + '/widget/1.1/images/people/' + this.options.robot['image'] + '?53452412355');

        var buttons_send = this.$widget_inner.querySelectorAll('form button');
        Array.prototype.forEach.call(buttons_send, function(button, i){
            button.addEventListener('click', function(e) {
                e.preventDefault();

                var error = false;

                var elements = helpers.get_parents(this, 'form').querySelectorAll('input[type=text], input[type=tel], input[type=email], input[type=checkbox]');
                Array.prototype.forEach.call(elements, function(element, i){
                    if(!_this.validation_contact(element))
                        error = true;
                });

                if(!error && !this.disabled) {
                    this.disabled = true;
                    helpers.addClass(this, 'lexprofit-widget-button-disabled');
                    _this.send(helpers.get_parents(this, 'form'));
                }
            });
        });

        var inputs_change = this.$widget_inner.querySelectorAll('input[type=text], input[type=email]');
        Array.prototype.forEach.call(inputs_change, function(input, i){
            input.addEventListener('change', function(e) {
                _this.validation_contact(this);
            });
        });

        var inputs_change_phones = this.$widget_inner.querySelectorAll('input[type=tel]');
        Array.prototype.forEach.call(inputs_change_phones, function(input, i){
            input.addEventListener('blur', function(e) {
                _this.validation_contact(this);
            });
        });

        this.$question.addEventListener('focus', function() {
            helpers.addClass(_this.$chat, 'lexprofit-widget-chat-textarea-focus');
            _this.scroll();
        });
        this.$question.addEventListener('blur', function() {
            helpers.removeClass(_this.$chat, 'lexprofit-widget-chat-textarea-focus');
            _this.scroll();
        });

        var links_to_chat = Array.prototype.slice.call(new Array(this.$call.querySelector('.lexprofit-widget-call-back-to-chat'))).concat(Array.prototype.slice.call(new Array(this.$header_chat)));
        Array.prototype.forEach.call(links_to_chat, function(link, i) {
            link.addEventListener('click', function () {
                _this.$call.style.display = 'none';
                _this.$chat.style.display = 'block';

                helpers.addClass(_this.$header_call, 'lexprofit-widget-header-show');
                helpers.removeClass(_this.$header_chat, 'lexprofit-widget-header-show');

                _this.scroll();
                _this.method = 'chat';

                helpers.removeClass(_this.$image, 'lexprofit-widget-header-robot-image-phone');
                _this.animation_call_disabled();

                _this.$header.querySelector('.lexprofit-widget-header-robot-name').textContent = _this.options.robot['name'];

                _this.$header.querySelector('.lexprofit-widget-header-robot-title .lexprofit-widget-header-robot-title-txt').textContent = _this.options.robot['title'];
                _this.$header.querySelector('.lexprofit-widget-header-robot-title .lexprofit-widget-header-robot-title-city').textContent = _this.options.city;
                _this.set_history_widget('event', 'chat');
            });
        });

        this.$el.querySelector('.lexprofit-widget-method-chat').addEventListener('click', function() {
            _this.set_history_widget('event', 'chat');

            _this.$el.querySelector('.lexprofit-widget-switch-method').style.display = 'none';
            _this.$chat_footer.style.display = 'block';

            if(_this.first_messages) {
                setTimeout(function() {
                    if(_this.modal_active) return false;
                    _this.robot_message(2, _this.dialog[2], true);
                }, 1500);
            }
            else {
                var interval_msg = setInterval(function() {
                    if(_this.first_messages) {
                        clearInterval(interval_msg);
                        setTimeout(function() {
                            if(_this.modal_active) return false;
                            _this.robot_message(2, _this.dialog[2], true);
                        }, 6500);
                    }
                }, 100);
            }

            if(_this.ymEventActions.indexOf('lexprofit-widget-btn-ask') == -1) {
                _this.ymEventActions.push('lexprofit-widget-btn-ask');
                _this.analytics('lexprofit-widget-btn-ask');
            }
        });


        var links_to_call = Array.prototype.slice.call(new Array(this.$el.querySelector('.lexprofit-widget-method-call'))).concat(Array.prototype.slice.call(new Array(this.$header_call)));
        Array.prototype.forEach.call(links_to_call, function(link, i) {
            link.addEventListener('click', function() {
                helpers.addClass(_this.$image, 'lexprofit-widget-header-robot-image-phone');
                _this.animation_call_disabled();

                _this.$header.querySelector('.lexprofit-widget-header-robot-name').textContent = 'Закажите звонок!';

                helpers.addClass(_this.$header.querySelector('.lexprofit-widget-header-robot-title'), 'lexprofit-widget-header-robot-title-call');

                _this.$header.querySelector('.lexprofit-widget-header-robot-title .lexprofit-widget-header-robot-title-txt').textContent = 'Мы перезвоним в удобное время.';

                _this.$header.querySelector('.lexprofit-widget-header-robot-title .lexprofit-widget-header-robot-title-city').textContent = '';

                _this.method = 'call';

                _this.$call.style.display = 'block';
                _this.$chat.style.display = 'none';

                helpers.removeClass(_this.$header_call, 'lexprofit-widget-header-show');
                helpers.addClass(_this.$header_chat, 'lexprofit-widget-header-show');

                _this.set_history_widget('event', 'call');

                if(_this.ymEventActions.indexOf('lexprofit-widget-btn-call') == -1) {
                    _this.ymEventActions.push('lexprofit-widget-btn-call');
                    _this.analytics('lexprofit-widget-btn-call');
                }
            });
        });

        this.$el.querySelector('.lexprofit-widget .lexprofit-widget-header').addEventListener('click', function() {
            if(helpers.hasClass(helpers.get_parents(this, '.lexprofit-widget'), 'lexprofit-widget-open'))
            {
                if(helpers.hasClass(this.querySelector('.lexprofit-widget-header-button-hide'), 'lexprofit-widget-header-button-open')) {
                    _this.hide();

                    if(!_this.success) {
                        _this.method_change();
                    }

                    setTimeout(function(){
                        helpers.addClass(_this.$el, 'lexprofit-widget-closed');
                    }, 500);

                } else {
                    _this.open();

                    helpers.removeClass(_this.$el, 'lexprofit-widget-closed');

                    if(helpers.hasClass(_this.LexprofitWidgetOffer.$offer, 'lexprofit-widget-offer-open')) {
                        helpers.removeClass(_this.LexprofitWidgetOffer.$offer, 'lexprofit-widget-offer-open');
                        _this.LexprofitWidgetOffer.set_history_widget('state', 'hidden');
                    }
                }
            }
            else {
                helpers.removeClass(_this.$el, 'lexprofit-widget-closed');
                _this.open();

                if(helpers.hasClass(_this.LexprofitWidgetOffer.$offer, 'lexprofit-widget-offer-open')) {
                    helpers.removeClass(_this.LexprofitWidgetOffer.$offer, 'lexprofit-widget-offer-open');
                    _this.LexprofitWidgetOffer.set_history_widget('state', 'hidden');
                }
            }
        });

        this.$header_call.addEventListener('click', function(){
            if (!this.opened) {
                _this.$loader.style.display = 'none';
                _this.first_open_call = true;
            }

            _this.open();

            helpers.removeClass(_this.$el, 'lexprofit-widget-closed');

            if(helpers.hasClass(_this.LexprofitWidgetOffer.$offer, 'lexprofit-widget-offer-open')) {
                helpers.removeClass(_this.LexprofitWidgetOffer.$offer, 'lexprofit-widget-offer-open');
                _this.LexprofitWidgetOffer.set_history_widget('state', 'hidden');
            }
        });

        this.$header_chat.addEventListener('click', function(){
            _this.open();

            helpers.removeClass(_this.$el, 'lexprofit-widget-closed');

            if(helpers.hasClass(_this.LexprofitWidgetOffer.$offer, 'lexprofit-widget-offer-open')) {
                helpers.removeClass(_this.LexprofitWidgetOffer.$offer, 'lexprofit-widget-offer-open');
                _this.LexprofitWidgetOffer.set_history_widget('state', 'hidden');
            }
        });

        this.$tooltip.querySelector('.lexprofit-widget-robot-message').addEventListener('click', function(){
            if(!helpers.hasClass(_this.$el, 'lexprofit-widget-open')) {
                helpers.removeClass(_this.$el, 'lexprofit-widget-closed');
                _this.open();

                if(helpers.hasClass(_this.LexprofitWidgetOffer.$offer, 'lexprofit-widget-offer-open')) {
                    helpers.removeClass(_this.LexprofitWidgetOffer.$offer, 'lexprofit-widget-offer-open');
                    _this.LexprofitWidgetOffer.set_history_widget('state', 'hidden');
                }
            }
        });

        this.$question.addEventListener('keyup', function(e) {
            if(e.keyCode == 13) {
                if(!_this.modal_active) {
                    _this.client_message();
                }
                else {
                    _this.modal_msg = false;
                    _this.client_message_modal();
                }
            }
        });

        helpers.get_parents(this.$question, '.lexprofit-widget-chat-textarea-box').querySelector('button').addEventListener('click', function(e) {
            if(!_this.modal_active) {
                _this.client_message();
            }
            else {
                _this.modal_msg = false;
                _this.client_message_modal();
            }
        });

        this.animation_call_start();

        if(!_this.is_history() && this.support_localstorage && localStorage.getItem('lexprofit_widget_delay') != null) {
            localStorage.removeItem('lexprofit_widget_delay');
        }

        if(!_this.is_history() && this.support_localstorage && localStorage.getItem('lexprofit_widget_was_opened') != null) {
            localStorage.removeItem('lexprofit_widget_was_opened');
        }

        if(this.options.show_offer && cookies.get('lexprofit_offer_hidden' + _this.pid) == null) {
            helpers.addClass(_this.$el, 'lexprofit-widget-show-offer');
        }

        this.count_delay_open = (this.support_localstorage && localStorage.getItem('lexprofit_widget_delay') != null ? localStorage.getItem('lexprofit_widget_delay') : 0);

        setTimeout(function() {

            if(_this.history.hide != null && typeof _this.history.hide != 'undefined')
                return true;

            if(_this.is_history() && ((_this.count_delay_open * 1000) >= _this.options.delay || !_this.support_localstorage) || (_this.support_localstorage && localStorage.getItem('lexprofit_widget_was_opened') != null)) {
                _this.show_history();
            }
            else {
                _this.set_history_widget('event', 'chat');

                if(_this.show_city) {
                    _this.start_typing_city();
                }
                _this.show();
            }

            _this.phoneMask           = (typeof _this.options.localization != 'undefined' && typeof _this.options.localization.phone_mask != 'undefined' ? _this.options.localization.phone_mask : '+7 (999) 999-99-99');
            _this.phonePlaceholder    = (typeof _this.options.localization != 'undefined' && typeof _this.options.localization.phone_placeholder != 'undefined' ? _this.options.localization.phone_placeholder : '+7 (___) ___-__-__');

            var inputsPhone = _this.$el.querySelectorAll('form input[name="phone"]');
            Array.prototype.forEach.call(inputsPhone, function(input, i){
                input.placeholder = _this.phoneMask;
                new InputMask(input, {
                    mask : _this.phoneMask,
                    placeholderChar : _this.phonePlaceholder
                });
            });

            var inputs_location = _this.$el.querySelectorAll('input[name="location"]');
            Array.prototype.forEach.call(inputs_location, function(input, i){
                new GoogleAutocomplete(input, {
                    country: (typeof _this.options.localization != 'undefined' && typeof _this.options.localization.country != 'undefined' && _this.options.localization.country == 'ua' ? 'ua' : 'ru'),
                    language: (typeof _this.options.data != 'undefined' && typeof _this.options.data.locale != 'undefined' && _this.options.data.locale== 'uk_UA' ? 'uk-UA' : 'ru-RU'),
                    prefix: 'lexprofit',
                    position: 'top'
                });
            });

        }, 1500);

        if(typeof this.options.data.widget.is_modal != 'undefined' && this.options.data.widget.is_modal == 1) {
            document.addEventListener('mouseout', function(e){
                if(!helpers.hasClass(_this.$el, 'lexprofit-widget-open') && !_this.success && !_this.opened_modal && _this.opened && (typeof _this.history['modal'] == 'undefined') && e.clientY <= 50) {
                    _this.modal_show();
                }
            });
        }

        this.$modal_window.querySelector('.lexprofit-widget-window-btn-no').addEventListener('click', function(){
            helpers.removeClass(_this.$modal_mask, 'lexprofit-widget-window-mask-show');
            _this.$modal_window.style.display = 'none';
            _this.set_history_widget('modal', 1);
        });

        this.$modal_window.querySelector('.lexprofit-widget-window-btn-yes').addEventListener('click', function() {
            clearInterval(_this.interval_client);
            helpers.removeClass(_this.$chat_footer.querySelector('.lexprofit-widget-chat-textarea-box'), 'lexprofit-widget-chat-textarea-disabled');

            _this.$question.value = '';
            _this.$question.disabled = false;

            helpers.get_parents(_this.$form, '.lexprofit-widget-robot-msg-form-wrap').style.display = '';
            _this.$msg_offer_call.style.display = '';

            _this.modal_active = true;
            _this.stop_client_message = false;

            _this.$animation_typing.style.display = 'none';
            helpers.removeClass(_this.$animation_typing, 'lexprofit-widget-start-animation');

            helpers.removeClass(_this.$modal_mask, 'lexprofit-widget-window-mask-show');
            _this.$modal_window.style.display = 'none';

            _this.open();

            if(helpers.hasClass(_this.LexprofitWidgetOffer.$offer, 'lexprofit-widget-offer-open')) {
                helpers.removeClass(_this.LexprofitWidgetOffer.$offer, 'lexprofit-widget-offer-open');
                _this.LexprofitWidgetOffer.set_history_widget('state', 'hidden');
            }

            helpers.removeClass(_this.$image, 'lexprofit-widget-header-robot-image-phone');
            _this.animation_call_disabled();

            _this.$header.querySelector('.lexprofit-widget-header-robot-name').textContent = _this.options.robot['name'];

            helpers.removeClass(_this.$header.querySelector('.lexprofit-widget-header-robot-title'), 'lexprofit-widget-header-robot-title-call');
            _this.$header.querySelector('.lexprofit-widget-header-robot-title .lexprofit-widget-header-robot-title-txt').textContent = _this.options.robot['title'];
            _this.$header.querySelector('.lexprofit-widget-header-robot-title .lexprofit-widget-header-robot-title-city').textContent = _this.options.city;

            _this.$call.style.display = 'none';
            _this.$chat.style.display = 'block';
            _this.method = 'chat';

            helpers.addClass(_this.$header_call, 'lexprofit-widget-header-show');
            helpers.removeClass(_this.$header_chat, 'lexprofit-widget-header-show');

            _this.set_history_widget('event', 'chat');
            _this.set_history_widget('modal', 1);

            _this.$widget.querySelector('.lexprofit-widget-switch-method').style.display = 'none';

            _this.$chat_footer.style.display = 'block';
            _this.$question.focus();

            var elementsRemove = Array.prototype.slice.call(_this.$messages.querySelectorAll('.lexprofit-widget-robot-msg-timestamp')).concat(Array.prototype.slice.call(_this.$messages.querySelectorAll('.lexprofit-widget-robot-msg'))).concat(Array.prototype.slice.call(_this.$messages.querySelectorAll('.lexprofit-widget-client-msg-timestamp'))).concat(Array.prototype.slice.call(_this.$messages.querySelectorAll('.lexprofit-widget-client-msg')));
            Array.prototype.forEach.call(elementsRemove, function(element, i){
                element.parentNode.removeChild(element);
            });

            _this.$messages.insertAdjacentHTML('beforeend', '<div class="lexprofit-widget-robot-msg-timestamp" data-timestamp="' + new Date() + '">только что</div><div class="lexprofit-widget-robot-msg">' + _this.dialog_modal[0]['message'] + '</div>');

            _this.scroll();

            _this.play_sound();
        });

        this.$btn_setting.addEventListener('click', function(){
            _this.modal_setting_show();
        });

        this.$modal_window_reason.querySelector('.lexprofit-widget-window-reason-hide-close').addEventListener('click', function(){
            helpers.removeClass(_this.$modal_mask, 'lexprofit-widget-window-mask-show');
            _this.$modal_window_reason.style.display = 'none';
        });

        Array.prototype.forEach.call(this.$modal_btn_reason, function(button, i){
            button.addEventListener('click', function(){
                Array.prototype.forEach.call(_this.$modal_btn_reason, function(btn, i){
                    helpers.removeClass(btn, 'lexprofit-widget-window-reason-hide-elem-active');
                });

                helpers.addClass(this, 'lexprofit-widget-window-reason-hide-elem-active');
                _this.$modal_window_reason.querySelector('.lexprofit-widget-window-reason-hide-btn').disabled = false;
            });
        });

        this.$modal_window_reason.querySelector('.lexprofit-widget-window-reason-hide-btn').addEventListener('click', function(){
            var btn_reason_active = null;
            Array.prototype.filter.call(_this.$modal_btn_reason, function (element) {
                if(helpers.hasClass(element, 'lexprofit-widget-window-reason-hide-elem-active'))
                    btn_reason_active = element;
            });

            if(!this.disabled && btn_reason_active != null)
            {
                var val_reason = btn_reason_active.getAttribute('data-value');

                helpers.removeClass(_this.$modal_mask, 'lexprofit-widget-window-mask-show');
                _this.$modal_window_reason.style.display = 'none';

                helpers.removeClass(_this.$hide, 'lexprofit-widget-header-button-open');
                helpers.addClass(_this.$hide, 'lexprofit-widget-header-button-close');

                helpers.removeClass(_this.$el, 'lexprofit-widget-open');

                _this.$el.style.display = 'none';

                if(typeof _this.options.debug == 'undefined' || (typeof _this.options.debug != 'undefined' && _this.options.debug != 1)) {
                    _this.history['hide']   = 1;
                    _this.history['modal']  = 1;

                    cookies.set('lexprofit_history' + _this.pid, JSON.stringify(_this.history), {expires: 1, path: '/'});

                    helpers.ajaxGET('//' + _this.options.host + '/widget/1.1/reason_hide.php',{
                        callback : 'f_' + Math.floor((Math.random() * 100000000) + 100000),
                        token : _this.options.data.token,
                        value   : val_reason
                    },function(res){});
                }
            }
        });

        if(typeof this.history != 'undefined' && this.history['event'] != 'undefined' && this.history['event'] == 'success') {
            helpers.removeClass(this.$el, 'lexprofit-widget-active');
        }

        this.$el_wrap.addEventListener('mouseover', function(e){
            clearTimeout(_this.clear_t);

            if(_this.success) return true;

            _this.widget_hover = true;

            if (_this.$tooltip !== e.target && !_this.$tooltip.contains(e.target))
                helpers.addClass(_this.$el, 'lexprofit-widget-hover');
        });

        this.$el_wrap.addEventListener('mouseout', function(e){
            if(_this.success) {
                clearTimeout(_this.clear_t);

                if(helpers.hasClass(_this.$el, 'lexprofit-widget-closed')) {
                    _this.clear_t = setTimeout(function () {
                        helpers.removeClass(_this.$el, 'lexprofit-widget-hover');
                    }, 500);
                }
                else {
                    helpers.removeClass(_this.$el, 'lexprofit-widget-hover');
                }
                return true;
            }

            _this.widget_hover = false;

            if (_this.$tooltip !== e.target && !_this.$tooltip.contains(e.target)) {
                if(helpers.hasClass(_this.$el, 'lexprofit-widget-closed')) {
                    _this.clear_t = setTimeout(function () {
                        helpers.removeClass(_this.$el, 'lexprofit-widget-hover');
                    }, 500);
                }
                else {
                    helpers.removeClass(_this.$el, 'lexprofit-widget-hover');
                }
            }
        });

        var headers = new Array(this.$header, this.$header_call, this.$header_chat);
        Array.prototype.forEach.call(headers, function(header, i){
            header.addEventListener('mouseenter', function (e) {
                var win = this.ownerDocument.defaultView,
                rect = this.getBoundingClientRect(),
                relX = e.pageX - (rect.left + win.pageXOffset),
                relY = e.pageY - (rect.top + win.pageYOffset);

                this.querySelector('.lexprofit-widget-header-layer').style.top = relY + 'px';
                this.querySelector('.lexprofit-widget-header-layer').style.left = relX + 'px';
            });
            
            header.addEventListener('mouseout', function (e) {
                var win = this.ownerDocument.defaultView,
                rect = this.getBoundingClientRect(),
                relX = e.pageX - (rect.left + win.pageXOffset),
                relY = e.pageY - (rect.top + win.pageYOffset);

                this.querySelector('.lexprofit-widget-header-layer').style.top = relY + 'px';
                this.querySelector('.lexprofit-widget-header-layer').style.left = relX + 'px';
            });
        });

        Array.prototype.forEach.call(this.$link_personal_data, function(link, i){
            link.addEventListener('click', function () {
                var viewportwidth = document.documentElement.clientWidth;
                var window_personal_data = window.open('', 'win', 'width=750,height=600,left=' + ((typeof _this.options.position != 'undefined' && _this.options.position == 'left' && viewportwidth > 750) ? (viewportwidth - 750) : '0') + 'px,top=0px,scrollbars=yes');

                if (window_personal_data !== null)
                    window_personal_data.document.write(_this.personal_data_content);
            });
        });

        this.LexprofitWidgetOfferInit();
    },

    is_localstorage: function() {
        var test = 'test';
        try {
            localStorage.setItem('test', test);
            localStorage.removeItem('test');
            return true;
        } catch(e) {
            return false;
        }
    },

    is_history: function() {
        if(this.debug) return false;

        return cookies.get('lexprofit_history' + this.pid) != null ? true : false;
    },

    get_expires: function(){
        var date = new Date();
        var minutes = 300;
        date.setTime(date.getTime() + (minutes * 60 * 1000));

        return date;
    },

    start_typing_city: function() {
        this.is_typing_city = true;
        var city            = this.options.city, j = 0, _this = this;

        var from_city       = this.$header.querySelector('.lexprofit-widget-header-robot-title .lexprofit-widget-header-robot-title-city');

        setTimeout(function() {

            var typedInterval = setInterval(function(){
                if(j < city.length) {
                    from_city.textContent = from_city.textContent + city[j];
                    j++;
                }
                else {
                    clearInterval(typedInterval);
                    _this.is_typing_city = false;
                }
            }, 150);

        }, 1000);
    },

    set_history_chat: function(id, obj) {
        if(this.debug || this.modal_active) return false;

        if(typeof obj['c'] != 'undefined') {
            if(this.is_localstorage()) {
                localStorage.setItem('lexprofit_msg', obj['c']);
                obj = {'c' : 1};
            }
            else {
                obj = {};
            }
        }

        this.history['chat'][(id * 2)] = obj;

        cookies.set('lexprofit_history' + this.pid, JSON.stringify(this.history), {expires: this.get_expires(), path: '/'});
    },

    set_history_widget: function(key, item) {
        if(this.debug) return false;

        this.history[key] = item;

        cookies.set('lexprofit_history' + this.pid, JSON.stringify(this.history), {expires: this.get_expires(), path: '/'});
    },

    show_history: function() {

        this.history['state'] == 'opened';

        if(!this.history['opened'] && (typeof this.LexprofitWidgetOffer.history.state == 'undefined' || this.LexprofitWidgetOffer.history.state != 'opened')) {
            helpers.addClass(this.$el, 'lexprofit-widget-show');
        }

        this.$el.style[this.options.position] = parseInt(this.options.margin) + 'px';
        this.$el.style.display = 'block';
        /* Возможно переделать надо для плавного появления!
        this.$el.css(this.options.position, parseInt(this.options.margin)).fadeIn(300);*/

        this.opened = true;

        this.$loader.style.display = 'none';

        if(this.history['event'] == 'call') {
            helpers.addClass(this.$image, 'lexprofit-widget-header-robot-image-phone');

            this.animation_call_disabled();

            this.$header.querySelector('.lexprofit-widget-header-robot-name').textContent = 'Закажите звонок!';

            helpers.addClass(this.$header.querySelector('.lexprofit-widget-header-robot-title'), 'lexprofit-widget-header-robot-title-call');

            this.$header.querySelector('.lexprofit-widget-header-robot-title .lexprofit-widget-header-robot-title-txt').textContent = 'Мы перезвоним в удобное время.';

            this.$header.querySelector('.lexprofit-widget-header-robot-title .lexprofit-widget-header-robot-title-city').textContent = '';

            this.method = 'call';

            this.$call.style.display = 'block';
            this.$chat.style.display = '';

            helpers.removeClass(this.$header_call, 'lexprofit-widget-header-show');
            helpers.addClass(this.$header_chat, 'lexprofit-widget-header-show');
        }

        if(this.history['event'] == 'chat') {
            helpers.removeClass(this.$image, 'lexprofit-widget-header-robot-image-phone');

            this.animation_call_disabled();

            this.$header.querySelector('.lexprofit-widget-header-robot-name').textContent = this.options.robot['name'];

            helpers.removeClass(this.$header.querySelector('.lexprofit-widget-header-robot-title'), 'lexprofit-widget-header-robot-title-call');

            this.$header.querySelector('.lexprofit-widget-header-robot-title .lexprofit-widget-header-robot-title-txt').textContent = this.options.robot['title'];

            this.$header.querySelector('.lexprofit-widget-header-robot-title .lexprofit-widget-header-robot-title-city').textContent = this.options.city;

            this.$chat.style.display = 'block';

            this.method = 'chat';

            helpers.addClass(this.$header_call, 'lexprofit-widget-header-show');
            helpers.removeClass(this.$header_chat, 'lexprofit-widget-header-show');
        }

        if(this.history['event'] == 'success') {
            this.$chat.style.display = '';
            this.$call.style.display = '';
            this.$success.style.display = 'block';
            this.success = true;
        }
        else {
            this.generation_msg();
        }

        if(this.history['opened']) {
            this.animation_notice_stop();

            helpers.removeClass(this.$hide, 'lexprofit-widget-header-button-close');
            helpers.addClass(this.$hide, 'lexprofit-widget-header-button-open');
            this.$hide.style.display = 'block';

            helpers.addClass(this.$el, 'lexprofit-widget-open');
            helpers.removeClass(this.$el, 'lexprofit-widget-closed');
        }
        else {
            helpers.removeClass(this.$hide, 'lexprofit-widget-header-button-open');
            helpers.addClass(this.$hide, 'lexprofit-widget-header-button-close');

            helpers.removeClass(this.$el, 'lexprofit-widget-open');
            helpers.addClass(this.$el, 'lexprofit-widget-closed');
        }
    },

    generation_msg: function() {
        var _this       = this;
        var length_msg  = Object.keys(this.history['chat']).length;
        this.opened     = true;

        Object.keys(this.history['chat']).map(function(objKey, index) {
            var item = _this.history['chat'][objKey]

            if(typeof item['r'] != 'undefined') {
                _this.$messages.insertAdjacentHTML('beforeend', '<div class="lexprofit-widget-robot-msg-timestamp" data-timestamp="' + new Date() + '">только что</div><div class="lexprofit-widget-robot-msg">' + _this.dialog[item['r']]['message'] + '</div>');
            }

            if (typeof item['c'] != 'undefined') {
                _this.$messages.insertAdjacentHTML('beforeend', '<div class="lexprofit-widget-client-msg-timestamp" data-timestamp="' + new Date() + '">только что</div><div class="lexprofit-widget-client-msg"><div class="lexprofit-widget-client-msg-text">' + localStorage.getItem('lexprofit_msg') + '</div></div>');
                _this.message = localStorage.getItem('lexprofit_msg');
            }

            if (item == 'f') {
                _this.$form.querySelector('input[name=question]').value = _this.message;
                helpers.get_parents(_this.$form, '.lexprofit-widget-robot-msg-form-wrap').style.display = 'block';

                var timestamps = helpers.get_parents(_this.$form, '.lexprofit-widget-robot-msg-form-wrap').querySelectorAll('.lexprofit-widget-robot-msg-timestamp');
                Array.prototype.forEach.call(timestamps, function(timestamp, i) {
                    timestamp.setAttribute('data-timestamp', new Date());
                });
            }

            if (item == 'oc' && typeof _this.options.telephone.length == 'undefined') {
                _this.$msg_offer_call.style.display = 'block';

                var msg_timestamp = _this.$msg_offer_call.querySelectorAll('.lexprofit-widget-robot-msg-timestamp');
                Array.prototype.forEach.call(msg_timestamp, function(timestamp, i) {
                    timestamp.setAttribute('data-timestamp', new Date());
                });

                _this.$msg_offer_call.querySelector('.lexprofit-widget-robot-msg').innerHTML = _this.dialog_offer_call['message'];
            }
        });

        if(length_msg == 0) {
            _this.dialog[0]['delay'] = 1;
            _this.robot_message(0, _this.dialog[0], false);
        }

        if(length_msg <= 1) {
            if(!_this.first_messages) {
                setTimeout(function() {
                    if(_this.modal_active) return false;

                    _this.robot_message(1, _this.dialog[1], false);
                    _this.first_messages = true;

                    setTimeout(function() {
                        _this.set_history_widget('event', 'chat');
                        _this.$chat_footer.style.display = 'block';
                        _this.stop_client_message = false;
                    }, 5000);
                }, 3000);
            }
        }
        else {
            _this.first_messages = true;
        }

        if(length_msg <= 2) {
            _this.$chat_footer.style.display = 'block';
        }

        if(length_msg == 2) {
            _this.stop_client_message = false;
        }

        if(length_msg >= 3) {
            _this.$chat_footer.style.display = '';

            helpers.removeClass(_this.$chat, 'lexprofit-widget-chat-textarea-show');
            helpers.addClass(_this.$chat, 'lexprofit-widget-chat-hide_footer');
        }

        if(length_msg == 3) {
            setTimeout(function() {
                if(_this.modal_active) return false;
                _this.robot_message(3, _this.dialog[3]);
            }, 2000);
            setTimeout(function() {
                if(_this.modal_active) return false;
                _this.robot_message(4, _this.dialog[4]);
            }, 8000);
            setTimeout(function() {
                if(_this.modal_active) return false;
                _this.form();
            }, 13500);
            setTimeout(function() {
                if(_this.modal_active) return false;
                _this.offer_call();
            }, 19500);
        }

        if(length_msg == 4) {
            setTimeout(function() {
                if(_this.modal_active) return false;
                _this.robot_message(4, _this.dialog[4]);
            }, 2000);
            setTimeout(function() {
                if(_this.modal_active) return false;
                _this.form();
            }, 8000);
            setTimeout(function() {
                if(_this.modal_active) return false;
                _this.offer_call();
            }, 13500);
        }

        if(length_msg == 5) {
            setTimeout(function() {
                if(_this.modal_active) return false;
                _this.form();
            }, 2000);
            setTimeout(function() {
                if(_this.modal_active) return false;
                _this.offer_call();
            }, 8000);
        }

        if(length_msg == 6) {
            setTimeout(function() {
                if(_this.modal_active) return false;
                _this.offer_call();
            }, 2000);
        }

        this.scroll();
    },

    show: function() {
        var _this = this;

        helpers.addClass(this.$el, 'lexprofit-widget-show');
        this.$el.style.display = 'block';
        this.$el.style[this.options.position] = parseInt(this.options.margin) + 'px';

        this.interval_open_widget = setInterval(function() {

            if ((_this.count_delay_open * 1000) >= _this.options.delay) {
                clearInterval(_this.interval_open_widget);

                if ( !_this.opened) {
                    helpers.addClass(_this.$loader, 'lexprofit-widget-start-animation');

                    _this.opened = true;
                    _this.open();
                    _this.robot_message(0, _this.dialog[0], false);

                    setTimeout(function() {
                        _this.$loader.style.display = 'none';
                        _this.chat_show();
                    }, 2000);
                }
            }
            else {
                if(_this.support_localstorage) {
                    _this.count_delay_open++;
                    localStorage.setItem('lexprofit_widget_delay', _this.count_delay_open);
                }
                else
                    _this.count_delay_open++;
            }

        }, 1000);

    },

    open: function() {
        var _this = this;

        this.hide_tooltip();

        if (!this.opened) {
            if(this.support_localstorage && localStorage.getItem('lexprofit_widget_was_opened') == null) {
                localStorage.setItem('lexprofit_widget_was_opened', 1);
            }

            helpers.addClass(this.$loader, 'lexprofit-widget-start-animation');

            this.opened = true;

            if(_this.first_open_call) {
                _this.dialog[0].delay = 4000;
            }

            _this.robot_message(0, _this.dialog[0], false);

            setTimeout(function() {
                _this.$loader.style.display = 'none';

                if(!_this.first_open_call) {
                    _this.chat_show();
                }
                else {
                    _this.chat_start();
                }
            }, (_this.first_open_call ? 4000 : 2000));
        }

        this.animation_notice_stop();

        helpers.removeClass(this.$hide, 'lexprofit-widget-header-button-close');
        helpers.addClass(this.$hide, 'lexprofit-widget-header-button-open');
        this.$hide.style.display = 'block';

        helpers.addClass(this.$el, 'lexprofit-widget-open');

        helpers.removeClass(this.$el, 'lexprofit-widget-closed');
        helpers.removeClass(this.$el, 'open-lexprofit-offer');

        this.scroll();

        this.set_history_widget('opened', true);

        clearInterval(this.interval_method_change);
    },

    method_change: function() {
        var _this = this;

        if( ! this.success) {
            this.interval_method_change = setInterval(function() {
                if(!_this.widget_hover) {
                    if (_this.method == 'call')
                        _this.chat_show();

                    else if (_this.method == 'chat')
                        _this.call_show();
                }
            }, this.method == 'chat' ? 15000 : 25000);
        }
    },

    chat_start : function () {
        var _this = this;

        this.$chat_footer.style.display = 'block';

        if(!this.first_messages) {
            setTimeout(function() {
                if (!_this.modal_active) {
                    _this.robot_message(1, _this.dialog[1], true);
                    _this.first_messages = true;

                    setTimeout(function() {
                        _this.set_history_widget('event', 'chat');
                    }, 5000);
                }
            }, 3000);
        }
    },

    chat_show: function() {

        var _this = this;

        helpers.removeClass(this.$image, 'lexprofit-widget-header-robot-image-phone');
        this.animation_call_disabled();

        this.$header.querySelector('.lexprofit-widget-header-robot-name').textContent = this.options.robot['name'];

        helpers.removeClass(this.$header.querySelector('.lexprofit-widget-header-robot-title'), 'lexprofit-widget-header-robot-title-call');

        this.$header.querySelector('.lexprofit-widget-header-robot-title .lexprofit-widget-header-robot-title-txt').textContent = this.options.robot['title'];
        if(!this.is_typing_city) {
            this.$header.querySelector('.lexprofit-widget-header-robot-title .lexprofit-widget-header-robot-title-city').textContent = this.options.city;
        }

        this.$call.style.display = 'none';
        this.$chat.style.display = 'block';
        this.method = 'chat';

        helpers.addClass(this.$header_call, 'lexprofit-widget-header-show');
        helpers.removeClass(this.$header_chat, 'lexprofit-widget-header-show');

        var length_msg  = Object.keys(this.history['chat']).length;

        if(length_msg <= 2) {
            this.$chat_footer.style.display = 'block';
        }

        if(!this.first_messages) {
            setTimeout(function() {
                if (!_this.modal_active) {
                    _this.robot_message(1, _this.dialog[1], true);
                    _this.first_messages = true;

                    setTimeout(function() {
                        _this.set_history_widget('event', 'chat');
                    }, 5000);
                }
            }, 3000);
        }
    },

    call_show: function() {
        helpers.addClass(this.$image, 'lexprofit-widget-header-robot-image-phone');

        this.animation_call_disabled();

        this.$header.querySelector('.lexprofit-widget-header-robot-name').textContent = 'Закажите звонок!';

        helpers.addClass(this.$header.querySelector('.lexprofit-widget-header-robot-title'), 'lexprofit-widget-header-robot-title-call');

        this.$header.querySelector('.lexprofit-widget-header-robot-title .lexprofit-widget-header-robot-title-txt').textContent = 'Мы перезвоним в удобное время.';
        this.$header.querySelector('.lexprofit-widget-header-robot-title .lexprofit-widget-header-robot-title-city').textContent = '';

        this.$call.style.display = 'block';
        this.$chat.style.display = 'none';
        this.method = 'call';

        helpers.removeClass(this.$header_call, 'lexprofit-widget-header-show');
        helpers.addClass(this.$header_chat, 'lexprofit-widget-header-show');

        this.animation_notice_start();
    },

    hide: function() {
        var _this = this;

        helpers.removeClass(this.$hide, 'lexprofit-widget-header-button-open');
        helpers.addClass(this.$hide, 'lexprofit-widget-header-button-close');

        helpers.removeClass(this.$el, 'lexprofit-widget-open');
        helpers.removeClass(this.$el, 'lexprofit-widget-hover');

        setTimeout(function() {
            helpers.addClass(_this.$el, 'lexprofit-widget-closed');
        }, 500);

        this.set_history_widget('opened', false);

        setTimeout(function() { _this.show_tooltip(); }, 200);
    },

    robot_message: function(n, data, stop) {
        var _this = this;

        if(this.modal_active && !this.init_msg_modal) return false;

        this.$animation_typing.style.display = 'block';
        helpers.addClass(this.$animation_typing, 'lexprofit-widget-start-animation');

        this.scroll();

        setTimeout(function() {
            if(_this.modal_active && !_this.init_msg_modal) return false;

            _this.notice_count++;

            _this.$animation_typing.style.display = 'none';
            helpers.removeClass(_this.$animation_typing, 'lexprofit-widget-start-animation');

            _this.$messages.insertAdjacentHTML('beforeend', '<div class="lexprofit-widget-robot-msg-timestamp" data-timestamp="' + new Date() + '">только что</div><div class="lexprofit-widget-robot-msg">' + data.message + '</div>');

            _this.set_history_chat(n, {'r' : n});

            _this.scroll();

            _this.play_sound();

            _this.stop_client_message = (stop) ? false : true;
        }, data.delay);
    },

    play_sound: function() {
        if (this.is_sound && window.HTMLAudioElement && typeof this.$sound.canPlayType != 'undefined') {
            this.$sound.play();
        }
    },

    show_tooltip: function() {
        var _this = this;

        if (this.method == 'chat' && !this.success) {
            this.count_tooltip = 0;

            helpers.addClass(this.$tooltip, 'lexprofit-widget-robot-message-wrap-show');

            this.interval_tooltip = setInterval(function() {
                _this.count_tooltip++;
                if (_this.count_tooltip == 8) {
                    clearInterval(_this.interval_tooltip);
                    helpers.removeClass(_this.$tooltip, 'lexprofit-widget-robot-message-wrap-show');
                }
            }, 1000);
        }
    },

    hide_tooltip: function() {
        clearInterval(this.interval_tooltip);
        helpers.removeClass(this.$tooltip, 'lexprofit-widget-robot-message-wrap-show');
    },

    client_message: function() {
        var _this = this;

        if(this.$question.value.replace(/\r\n|\r|\n/, '').trim() != '') {

            if(!this.stop_client_message) {
                this.message = String(this.$question.value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

                this.$el.querySelector('.lexprofit-widget-chat-msg-wrap').insertAdjacentHTML('beforeend', '<div class="lexprofit-widget-client-msg-timestamp" data-timestamp="' + new Date() + '">только что</div><div class="lexprofit-widget-client-msg"><div class="lexprofit-widget-client-msg-text">' + this.message + '</div></div>');

                this.set_history_chat(2.5, {'c' : this.message});

                this.$question.value = ''
                this.$question.blur();

                this.$chat_footer.style.display = 'none';

                helpers.removeClass(this.$chat, 'lexprofit-widget-chat-textarea-show');
                helpers.addClass(this.$chat, 'lexprofit-widget-chat-hide_footer');

                this.scroll();

                setTimeout(function() { _this.robot_message(3, _this.dialog[3]); }, 3000);
                setTimeout(function() { _this.robot_message(4, _this.dialog[4]); }, 9000);
                setTimeout(function() { _this.form(); }, 14500);
                setTimeout(function() { _this.offer_call(); }, 20000);
            }
            else {
                helpers.addClass(this.$chat_footer.querySelector('.lexprofit-widget-chat-textarea-box'), 'lexprofit-widget-chat-textarea-disabled');
                this.$question.disabled = true;

                helpers.removeClass(this.$chat, 'lexprofit-widget-chat-textarea-focus');

                this.scroll();

                this.interval_client = setInterval(function() {

                    if(!_this.stop_client_message) {
                        clearInterval(_this.interval_client);

                        helpers.addClass(_this.$chat_footer.querySelector('.lexprofit-widget-chat-textarea-box'), 'lexprofit-widget-chat-textarea-disabled');

                        _this.stop_client_message = false;

                        _this.message = String(_this.$question.value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

                        _this.$el.querySelector('.lexprofit-widget-chat-msg-wrap').insertAdjacentHTML('beforeend', '<div class="lexprofit-widget-client-msg-timestamp" data-timestamp="' + new Date() + '">только что</div><div class="lexprofit-widget-client-msg"><div class="lexprofit-widget-client-msg-text">' + _this.message + '</div></div>');

                        _this.set_history_chat( 2.5, {'c' : _this.message});

                        _this.$question.value = '';
                        _this.$question.blur();

                        _this.$chat_footer.style.display = 'none';

                        helpers.removeClass(_this.$chat, 'lexprofit-widget-chat-textarea-show');
                        helpers.addClass(_this.$chat, 'lexprofit-widget-chat-hide_footer');

                        _this.scroll();

                        setTimeout(function() {
                            if(_this.modal_active) return false;
                            _this.robot_message(3, _this.dialog[3]);
                        }, 3000);
                        setTimeout(function() {
                            if(_this.modal_active) return false;
                            _this.robot_message(4, _this.dialog[4]);
                        }, 9000);
                        setTimeout(function() {
                            if(_this.modal_active) return false;
                            _this.form();
                        }, 17000);
                        setTimeout(function() {
                            if(_this.modal_active) return false;
                            _this.offer_call();
                        }, 25000);
                    }

                }, 400);
            }
        }
        else {
            this.$question.value = '';

            helpers.addClass(this.$el.querySelector('.lexprofit-widget-chat-footer > .lexprofit-widget-chat-textarea-box'), 'lexprofit-widget-chat-textarea-moving');

            setTimeout(function() {
                helpers.removeClass(_this.$el.querySelector('.lexprofit-widget-chat-footer > .lexprofit-widget-chat-textarea-box'), 'lexprofit-widget-chat-textarea-moving');
            }, 400);

            helpers.addClass(this.$el.querySelector('.lexprofit-widget-chat-footer .lexprofit-widget-chat-textarea-wrap'), 'lexprofit-widget-chat-textarea-wrap-error');
        }
    },

    client_message_modal: function() {
        _this = this;

        this.init_msg_modal = true;

        if(this.$question.value.replace(/\r\n|\r|\n/, '').trim() != '') {

            this.message = String(this.$question.value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

            this.$el.querySelector('.lexprofit-widget-chat-msg-wrap').insertAdjacentHTML('beforeend', '<div class="lexprofit-widget-client-msg-timestamp" data-timestamp="' + new Date() + '">только что</div><div class="lexprofit-widget-client-msg"><div class="lexprofit-widget-client-msg-text">' + this.message + '</div></div>');

            this.set_history_chat(2.5, {'c' : this.message});

            this.$question.value = '';
            this.$question.blur();

            this.$chat_footer.style.display = 'none';

            helpers.removeClass(this.$chat, 'lexprofit-widget-chat-textarea-show');
            helpers.addClass(this.$chat, 'lexprofit-widget-chat-hide_footer');

            this.scroll();

            setTimeout(function() { _this.robot_message(3, _this.dialog[3]); }, 2000);
            setTimeout(function() { _this.robot_message(4, _this.dialog[4]); }, 8000);
            setTimeout(function() { _this.form(); }, 13500);
            setTimeout(function() { _this.offer_call(); }, 19000);
        }
        else {
            this.$question.value = '';

            helpers.addClass(this.$el.querySelector('.lexprofit-widget-chat-footer > .lexprofit-widget-chat-textarea-box'), 'lexprofit-widget-chat-textarea-moving');

            setTimeout(function() {
                helpers.removeClass(_this.$el.querySelector('.lexprofit-widget-chat-footer > .lexprofit-widget-chat-textarea-box'), 'lexprofit-widget-chat-textarea-moving');
            }, 400);

            helpers.addClass(this.$el.querySelector('.lexprofit-widget-chat-footer .lexprofit-widget-chat-textarea-wrap'), 'lexprofit-widget-chat-textarea-wrap-error');
        }
    },

    form: function() {
        var _this = this;

        setTimeout(function() {
            helpers.get_parents(_this.$form, '.lexprofit-widget-robot-msg-form-wrap').style.display = 'block';

            var robot_timestamp = helpers.get_parents(_this.$form, '.lexprofit-widget-robot-msg-form-wrap').querySelectorAll('.lexprofit-widget-robot-msg-timestamp');
            Array.prototype.forEach.call(robot_timestamp, function(timestamp, i){
                timestamp.setAttribute('data-timestamp', new Date());
            });

            _this.$form.querySelector('input[name=question]').value = _this.message;
            _this.$question.blur();
            _this.scroll();
            _this.set_history_chat(5, 'f');
        }, 1000);
    },

    offer_call: function() {
        var _this = this;

        if((this.modal_active && !this.init_msg_modal) || (typeof this.options.telephone.length != 'undefined' && this.options.telephone.length == 0)) return false;

        var interval_call_delay = setInterval(function() {
            if(_this.offer_call_delay == 20) {
                _this.$animation_typing.style.display = 'block';
                helpers.addClass(_this.$animation_typing, 'lexprofit-widget-start-animation');

                _this.scroll();

                clearInterval(interval_call_delay);

                setTimeout(function() {
                    if((_this.modal_active && !_this.init_msg_modal) || _this.success == true) return false;

                    _this.$animation_typing.style.display = 'none';
                    helpers.removeClass(_this.$animation_typing, 'lexprofit-widget-start-animation');

                    _this.$msg_offer_call.style.display = 'block';

                    var robot_timestamp = _this.$msg_offer_call.querySelectorAll('.lexprofit-widget-robot-msg-timestamp');
                    Array.prototype.forEach.call(robot_timestamp, function(timestamp, i){
                        timestamp.setAttribute('data-timestamp', new Date());
                    });

                    _this.$msg_offer_call.querySelector('.lexprofit-widget-robot-msg').innerHTML = _this.dialog_offer_call['message'];
                    _this.set_history_chat(6, 'oc');
                    _this.scroll();
                    _this.play_sound();
                    _this.offer_call_delay = 0;

                }, _this.dialog_offer_call['delay']);
            }

            _this.offer_call_delay++;

        }, 1000);
    },

    send: function(form) {
        var _this = this;
        this.analytics('lexprofit-contact-send');
        this.analytics((this.method == 'call' ? 'lexprofit-contact-send-call' : 'lexprofit-contact-send-ask'));

        helpers.ajaxPOST(form.getAttribute('action'), helpers.serialize(form), function(res){

            _this.$chat.style.display = 'none';
            _this.$call.style.display = 'none';

            _this.$success.style.display = 'block';
            _this.success = true;

            helpers.removeClass(_this.$el, 'lexprofit-widget-active');

            _this.set_history_widget('event', 'success');
        }, 'json');
    },

    scroll: function() {
        var scroll = new TinyScrollbar(this.$el.querySelector('div.lexprofit-widget-chat-scroll-wrap'));
        scroll.update('bottom');
    },

    animation_call_start : function() {
        var _this = this;

        helpers.addClass(this.$animation_phone, 'lexprofit-animation-phone-start');

        this.call_timeout.wave_1 = setTimeout(function() { helpers.addClass(_this.$animation_phone.querySelector('.lexprofit-animation-phone-wave-1'), 'lexprofit-animation-phone-wave-show'); }, 1000);
        this.call_timeout.wave_2 = setTimeout(function() { helpers.addClass(_this.$animation_phone.querySelector('.lexprofit-animation-phone-wave-2'), 'lexprofit-animation-phone-wave-show'); }, 1100);
        this.call_timeout.wave_3 = setTimeout(function() { helpers.addClass(_this.$animation_phone.querySelector('.lexprofit-animation-phone-wave-3'), 'lexprofit-animation-phone-wave-show'); }, 1200);

        this.call_timeout.phone = setTimeout(function(){
            _this.animation_call_stop();
        }, 4000);
    },

    animation_call_stop : function() {
        var _this = this;

        helpers.removeClass(this.$animation_phone, 'lexprofit-animation-phone-start');

        var waves = this.$animation_phone.querySelectorAll('.lexprofit-animation-phone-wave-1, .lexprofit-animation-phone-wave-2, .lexprofit-animation-phone-wave-3');
        Array.prototype.forEach.call(waves, function(wave, i){
            helpers.removeClass(wave, 'lexprofit-animation-phone-wave-show');
        });

        this.call_timeout.stop = setTimeout(function(){
            _this.animation_call_start();
        }, 50);
    },

    animation_call_disabled: function() {
        var _this = this;

        this.animation_call_stop();

        clearTimeout(this.call_timeout.wave_1);
        clearTimeout(this.call_timeout.wave_2);
        clearTimeout(this.call_timeout.wave_3);
        clearTimeout(this.call_timeout.phone);
        clearTimeout(this.call_timeout.stop);

        if(!this.call_disabled) {
            this.call_disabled = true;
            setTimeout(function(){
                _this.call_disabled = false;
                _this.animation_call_start();
            }, 700);
        }
    },

    animation_notice_start: function() {
        var _this = this;

        if(_this.notice_count > 0) {
            helpers.addClass(_this.$animation_notice, 'lexprofit-widget-header-notice-show');
            _this.$animation_notice.querySelector('.lexprofit-widget-header-notice-quantity').textContent = _this.notice_count;

            _this.$hide.style.display = 'none';
        }
    },

    modal_show:function() {
        this.opened_modal = true;
        helpers.addClass(this.$modal_mask, 'lexprofit-widget-window-mask-show');
        this.$modal_window.style.display = 'block';
    },

    modal_setting_show:function() {
        helpers.addClass(this.$modal_mask, 'lexprofit-widget-window-mask-show');
        this.$modal_window_reason.style.display = 'block';
    },

    animation_notice_stop: function() {
        clearInterval(this.animation_notice_interval);
        helpers.removeClass(this.$animation_notice, 'lexprofit-widget-header-notice-show');
    },

    validation_contact: function(input) {
        var error = true;

        if(input.value == '') {
            helpers.addClass(input, 'lexprofit-widget-valid-error');
            error = false;
        }
        else {
            helpers.removeClass(input, 'lexprofit-widget-valid-error');
        }

        if(input.getAttribute('name') == 'email' && input.value != '' && ! input.value.match(/^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i)) {
            helpers.addClass(input, 'lexprofit-widget-valid-error');
            error = false;
        }
        else if (input.getAttribute('name') == 'email' && input.value.match(/^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i)) {
            helpers.removeClass(input, 'lexprofit-widget-valid-error');
        }

        if(input.getAttribute('name') == 'phone' && input.value.replace(/\D/g, '').length != 11 && input.value.replace(/\D/g, '').substring(0, 1) == '7') {
            helpers.addClass(input, 'lexprofit-widget-valid-error');
            error = false;
        }
        else if (input.getAttribute('name') == 'phone' && input.value.replace(/\D/g, '').length == 11 && input.value.replace(/\D/g, '').substring(0, 1) == '7') {
            if(input.value.replace(/\D/g, '').substring(0, 3) != '789') {
                helpers.removeClass(input, 'lexprofit-widget-valid-error');
            }
            else {
                helpers.addClass(input, 'lexprofit-widget-valid-error');
                error = false;
            }
        }

        if(input.getAttribute('name') == 'phone' && input.value.replace(/\D/g, '').length != 12 && input.value.replace(/\D/g, '').substring(0, 2) == '38') {
            helpers.addClass(input, 'lexprofit-widget-valid-error');
            error = false;
        }
        else if (input.getAttribute('name') == 'phone' && input.value.replace(/\D/g, '').length == 12 && input.value.replace(/\D/g, '').substring(0, 2) == '38') {
            helpers.removeClass(input, 'lexprofit-widget-valid-error');
        }

        return error;
    },

    analytics: function(goal) {
        var _this = this;

        if(_this.goals[goal] == true)
            return;

        _this.goals[goal] = true;

        if (typeof ga != 'undefined') {
            ga('send', 'event', {
                eventCategory: 'lexprofit-widget-' + _this.options.data.token,
                eventAction:  goal,
                hitCallback: function() {
                    ga(function(tracker) {
                        tracker.set('eventAction', goal);
                    });
                }
            });
        } else { console.log("ga not found"); }

        if(_this.ym != null && (typeof _this.ym._clickmap != 'undefined') && window['yaCounter' + _this.ym._clickmap.counterId] != null)
            window['yaCounter' + _this.ym._clickmap.counterId].reachGoal(goal, function(){ console.log('ym send [' + goal + ']'); });

        if(typeof window['yaCounter40882064'] != 'undefined')
            window['yaCounter40882064'].reachGoal(goal, function(){ console.log('ym send [' + goal + ']'); });
    },

    add_zero_timestamp: function(n) {
        if (n < 10) {n = "0" + n;}
        return n;
    },

    message_timestamp: function() {
        var _this = this;

        setInterval(function() {
            var interval;
            var timestamps = _this.$el.querySelectorAll('[data-timestamp]');
            Array.prototype.forEach.call(timestamps, function(timestamp, i) {
                if(timestamp.getAttribute('data-timestamp') != '')
                {
                    var timestamp = new Date(timestamp.getAttribute('data-timestamp'));
                    var date = new Date();

                    if (interval = Math.round((date.getTime() - timestamp.getTime()) / 60000 )) {
                        if (interval < 5 && interval > 1) {
                            timestamp.innerHTML = interval + '&nbsp;минуты назад';
                        } else if (interval == 1) {
                            timestamp.innerHTML = interval + '&nbsp;минуту назад';
                        } else {
                            timestamp.innerHTML = _this.add_zero_timestamp(timestamp.getHours())+':'+ _this.add_zero_timestamp(timestamp.getMinutes());
                        }
                    } else {
                        if (Math.round((timestamp.getTime() - date.getTime())/30000)) {
                            timestamp.textContent = '30 секунд назад';
                        }
                    }
                }
            });

        }, 10000);
    },

    /*Offer*/
    LexprofitWidgetOfferInit : function() {

        this.LexprofitWidgetOffer = {
            history: {},
            init : function(thisParent){

                this.$parent            = thisParent;
                this.$offer             = this.$parent.$el.querySelector('.lexprofit-widget-offer');
                this.$header            = this.$offer.querySelector('.lexprofit-widget-offer-header');
                this.$body              = this.$offer.querySelector('.lexprofit-widget-offer-body');
                this.$header_title      = this.$offer.querySelector('.lexprofit-widget-offer-header-title');
                this.$btn_hide          = this.$offer.querySelector('.lexprofit-widget-offer-header-hide');

                this.$choice            = this.$offer.querySelector('.lexprofit-widget-offer-choice');
                this.$form              = this.$offer.querySelector('.lexprofit-widget-offer-form');
                this.$success           = this.$offer.querySelector('.lexprofit-widget-offer-success');
                this.$btn_close         = this.$offer.querySelector('.lexprofit-widget-offer-close');
                this.$vacancy           = this.$offer.querySelectorAll('.lexprofit-widget-offer-choice-element');
                this.$btn_back          = this.$offer.querySelector('.lexprofit-widget-offer-form-back');
                this.$btn_success_ok    = this.$offer.querySelector('.lexprofit-widget-offer-success-ok-btn');
                this.$question_input    = this.$offer.querySelector('input[name="question"]');

                this.initOffer();
            },
            initOffer: function(){
                var _this = this;

                if(this.is_history()) {
                    this.history = JSON.parse(cookies.get('lexprofit_offer_history' + this.$parent.pid));
                }

                var elementsClick = new Array(this.$header, this.$btn_success_ok);
                Array.prototype.forEach.call(elementsClick, function(element, i){
                    element.addEventListener('click', function (e) {
                        if(_this.$btn_close !== e.target && !_this.$btn_close.contains(e.target)) {
                            if(helpers.hasClass(_this.$offer, 'lexprofit-widget-offer-open')) {
                                helpers.removeClass(_this.$offer, 'lexprofit-widget-offer-open');
                                _this.set_history_widget('state', 'hidden');
                                helpers.removeClass(_this.$parent.$el, 'open-lexprofit-offer');
                            }
                            else {
                                helpers.addClass(_this.$offer, 'lexprofit-widget-offer-open');
                                _this.set_history_widget('state', 'opened');

                                helpers.removeClass(_this.$parent.$el, 'open-lexprofit-widget');
                                helpers.addClass(_this.$parent.$el, 'open-lexprofit-offer');
                            }
                        }
                    });
                });

                Array.prototype.forEach.call(this.$vacancy, function(vacancy, i){
                    vacancy.addEventListener('click', function () {
                        Array.prototype.forEach.call(_this.$vacancy, function(element, i){
                            helpers.removeClass(element, 'lexprofit-widget-offer-choice-element-checked');
                            element.querySelector('input[name="vacancy"]').checked = false;
                        });

                        helpers.addClass(this, 'lexprofit-widget-offer-choice-element-checked');
                        this.querySelector('input[name="vacancy"]').checked = true;

                        _this.$question_input.value = 'Выбрана вакансия: &nbsp;' + this.querySelector('.lexprofit-widget-offer-choice-title').textContent + '  &nbsp;' + this.querySelector('.lexprofit-widget-offer-choice-price').textContent;

                        helpers.removeClass(_this.$choice, 'lexprofit-widget-offer-box-show');
                        helpers.addClass(_this.$form, 'lexprofit-widget-offer-box-show');

                        _this.set_history_widget('step', 'form');
                        _this.set_history_widget('vacancy', this.getAttribute('data-choice'));

                        _this.$header_title.textContent = 'Ваши контакты';
                    });
                });

                this.$btn_back.addEventListener('click', function(){
                    helpers.removeClass(_this.$form, 'lexprofit-widget-offer-box-show');
                    helpers.addClass(_this.$choice, 'lexprofit-widget-offer-box-show');

                    _this.set_history_widget('step', 'choice');
                    _this.$header_title.textContent = 'Выберите вакансию';
                });

                this.$offer.querySelector('form button').addEventListener('click', function(e) {
                    e.preventDefault();

                    var error = false;

                    var inputs = helpers.get_parents(this, 'form').querySelectorAll('input[type=text], input[type=tel], input[type=email], input[type=checkbox]');
                    Array.prototype.forEach.call(inputs, function(input, i){
                        if(!_this.validation_contact(input))
                            error = true;
                    });

                    if(!error && this.disabled == false) {
                        this.disabled = true;
                        helpers.addClass(this, 'lexprofit-widget-button-disabled');
                        _this.send(helpers.get_parents(this, 'form'));
                    }
                });

                var offerInputs = this.$offer.querySelectorAll('input[type=text], input[type=email], input[type=radio]');
                Array.prototype.forEach.call(offerInputs, function(input, i){
                    input.addEventListener('change', function(e) {
                        _this.validation_contact(this);
                    });
                });

                this.$offer.querySelector('input[type=tel]').addEventListener('blur', function (e) {
                    _this.validation_contact(this);
                });

                this.$btn_close.addEventListener('click', function(){
                    helpers.removeClass(_this.$parent.$el, 'lexprofit-widget-show-offer');
                    cookies.set('lexprofit_offer_hidden' + _this.$parent.pid, '1', { expires: 1, path: '/' });
                });

                if(_this.is_history()) {
                    this.show_history();
                }
            },

            validation_contact: function(input) {
                var error = true;

                if(input.value == '') {
                    helpers.addClass(input, 'lexprofit-widget-valid-error');
                    error = false;
                }
                else {
                    helpers.removeClass(input, 'lexprofit-widget-valid-error');
                }

                if(input.getAttribute('name') == 'email' && input.value != '' && ! input.value.match(/^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i)) {
                    helpers.addClass(input, 'lexprofit-widget-valid-error');
                    error = false;
                }
                else if (input.getAttribute('name') == 'email' && input.value.match(/^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i)) {
                    helpers.removeClass(input, 'lexprofit-widget-valid-error');
                }

                if(input.getAttribute('name') == 'phone' && input.value.replace(/\D/g, '').length != 11 && input.value.replace(/\D/g, '').substring(0, 1) == '7') {
                    helpers.addClass(input, 'lexprofit-widget-valid-error');
                    error = false;
                }
                else if (input.getAttribute('name') == 'phone' && input.value.replace(/\D/g, '').length == 11 && input.value.replace(/\D/g, '').substring(0, 1) == '7') {
                    if(input.value.replace(/\D/g, '').substring(0, 3) != '789') {
                        helpers.removeClass(input, 'lexprofit-widget-valid-error');
                    }
                    else {
                        helpers.addClass(input, 'lexprofit-widget-valid-error');
                        error = false;
                    }
                }

                if(input.getAttribute('name') == 'phone' && input.value.replace(/\D/g, '').length != 12 && input.value.replace(/\D/g, '').substring(0, 2) == '38') {
                    helpers.addClass(input, 'lexprofit-widget-valid-error');
                    error = false;
                }
                else if (input.getAttribute('name') == 'phone' && input.value.replace(/\D/g, '').length == 12 && input.value.replace(/\D/g, '').substring(0, 2) == '38') {
                    helpers.removeClass(input, 'lexprofit-widget-valid-error');
                }

                return error;
            },

            send: function(form) {
                var _this = this;
                this.$parent.analytics('lexprofit-offer-contact-send');

                helpers.ajaxPOST(form.getAttribute('action'), helpers.serialize(form), function(res){
                    helpers.removeClass(_this.$form, 'lexprofit-widget-offer-box-show');
                    helpers.addClass(_this.$success, 'lexprofit-widget-offer-box-show');
                    _this.set_history_widget('step', 'success');
                    _this.$header_title.textContent = 'ГОТОВО!';
                }, 'json');
            },

            is_history: function() {
                if(this.$parent.debug) return false;

                return (cookies.get('lexprofit_offer_history' + this.$parent.pid) != null) ? true : false;
            },

            set_history_widget: function(key, item) {
                if(this.$parent.debug) return false;

                this.history[key] = item;
                cookies.set('lexprofit_offer_history' + this.$parent.pid, JSON.stringify(this.history), { expires: this.get_expires(), path: '/' });
            },

            get_expires: function() {
                var date = new Date();
                var minutes = 300;
                date.setTime(date.getTime() + (minutes * 60 * 1000));

                return date;
            },

            show_history: function() {
                var _this = this;

                if(this.history['state'] == 'opened') {
                    helpers.addClass(this.$parent.$el, 'open-lexprofit-offer');
                    helpers.addClass(this.$offer, 'lexprofit-widget-offer-open');
                }
                else {
                    helpers.removeClass(this.$offer, 'lexprofit-widget-offer-open');
                }

                if(this.history['step'] == 'form') {
                    helpers.removeClass(this.$choice, 'lexprofit-widget-offer-box-show');
                    helpers.removeClass(this.$success, 'lexprofit-widget-offer-box-show');

                    helpers.addClass(this.$form, 'lexprofit-widget-offer-box-show');
                    this.$header_title.textContent = 'Ваши контакты';
                }

                if(this.history['step'] == 'choice') {
                    helpers.removeClass(this.$form, 'lexprofit-widget-offer-box-show');
                    helpers.removeClass(this.$success, 'lexprofit-widget-offer-box-show');

                    helpers.addClass(this.$choice, 'lexprofit-widget-offer-box-show');
                    this.$header_title.textContent = 'Выберите вакансию';
                }

                if(this.history['step'] == 'success') {
                    helpers.removeClass(this.$form, 'lexprofit-widget-offer-box-show');
                    helpers.removeClass(this.$choice, 'lexprofit-widget-offer-box-show');

                    helpers.addClass(this.$success, 'lexprofit-widget-offer-box-show');
                    this.$header_title.textContent = 'ГОТОВО!';
                }

                if(typeof this.history['vacancy'] != 'undefined') {
                    Array.prototype.forEach.call(this.$vacancy, function(vacancy, i){
                        if(vacancy.getAttribute('data-choice') == _this.history['vacancy']) {

                            helpers.addClass(vacancy, 'lexprofit-widget-offer-choice-element-checked');
                            vacancy.querySelector('input[name="vacancy"]').checked = true;

                            _this.$question_input.value = 'Выбрана вакансия: &nbsp;' + vacancy.querySelector('.lexprofit-widget-offer-choice-title').textContent + '  &nbsp;' + vacancy.querySelector('.lexprofit-widget-offer-choice-price').textContent;
                        }
                        else {
                            helpers.removeClass(vacancy, 'lexprofit-widget-offer-choice-element-checked');
                            vacancy.querySelector('input[name="vacancy"]').checked = false;
                        }
                    });
                }
            }
        };
        this.LexprofitWidgetOffer.init(this);
    }

};

var cssString   = '.lexprofit-widget .lexprofit-widget-wrap{background:' + WidgetLexprofitData.data.widget.colors[0] + ' !important}.lexprofit-widget .lexprofit-widget-header-robot-image-face .lexprofit-widget-header-robot-image-face-circle,.lexprofit-widget .lexprofit-widget-header-hover-robot-image-face .lexprofit-widget-header-hover-robot-image-face-circle{background:' + WidgetLexprofitData.data.widget.colors[0] + ' !important}.lexprofit-widget .lexprofit-widget-header-robot-image-face .lexprofit-widget-header-robot-image-face-circle-2,.lexprofit-widget .lexprofit-widget-header-hover-robot-image-face .lexprofit-widget-header-hover-robot-image-face-circle-2{border:solid 3px ' + WidgetLexprofitData.data.widget.colors[1] + ' !important}.lexprofit-animation-phone,.lexprofit-animation-hover-phone{color:' + WidgetLexprofitData.data.widget.colors[1] + ' !important}.lexprofit-animation-phone-icon,.lexprofit-animation-hover-phone-icon{color:' + WidgetLexprofitData.data.widget.colors[1] + ' !important}.lexprofit-animation-phone i,.lexprofit-animation-hover-phone i{color:' + WidgetLexprofitData.data.widget.colors[1] + ' !important}.lexprofit-animation-phone-icon i:before,.lexprofit-animation-hover-phone-icon i:before{color:' + WidgetLexprofitData.data.widget.colors[1] + ' !important}.lexprofit-animation-phone-wave-1 i,.lexprofit-animation-phone-wave-2 i,.lexprofit-animation-phone-wave-3 i,.lexprofit-animation-hover-phone-wave-1 i,.lexprofit-animation-hover-phone-wave-2 i,.lexprofit-animation-hover-phone-wave-3 i{color:' + WidgetLexprofitData.data.widget.colors[1] + ' !important}.lexprofit-animation-phone.lexprofit-animation-phone-start .lexprofit-animation-phone-icon{color:' + WidgetLexprofitData.data.widget.colors[1] + ' !important}.lexprofit-widget-header-notice-quantity{background:' + WidgetLexprofitData.data.widget.colors[1] + ' !important}.lexprofit-widget-chat-form-button-send{background:' + WidgetLexprofitData.data.widget.colors[1] + ' !important}button.lexprofit-widget-chat-textarea-button{background:' + WidgetLexprofitData.data.widget.colors[0] + ' !important}button.lexprofit-widget-chat-textarea-button:hover{background:' + WidgetLexprofitData.data.widget.colors[1] + ' !important}.lexprofit-widget-robot-type_connect-next{background:' + WidgetLexprofitData.data.widget.colors[1] + ' !important}form.lexprofit-widget-chat-form input:focus,form.lexprofit-widget-order-call-inner input:focus{border:1px solid ' + WidgetLexprofitData.data.widget.colors[1] + ' !important}.lexprofit-widget-order-call-inner button,.lexprofit-widget-chat-form button{background:' + WidgetLexprofitData.data.widget.colors[1] + ' !important}.lexprofit-widget-offer-form button{background:' + WidgetLexprofitData.data.widget.colors[1] + '}.lexprofit-widget-chat-textarea-focus .lexprofit-widget-chat-textarea-wrap,.lexprofit-widget-chat-textarea-disabled .lexprofit-widget-chat-textarea-wrap{border:solid 2px ' + WidgetLexprofitData.data.widget.colors[1] + ' !important}.lexprofit-widget-chat-textarea-loader-icon{border-left-color:' + WidgetLexprofitData.data.widget.colors[1] + ';border-bottom-color:' + WidgetLexprofitData.data.widget.colors[1] + ';border-top-color:' + WidgetLexprofitData.data.widget.colors[1] + '}.lexprofit-widget .lexprofit-google-autocomplete-container{border:1px solid ' + WidgetLexprofitData.data.widget.colors[1] + ' !important}.lexprofit-widget-switch-method a:hover{background:' + WidgetLexprofitData.data.widget.colors[1] + ' !important}.lexprofit-widget-success-circle{background:' + WidgetLexprofitData.data.widget.colors[1] + ' !important}.lexprofit-widget-robot-message-wrap .lexprofit-widget-robot-message{background:' + WidgetLexprofitData.data.widget.colors[1] + ' !important}.lexprofit-widget-robot-message .lexprofit-widget-robot-message-triangle{border-top:10px solid ' + WidgetLexprofitData.data.widget.colors[1] + ' !important}.lexprofit-widget-window-btn-yes{background:' + WidgetLexprofitData.data.widget.colors[0] + ' !important}.lexprofit-widget-window-btn-no:hover{border:solid 2px ' + WidgetLexprofitData.data.widget.colors[0] + ' !important;color:' + WidgetLexprofitData.data.widget.colors[0] + ' !important}.lexprofit-widget-window-reason-hide-elem:hover,.lexprofit-widget-window-reason-hide-elem.lexprofit-widget-window-reason-hide-elem-active{border:solid 1px ' + WidgetLexprofitData.data.widget.colors[0] + ' !important}#lexprofit-widget-window-reason-hide .lexprofit-widget-window-reason-hide-btn{background:' + WidgetLexprofitData.data.widget.colors[0] + ' !important}.lexprofit-widget-window-reason-hide-close-inner:hover i{background:' + WidgetLexprofitData.data.widget.colors[0] + ' !important}.lexprofit-widget-window-reason-hide-icon i:before{color:' + WidgetLexprofitData.data.widget.colors[0] + ' !important}.lexprofit-widget .lexprofit-widget-footer{background:' + WidgetLexprofitData.data.widget.colors[0] + ' !important}';
var htmlString  = '<link href="//' + WidgetLexprofitData.host + '/widget/1.1/css/' + device.get_type() + '.css?' + WidgetLexprofitData.data.upd_tm + '" rel="stylesheet" type="text/css"><style type="text/css" id="stylesheet-widget-' + WidgetLexprofitData.data.token + '">' + cssString + '</style><div style="display: none;" id="lexprofit-widget-' + WidgetLexprofitData.data.token + '" class="lexprofit-widget lexprofit-widget-active"><div class="lexprofit-widget-offer" id="lexprofit-widget-offer-' + WidgetLexprofitData.data.token + '"><div class="lexprofit-widget-offer-header"><div class="lexprofit-widget-offer-header-icon"><i class="flaticon-lexprofit-offer-job"><i class="path-lexprofit1"></i><i class="path-lexprofit2"></i><i class="path-lexprofit3"></i><i class="path-lexprofit4"></i><i class="path-lexprofit5"></i><i class="path-lexprofit6"></i><i class="path-lexprofit7"></i><i class="path-lexprofit8"></i><i class="path-lexprofit9"></i><i class="path-lexprofit10"></i><i class="path-lexprofit11"></i><i class="path-lexprofit12"></i><i class="path-lexprofit13"></i><i class="path-lexprofit14"></i><i class="path-lexprofit15"></i></i></div><div class="lexprofit-widget-offer-header-title">Предлагаем вакансии!</div><div class="lexprofit-widget-offer-header-count">4</div><div class="lexprofit-widget-offer-header-hide"><i class="flaticon-lexprofit-widget-arrows-9"></i></div></div><div class="lexprofit-widget-offer-body"><div class="lexprofit-widget-offer-body-wrap"><div class="lexprofit-widget-offer-body-inner"><form action="' + WidgetLexprofitData.action + '" method="post"><input type="hidden" name="url" value="' + document.URL + '"> <input type="hidden" name="wm_id" value="' + WidgetLexprofitData.data.wm_id + '"> <input type="hidden" name="domain" value="' + document.domain + '"> <input type="hidden" name="referrer" value="' + document.referrer + '"> <input type="hidden" name="template" value=""> <input type="hidden" name="token" value="' + WidgetLexprofitData.data.token + '"> <input type="hidden" name="device" value="' + device.get_type() + '"> <input type="hidden" name="ip" value="' + WidgetLexprofitData.ip + '"> <input type="hidden" name="offer" value="2"> <input type="hidden" name="question" value=""><div class="lexprofit-widget-offer-choice lexprofit-widget-offer-box-show"><div class="lexprofit-widget-offer-choice-list"><div class="lexprofit-widget-offer-choice-element" data-choice="1"><div class="lexprofit-widget-offer-choice-image"><i class="flaticon-lexprofit-offer-jurist"><i class="path-lexprofit1"></i><i class="path-lexprofit2"></i><i class="path-lexprofit3"></i><i class="path-lexprofit4"></i><i class="path-lexprofit5"></i><i class="path-lexprofit6"></i><i class="path-lexprofit7"></i><i class="path-lexprofit8"></i><i class="path-lexprofit9"></i><i class="path-lexprofit10"></i><i class="path-lexprofit11"></i><i class="path-lexprofit12"></i><i class="path-lexprofit13"></i><i class="path-lexprofit14"></i><i class="path-lexprofit15"></i><i class="path-lexprofit16"></i><i class="path-lexprofit17"></i></i></div><div class="lexprofit-widget-offer-choice-group"><div class="lexprofit-widget-offer-choice-title">Юрист</div><div class="lexprofit-widget-offer-choice-price">от 30 000 руб.</div></div><input type="radio" name="vacancy" value="1"></div><div class="lexprofit-widget-offer-choice-element" data-choice="2"><div class="lexprofit-widget-offer-choice-image"><i class="flaticon-lexprofit-offer-advokat"><i class="path-lexprofit1"></i><i class="path-lexprofit2"></i><i class="path-lexprofit3"></i><i class="path-lexprofit4"></i><i class="path-lexprofit5"></i><i class="path-lexprofit6"></i><i class="path-lexprofit7"></i><i class="path-lexprofit8"></i><i class="path-lexprofit9"></i><i class="path-lexprofit10"></i><i class="path-lexprofit11"></i><i class="path-lexprofit12"></i><i class="path-lexprofit13"></i><i class="path-lexprofit14"></i><i class="path-lexprofit15"></i><i class="path-lexprofit16"></i><i class="path-lexprofit17"></i><i class="path-lexprofit18"></i><i class="path-lexprofit19"></i><i class="path-lexprofit20"></i><i class="path-lexprofit21"></i><i class="path-lexprofit22"></i><i class="path-lexprofit23"></i><i class="path-lexprofit24"></i><i class="path-lexprofit25"></i><i class="path-lexprofit26"></i><i class="path-lexprofit27"></i></i></div><div class="lexprofit-widget-offer-choice-group"><div class="lexprofit-widget-offer-choice-title">Адвокат</div><div class="lexprofit-widget-offer-choice-price">от 40 000 руб.</div></div><input type="radio" name="vacancy" value="2"></div><div class="lexprofit-widget-offer-choice-element" data-choice="3"><div class="lexprofit-widget-offer-choice-image"><i class="flaticon-lexprofit-offer-helper"><i class="path-lexprofit1"></i><i class="path-lexprofit2"></i><i class="path-lexprofit3"></i><i class="path-lexprofit4"></i><i class="path-lexprofit5"></i><i class="path-lexprofit6"></i><i class="path-lexprofit7"></i><i class="path-lexprofit8"></i><i class="path-lexprofit9"></i><i class="path-lexprofit10"></i><i class="path-lexprofit11"></i><i class="path-lexprofit12"></i><i class="path-lexprofit13"></i><i class="path-lexprofit14"></i><i class="path-lexprofit15"></i><i class="path-lexprofit16"></i><i class="path-lexprofit17"></i><i class="path-lexprofit18"></i><i class="path-lexprofit19"></i><i class="path-lexprofit20"></i><i class="path-lexprofit21"></i><i class="path-lexprofit22"></i><i class="path-lexprofit23"></i></i></div><div class="lexprofit-widget-offer-choice-group"><div class="lexprofit-widget-offer-choice-title">Помощник юриста</div><div class="lexprofit-widget-offer-choice-price">от 22 000 руб.</div></div><input type="radio" name="vacancy" value="3"></div><div class="lexprofit-widget-offer-choice-element" data-choice="4"><div class="lexprofit-widget-offer-choice-image"><i class="flaticon-lexprofit-offer-operator"><i class="path-lexprofit1"></i><i class="path-lexprofit2"></i><i class="path-lexprofit3"></i><i class="path-lexprofit4"></i><i class="path-lexprofit5"></i><i class="path-lexprofit6"></i><i class="path-lexprofit7"></i><i class="path-lexprofit8"></i><i class="path-lexprofit9"></i><i class="path-lexprofit10"></i><i class="path-lexprofit11"></i><i class="path-lexprofit12"></i><i class="path-lexprofit13"></i><i class="path-lexprofit14"></i><i class="path-lexprofit15"></i><i class="path-lexprofit16"></i></i></div><div class="lexprofit-widget-offer-choice-group"><div class="lexprofit-widget-offer-choice-title">Оператор <br> в колл-центр</div><div class="lexprofit-widget-offer-choice-price">от 20 000 руб.</div></div><input type="radio" name="vacancy" value="4"></div></div></div><div class="lexprofit-widget-offer-form"><div class="lexprofit-widget-offer-form-title">Оставьте ваши контактные данные, <br> мы вам перезвоним</div><div class="lexprofit-widget-offer-form-input"><i class="flaticon-lexprofit-widget-telephone"></i> <input type="tel" name="phone" placeholder="Телефон"></div><div class="lexprofit-widget-offer-form-input"><i class="flaticon-lexprofit-widget-picture"></i> <input type="text" name="name" placeholder="Ваше имя"></div><div class="lexprofit-widget-offer-form-input lexprofit-widget-order-call-input-search"><i class="flaticon-lexprofit-widget-pin-2"></i> <input type="text" name="location" autocomplete="off" id="lexprofit-widget-autocomplete-region-2" class="lexprofit-google-autocomplete-search lexprofit-google-autocomplete-top" placeholder="Ваш город"></div><button type="button"><span>Жду звонка</span></button><div class="lexprofit-widget-offer-form-back-wrap"><div class="lexprofit-widget-offer-form-back">Назад</div></div></div><div class="lexprofit-widget-offer-success"><div class="lexprofit-widget-offer-success-circle"><i class="flaticon-lexprofit-widget-circle_success"></i></div><div class="lexprofit-widget-offer-success-text">Спасибо, что обратились к нам. <br> В ближайшее время мы <br> свяжемся с вами.</div><div class="lexprofit-widget-offer-success-ok"><div class="lexprofit-widget-offer-success-ok-btn">OK</div></div></div></form></div></div></div><div class="lexprofit-widget-offer-close"><i class="flaticon-lexprofit-widget-close"></i></div></div><div class="lexprofit-widget-wrap"><div class="lexprofit-widget-robot-message-wrap" style="display: block;"><div class="lexprofit-widget-robot-message">Если возникнут вопросы или нужна будет помощь, обращайтесь, я вам помогу.<div class="lexprofit-widget-robot-message-triangle"></div></div></div><div class="lexprofit-widget-inner"><div class="lexprofit-widget-header-hover-wrap"><div class="lexprofit-widget-header-call lexprofit-widget-header-show"><div class="lexprofit-widget-header-hover-robot-image"><div class="lexprofit-widget-header-hover-telephone"><div class="lexprofit-animation-hover-phone"><div class="lexprofit-animation-hover-phone-icon"><i class="flaticon-lexprofit-widget-phone-icon"></i></div><div class="lexprofit-animation-hover-phone-wave-1"><i class="flaticon-lexprofit-widget-wave-icon"></i></div><div class="lexprofit-animation-hover-phone-wave-2"><i class="flaticon-lexprofit-widget-wave-icon"></i></div><div class="lexprofit-animation-hover-phone-wave-3"><i class="flaticon-lexprofit-widget-wave-icon"></i></div></div></div></div><div class="lexprofit-widget-header-hover-robot"><div class="lexprofit-widget-header-hover-robot-name">Заказать звонок!</div><div class="lexprofit-widget-header-hover-robot-title">Мы перезвоним в удобное время</div></div><div class="lexprofit-widget-header-layer"></div></div><div class="lexprofit-widget-header-chat"><div class="lexprofit-widget-header-hover-robot-image"><div class="lexprofit-widget-header-hover-robot-image-face"><div class="lexprofit-widget-header-hover-robot-avatar-wrap"><img class="lexprofit-widget-header-hover-robot-avatar"></div><div class="lexprofit-widget-header-hover-robot-image-face-circle"><div class="lexprofit-widget-header-hover-robot-image-face-circle-2"></div></div></div></div><div class="lexprofit-widget-header-hover-robot"><div class="lexprofit-widget-header-hover-robot-name"></div><div class="lexprofit-widget-header-hover-robot-title"></div></div><div class="lexprofit-widget-header-layer"></div></div></div><div class="lexprofit-widget-header"><div class="lexprofit-widget-header-robot-image"><div class="lexprofit-widget-header-telephone"><div class="lexprofit-animation-phone"><div class="lexprofit-animation-phone-icon"><i class="flaticon-lexprofit-widget-phone-icon"></i></div><div class="lexprofit-animation-phone-wave-1"><i class="flaticon-lexprofit-widget-wave-icon"></i></div><div class="lexprofit-animation-phone-wave-2"><i class="flaticon-lexprofit-widget-wave-icon"></i></div><div class="lexprofit-animation-phone-wave-3"><i class="flaticon-lexprofit-widget-wave-icon"></i></div></div></div><div class="lexprofit-widget-header-robot-image-face"><div class="lexprofit-widget-header-robot-avatar-wrap"><div class="lexprofit-widget-header-robot-blick"></div><img class="lexprofit-widget-header-robot-avatar"></div><div class="lexprofit-widget-header-robot-image-face-circle"><div class="lexprofit-widget-header-robot-image-face-circle-2"></div></div></div></div><div class="lexprofit-widget-header-robot"><div class="lexprofit-widget-header-robot-name">Заказать звонок!</div><div class="lexprofit-widget-header-robot-title"><div class="lexprofit-widget-header-robot-title-txt">Мы перезвоним в удобное время</div>&nbsp;<div class="lexprofit-widget-header-robot-title-city"></div></div></div><div class="lexprofit-widget-header-notice"><div class="lexprofit-widget-header-notice-icon"><i class="flaticon-lexprofit-widget-interface-1"></i></div><div class="lexprofit-widget-header-notice-quantity">1</div></div><div class="lexprofit-widget-header-button-hide lexprofit-widget-header-button-close"><i class="flaticon-lexprofit-widget-arrows-9"></i></div><div class="lexprofit-widget-header-layer-wrap"><div class="lexprofit-widget-header-layer"></div></div></div><div class="lexprofit-widget-body"><div class="lexprofit-widget-body-wrap"><div class="lexprofit-widget-body-inner"><div class="lexprofit-widget-loader"><div class="lexprofit-widget-loader_inner"><div class="lexprofit-widget-loader-circle"><div class="lexprofit-widget-loader-icon-pencil"><div class="lexprofit-widget-loader-pencil"><i class="flaticon-lexprofit-widget-pencil"></i></div><div class="lexprofit-widget-loader-line"></div></div></div><div class="lexprofit-widget-loader-title">Подождите вам пишут сообщение</div></div></div><div class="lexprofit-widget-chat lexprofit-widget-chat-textarea-show"><div class="lexprofit-widget-chat-scroll-wrap"><div class="lexprofit-project-scroll disable"><div class="lexprofit-project-scroll-track"><div class="lexprofit-project-scroll-thumb"><div class="lexprofit-widget-chat-scroll-end"></div></div></div></div><div class="lexprofit-project-scroll-viewport"><div class="lexprofit-project-scroll-overview"><div class="lexprofit-widget-chat-msg-wrap"></div><div class="lexprofit-widget-robot-msg-form-wrap"><div class="lexprofit-widget-robot-msg-timestamp" data-timestamp="">только что</div><div class="lexprofit-widget-robot-msg lexprofit-widget-robot-msg-form"><form action="' + WidgetLexprofitData.action + '" method="post" class="lexprofit-widget-chat-form"><input type="hidden" name="url" value="' + document.URL + '"> <input type="hidden" name="wm_id" value="' + WidgetLexprofitData.data.wm_id + '"> <input type="hidden" name="domain" value="' + document.domain + '"> <input type="hidden" name="referrer" value="' + document.referrer + '"> <input type="hidden" name="template" value=""> <input type="hidden" name="question" value=""> <input type="hidden" name="token" value="' + WidgetLexprofitData.data.token + '"> <input type="hidden" name="device" value="' + device.get_type() + '"> <input type="hidden" name="ip" value="' + WidgetLexprofitData.ip + '"> <input type="hidden" name="offer" value="' + (typeof WidgetLexprofitData.data.type_payment != 'undefined' ? WidgetLexprofitData.data.type_payment : '0') + '"><div class="lexprofit-widget-order-call-title">Оставьте ваши контактные данные <br> я отвечу на все ваши вопросы.</div><div class="lexprofit-widget-order-call-input"><i class="flaticon-lexprofit-widget-telephone"></i> <input type="tel" name="phone" placeholder="Телефон"></div>' + (typeof WidgetLexprofitData.data.show_name != 'undefined' && WidgetLexprofitData.data.show_name ? '<div class="lexprofit-widget-order-call-input"><i class="flaticon-lexprofit-widget-picture"></i> <input type="text" name="name" placeholder="Ваше имя"></div>' : '') + '<div class="lexprofit-widget-order-call-input lexprofit-widget-order-call-input-search"><i class="flaticon-lexprofit-widget-pin-2"></i> <input type="text" name="location" autocomplete="off" class="lexprofit-google-autocomplete-search lexprofit-google-autocomplete-top" id="lexprofit-widget-autocomplete-region" placeholder="Ваш город"></div><div class="lexprofit-widget-order-call-input lexprofit-widget-order-call-input-personal-data">Нажимая на кнопку, вы даете согласие на <a href="javascript:void(0);" class="lexprofit-widget-link-personal-data">обработку своих персональных данных</a></div><button type="button"><span>Жду звонка</span></button></form></div></div><div class="lexprofit-widget-robot-msg-offer-call-wrap"><div class="lexprofit-widget-robot-msg-timestamp" data-timestamp="">только что</div><div class="lexprofit-widget-robot-msg"></div></div><div style="display: none;" class="lexprofit-widget-robot-msg lexprofit-widget-robot-success"><div class="lexprofit-widget-success-circle"><i class="flaticon-lexprofit-widget-circle_success"></i></div>Спасибо, что обратились к нам. В ближайшее время мы свяжемся с вами.</div><div style="display: none;" class="lexprofit-widget-chat-robot-typing"><div class="lexprofit-widget-chat-robot-typing-icon"><div class="lexprofit-widget-chat-robot-typing-pencil"><i class="flaticon-lexprofit-widget-pencil"></i></div><div class="lexprofit-widget-chat-robot-typing-line"></div></div>Подождите, вам пишут сообщение...</div></div></div></div><div class="lexprofit-widget-chat-footer"><div class="lexprofit-widget-chat-textarea-box"><button type="button" class="lexprofit-widget-chat-textarea-button"><i class="flaticon-lexprofit-widget-arrows-9"></i></button><div class="lexprofit-widget-chat-textarea-loader"><div class="lexprofit-widget-chat-textarea-loader-icon"></div></div><div class="lexprofit-widget-chat-textarea-wrap"><textarea name="message" class="lexprofit-widget-chat-textarea" placeholder="Введите сообщение и нажмите стрелочку"></textarea></div></div></div><div class="lexprofit-widget-switch-method"><a href="javascript:void(0);" class="lexprofit-widget-method-call"><i class="flaticon-lexprofit-widget-telephone"></i> <span>Позвонить мне</span></a> <a href="javascript:void(0);" class="lexprofit-widget-method-chat"><i class="flaticon-lexprofit-widget-interface"></i> <span>Задать вопрос</span></a></div></div><div class="lexprofit-widget-order-call"><form class="lexprofit-widget-order-call-inner" action="' + WidgetLexprofitData.action + '" method="post"><input type="hidden" name="url" value="' + document.URL + '"> <input type="hidden" name="wm_id" value="' + WidgetLexprofitData.data.wm_id + '"> <input type="hidden" name="domain" value="' + document.domain + '"> <input type="hidden" name="referrer" value="' + document.referrer + '"> <input type="hidden" name="template" value=""> <input type="hidden" name="token" value="' + WidgetLexprofitData.data.token + '"> <input type="hidden" name="device" value="' + device.get_type() + '"> <input type="hidden" name="ip" value="' + WidgetLexprofitData.ip + '"> <input type="hidden" name="offer" value="' + (typeof WidgetLexprofitData.data.type_payment != 'undefined' ? WidgetLexprofitData.data.type_payment : '0') + '"><div class="lexprofit-widget-order-call-title">Оставьте ваши контактные данные <br> я отвечу на все ваши вопросы.</div><div class="lexprofit-widget-order-call-input"><i class="flaticon-lexprofit-widget-telephone"></i> <input type="tel" name="phone" placeholder="Телефон"></div>' + (typeof WidgetLexprofitData.data.show_name != 'undefined' && WidgetLexprofitData.data.show_name ? '<div class="lexprofit-widget-order-call-input"><i class="flaticon-lexprofit-widget-picture"></i> <input type="text" name="name" placeholder="Ваше имя"></div>' : '') + '<div class="lexprofit-widget-order-call-input lexprofit-widget-order-call-input-search"><i class="flaticon-lexprofit-widget-pin-2"></i> <input type="text" name="location" autocomplete="off" id="lexprofit-widget-autocomplete-region-2" class="lexprofit-google-autocomplete-search lexprofit-google-autocomplete-top" placeholder="Ваш город"></div><div class="lexprofit-widget-order-call-input lexprofit-widget-order-call-input-personal-data">Нажимая на кнопку, вы даете согласие на <a href="javascript:void(0);" class="lexprofit-widget-link-personal-data">обработку своих персональных данных</a></div><button type="button"><span>Жду звонка</span></button><div class="lexprofit-widget-call-back-to-chat-wrap"><div class="lexprofit-widget-call-back-to-chat"><div class="flaticon-lexprofit-widget-msg"><i class="flaticon-lexprofit-widget-interface"></i></div><span>Вернуться к чату</span></div></div></form></div><div class="lexprofit-widget-success"><div class="lexprofit-widget-success-inner"><div class="lexprofit-widget-success-circle"><i class="flaticon-lexprofit-widget-circle_success"></i></div><div class="lexprofit-widget-success-text">Спасибо, что обратились к нам. В ближайшее время мы свяжемся с вами.</div></div></div></div><div class="lexprofit-widget-footer"><span id="lexprofit-widget-setting-wrap"><i class="flaticon-lexprofit-widget-cogwheel"></i></span></div></div></div><audio id="lexprofit-widget-sound" src="//' + WidgetLexprofitData.host + '/widget/1.1/sounds/sound2.mp3"></audio></div></div></div><div id="lexprofit-widget-boxes"><div id="lexprofit-widget-window" style="display: none;"><div class="lexprofit-widget-window-content"><div class="lexprofit-widget-window-image"><img src="" class="lexprofit-widget-window-robot-avatar"></div><div class="lexprofit-widget-window-title">Не нашли нужную вам информацию?</div><div class="lexprofit-widget-window-description">Спросить у юриста быстрее, чем искать. Хотите бесплатно проконсультироваться?</div><div class="lexprofit-widget-window-btns"><div class="lexprofit-widget-window-btn-wrap"><button type="button" class="lexprofit-widget-window-btn lexprofit-widget-window-btn-yes">ДА</button></div><div class="lexprofit-widget-window-btn-wrap"><button type="button" class="lexprofit-widget-window-btn lexprofit-widget-window-btn-no">НЕТ</button></div></div></div></div></div><div id="lexprofit-widget-boxes-reason-hide"><div id="lexprofit-widget-window-reason-hide" style="display: none;"><div class="lexprofit-widget-window-reason-hide-content"><div class="lexprofit-widget-window-reason-hide-title">Выберите причину, по которой вы хотите скрыть консультанта на этом сайте</div><div class="lexprofit-widget-window-reason-hide-list"><div class="lexprofit-widget-window-reason-hide-elem-wrap"><div class="lexprofit-widget-window-reason-hide-elem" data-value="1"><span class="lexprofit-widget-window-reason-hide-icon lexprofit-widget-window-reason-hide-icon-1"><i class="flaticon-lexprofit-widget-comment"></i></span> <span class="lexprofit-widget-window-reason-hide-name">Я не нуждаюсь в консультации юриста</span></div></div><div class="lexprofit-widget-window-reason-hide-elem-wrap"><div class="lexprofit-widget-window-reason-hide-elem" data-value="2"><span class="lexprofit-widget-window-reason-hide-icon lexprofit-widget-window-reason-hide-icon-2"><i class="flaticon-lexprofit-widget-ok"></i></span> <span class="lexprofit-widget-window-reason-hide-name">Я уже решил свой вопрос</span></div></div><div class="lexprofit-widget-window-reason-hide-elem-wrap"><div class="lexprofit-widget-window-reason-hide-elem" data-value="3"><span class="lexprofit-widget-window-reason-hide-icon lexprofit-widget-window-reason-hide-icon-3"><i class="flaticon-lexprofit-widget-badly"></i></span> <span class="lexprofit-widget-window-reason-hide-name">Консультант слишком навязчив</span></div></div></div><button type="button" class="lexprofit-widget-window-reason-hide-btn" disabled="disabled">Скрыть консультанта</button></div><span class="lexprofit-widget-window-reason-hide-close"><span class="lexprofit-widget-window-reason-hide-close-inner"><i></i> <i></i></span></span></div></div><div id="lexprofit-widget-window-mask"></div>';

var showIsAdblock = (typeof WidgetLexprofitData.data.widget.show_is_adblock != 'undefined' && WidgetLexprofitData.data.widget.show_is_adblock == 1 && WidgetLexprofitData.debug == 0) ? true : false;

DetectAd.create();

if(cookies.get('lexprofit_history' + WidgetLexprofitData.data.pid) == null || (cookies.get('lexprofit_history' + WidgetLexprofitData.data.pid) != null && typeof JSON.parse(cookies.get('lexprofit_history' + WidgetLexprofitData.data.pid)).hide == 'undefined')) {
    if(!showIsAdblock || (showIsAdblock && DetectAd.is_turned_on())) {

        if(document.querySelector('#lexprofit-widget-' + WidgetLexprofitData.data.token) == null || (document.querySelector('#lexprofit-widget-' + WidgetLexprofitData.data.token) != null && document.querySelector('#lexprofit-widget-' + WidgetLexprofitData.data.token).getAttribute('data-init') == null))
        {
            document.querySelector('body').insertAdjacentHTML('beforeend', htmlString);

            document.querySelector('#lexprofit-widget-' + WidgetLexprofitData.data.token).setAttribute('data-init', 'true');

            new LPWidget(document.querySelector('#lexprofit-widget-' + WidgetLexprofitData.data.token), WidgetLexprofitData);

            window.addEventListener('load', function() {
                if(WidgetLexprofitData.debug != 1) {
                    helpers.ajaxGET('//' + WidgetLexprofitData.host + '/widget/1.1/add_view.php',{
                        callback : 'f_' + Math.floor((Math.random() * 100000000) + 100000),
                        token : WidgetLexprofitData.data.token,
                        code : (typeof WidgetLexprofitData.region.code != 'undefined' ? WidgetLexprofitData.region.code : ''),
                        iso : (typeof WidgetLexprofitData.region.iso != 'undefined' ? WidgetLexprofitData.region.iso : '')
                    },function(res){

                    });
                }
            });
        }

    }
}

yMetrika.addNoscript();
},{"./../../../BrowserCookies.js":1,"./../../../DetectAdblock.js":2,"./../../../Device.js":3,"./../../../GoogleAutocomplete.js":4,"./../../../Helpers.js":5,"./../../../InputMask.js":6,"./../../../TinyScrollbar.js":7,"./../../../YandexMetrikaDefault.js":8}]},{},[9]);
