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
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            title: `${GetSample(descriptors)} ${GetSample(places)}`,
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            image: `https://picsum.photos/400?random=${Math.random()}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab sed cumque illo debitis iusto ducimus! Perspiciatis architecto suscipit quae voluptatibus, non, vitae rerum repellat sapiente reiciendis libero hic deleniti. Laudantium! Perspiciatis cupiditate voluptatibus fugit deleniti exercitationem itaque excepturi, eveniet minus expedita sed, totam velit soluta fuga aliquam ea esse porro molestias deserunt voluptatum doloribus. Quae quibusdam mollitia harum doloremque officia. Error nostrum fugiat voluptatibus consequuntur iure, nisi harum aspernatur laudantium officiis corporis explicabo minima omnis repellendus. Iusto iste est animi mollitia rem sapiente laborum ex iure nobis odit, repellat voluptatibus!',
            price
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})