import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../config/database";
import z from "zod";

interface UserAttributes {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  qrCode?: string;
  password: string;
  createdAt?: Date
}

// Optional fields for User creation
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  declare id: number;
  declare firstName: string;
  declare lastName: string;
  declare email: string;
  declare qrCode: string;
  declare password: string;
  declare createdAt: Date

}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    qrCode: {
      type: DataTypes.TEXT('long'),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false
    }
  },
  {
    timestamps: false,
    sequelize,
    modelName: "Users",
    freezeTableName: true,
  }
);

const UserSchema = z.object({
  id: z.number().min(1).nonnegative(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  qrCode: z.string(),
  password: z.string(),
  createdAt: z.date()

})

export type UserType =  z.infer<typeof UserSchema>

export { User };
