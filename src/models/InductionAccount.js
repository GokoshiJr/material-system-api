const mongoose = require('mongoose');
const { Schema } = mongoose;

const InductionAccountSchema = new Schema({
  employeeId: {
    type: Schema.Types.ObjectId,
    ref: "Employee",
    required: true
  },
  inductionAccount: {
    type: String,
    required: true
  },
  vinculationAccountId: [{
    type: Schema.Types.ObjectId,
    ref: "VinculationAccount"
  }],
  paymentMethodId: [{
    type: Schema.Types.ObjectId,
    ref: "PaymentMethod"
  }],
  operationPointId: [{
    type: Schema.Types.ObjectId,
    ref: "OperationPoint"
  }],
  workingGroupCreationId: [{
    type: Schema.Types.ObjectId,
    ref: "WorkingGroupCreation"
  }],
  platformId: [{
    type: Schema.Types.ObjectId,
    ref: "Platform"
  }],
  linkPostId: [{
    type: Schema.Types.ObjectId,
    ref: "LinkPost"
  }],
  destinationId: [{
    type: Schema.Types.ObjectId,
    ref: "Destination"
  }],
  linkExplainId: [{
    type: Schema.Types.ObjectId,
    ref: "LinkExplain"
  }],
  ubicationImportanceId: [{
    type: Schema.Types.ObjectId,
    ref: "UbicationImportanceId"
  }],
  segmentationId: [{
    type: Schema.Types.ObjectId,
    ref: "Segmentation"
  }],
  audienceDefinitionId: [{
    type: Schema.Types.ObjectId,
    ref: "audience_definition"
  }],
  comment: {
    type: String
  }
}, {
  timestamps: true,
  versionKey: false
});

module.exports = mongoose.model('induction_account', InductionAccountSchema);
