window.addEventListener('DOMContentLoaded', function () {

  // YMAP (CONTACTS section)

  ymaps.ready(init);
  function init() {
    var myMap = new ymaps.Map("map", {
      center: [55.760769, 37.615377],
      zoom: 13
    });

    var myPlacemark = new ymaps.Placemark([55.768942, 37.640790], {}, {
      iconLayout: 'default#image',
      iconImageHref: 'img/contacts/placemark.png',
      iconImageSize: [12, 12]
    });

    myMap.geoObjects.add(myPlacemark);

    myMap.controls.remove('geolocationControl');
    myMap.controls.remove('zoomControl');
    myMap.controls.remove('searchControl');
    myMap.controls.remove('trafficControl');
    myMap.controls.remove('typeSelector');
    myMap.controls.remove('fullscreenControl');
    myMap.controls.remove('rulerControl');
  };

  // VALIDATE FORM (CONTACTS section)

  new JustValidate('.js-form', {
    rules: {
      name: {
        required: true,
        minLength: 2,
        maxLength: 12,
        strength: {
          custom: '^[А-Яа-яЁё\s]+$'
        }
      },
      mail: {
        required: true,
        email: true,
      },
      comment: {
        required: true,
      }
    },

    messages: {
      name: {
        required: 'Поле обязательное для заполнения',
        minLength: 'Минимум 2 символа',
        maxLength: 'Максимум 12 символов',
        strength: 'Недопустимый формат'
      },
      mail: {
        required: 'Поле обязательное для заполнения',
        email: 'Введите корректный email'
      },
      comment: {
        required: 'Поле обязательное для заполнения',
      }
    }
  });

  new JustValidate('.about__js-form', {
    rules: {
      mail: {
        required: true,
        email: true,
      }
    },

    messages: {
      mail: {
        required: 'Поле обязательное для заполнения',
        email: 'Введите корректный email'
      }
    }
  });


  // CALL SEARCH FORM BTN (HEADER)
  document.querySelector('#call-form-btn').addEventListener('click', function () {
    document.querySelector('.search__form').classList.add('is_active_form')
  })

  document.querySelector('#close-form-btn').addEventListener('click', function () {
    document.querySelector('.search__form').classList.remove('is_active_form')
  })

  // BURGER (HEADER)
  document.querySelector('#burger').addEventListener('click', function () {
    document.querySelector('.nav-burger').classList.toggle('is_active_nav')
  })
  document.querySelector('#close-burger').addEventListener('click', function () {
    document.querySelector('.nav-burger').classList.remove('is_active_nav')
  })

  // CLOSE OVERMAP (CONTACTS)
  document.querySelector('#close-overmap').addEventListener('click', function () {
    document.querySelector('.overmap').classList.add('overmap_close')
  })
});







