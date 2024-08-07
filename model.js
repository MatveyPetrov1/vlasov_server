const { model, Schema } = require("mongoose");

const applicationSchema = new Schema(
  {
    name: {
      required: true,
      type: String,
    },
    number: {
      required: true,
      type: String,
    },
    service: {
      required: true,
      type: String,
    },
    city: {
      required: true,
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Application", applicationSchema);
