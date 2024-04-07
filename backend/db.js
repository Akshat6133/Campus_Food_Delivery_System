const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://superkid:arora@cluster0.2dh01ss.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    const foodsCollection = mongoose.connection.db.collection("foods");                     // Fetch data from 'foods' collection
    const fetchedFoods = await foodsCollection.find({}).toArray();

    const foodCategoriesCollection = mongoose.connection.db.collection("food_categories");  // Fetch data from 'food_categories' collection
    const fetchedCategories = await foodCategoriesCollection.find({}).toArray();

    const shops = mongoose.connection.db.collection("Canteen");                             // Fetch data from 'Canteens' collection 
    const shopdata = await shops.find({}).toArray();

    const food_milkshakes = mongoose.connection.db.collection("add_items");                             // Fetch data from 'Canteens' collection 
    let milkshakes = await food_milkshakes.find({}).toArray();

    const food_milkshakesCat = mongoose.connection.db.collection("add_itemcats");                             // Fetch data from 'Canteens' collection 
    const milkshakesCat = await food_milkshakesCat.find({}).toArray();

    const web_users = mongoose.connection.db.collection("users");
    const users = await web_users.find({}).toArray();


    const owner_all = mongoose.connection.db.collection("admins");                             // Fetch data from 'Canteens' collection 
    const owners = await owner_all.find({}).toArray();

    global.foods = fetchedFoods;                                                            // Store fetched data in global variables or process further
    global.foodCategories = fetchedCategories;
    global.shops = shopdata;
    global.milkshakes = milkshakes;
    global.milkshakesCat = milkshakesCat;
    global.owners = owners;
    global.users = users;

  }
    catch (error) {
      console.error('MongoDB connection error:', error);
    }
};

module.exports = mongoDB;
