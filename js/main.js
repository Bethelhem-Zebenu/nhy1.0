

(function () {
  "use strict";

  /* =========================================================
     HEADER / SCROLL
  ========================================================= */

  const header = document.querySelector('#header');

  function toggleScrolled() {
    if (!header) return;

    if (window.scrollY > 100) {
      document.body.classList.add('scrolled');
    } else {
      document.body.classList.remove('scrolled');
    }
  }

  window.addEventListener('load', toggleScrolled);
  document.addEventListener('scroll', toggleScrolled);


 


  /* =========================================================
     PRELOADER
  ========================================================= */

  const preloader = document.querySelector('#preloader');

  if (preloader) {

    window.addEventListener('load', function () {
      preloader.remove();
    });

  }


  /* =========================================================
     SCROLL TO TOP
     
     IMPORTANT:
     Your HTML currently does not have .scroll-top.
     Therefore this code checks if it exists before using it.
  ========================================================= */

  const scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {

    if (!scrollTop) return;

    if (window.scrollY > 100) {
      scrollTop.classList.add('active');
    } else {
      scrollTop.classList.remove('active');
    }

  }

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  if (scrollTop) {

    scrollTop.addEventListener('click', function (e) {

      e.preventDefault();

      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });

    });

  }


  /* =========================================================
     AOS - ANIMATE ON SCROLL
  ========================================================= */

  function aosInit() {

    if (typeof AOS === 'undefined') {
      console.warn('AOS library was not loaded.');
      return;
    }

    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });

  }

  window.addEventListener('load', aosInit);


  /* =========================================================
     PURECOUNTER
  ========================================================= */

  if (typeof PureCounter !== 'undefined') {
    new PureCounter();
  }


  /* =========================================================
     GLIGHTBOX
     
     Used by your portfolio/service images.
  ========================================================= */

  if (typeof GLightbox !== 'undefined') {

    GLightbox({
      selector: '.glightbox'
    });

  } else {

    console.warn('GLightbox library was not loaded.');

  }


  /* =========================================================
     ISOTOPE - PORTFOLIO / SERVICES
     
     This is important for your:
     
     <div class="isotope-layout">
     
     section.
  ========================================================= */

  document.querySelectorAll('.isotope-layout').forEach(function (isotopeItem) {

    const container = isotopeItem.querySelector('.isotope-container');

    if (!container) {
      return;
    }

    let layout = isotopeItem.getAttribute('data-layout') || 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') || '*';
    let sort = isotopeItem.getAttribute('data-sort') || 'original-order';

    if (
      typeof imagesLoaded === 'undefined' ||
      typeof Isotope === 'undefined'
    ) {

      console.warn(
        'Isotope or imagesLoaded library was not loaded.'
      );

      return;

    }

    imagesLoaded(container, function () {

      const initIsotope = new Isotope(container, {

        itemSelector: '.isotope-item',

        layoutMode: layout,

        filter: filter,

        sortBy: sort

      });


      /* =====================================================
         ISOTOPE FILTER BUTTONS
         
         Your current portfolio section does not have filters,
         but this keeps the code compatible if you add them.
      ===================================================== */

      isotopeItem
        .querySelectorAll('.isotope-filters li')
        .forEach(function (filterButton) {

          filterButton.addEventListener('click', function () {

            const activeFilter =
              isotopeItem.querySelector(
                '.isotope-filters .filter-active'
              );

            if (activeFilter) {
              activeFilter.classList.remove('filter-active');
            }

            this.classList.add('filter-active');

            initIsotope.arrange({
              filter: this.getAttribute('data-filter')
            });

            if (typeof AOS !== 'undefined') {
              AOS.refresh();
            }

          });

        });

    });

  });


  /* =========================================================
     SWIPER
     
     Only runs if a Swiper element exists.
  ========================================================= */

  document.querySelectorAll('.init-swiper').forEach(function (swiperElement) {

    if (typeof Swiper === 'undefined') {
      console.warn('Swiper library was not loaded.');
      return;
    }

    let configElement =
      swiperElement.querySelector('.swiper-config');

    if (!configElement) {
      return;
    }

    let config = {};

    try {
      config = JSON.parse(
        configElement.textContent.trim()
      );
    } catch (error) {

      console.error(
        'Could not read Swiper configuration:',
        error
      );

      return;
    }

    new Swiper(
      swiperElement,
      config
    );

  });


  /* =========================================================
     FAQ TOGGLE
  ========================================================= */

  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach(function (faqItem) {

    faqItem.addEventListener('click', function () {

      const parent = this.parentNode;

      if (parent) {
        parent.classList.toggle('faq-active');
      }

    });

  });


  /* =========================================================
     SMOOTH HASH SCROLL
  ========================================================= */

  window.addEventListener('load', function () {

    if (window.location.hash) {

      const hash = window.location.hash;

      const target = document.querySelector(hash);

      if (target) {

        setTimeout(function () {

          const headerHeight =
            header ? header.offsetHeight : 0;

          window.scrollTo({

            top:
              target.offsetTop -
              headerHeight,

            behavior: 'smooth'

          });

        }, 100);

      }

    }

  });


  /* =========================================================
     NAVIGATION SCROLLSPY
  ========================================================= */

  const navLinks =
    document.querySelectorAll(
      '.navmenu a[href^="#"]'
    );

  function updateNavLinks() {

    const position =
      window.scrollY + 200;

    navLinks.forEach(function (link) {

      const href =
        link.getAttribute('href');

      if (!href || href === '#') {
        return;
      }

      const section =
        document.querySelector(href);

      if (!section) {
        return;
      }

      const sectionTop =
        section.offsetTop;

      const sectionBottom =
        sectionTop +
        section.offsetHeight;

      if (
        position >= sectionTop &&
        position <= sectionBottom
      ) {

        navLinks.forEach(function (navLink) {
          navLink.classList.remove('active');
        });

        link.classList.add('active');

      }

    });

  }

  window.addEventListener(
    'load',
    updateNavLinks
  );

  document.addEventListener(
    'scroll',
    updateNavLinks
  );


  /* =========================================================
     WINDOW LOAD
     
     Refresh AOS and Isotope after all images are loaded.
     This helps your portfolio cards display correctly.
  ========================================================= */

  window.addEventListener('load', function () {

    if (typeof AOS !== 'undefined') {
      AOS.refresh();
    }

    document
      .querySelectorAll('.isotope-container')
      .forEach(function (container) {

        if (typeof Isotope !== 'undefined') {

          const isotopeInstance =
            Isotope.data(container);

          if (isotopeInstance) {
            isotopeInstance.layout();
          }

        }

      });

  });

})();