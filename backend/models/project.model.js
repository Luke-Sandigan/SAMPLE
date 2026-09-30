// [PROJ-01]
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false,
});

const Project = sequelize.define('Project', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  createdBy: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

//it depends on kenji's structure of task model, so I will create a simple one here for demonstration purposes
// const Task = sequelize.define('Task', {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   title: DataTypes.STRING,
//   description: DataTypes.TEXT,
//   createdBy: DataTypes.INTEGER,
//   projectId: DataTypes.INTEGER,
// });

// Project.hasMany(Task, { foreignKey: 'projectId', as: 'tasks' });

// module.exports = { sequelize, Project, Task };