// Used for the collapsing menus in the filter section.
const coll = document.getElementsByClassName("collapsible");

for (let i = 0; i < coll.length; i++) {
    coll[i].nextElementSibling.style.maxHeight = coll[i].nextElementSibling.scrollHeight + 'px';
    coll[i].addEventListener("click", function () {
        this.classList.toggle("active");
        const content = this.nextElementSibling;
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
}

// Selector for the colors
const colors = document.getElementsByClassName('filter-select');

for (let i = 0; i < colors.length; i++) {
    colors[i].addEventListener('click', () => {
        if (colors[i].classList.contains('selected')) {
            colors[i].classList.remove('selected');
        } else {
            colors[i].classList.add('selected');
        }
    })
}

// Selector for the sizes
const sizes = document.getElementsByClassName('size-element');

for (let i = 0; i < sizes.length; i++) {
    sizes[i].addEventListener('click', () => {
        if (sizes[i].classList.contains('selected')) {
            sizes[i].classList.remove('selected');
        } else {
            sizes[i].classList.add('selected');
        }
    })
}

// Used for the dynamic change of the currency type.
const currenciesSelectors = document.getElementsByClassName('currency-selector');
const currencies = document.getElementsByClassName('currency');
for (let i = 0; i < currenciesSelectors.length; i++) {
    currenciesSelectors[i].addEventListener('click', (event) => {
        for (let k = 0; k < currencies.length; k++) {
            // Sets everything to inactive first.
            if (!currencies[k].classList.contains('inactive-currency') &&
                !currencies[k].classList.contains(currenciesSelectors[i].value)) {
                currencies[k].classList.add('inactive-currency');
            }
            // Finds the right currency to make visible.
            if (currencies[k].classList.contains(currenciesSelectors[i].value)) {
                currencies[k].classList.remove('inactive-currency');
            }
        }
    })
}

// Used to check items in filter list.
const filterItems = document.getElementsByClassName('filter-element');


for (let i = 0; i < filterItems.length; i++) {
    filterItems[i].setAttribute('color', "dimray");
    const initialData = filterItems[i].firstChild.data;
    filterItems[i].addEventListener('click', () => {
        if (filterItems[i].style.color == 'black') {
            filterItems[i].firstChild.data = `${initialData}`;
            filterItems[i].style.color = 'dimgray';
        } else {
            filterItems[i].firstChild.data = `✓ ${initialData}`;
            filterItems[i].style.color = 'black';
        }
    })
}

function opensidebar() {
    document.getElementById("mySidebar").style.width = "100%";
    document.getElementById("mySidebar").style.height = "100%";
    document.getElementById("main").style.marginLeft = "250px";
}

function closesidebar() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("mySidebar").style.height = "0";
    document.getElementById("main").style.marginLeft = "0";
}


const swiper = new Swiper('.swiper-container', {
    direction: 'vertical',
    slidesPerView: 5,
    spaceBetween: 3,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

const mobileSwiper = new Swiper('.swiper-container-mobile', {
    slidesPerView: 1,
    spaceBetween: 3,
});
