const { faker } = require('@faker-js/faker');
const User = require('../models/User');
const Employee = require('../models/Employee');

async function seedUserAndEmployee(randomSeed, numFakeUsers) {
  try {
    if (randomSeed) faker.seed(randomSeed);
    for (let i=0; i<numFakeUsers; i++) {
      const name = faker.name.findName();
      const lastName = faker.name.lastName();
      // generacion aleatoria de usuarios
      const newUser = new User({
        email: faker.internet.email(name, lastName),
        lastConnection: faker.date.between('2020-01-01T00:00:00.000Z','2030-01-01T00:00:00.000Z'),
        password: await User.encryptPassword('password'),
        roles: ['62dd5a68fccaafaeb06b8dd9']
      })
      const user = await newUser.save();
      // generacion aleatoria de empleados
      const newEmployee = new Employee({
        name,
        lastName,
        accessState: true,
        birthDate: faker.date.birthdate(),
        socialId: faker.random.numeric(8),
        phoneNumber: faker.phone.number('+58 424 ### ####'),
        imgUrl: faker.image.people(),
        userId: [user._id]
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
