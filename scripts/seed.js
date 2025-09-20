const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import models
const Supplier = require('../src/models/Supplier');
const Product = require('../src/models/Product');

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected for seeding...');
  } catch (error) {
    console.error('Database connection error:', error.message);
    process.exit(1);
  }
};

// Sample data
const sampleSuppliers = [
  {
    name: 'ABC Electronics Ltd.',
    address: '123 Tech Street, Silicon Valley, CA 94000',
    phone: '+1 (555) 123-4567'
  },
  {
    name: 'Global Manufacturing Co.',
    address: '456 Industrial Ave, Detroit, MI 48201',
    phone: '+1 (313) 555-7890'
  },
  {
    name: 'Premium Supplies Inc.',
    address: '789 Business Blvd, New York, NY 10001',
    phone: '+1 (212) 555-2468'
  },
  {
    name: 'Tech Solutions Group',
    address: '321 Innovation Drive, Austin, TX 73301',
    phone: '+1 (512) 555-1357'
  },
  {
    name: 'Quality Components LLC',
    address: '654 Production Lane, Chicago, IL 60601',
    phone: '+1 (312) 555-9753'
  }
];

const sampleProducts = [
  {
    name: 'Laptop Computer',
    address: '789 Product Street, San Francisco, CA 94102',
    phone: '+1 (415) 555-1111'
  },
  {
    name: 'Smartphone Device',
    address: '456 Mobile Ave, Seattle, WA 98101',
    phone: '+1 (206) 555-2222'
  },
  {
    name: 'Tablet Computer',
    address: '123 Digital Blvd, Portland, OR 97201',
    phone: '+1 (503) 555-3333'
  },
  {
    name: 'Desktop Monitor',
    address: '321 Display Street, Denver, CO 80201',
    phone: '+1 (303) 555-4444'
  },
  {
    name: 'Wireless Headphones',
    address: '654 Audio Lane, Miami, FL 33101',
    phone: '+1 (305) 555-5555'
  },
  {
    name: 'Gaming Console',
    address: '987 Entertainment Ave, Las Vegas, NV 89101',
    phone: '+1 (702) 555-6666'
  },
  {
    name: 'Smart Watch',
    address: '147 Wearable Street, Phoenix, AZ 85001',
    phone: '+1 (602) 555-7777'
  },
  {
    name: 'Digital Camera',
    address: '258 Photo Blvd, Nashville, TN 37201',
    phone: '+1 (615) 555-8888'
  }
];

// Seed function
const seedDatabase = async () => {
  try {
    console.log('Starting database seeding...');
    
    // Clear existing data
    await Product.deleteMany({});
    await Supplier.deleteMany({});
    console.log('Cleared existing data');
    
    // Create suppliers
    const createdSuppliers = await Supplier.insertMany(sampleSuppliers);
    console.log(`Created ${createdSuppliers.length} suppliers`);
    
    // Create products with random supplier assignments
    const productsWithSuppliers = sampleProducts.map((product, index) => ({
      ...product,
      supplierId: createdSuppliers[index % createdSuppliers.length]._id
    }));
    
    const createdProducts = await Product.insertMany(productsWithSuppliers);
    console.log(`Created ${createdProducts.length} products`);
    
    // Display summary
    console.log('\n=== Seeding Summary ===');
    console.log(`Suppliers created: ${createdSuppliers.length}`);
    console.log(`Products created: ${createdProducts.length}`);
    
    // Show some sample data
    console.log('\n=== Sample Suppliers ===');
    createdSuppliers.forEach(supplier => {
      console.log(`- ${supplier.name} (${supplier.phone})`);
    });
    
    console.log('\n=== Sample Products ===');
    for (const product of createdProducts.slice(0, 3)) {
      const supplier = await Supplier.findById(product.supplierId);
      console.log(`- ${product.name} -> Supplier: ${supplier.name}`);
    }
    
    console.log('\n✅ Database seeding completed successfully!');
    console.log('You can now start the application with: npm run dev');
    
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // Close connection
    await mongoose.connection.close();
    console.log('Database connection closed');
    process.exit(0);
  }
};

// Run seeding
connectDB().then(() => {
  seedDatabase();
});
