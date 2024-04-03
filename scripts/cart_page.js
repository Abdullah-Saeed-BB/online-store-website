let productsInCart = JSON.parse(localStorage.getItem('inCart'));
const purchases = document.getElementById('purchases');

const ul = document.createElement('ul');
let totalPrice = 0;

for (product of productsInCart) {
     let li = document.createElement('li');
     li.classList.add('products');
     // http://127.0.0.1:5500/indexs/product_page.html?id=0&categ=book
     let aInfo = document.createElement('a');
     aInfo.classList.add('info')
     aInfo.href = `../indexs/product_page.html?id=${product['id']}&categ=${product['categ']}`
     aInfo.target = '_blank'
     let divInfoImg = document.createElement('div');
     divInfoImg.classList.add('info-img');

     let prodName = document.createElement('h3');
     prodName.textContent = product['name'];

     let prodPrice = document.createElement('p');
     prodPrice.textContent = '$' + (totalPrice += product['price'], product['price']);

     let prodImg = document.createElement('img');
     prodImg.src = `../product_data/img/${product['id']}.jpeg`

     let cancel = document.createElement('span');
     cancel.id = product['id']
     cancel.classList.add('cancel', 'fa', 'fa-close');

     divInfoImg.appendChild(prodImg);
     aInfo.append(
          divInfoImg,
          prodName,
          prodPrice
     );

     li.append(
          aInfo,
          cancel
     )

     ul.appendChild(li);
}

ul.appendChild(document.createElement('hr'))


let total = document.createElement('li');
total.classList.add('priceTotal');
let totalPriceP = document.createElement('p');
let totalTaxes = document.createElement('h4');
totalTaxes.textContent = "%15";
let totalTotal = document.createElement('h2');
total.append(
     totalPriceP,
     totalTaxes,
     totalTotal
)
updatePrice()

ul.append(total)

purchases.append(ul);

ul.addEventListener('click', e => {
     if (e.target.classList.contains('cancel')) {
          let deletedProd;
          productsInCart = productsInCart.filter(prod => {
               if (prod.id !== +e.target.id) {
                    return true;
               };
               deletedProd = prod;
               return false
          });
          localStorage.setItem('inCart', JSON.stringify(productsInCart));
          totalPrice -= deletedProd['price'];
          updatePrice()
          e.target.parentNode.remove()
     }
})

function updatePrice() { 
     totalPriceP.textContent = totalPrice.toFixed(2);
     totalTotal.textContent = '$' + (totalPrice + (totalPrice * 0.15)).toFixed(2)
}
