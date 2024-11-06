const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { descriptors, places } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

// We don't need to seed our data very often, but when we do, it's because we've made changes to our model
// So, when we seed, we should delete everything first, then re-seed...

function GetSample(array) {
    return array[Math.floor(Math.random() * array.length)]; // gets the value of a random index of the array
}

// A shorter way to write the above method would be: const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({}); // deletes everything
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000); // picks a random location value
        const camp = new Campground({
            title: `${GetSample(descriptors)} ${GetSample(places)}`,
            location: `${cities[random1000].city}, ${cities[random1000].state}`
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})