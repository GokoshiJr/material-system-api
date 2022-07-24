const fs = require('fs').promises;
const User = require('../models/User');
const path = require('path');
const Employee = require('../models/Employee');

// return all products
async function index(req, res) {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

// return employee by id
async function show(req, res) {
  try {
    const employee = await Employee.findById(req.params.id);
    res.json(employee);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

// create employee
async function store(req, res) {
  try {
    const { name, lastName, birthDate, socialId, phoneNumber, imgUrl, userId } = req.body;
    const employee = new Employee({
      name,
      lastName,
      birthDate,
      socialId,
      phoneNumber,
      imgUrl,
      userId
    });
    if (req.file) {
      const { filename } = req.file;
      employee.setImgUrl(filename)
    }
    if (userId) {
      const foundUser = await User.findById(userId)
      employee.userId = foundUser._id
    }
    await employee.save();
    res.json({ status: "Employee created" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

// update product by id
async function update(req, res) {
  try {
    const {
      name,
      lastName,
      accessState,
      birthDate,
      socialId,
      phoneNumber,
      userId
    } = req.body;
    const updateEmployee = {
      name,
      lastName,
      accessState,
      birthDate,
      socialId,
      phoneNumber,
      userId
    };
    if (userId) {
      const foundUser = await User.findById(userId)
      updateEmployee.userId = foundUser._id
    }
    const employee = await Employee.findByIdAndUpdate(req.params.id, updateEmployee);
    if (req.file) {
      // si envian una img nueva, eliminamos la nueva
      const image = employee.imgUrl.split('/');
      await fs.unlink(path.join(__dirname + `/../storage/img/${image[image.length-1]}`));
      // guardamos la nueva y seteamos la url
      const { filename } = req.file;
      employee.setImgUrl(filename);
      await Employee.findByIdAndUpdate(req.params.id, employee);
    }
    res.json({ status: "Employee updated" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

// delete employee by id
async function destroy(req, res) {
  try {
    const employee = await Employee.findByIdAndRemove(req.params.id);
    if (employee.imgUrl) {
      const image = employee.imgUrl.split('/');
      await fs.unlink(path.join(__dirname + `/../storage/img/${image[image.length-1]}`))
    }
    res.json({ status: "Employee deleted" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

module.exports = {
  index,
  show,
  store,
  update,
  destroy
}
