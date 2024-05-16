'use strict';

const express = require('express');
const { Product } = require('../models');

const router = express.Router();

module.exports = () => {
  router.get('/', (req, res) => res.send('test'));
  router.get('/status', (req, res) => res.sendStatus(200));
  router.get('/host', (req, res) => res.send(process.env.HOSTNAME));
  router.get('/tea', (req, res) => res.sendStatus(418));
  router.get('/products', async (req, res) => {
    console.log(req.params);
    return res
      .status(200)
      .json(await Product.findAll());
  });

  router.get('/test', async (req, res) => {
    await Product.create({
      title: 'Test',
      price: 10,
      rating: 0,
      brand: 'abc',
      description: 'Description',
      sku: 123,
      stock: 42,
      thumbnail: '/assets/ladida.png',
    });

    res.sendStatus(201);
  });
  return router;
};
