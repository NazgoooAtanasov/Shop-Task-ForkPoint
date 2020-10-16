// Used for the collapsing menus in the filter section.
const coll = document.getElementsByClassName("collapsible");

for (let i = 0; i < coll.length; i++) {
    coll[i].nextElementSibling.style.maxHeight = coll[i].nextElementSibling.scrollHeight + 'px';
    coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        const content = this.nextElementSibling;
        if (content.style.maxHeight){
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
}

// Used to check items in filter list.
const filterItems = document.getElementsByClassName('filter-element');


for (let i = 0; i<filterItems.length;i++){
    filterItems[i].setAttribute('color', "dimray");
    const initialData = filterItems[i].firstChild.data;
    filterItems[i].addEventListener('click', () => {
        if(filterItems[i].style.color == 'black') {
            filterItems[i].firstChild.data = `${initialData}`;
            filterItems[i].style.color = 'dimgray';
        }else{
            filterItems[i].firstChild.data = `✓ ${initialData}`;
            filterItems[i].style.color = 'black';
        }
    })
}

function openNav() {
    document.getElementById("mySidebar").style.width = "100%";
    document.getElementById("mySidebar").style.height = "100%";
    document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("mySidebar").style.height = "0";
    document.getElementById("main").style.marginLeft= "0";
}