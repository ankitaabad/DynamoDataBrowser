import { intersection, partition } from 'remeda';

const selectedFilters = {
  sk: ['order'],
};
let records = {
  data: [
    {
      pk: 'order#500',
      sk: 'order',
      order_date: '2023-04-10',
      user_id: '100',
      total_amount: 1799.98,
      order_id: '500',
      status: 'shipped',
      id: 'order#500_order',
    },
    {
      pk: 'product#1',
      sk: 'product',
      release_date: '2023-01-15',
      price: 999.99,
      name: 'Laptop',
      description: 'A high-performance laptop',
      category: 'Electronics',
      stock: 20,
      brand: 'BrandX',
      id: 'product#1_product',
    },
    {
      pk: 'product#2',
      sk: 'product',
      release_date: '2023-03-10',
      price: 799.99,
      name: 'Smartphone',
      description: 'A powerful smartphone with a great camera',
      category: 'Electronics',
      stock: 50,
      brand: 'BrandY',
      id: 'product#2_product',
    },
    {
      pk: 'user#100',
      sk: 'user',
      address: '123 Elm Street, Springfield, IL',
      phone: '+1234567890',
      dob: '1990-05-15',
      last_name: 'Doe',
      registered_date: '2021-06-01',
      first_name: 'John',
      email: 'johndoe@example.com',
      id: 'user#100_user',
    },
    {
      pk: 'user#101',
      sk: 'user',
      address: '456 Oak Avenue, Springfield, IL',
      phone: '+0987654321',
      dob: '1988-09-25',
      last_name: 'Smith',
      registered_date: '2020-02-20',
      first_name: 'Jane',
      email: 'janesmith@example.com',
      id: 'user#101_user',
    },
  ],
};
// const result = records?.data.filter((item, index) => {
//   for (const filter in selectedFilters) {
//     if (selectedFilters[filter].length>0 && intersection(selectedFilters[filter], [item[filter]]).length === 0) {
//       return false;
//     }
//   }
//   return true;
// });
const result = partition(
  [
    'pk',
    'sk',
    'order_date',
    'user_id',
    'total_amount',
    'order_id',
    'status',
    '__internalId__',
    'release_date',
    'price',
    'name',
    'description',
    'category',
    'stock',
    'brand',
    'address',
    'phone',
    'dob',
    'last_name',
    'registered_date',
    'first_name',
    'email',
  ],
  (x) => {
    return ('entity' || '').split(',').includes(x);
  }
);
console.log({ result });
