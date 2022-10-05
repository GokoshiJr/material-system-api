const { faker } = require('@faker-js/faker');
const User = require('../models/User');
const Employee = require('../models/Employee');
const Role = require('../models/Role');

async function seedUserAndEmployee(randomSeed, numFakeUsers) {
  try {
    if (randomSeed) faker.seed(randomSeed);

    for (let i=0; i<numFakeUsers; i++) {

      const name = faker.name.findName();
      const lastName = faker.name.lastName();

      // generacion aleatoria de usuarios
      const newUser = new User({
        email: faker.internet.email(name, lastName),
        lastConnection: faker.date.between('2022-10-04T00:00:00.000Z','2022-11-04T00:00:00.000Z'),
        password: await User.encryptPassword('password'),
        roles: await Role.find({name: "user"})
      })
      const user = await newUser.save();

      // generacion aleatoria de empleados
      const newEmployee = new Employee({
        name,
        lastName,
        accessState: true,
        birthDate: faker.date.birthdate(),
        socialId: faker.random.numeric(8),
        phoneNumber: faker.phone.number('+58424#######'),
        // imgUrl: faker.image.people(),
        userId: user._id
      })
      await newEmployee.save();

    }
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  seedUserAndEmployee
}
