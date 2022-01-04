const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint


// find all tags
// be sure to include its associated Product data

router.get('/', (req, res) => {
  Tag.findAll({
    attributes: ['id', 'tag_name'], include: [{ model: Product, attributes: ['product_name', 'id', 'price', 'stock', 'category_id'] }]
  }).then(dbData => res.json(dbData)).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// find a single tag by its `id`
// be sure to include its associated Product data

router.get('/:id', (req, res) => {
  Tag.findOne({
    where: { id: req.params.id }, attributes: ['id', 'tag_name'], include: [{ model: Product, attributes: ['product_name', 'id', 'price', 'stock', 'category_id'] }]
  })
    .then(dbData => {
      if (!dbData) {
        res.status(404).json({ message: 'No Tag found with this id' });
        return;
      }
      res.json(dbData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  Tag.create({
    id: req.body.id,
    tag_name: req.body.tag_name
  }).then(dbData => res.json(dbData)).catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  }
  ).then(dbData => {
    if (!dbData) {
      res.status(404).json({ message: 'Invalid Tag ID' });
      return;
    }
    res.json(dbData);
  })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  }).then(dbData => {
    if (!dbData) {
      res.status(404).json({ message: 'Invalid Tag ID' });
      return;
    }
    res.json(dbData);
  })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
}
)


module.exports = router;
