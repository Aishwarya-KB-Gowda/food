const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Connect to MongoDB using the URL from the .env file
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Define Mongoose schemas (adjust fields according to your collections)
const PaymentOffer = mongoose.model('PaymentOffer', new mongoose.Schema({
  // Example fields, replace with actual fields
  offerName: String,
  discount: Number,
}));

const Order = mongoose.model('Order', new mongoose.Schema({
  orderId: String,
  amount: Number,
  userId: String,
}));

// Add models for other collections as needed...

// Insert data function
const insertData = async () => {
  try {
    // Read JSON files from the ./Database folder
    const paymentOffersData = JSON.parse(fs.readFileSync(path.join(__dirname, './Database/PaymentOffers.json')));
    const ordersData = JSON.parse(fs.readFileSync(path.join(__dirname, './Database/orders.json')));
    // Repeat for other collections

    // Insert data into MongoDB
    await PaymentOffer.insertMany(paymentOffersData);
    await Order.insertMany(ordersData);
    // Add insert for other collections here...

    console.log('Data inserted successfully!');
    mongoose.connection.close(); // Close connection after insertion
  } catch (error) {
    console.error('Error inserting data:', error);
  }
};

// Run the insert function
insertData();
