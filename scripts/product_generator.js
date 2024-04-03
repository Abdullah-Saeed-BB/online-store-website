// import data from '../product_data/products_data.json' assert {type: 'json'};
import * as classes from './product_class.js';

fetch('../product_data/products_data.json')
.then(r => { 
     return r.json();
})
.then(data => {
     const products = new Object();
     let prods;

     for (let categ in data) {
          switch (categ) { // Here create a all objects of each category and push them to the Products array
               case 'book':
                    prods = data[categ].map(p => (new classes.Book(p.id, p.name, p.seller, p.description, p.price, p.genre, p.introduction)))
                    products[categ] = prods;
                    break;
               case 'clothe':
                    prods = data[categ].map(p => (new classes.Clothe(p.id, p.name, p.seller, p.description, p.price, p.clothType, p.colors)))
                    products[categ] = prods;
                    break;
               case 'laptop':
                    prods = data[categ].map(p => (new classes.Laptop(p.id, p.name, p.seller, p.description, p.price, p.os, p.cpu, p.ram, p.storage, p.screenSize)))
                    products[categ] = prods;
                    break;
               case 'car':
                    prods = data[categ].map(p => (new classes.Car(p.id, p.name, p.seller, p.description, p.price, p.kilometersPass, p.history)))
                    products[categ] = prods;
                    break;
          };
     };
     return products;
}).then(products => {
     const shop = document.querySelector('#shop');

     Object.keys(products).forEach(categ => {

          const categDiv = document.createElement('div');
          categDiv.classList.add("product-categ");
          categDiv.id = categ;

          const spearator = document.createElement('div');
          spearator.classList.add('separator')

          const categTitle = document.createElement('h1');
          categTitle.textContent = categ[0].toUpperCase() + categ.slice(1);

          spearator.append(
               categTitle,
               document.createElement('hr')
          );

          categDiv.append(
               spearator,
               ...products[categ].map(p => p.structure)
          );

          shop.append(categDiv);
     })
})
