import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import User from './User';
import Project from './Project';

class Task extends Model {
  public id!: number;
  public title!: string;
  public description?: string;
  public priority!: 'urgent' | 'normal' | 'low';
  public status!: 'todo' | 'in-progress' | 'review' | 'done';
  public projectId!: number;
  public assigneeId?: number;
  public dueDate?: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Task.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
      validate: {
        len: [1, 200],
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    priority: {
      type: DataTypes.ENUM('urgent', 'normal', 'low'),
      allowNull: false,
      defaultValue: 'normal',
    },
    status: {
      type: DataTypes.ENUM('todo', 'in-progress', 'review', 'done'),
      allowNull: false,
      defaultValue: 'todo',
    },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'projects',
        key: 'id',
      },
    },
    assigneeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'tasks',
    timestamps: true,
    indexes: [
      {
        fields: ['projectId'],
      },
      {
        fields: ['assigneeId'],
      },
      {
        fields: ['status'],
      },
      {
        fields: ['priority'],
      },
    ],
  }
);

export default Task; 