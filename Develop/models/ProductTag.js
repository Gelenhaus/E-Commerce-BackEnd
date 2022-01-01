const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

/*
product belongs to category
category may have many products

category has many product models

product belongs to many tags 

using the product tag through model allow products to have multiple tags 
and tags to have many products

tag belongs to many product models
*/
const sequelize = require('../config/connection');

class ProductTag extends Model { }

ProductTag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      refernces: {
        model: 'product',
        key: 'id'
      }
    },
    tag_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'tag',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    underscored: true,
    freezeTableName: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;
