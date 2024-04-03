// import data from '../product_data/products_data.json' assert {type: 'json'}
import { addProduct, isProductInCart } from './cart_btn.js';
import { Clothe } from './product_class.js';

const pageParams = new URLSearchParams(window.location.search);

const productId = +pageParams.get('id');
const productCateg = pageParams.get('categ');

function deleteProduct() {
     let req = new Element()

     // if (confirm("Are you sure for deleting this product")) {
          console.log(`../product_data/products_data.json/${productCateg}/${productId}`)
          fetch(`../product_data/products_data.json`)
     // } 
}

fetch('../product_data/products_data.json')
.then(r => {
     return r.json();
})
.then(data => {

     let product;
     for (let id in data[productCateg]) {
          if (data[productCateg][id].id === productId) {
               product = data[productCateg][id];
               break
          }
     }

     if (!product) {
          document.title = 'This product not exist 404'

          const section = document.querySelector('.section');
          section.className = 'error-page';
          section.innerHTML = `
               <h2>Sorry, this product not exist.</h2>
               <p>You could search in <a href='./home.html'>home</a> page to find more products.</p>
          `

          console.log("Sorry, we didn't find this product.");
     } else {
          document.title = product['name'] + ' ' + productCateg;

          const cartBtn = document.getElementById('cart-btn')
          if (isProductInCart(productId)) {
               cartBtn.classList.add('in-cart')
               cartBtn.textContent = "Remove from cart -"
          }
          cartBtn.onclick = () => (addProduct(cartBtn, {id: productId, categ: productCateg, name: product['name'], price: product['price']}));

          document.getElementById('img').src = `../product_data/img/${product.id}.jpeg`;
          document.getElementById('name').innerText = product['name'];
          document.getElementById('description').innerText = product['description'];
          document.getElementById('price').innerText = '$' + product['price'];
          document.getElementById('seller').innerText = product['seller'];

          document.getElementById('data-section').innerHTML = '';

          document.getElementById('data-section').append(function() {
               switch (productCateg) {
                    case 'book':
                         return bookSection();
                    case 'clothe':
                         return clotheSection();
                    case 'laptop':
                         return laptopSection();
                    case 'car':
                         return carSection();
               }
          }());
     }

     function bookSection() {
          const section = document.createElement('div');
          section.classList.add('book-section');
     
          const line = document.createElement('div');
          line.classList.add('line');
     
          const introWord = document.createElement('h3');
          introWord.classList.add('left');
          introWord.innerText = "Introduction";
     
          const genra = document.createElement('span');
          genra.classList.add('product-type-1', 'right');
          genra.innerText = product['genre'];
     
          line.append(
               introWord,
               genra
          );
     
          const intro = document.createElement('p');
          intro.innerText = product['introduction'];
     
          section.append(
               line,
               intro
          )
     
          return section
     }
     
     function clotheSection() {
          const section = document.createElement('div')
     
          const clothType = document.createElement('span');
          clothType.classList.add('product-type-1', 'right');
          clothType.innerText = 'Cloth: ' + product['clothType'];
     
          section.append(
               clothType,
               Clothe.colorIcons(product['colors'])
          )
     
          return section;
     }
     
     function laptopSection() {
          const section = document.createElement('div');
          section.classList.add('table-section')
     
          const data = [
               ["Operating System", product['os'], "CPU", product['cpu']],
               ["RAM", product['ram'], "Storage", product['storage']],
               ["Screen Size", product['screenSize']],
          ]
     
          const table = document.createElement('table');
          data.forEach(row => {
               let tr = document.createElement('tr');
               row.forEach(cell => {
                    let td = document.createElement('td');
                    td.innerText = cell;
                    tr.append(td);
               })
               table.append(tr);
          });
     
          section.append(table);
          
          return section;
     }
     
     function carSection() {
          const section = document.createElement('div');
          section.classList.add('car-section')
     
          const line = document.createElement('div');
          line.classList.add('line')
     
          const kilometersPass = document.createElement('span');
          kilometersPass.classList.add('right')
          kilometersPass.innerText = `Passed ${product['kilometersPass']} Kilometer`;
     
          const history = document.createElement('div');
          history.classList.add('left');
          const historyWord = document.createElement('h4');
          history.append(historyWord);
          if (!product['history'].length) {
               historyWord.innerText = 'Clean history 👌';
          } else {
               historyWord.innerText = 'Car history:'
               let ul = document.createElement('ul');
               product['history'].forEach(his => {
                    let li = document.createElement('li');
                    li.innerText = his;
                    ul.append(li);
               })
               history.append(ul);
          }
     
     
          line.append(
               history,
               kilometersPass
          )
     
          section.append(line)
     
          return section;
     }
})
