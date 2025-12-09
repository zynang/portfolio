/** GENERALS */
/** ===================== */

var win = $(window);

// viewport dimensions
var ww = win.width();
var wh = win.height();

$(document).ready(function() {

    // load functions
    imageBG();
    grid();

});

win.on('load', function() {

    setTimeout(function() {
        $('#preloader').addClass('hide');
    }, 1000);

    // load functions
    grid();

});

win.on('resize', function() {

    // viewport dimensions
    ww = win.width();
    wh = win.height();

    // load functions
    grid();
    

});



/** SHOW/HIDE HEADER */
/** ===================== */

function show_hide_header() {

    var last_scroll = 0;

    win.on('scroll', function() {
        if (!$('#about').hasClass('visible')) {
            var scroll = $(this).scrollTop();

            if (scroll > last_scroll) {
                $('#main-header').addClass('hide');
            } else {
                $('#main-header').removeClass('hide');
            }

            last_scroll = scroll;
        }
    });

}



/** BACKGROUND IMAGES */
/** ===================== */

function imageBG() {

    $('.imageBG').each(function() {
        var image = $(this).data('img');

        $(this).css({
            backgroundImage: 'url(' + image + ')',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        });
    });

}


/** GRID */
/** ===================== */

function grid() {
    var container = $('.grid');

    for (var i = 0; i < container.length; i++) {
        var active_container = $(container[i]);
        var container_width = active_container.width();
        var items = active_container.find('.entry');

        var cols = parseInt(active_container.data('cols'), 15);
        var margin = parseInt(active_container.data('margin'), 15);
        var height = parseFloat(active_container.data('height'));
        var double_height = parseFloat(active_container.data('double-height'));

        if (!margin) margin = 0;
        if (!double_height) double_height = 2;

        // Set default column count based on viewport width
        if (ww >= 1200) {
            cols = 2; // Set to 2 columns always for consistency, can adjust if needed
        } else if (ww >= 700) {
            cols = 2;
        } else {
            cols = 1;
        }

        // Calculate item width based on the number of columns
        var items_width = Math.floor((container_width / cols) - margin);
        var items_height = Math.floor(items_width * height);
        var items_double_height = items_height * double_height;
        var items_margin = Math.floor(margin / 2);

        // Center-align the grid by calculating leftover space and adjusting margin
        var totalItemsWidth = (items_width * cols) + (margin * (cols - 1));
        var leftoverSpace = container_width - totalItemsWidth;
        active_container.css('margin-left', leftoverSpace / 2 + 'px');

        // Apply item dimensions and spacing
        items.each(function() {
            $(this).css({
                width: items_width + 'px',
                height: items_height + 'px',
                margin: items_margin + 'px'
            });

            // Special size adjustments
            if (!height) $(this).css('height', 'auto');
            if ($(this).hasClass('w2') && ww >= 500) $(this).css('width', (items_width * 2) + (items_margin * 2) + 'px');  
            if ($(this).hasClass('h2') && ww >= 500) $(this).css('height', items_double_height + (items_margin * 2) + 'px');
        });

        // Initialize Isotope
        active_container.isotope({
            itemSelector: '.entry',
            transitionDuration: '.2s',
            hiddenStyle: {
                opacity: 0
            },
            visibleStyle: {
                opacity: 1
            },
            masonry: {
                columnWidth: items_width + margin
            }
        });

        // Filter functionality
        $('#filters li a').on('click', function(e) {
            e.preventDefault();
            var filter = $(this).attr('href');
            $('#filters li a').removeClass('active');
            $(this).addClass('active');
            active_container.isotope({ filter: filter });
        });
    }

    // Refresh layout after setting up
    container.isotope('layout');
}



// Nav bar //

