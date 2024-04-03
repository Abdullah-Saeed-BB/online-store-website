const filterBar = document.querySelector('header .header-links');
const filters = filterBar.children;

let productCategDiv;
let productSeparator;

filterBar.addEventListener('click', e => {
     try {
          productCategDiv.toString();
     } catch {
          productCategDiv = document.querySelectorAll("#shop>div[class='product-categ']");
          productSeparator = document.querySelectorAll("#shop>div[class='product-categ'] .separator");
     }

     if (e.target.id) {
          let filterId = e.target.id.split('-')[1];
          if (filterId == 'all') {
               // Show all the separator 
               Array.from(productSeparator).map(s => s.style.display = 'flex');
               
               // Make the 'all' filter active
               Array.from(filters).map(f => f.classList.remove('active'))
               filters[0].classList.add('active');

               // Show all the categs
               productCategDiv.forEach(div => {
                    div.style.display = 'block';
               });
          } else {
               productCategDiv.forEach(div => {
                    // Hide all the separator 
                    Array.from(productSeparator).map(s => s.style.display = 'none');

                    // Remove to every filte the active class except one
                    Array.from(filters).map(f => f.id == e.target.id ? f.classList.add('active'): f.classList.remove('active'))

                    // Hide all the categs except the one
                    if (div.id != filterId) {
                         div.style.display = 'none';
                    } else {
                         div.style.display = 'block';
                    }
               })
          }
     }
});