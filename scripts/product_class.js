import { addProduct, isProductInCart } from './cart_btn.js';

class Product {
     constructor (id, name, seller, description, price, category) {
          this.id = id;
          this.name = name;
          this.description = description;
          this.price = price;
          this.seller = seller;
          this.category = category
     }

     productCartBtn() {
          const cartBtn = document.createElement('button');
          cartBtn.classList.add('product-cart-btn', 'right');
          cartBtn.onclick = () => (addProduct(cartBtn, {id: this.id, categ: this.category, name: this.name, price: this.price}));
          
          if (isProductInCart(this.id)) {
               cartBtn.classList.add('in-cart')
               cartBtn.textContent = "Remove from cart -"
          } else {
               cartBtn.textContent = "Add to cart +";
          }

          return cartBtn;
     }

     productStructure() {
          const product = document.createElement('div');
          product.classList.add('product');
          product.id = this.id;

          const productDivImg = document.createElement('div');
          productDivImg.classList.add('product-img');

          const productImg = document.createElement('img');
          productImg.setAttribute('src', `../product_data/img/${this.id}.jpeg`);
     
          productDivImg.append(productImg);

          const productInfo = document.createElement('div');
          productInfo.classList.add('product-info');

          const productPageLink = document.createElement('a');
          productPageLink.href = `./product_page.html?id=${this.id}&categ=${this.category}`;

          const productName = document.createElement('h3');
          productName.classList.add('product-name');
          productName.textContent = this.name;

          const productDescription = document.createElement('p');
          productDescription.classList.add('product-description');
          productDescription.textContent = this.description;

          productPageLink.append(
               productName,
               productDescription
          );

          const productContainer = document.createElement('div');
          productContainer.classList.add('container');

          const productPrice = document.createElement('h4');
          productPrice.classList.add('product-price');
          productPrice.textContent = `$${this.price}`;

          productContainer.append(productPrice);

          productInfo.append(productPageLink, productContainer);

          product.append(productDivImg, productInfo);

          return product
     }
}

class Book extends Product {
     constructor (id, name, seller, description, price, genra, introduction){
          super(id, name, seller, description, price, "book");
          this.genra = genra;
          this.introduction = introduction;
          this.structure = this.genurateProduct();
     }

     genurateProduct() {
          const product = this.productStructure();          

          const bookGenra = document.createElement('span');
          bookGenra.classList.add('product-type-1', 'right');
          bookGenra.textContent = this.genra;

          const bookIntro = document.createElement('button');
          bookIntro.classList.add('product-btn');
          bookIntro.onclick = () => (this.popupIntroduction(this.introduction));
          bookIntro.textContent = "Introduction";

          product.querySelector('.container').append(
               bookGenra,
               document.createElement('hr'),
               bookIntro,
               this.productCartBtn()
          );

          return product;
     }

     popupIntroduction(intro) {
          const pIntro = document.createElement('p');
          pIntro.textContent = intro;
          
          const popupContent = document.querySelector('#popup-content');
          popupContent.append(pIntro);

          popupContent.parentElement.parentElement.style.display = 'block';
     }
}

class Clothe extends Product {
     constructor (id, name, seller, description, price, clothType, colors){
          super(id, name, seller, description, price, "clothe");
          this.clothType = clothType;
          this.colors = colors;
          this.structure = this.genurateProduct();
     }

     static colorIcons(colorsArr) {
          const clotheColors = document.createElement('ul');
          clotheColors.classList.add('product-clothe-colors');

          let color;
          colorsArr.forEach(c => {
               color = document.createElement('li');
               color.style.backgroundColor = c;
               clotheColors.append(color);
          });

          return clotheColors
     }

     genurateProduct() {
          const product = this.productStructure();
          
          const clotheType = document.createElement('span');
          clotheType.classList.add('product-type-1', 'right');
          clotheType.textContent = this.clothType;

          product.querySelector('.container').append(
               clotheType,
               document.createElement('hr'),
               Clothe.colorIcons(this.colors),
               this.productCartBtn()     
          );

          return product;
     }
}

class Laptop extends Product {
     constructor (id, name, seller, description, price, os, cpu, ram, storge, screenSize){
          super(id, name, seller, description, price, "laptop");
          this.os = os;
          this.cpu = cpu;
          this.ram = ram;
          this.storge = storge;
          this.screenSize = screenSize;
          this.structure = this.genurateProduct();
     }

     getBasicInfo() {
          const OS = this.os.split(' ');
          const SS = this.screenSize.split(' ');
          return {
               os: OS.length > 2? OS.slice(0, 2).join(' '): OS.join(' '),
               screenSize: SS.length > 2? SS.slice(0, 2).join(' '): SS.join(' '),
          };
     }

     genurateProduct() {
          const product = this.productStructure();
          
          const laptopBrand = document.createElement('span');
          laptopBrand.classList.add('product-type-3', 'right');
          laptopBrand.textContent = this.seller;

          const laptopInfo = document.createElement('table');
          laptopInfo.classList.add('product-table', 'left');
          laptopInfo.append(document.createElement('tr'));

          const info = this.getBasicInfo();

          const laptopInfoOS = document.createElement('td');
          laptopInfoOS.textContent = info['os'];
          // laptopInfoOS.textContent = this.os

          const laptopInfoSS = document.createElement('td');
          laptopInfoSS.textContent = info['screenSize'];
          // laptopInfoSS.textContent = this.screenSize

          laptopInfo.querySelector('tr').append(
               laptopInfoOS,
               laptopInfoSS,
          );

          product.querySelector('.container').append(
               laptopBrand,
               document.createElement('hr'),
               laptopInfo,
               this.productCartBtn()     
          );

          return product;
     }
}

class Car extends Product {
     constructor (id, name, seller, description, price, kilometersPass, history) {
          super(id, name, seller, description, price, "car");
          this.kilometersPass = kilometersPass;
          this.history = history;
          this.structure = this.genurateProduct();
     }

     genurateProduct() {
          const product = this.productStructure();          

          const carKilometers = document.createElement('span');
          carKilometers.classList.add('right');
          carKilometers.textContent = `Passed ${this.kilometersPass} Kilometer`;

          var carHistory;
          if (this.history.length) {
               carHistory = document.createElement('button');
               carHistory.onclick = () => (this.popupHistory(this.history));
               carHistory.classList.add('product-btn');
               carHistory.textContent = "Car history";
          } else {
               carHistory = document.createElement('span');
               carHistory.classList.add('product-type-2');
               carHistory.textContent = "Clear history 👌";
          }

          product.querySelector('.container').append(
               carKilometers,
               document.createElement('hr'),
               carHistory,
               this.productCartBtn()
          );

          return product;
     }

     popupHistory(history) {
          const ulHistory = document.createElement('ul');
          let li;
          history.forEach(h => {
               li = document.createElement('li');
               li.textContent = h;
               ulHistory.append(li)
          })
          
          const popupContent = document.querySelector('#popup-content');
          popupContent.append(ulHistory);

          popupContent.parentElement.parentElement.style.display = 'block';
     }
}

export {Product, Book, Clothe, Laptop, Car}