document.addEventListener("DOMContentLoaded", function() {
    var navItems = document.querySelectorAll('.nav-item a');
    var currentUrl = window.location.href;

    navItems.forEach(function(item) {
        if (currentUrl.includes(item.getAttribute('href')) ||
            currentUrl.includes('movie.html') && item.getAttribute('href') === 'index.html' ||  
            currentUrl.includes('uno.html') && item.getAttribute('href') === 'index.html'  ||
            currentUrl.includes('school.html') && item.getAttribute('href') === 'index.html'  

        ) {
            item.closest('.nav-item').classList.add('active');
        }
    });
});

// side bar
$(document).ready(function(){
    var offset = 110; 
    var $window = $(window);
    var $document = $(document);

    $("a.js-scroll-trigger").on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top - offset
            }, 800);
        }
    });

    $(window).on('load', function() {
        var offset = 120; 
    
        function checkActiveSection() {
            var scrollPos = $(window).scrollTop() + offset;
            $('.sidebar .js-scroll-trigger').each(function() {  
                var currLink = $(this);
                var refElement = $(currLink.attr("href"));
    
                if (refElement.length === 0) {
                    console.log("Failed to find element for link: ", currLink.attr("href"));
                    return; 
                }
    
                var elementTop = refElement.offset().top; 
                var elementBottom = elementTop + refElement.height();
    
                if (elementTop <= scrollPos && elementBottom > scrollPos) {
                    $('.sidebar .js-scroll-trigger').removeClass("active-link"); 
                    currLink.addClass("active-link");
                } else {
                    currLink.removeClass("active-link");
                }
            });
        }
    
        $(document).on("scroll resize", checkActiveSection);
        checkActiveSection();  
    });
});


document.addEventListener('DOMContentLoaded', () => {
    
    const hoverElements = document.querySelectorAll('.hover-effect');
  
    hoverElements.forEach(element => {
      element.addEventListener('mousemove', (e) => {
        const sparkle = document.createElement('span');
        sparkle.classList.add('sparkle');
        sparkle.style.backgroundImage = `url(${element.getAttribute('data-image')})`;
  
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
  
        sparkle.style.left = `${x}px`;
        sparkle.style.top = `${y}px`;
        element.appendChild(sparkle);
  
        setTimeout(() => {
          sparkle.remove();
        }, 1000); // Remove sparkle after animation
      });
    });
  });
  
  document.addEventListener('DOMContentLoaded', () => {
    const myNameElement = document.querySelector('.my-name');
    const hoverContainer = document.getElementById('hover-container');

    myNameElement.addEventListener('mouseover', () => {
        const rect = myNameElement.getBoundingClientRect();
        const parentRect = myNameElement.parentElement.getBoundingClientRect();
        
        const leftPosition = rect.left - parentRect.left + 70;
        const topPosition = rect.top - parentRect.top - 70;

        console.log(`Left: ${leftPosition}, Top: ${topPosition}`); // Log positions

        hoverContainer.style.left = `${leftPosition}px`;
        hoverContainer.style.top = `${topPosition}px`;
        hoverContainer.style.visibility = 'visible';
    });

    myNameElement.addEventListener('mouseout', () => {
        hoverContainer.style.visibility = 'hidden';
    });
});


const dynamicText = document.getElementById('dynamicText');

// Array of words to display
const words = ['Naval Officer ⚓️', 'Friend 👯‍♀️', 'Sister 👩🏻'];
let currentWordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentWord = words[currentWordIndex];

    // Typing or deleting based on `isDeleting` flag
    if (isDeleting) {
        dynamicText.textContent = currentWord.substring(0, charIndex--);
    } else {
        dynamicText.textContent = currentWord.substring(0, charIndex++);
    }

    // Set typing speed
    let typingSpeed = isDeleting ? 50 : 100;

    // When word is fully typed, pause before deleting
    if (!isDeleting && charIndex === currentWord.length + 1) {
        typingSpeed = 2000; // Pause before deleting
        isDeleting = true;
    }
    // When word is fully deleted, move to the next word
    else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        currentWordIndex = (currentWordIndex + 1) % words.length; // Cycle to the next word
    }

    // Recursively call the function with typingSpeed delay
    setTimeout(typeEffect, typingSpeed);
}

// Start the typing effect
typeEffect();