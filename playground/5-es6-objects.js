
const name = "Akshay";
const userAge = "25";

const user = {
  name,
  age: userAge,
  location: 'Noida'
}

console.log(user);

// Object destructuring

const product = {
  label: 'Red Notebook',
  price: 3,
  stock: 201,
  salePrice: undefined
};

// const label = product.label;
// const stock = product.stock;

// const {label: productLabel, stock, rating = 5} = product;

const transaction = (type, {label, stock}) => {
  console.log(type, label, stock);
}
transaction('order', product)
