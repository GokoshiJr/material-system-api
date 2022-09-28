const { faker } = require('@faker-js/faker/locale/es_MX');
const Client = require('../models/Client');

async function seedClient(randomSeed, numFake) {
  try {
    if (randomSeed) faker.seed(randomSeed);
    for (let i=0; i<numFake; i++) {
      const name = faker.name.findName();
      const lastName = faker.name.lastName();
      // generacion aleatoria de usuarios
      const newClient = new Client({
        name,
        lastName,
        email: faker.internet.email(name, lastName),
        phoneNumber: faker.phone.number(
          faker.helpers.arrayElement(['+58 424 ### ####', '+58 414 ### ####'])
        ),
        userAccount: faker.internet.userName(name, lastName),
        password: await Client.encryptPassword('password'),
        socialPlatform: faker.helpers.arrayElement(['Facebook', 'Instagram']),
        associated: faker.helpers.arrayElement([true, false])
      })
      await newClient.save();

    }
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  seedClient
}
