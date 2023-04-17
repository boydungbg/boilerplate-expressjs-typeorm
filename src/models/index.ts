import Category from '@/models/Category';
import Product from '@/models/Product';
import ProductImage from '@/models/ProductImage';
import ProductAttributeValue from '@/models/ProductAttributeValue';
import ProductAttribute from '@/models/ProductAttribute';

//Associate Category
Category.hasMany(Product, {
  constraints: false
});

//Associate Product
Product.belongsTo(Category, {
  constraints: false
});
Product.hasMany(ProductImage, {
  constraints: false
});
Product.hasMany(ProductAttributeValue, {
  constraints: false
});

//Associate ProductImage
ProductImage.belongsTo(Product, {
  constraints: false
});

//Accociate ProductAttibute
ProductAttribute.hasMany(ProductAttributeValue, {
  constraints: false
});

//Accociate ProductAttibuteValue
ProductAttributeValue.belongsTo(Product, {
  constraints: false
});
ProductAttributeValue.belongsTo(ProductAttribute, {
  constraints: false
});

(async () => {
  try {
    // await Category.sync({ alter: true, hooks: true, benchmark: true });
    // await Product.sync({ alter: true, hooks: true, benchmark: true });
    // await ProductImage.sync({ alter: true, hooks: true, benchmark: true });
    // await ProductAttributeValue.sync({
    //   alter: true,
    //   hooks: true,
    //   benchmark: true
    // });
    // await ProductAttribute.sync({ alter: true, hooks: true, benchmark: true });
  } catch (error) {}
})();

export {
  Category,
  Product,
  ProductImage,
  ProductAttribute,
  ProductAttributeValue
};
