module.exports = (sequelize, Sequelize) => {
  const Tutorial = sequelize.define(
    "tutorial",
    {
      title: {
        type: Sequelize.STRING,
        defaultValue: "",
      },
      description: {
        type: Sequelize.STRING,
        defaultValue: "No description",
      },
      published: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      timestamps: false,
    }
  );
  return Tutorial;
};
