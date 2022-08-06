const { faker } = require('@faker-js/faker');
const InductionAccount = require('../models/InductionAccount');
const Employee = require('../models/Employee');
const VinculationAccount = require('../models/Induction/VinculationAccount');
const PaymentMethod = require('../models/Induction/PaymentMethod');
const OperationPoint = require('../models/Induction/OperationPoint');
const WorkingGroupCreation = require('../models/Induction/WorkingGroupCreation');
const Platform = require('../models/Induction/Platform');
const LinkPost = require('../models/Induction/LinkPost');
const Destination = require('../models/Induction/Destination');
const LinkExplain = require('../models/Induction/LinkExplain');
const UbicationImportance = require('../models/Induction/UbicationImportance');
const Segmentation = require('../models/Induction/Segmentation');
const AudienceDefinition = require('../models/Induction/AudienceDefinition');

async function randomIdElement(model, modelCount) {
  try {
    let random = Math.floor(Math.random() * modelCount);
    let { _id } = await model.findOne().skip(random);
    return _id;
  } catch (err) {
    console.log(err);
  }
}

async function seedInductionAccount(randomSeed, numFake) {
  try {
    if (randomSeed) faker.seed(randomSeed);

    const employeeCount = await Employee.count();
    if (employeeCount === 0) return;

    const VinculationAccountCount = await VinculationAccount.count();
    const PaymentMethodCount = await PaymentMethod.count();
    const OperationPointCount = await OperationPoint.count();
    const WorkingGroupCreationCount = await WorkingGroupCreation.count();
    const PlatformCount = await Platform.count();
    const LinkPostCount = await LinkPost.count();
    const DestinationCount = await Destination.count();
    const LinkExplainCount = await LinkExplain.count();
    const UbicationImportanceCount = await UbicationImportance.count();
    const SegmentationCount = await Segmentation.count();
    const AudienceDefinitionCount = await AudienceDefinition.count();

    for (let i=0; i<numFake; i++) {
      const newInductionAccount = new InductionAccount({
        employeeId: await randomIdElement(Employee, employeeCount),
        inductionAccount: faker.internet.userName(),
        vinculationAccountId: faker.helpers.arrayElements([
          await randomIdElement(VinculationAccount, VinculationAccountCount)
        ]),
        paymentMethodId: faker.helpers.arrayElements([
          await randomIdElement(PaymentMethod, PaymentMethodCount)
        ]),
        operationPointId: faker.helpers.arrayElements([
          await randomIdElement(OperationPoint, OperationPointCount)
        ]),
        workingGroupCreationId: faker.helpers.arrayElements([
          await randomIdElement(WorkingGroupCreation, WorkingGroupCreationCount)
        ]),
        platformId: faker.helpers.arrayElements([
          await randomIdElement(Platform, PlatformCount)
        ]),
        linkPostId: faker.helpers.arrayElements([
          await randomIdElement(LinkPost, LinkPostCount)
        ]),
        destinationId: faker.helpers.arrayElements([
          await randomIdElement(Destination, DestinationCount)
        ]),
        linkExplainId: faker.helpers.arrayElements([
          await randomIdElement(LinkExplain, LinkExplainCount)
        ]),
        ubicationImportanceId: faker.helpers.arrayElements([
          await randomIdElement(UbicationImportance, UbicationImportanceCount)
        ]),
        segmentationId: faker.helpers.arrayElements([
          await randomIdElement(Segmentation, SegmentationCount)
        ]),
        audienceDefinitionId: faker.helpers.arrayElements([
          await randomIdElement(AudienceDefinition, AudienceDefinitionCount)
        ]),
        comment: faker.lorem.sentence(4)
      })
      await newInductionAccount.save();
    }
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  seedInductionAccount
}
