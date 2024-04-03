let productsInCart = [];

if (localStorage.getItem('inCart')) {
     productsInCart = JSON.parse(localStorage.getItem('inCart'));
} else {
     productsInCart = []
}

const muchPurchase = document.getElementById('much-purchase');
muchPurchase.textContent = productsInCart.length;
checkPurchases()

export function addProduct(cartBtn, productData) {
     if (!cartBtn.classList.contains('in-cart')) {
          // This product not purchased yet
          purchases(1)
          cartBtn.textContent = "Remove from cart -";
          cartBtn.classList.add('in-cart');
          productsInCart.push(productData);
     } else {
          purchases(-1)
          cartBtn.classList.remove('in-cart');
          cartBtn.textContent = "Add to cart +";
          productsInCart = productsInCart.filter(p => p['id'] != productData['id'])
     }

     window.localStorage.setItem('inCart', JSON.stringify(productsInCart));
}

export function isProductInCart(productId) { 
     for (let obj of productsInCart) {
          if (obj['id'] == productId) {
               // Add one to purchases
               return true;
          }
     }

     return false;
}

function checkPurchases() {
     if (+muchPurchase.innerText <= 0) {
          muchPurchase.parentElement.style.display = 'none';
     } else {
          muchPurchase.parentElement.style.display = 'block';
     }
}

function purchases(val) {
     muchPurchase.innerText = +muchPurchase.innerText + val;
     checkPurchases()
}