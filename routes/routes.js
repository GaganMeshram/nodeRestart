const express = require("express");
const router = express.Router();
exports.router = router;
const Model = require("../model/userModel");


// Rendering Home page.

router.get('/', (req, res) => {
  res.render('home',)
})

// rendering Add user page

router.get('/add-user', (req, res) => {
  res.render('addUser', {title: 'Add User'})
})

// renderong to edit user page

router.get('/edit-user', (req, res) => {
  res.render('editUser', {title: 'Edit User', data })
})
 
// getting all
router.get("/api", async (req, res) => {
  try {
    const data = await Model.find();
    res.render('userList', { title: 'Users', data })
    //res.json(data);
  } catch (error) {
    res.status(500).render('notFound', { title: 'Not Found' });
  }
});

// Posting Data
router.post("/api/", async (req, res) => {
  const data = new Model({
    name: req.body.name,
    age: req.body.age,
  });
  try {
    const dataToSave = await data.save();
    //res.status(200).json(dataToSave);
    res.redirect('/api') 
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// getting user by id
router.get("/api/:id", async (req, res) => {
  try {
    const userById = await Model.findById(req.params.id);
    res.render('editUser', { title: 'Edit Page', userById })
    // res.json(userById);
  } catch (error) {
    res.render('notFound', { title: 'Not Found' })
  }
});

// updating user by id
router.patch("/api/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };
    const result = await Model.findByIdAndUpdate(id, updatedData, options);
    const newData = await Model.find()
    res.render('userList', { data: newData })
  } catch (error) {
    res.status(400).json({ message: `User with ID: ${id} not found.` });
  }
});

router.delete("/api/:id", async (req, res) => {
  try {
    id = req.params.id;
    await Model.findByIdAndDelete(id);
    res.redirect('/api')
    //res.send(`User with ID ${id} has been deleted.`);
  } catch (error) {
    res.status(400).json({ message: `Could not find user with ID: ${id}` });
  }
});

module.exports = router;
