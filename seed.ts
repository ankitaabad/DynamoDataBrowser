import { CreateTableCommand, DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';

// Create a DynamoDB client
const client = new DynamoDBClient({
  region: 'local',
  endpoint: 'http://localhost:8000', // For local DynamoDB
});

// Create a Document Client
const docClient = DynamoDBDocumentClient.from(client);

// Define the table name
const tableName = 'testTable3'; // Replace with your desired table name

// Define the data to seed
const seedData = [
  {
    pk: 'product#1',
    sk: 'product',
    entity: 'product',
    name: 'Laptop',
    category: 'Electronics',
    price: 999.99,
    stock: 20,
    brand: 'BrandX',
    release_date: '2023-01-15',
    processor: 'Intel i7',
    ram: '16GB',
    storage: '512GB SSD',
    screen_size: '15.6 inches',
    resolution: '1920x1080',
    features: ['High-performance', 'Portable', 'Long battery life'],
    weight: '2.5kg',
    dimensions: '35x25x2 cm'
  },
  {
    pk: 'product#2',
    sk: 'product',
    entity: 'product',
    name: 'Smartphone',
    category: 'Electronics',
    price: 799.99,
    stock: 50,
    brand: 'BrandY',
    release_date: '2023-03-10',
    processor: 'Snapdragon 8 Gen 1',
    ram: '8GB',
    storage: '128GB',
    camera: '108MP',
    screen_size: '6.7 inches',
    features: ['Powerful camera', 'Fast performance', '5G support'],
    warranty: '2 years',
    weight: '0.5kg',
    dimensions: '16x8x1 cm'
  },
  {
    pk: 'product#3',
    sk: 'product',
    entity: 'product',
    name: 'Tablet',
    category: 'Electronics',
    price: 399.99,
    stock: 30,
    brand: 'BrandZ',
    release_date: '2023-06-01',
    processor: 'Apple A14 Bionic',
    ram: '4GB',
    storage: '64GB',
    screen_size: '10.2 inches',
    resolution: '2160x1620',
    features: ['Great for reading', 'Lightweight', 'Supports Apple Pencil'],
    weight: '0.8kg',
    dimensions: '25x18x1 cm'
  },
  {
    pk: 'product#4',
    sk: 'product',
    entity: 'product',
    name: 'Smartwatch',
    category: 'Wearables',
    price: 199.99,
    stock: 80,
    brand: 'BrandA',
    release_date: '2023-02-10',
    battery_life: '48 hours',
    heart_rate_monitor: true,
    water_resistant: '50m',
    screen_size: '1.5 inches',
    features: ['Health tracking', 'GPS', 'Notifications'],
    weight: '0.2kg',
    dimensions: '10x8x3 cm'
  },
  {
    pk: 'product#5',
    sk: 'product',
    entity: 'product',
    name: 'Headphones',
    category: 'Accessories',
    price: 149.99,
    stock: 100,
    brand: 'BrandB',
    release_date: '2023-05-20',
    type: 'Over-ear',
    battery_life: '20 hours',
    noise_cancelling: true,
    connection: 'Bluetooth',
    features: ['Noise-cancelling', 'Comfortable', 'High-quality sound'],
    weight: '0.5kg',
    dimensions: '15x18x5 cm'
  },
  {
    pk: 'user#100',
    sk: 'user',
    entity: 'user',
    first_name: 'John',
    last_name: 'Doe',
    email: 'johndoe@example.com',
    phone: '+1234567890',
    street: '123 Elm Street',
    city: 'Springfield',
    state: 'IL',
    zip: '62701',
    dob: '1990-05-15',
    registered_date: '2021-06-01',
    notifications: true,
    marketing_emails: false,
    account_status: 'active'
  },
  {
    pk: 'user#101',
    sk: 'user',
    entity: 'user',
    first_name: 'Jane',
    last_name: 'Smith',
    email: 'janesmith@example.com',
    phone: '+0987654321',
    street: '456 Oak Avenue',
    city: 'Springfield',
    state: 'IL',
    zip: '62702',
    dob: '1988-09-25',
    registered_date: '2020-02-20',
    notifications: false,
    marketing_emails: true,
    account_status: 'inactive'
  },
  {
    pk: 'user#102',
    sk: 'user',
    entity: 'user',
    first_name: 'Alice',
    last_name: 'Johnson',
    email: 'alice.johnson@example.com',
    phone: '+1122334455',
    street: '789 Pine Road',
    city: 'Chicago',
    state: 'IL',
    zip: '60601',
    dob: '1985-12-11',
    registered_date: '2019-07-05',
    notifications: true,
    marketing_emails: true,
    account_status: 'active'
  },
  {
    pk: 'user#103',
    sk: 'user',
    entity: 'user',
    first_name: 'Charlie',
    last_name: 'Brown',
    email: 'charlie.brown@example.com',
    phone: '+2233445566',
    street: '321 Birch Lane',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    dob: '1992-03-22',
    registered_date: '2021-09-15',
    notifications: true,
    marketing_emails: false,
    account_status: 'suspended'
  },
  {
    pk: 'order#500',
    sk: 'order',
    entity: 'order',
    order_id: '500',
    user_id: '100',
    order_date: '2023-04-10',
    total_amount: 1799.98,
    status: 'shipped',
    items: [
      {
        product_id: 'product#1',
        quantity: 1,
        price: 999.99
      },
      {
        product_id: 'product#2',
        quantity: 1,
        price: 799.99
      }
    ],
    shipping_address: '123 Elm Street, Springfield, IL',
    shipping_method: 'Standard',
    shipping_cost: 15.00
  },
  {
    pk: 'order#501',
    sk: 'order',
    entity: 'order',
    order_id: '501',
    user_id: '101',
    order_date: '2023-05-15',
    total_amount: 299.99,
    status: 'processing',
    items: [
      {
        product_id: 'product#4',
        quantity: 1,
        price: 199.99
      },
      {
        product_id: 'product#5',
        quantity: 1,
        price: 149.99
      }
    ],
    shipping_address: '456 Oak Avenue, Springfield, IL',
    shipping_method: 'Express',
    shipping_cost: 25.00
  },
  {
    pk: 'order#502',
    sk: 'order',
    entity: 'order',
    order_id: '502',
    user_id: '102',
    order_date: '2023-06-30',
    total_amount: 449.99,
    status: 'delivered',
    items: [
      {
        product_id: 'product#3',
        quantity: 1,
        price: 399.99
      },
      {
        product_id: 'product#7',
        quantity: 1,
        price: 29.99
      }
    ],
    shipping_address: '789 Pine Road, Chicago, IL',
    shipping_method: 'Standard',
    shipping_cost: 10.00
  },
  {
    pk: 'order#503',
    sk: 'order',
    entity: 'order',
    order_id: '503',
    user_id: '103',
    order_date: '2023-07-01',
    total_amount: 529.99,
    status: 'shipped',
    items: [
      {
        product_id: 'product#2',
        quantity: 2,
        price: 799.99
      }
    ],
    shipping_address: '321 Birch Lane, New York, NY',
    shipping_method: 'Overnight',
    shipping_cost: 50.00
  },
  {
    pk: 'product#6',
    sk: 'product',
    entity: 'product',
    name: 'Keyboard',
    category: 'Accessories',
    price: 79.99,
    stock: 150,
    brand: 'BrandC',
    release_date: '2023-07-15',
    type: 'Mechanical',
    rgb_lighting: true,
    weight: '0.7kg',
    dimensions: '40x15x3 cm'
  },
  {
    pk: 'product#7',
    sk: 'product',
    entity: 'product',
    name: 'Wireless Mouse',
    category: 'Accessories',
    price: 29.99,
    stock: 200,
    brand: 'BrandD',
    release_date: '2023-08-05',
    type: 'Wireless',
    dpi: '1600',
    weight: '0.1kg',
    dimensions: '12x8x4 cm'
  },
  {
    pk: 'product#8',
    sk: 'product',
    entity: 'product',
    name: 'Bluetooth Speaker',
    category: 'Electronics',
    price: 69.99,
    stock: 75,
    brand: 'BrandE',
    release_date: '2023-09-01',
    wireless_range: '10m',
    battery_life: '12 hours',
    weight: '0.4kg',
    dimensions: '20x7x5 cm'
  }
]


// Function to create the table
const createTable = async () => {
  try {
    const command = new CreateTableCommand({
      TableName: tableName,
      KeySchema: [
        { AttributeName: 'pk', KeyType: 'HASH' }, // Partition key
        { AttributeName: 'sk', KeyType: 'RANGE' },
      ],
      AttributeDefinitions: [
        { AttributeName: 'pk', AttributeType: 'S' }, // 'S' for String
        { AttributeName: 'sk', AttributeType: 'S' }, // 'S' for String
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5,
      },
    });
    const data = await client.send(command);
    console.log('Table created successfully:', data);
  } catch (error) {
    if (error.name === 'ResourceInUseException') {
      console.log('Table already exists, skipping creation.');
    } else {
      console.error('Failed to create table:', error);
      throw error; // Rethrow for further handling
    }
  }
};

// Function to seed the database
const seedDatabase = async () => {
  for (const item of seedData) {
    const params = {
      TableName: tableName,
      Item: item,
    };

    try {
      const command = new PutCommand(params);
      await docClient.send(command);
      console.log(`Successfully inserted item: ${JSON.stringify(item)}`);
    } catch (error) {
      console.error(`Failed to insert item: ${JSON.stringify(item)}`, error);
    }
  }
};

// Run the setup
const runSetup = async () => {
  await createTable();
  await seedDatabase();
  console.log('Seeding completed.');
};

// Execute the setup
runSetup()
  .then(() => process.exit(0)) // Exit the process after completion
  .catch((error) => {
    console.error('Error during setup:', error);
    process.exit(1);
  });
