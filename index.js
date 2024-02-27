const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require('method-override');
const {v4: uuid} = require('uuid');
let a = 9
//dummy array instead of DB
let blogs = [
    {
        id: uuid(),
        username: "Priya Sharma",
        blogTitle: "Exploring the Benefits of Cloud Storage",
        blog: ["Hey everyone! I'm Priya Sharma, a graphic designer based in Mumbai, and I'm here to share with you the wonders of cloud storage. As a freelancer, my work is my life, and having access to my files from anywhere is a game-changer. Thanks to cloud storage services like Google Drive and Dropbox, I can effortlessly collaborate with clients and colleagues, no matter where I am.", 
        "One of the best things about cloud storage is the peace of mind it brings. With my files securely backed up on remote servers, I no longer have to worry about losing important data to hardware failures or accidents. Plus, with scalable storage plans, I can adjust my storage needs as my business grows without any hassle.", 
        "So, if you're a creative professional like me, embracing cloud storage could revolutionize your workflow and give you the freedom to work from anywhere. Trust me, it's a game-changer!"]
    },
    {
        id: uuid(),
        username: "Raj Patel",
        blogTitle: "The Rise of Smart Home Technology",
        blog: ["Hey there, tech enthusiasts! Raj Patel here, reporting from Delhi, and I'm here to talk to you about smart home technology. My home has become a futuristic oasis, all thanks to smart devices. From voice-controlled assistants to smart thermostats, my home is now more convenient and automated than ever before.", "But it's not just about convenience. Smart home technology has also made my home safer with features like smart security cameras that allow me to monitor my home remotely. And let's not forget about energy savings – my smart lighting system adjusts the brightness based on natural light levels, helping me save on electricity bills.", "With smart home technology, the possibilities are endless. So, if you're ready to embrace the future, I highly recommend turning your home into a smart home. Trust me, you won't regret it!"]
    },
    {
        id: uuid(),
        username: "Anil Kumar",
        blogTitle: "The Importance of Cybersecurity in the Digital Age",
        blog: ["Hello, fellow netizens! Anil Kumar here, a small business owner from Bangalore, and I'm here to talk to you about cybersecurity. Last year, my company experienced a cyberattack that taught me the importance of cybersecurity the hard way. Since then, I've made it my mission to prioritize cybersecurity in my business.", "From robust firewall and antivirus software to regular employee training sessions, I'm doing everything I can to protect my business from cyber threats. And let me tell you, it's worth every penny. Not only am I safeguarding my business, but I'm also earning the trust and loyalty of my customers.", " So, if you're a business owner like me, don't wait until it's too late. Invest in cybersecurity measures today and protect your business from cyber threats. Trust me, it's one investment you won't regret!"]
    },
    {
        id: uuid(),
        username: "Neha Verma",
        blogTitle: "Embracing the Era of Wearable Technology",
        blog: ["Hey everyone! Neha Verma here, coming to you from Chennai, and today, I'm talking all about wearable technology. As a software engineer with a passion for fitness, wearable devices have become an essential part of my daily life.", "From smartwatches to fitness trackers, these devices keep me connected and motivated throughout the day. Whether it's tracking my steps or monitoring my heart rate during workouts, wearable tech has truly revolutionized the way I approach fitness and wellness.", "But it's not just about fitness – wearable tech has also simplified my daily tasks. From receiving notifications on the go to tracking my sleep patterns, these devices have made my life so much easier. So, if you're looking to level up your lifestyle, I highly recommend giving wearable tech a try. Trust me, you won't be disappointed!"]
    },
];


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method')); //method overriding from post to patch


//Root route
app.get('/', (req,res) => {
    // res.send("Root route welcomes you to this page !!");
    res.render("navLinks/home");
})

// 
app.get('/about', (req, res) => {
    res.render('navLinks/about');
})

// 
app.get('/contact', (req, res) => {
    res.render('navLinks/contact')
})

//Task 1: Display all the blogs
app.get('/blogs', (req,res) => {
    res.render('index', {blogs})
})

//Task 2: Show a form for adding a blog
app.get('/blog/new', (req,res) => {
    res.render('new')
})

//Task 3: Add new blog to database then redirect
app.post('/blogs', (req,res) => {
    let {username, blogTitle, blog} = req.body;
    blog = blog.split("\n");
    blogs.push({id: uuid(), username, blogTitle, blog});
    res.redirect("/blogs");
})

//Task 4: Show information about one particular blog
app.get('/blogs/:id', (req,res) => {
    let {id} = req.params;
    let foundBlogObj = blogs.find( (blogTitle) => blogTitle.id === id );
    res.render("show", {foundBlogObj});
})

//Task 5: Show a form for editing a particular blog
app.get('/blogs/:id/edit', (req,res) => {
    let {id} = req.params;
    let foundBlogObj = blogs.find( (blogTitle) => blogTitle.id === id ); 
    res.render("edit", {foundBlogObj});
}) 

//Task 6: Actually updating blogTitle in database then redirect
app.patch("/blogs/:id", (req,res) => {
    let {id} = req.params;
    let foundBlogObj = blogs.find( (blogTitle) => blogTitle.id == id ); 
    let {blogTitle, blog} = req.body;
    blog = blog.split("\n");
    foundBlogObj.blogTitle = blogTitle; //changing already present data to new entered data
    foundBlogObj.blog = blog;
    res.redirect("/blogs");
})

//Task 7: Delete a particular blog
app.delete("/blogs/:id", (req,res) => {
    let {id} = req.params;
    let newArr = blogs.filter( (blogTitle) => blogTitle.id != id );
    blogs = newArr;
    res.redirect('/blogs')
})

app.listen(8080, () => {
    console.log("Server connected successfully at port 8080 !!")
})