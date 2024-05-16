'use strict';

const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let products = [
      {
        title: 'Active Wear',
        price: 24.00,
        rating: 3,
        brand: 'Easy Wear',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temp incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse. Donec condimentum elementum convallis. Nunc sed orci a diam ultrices aliquet interdum quis nulla.',
        sizes: 'S,M,L,XL',
        sku: 12345678,
        stock: 10,
        thumbnail: '/assets/img/product_single_10.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ];

    for(let i = 0; i < 23; i++) {
      products.push({
        title: faker.commerce.product(),
        price: faker.commerce.price({ min: 10, max: 500 }),
        rating: faker.number.int({ min: 1, max: 5 }),
        brand: faker.company.name(),
        description: faker.commerce.productDescription(),
        sizes: 'S,M,L,XL',
        sku: faker.number.int({ min: 10000000, max: 99999999 }),
        stock: faker.number.int({ min: 10, max: 1000 }),
        thumbnail: faker.image.urlPicsumPhotos({ height: 524, width: 524, category: 'fashion' }),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert('Products', products, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
