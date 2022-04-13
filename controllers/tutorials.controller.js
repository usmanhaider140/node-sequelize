const db = require("../models");
const Tutorial = db.tutorial;

exports.create = async (req, res) => {
  try {
    if (!req.body.title) {
      return res.status(400).send({
        message: "Title can not be empty",
      });
    }
    console.log(req.body);

    const tutorial = {
      title: req.body.title,
      description: req.body.description,
      published: req.body.published ? req.body.published : false,
    };

    const newTutorial = await Tutorial.create(tutorial);

    res.send(newTutorial);
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Tutorial.",
    });
  }
};

exports.findAll = async (req, res) => {
  try {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
    const tutorials = Tutorial.findAll({ where: condition });
    res.send(tutorials);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving tutorials.",
    });
  }
};

exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const tutorial = await Tutorial.findByPk(id);
    if (tutorial) {
      res.send(tutorial);
    } else {
      res.status(404).send({
        message: `Tutorial with id ${id} not found.`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error retrieving Tutorial with id=" + id,
    });
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedTutorial = await Tutorial.update(req.body, {
      where: { id: id },
    });

    if (updatedTutorial[0] === 1) {
      res.send({
        message: `Tutorial with id ${id} was updated successfully.`,
      });
    } else {
      res.send({
        message: `Cannot update Tutorial with id ${id}. Maybe Tutorial was not found or req.body is empty!`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error updating Tutorial with id=" + id,
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const tutorial = await Tutorial.findByPk(id);
    if (tutorial) {
      await tutorial.destroy();
      res.send({
        message: `Tutorial with id ${id} was deleted successfully.`,
      });
    } else {
      res.send({
        message: `Cannot delete Tutorial with id ${id}. Maybe Tutorial was not found!`,
      });
    }
  } catch (error) {}
};

exports.deleteAll = async (req, res) => {
  try {
    const tutorials = await Tutorial.destroy({
      where: {},
      truncate: false,
    });

    if (tutorials) {
      res.send({
        message: `All tutorials were deleted successfully.`,
      });
    } else {
      res.send({
        message: `Cannot delete all tutorials. Maybe Tutorials were not found!`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error deleting tutorials!",
    });
  }
};

exports.findAllPublished = async (req, res) => {
  try {
    const publishedTutorials = await Tutorials.findAll({
      where: { published: true },
    });
    if (publishedTutorials) {
      res.send(publishedTutorials);
    } else {
      res.send({
        message: `Cannot find any published tutorials.`,
      });
    }
  } catch (error) {}
};
