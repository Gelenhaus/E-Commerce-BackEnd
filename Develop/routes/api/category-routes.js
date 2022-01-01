const router = require('express').Router();
const { Category, Product } = require('../../models');


// The `/api/categories` endpoint
router.get('/', (req, res) => {
  Category.findAll({
    attributes: ['category_name', 'id'], include: [{ model: Product, attributes: ['price', 'stock', 'product_name', 'id'] }]
  }).then(dbData => res.json(dbData)).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  User.findOne({
    where: { id: req.params.id }, attributes: ['id', 'category_name'], include: [{ model: Product, attributes: ['product_name', 'price', 'stock', 'id'] }]
  })
    .then(dbData => {
      if (!dbData) {
        res.status(404).json({ message: 'No Category found with this id' });
        return;
      }
      res.json(dbData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//do i need to have id: req.body.id?
router.post('/', (req, res) => {
  // create a new category
  Category.create({
    id: req.body.id,
    category_name: req.body.category_name
  })
    .then(dbData => res.json(dbData)).catch(err => { console.log(err); res.status(500).json(err) });
});

//do i need category_name: req.body.category_name?
router.put('/:id', (req, res) => {
  Category.update(req.body, {
    category_name: req.body.category_name,
    where: {
      id: req.params.id
    }
  })
    .then(dbData => {
      if (!dbData[0]) {
        res.status(404).json({ message: 'No category found with this id' });
        return;
      }
      res.json(dbData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// router.delete('/:id', (req, res) => {
//   // delete a category by its `id` value
// });

router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbData => {
      if (!dbData) {
        res.status(404).json({ message: 'No category found with this id' });
        return;
      }
      res.json(dbData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
module.exports = router;
