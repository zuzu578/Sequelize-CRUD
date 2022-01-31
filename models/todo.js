module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    'todo',
    {
      idx:{
        type: DataTypes.BIGINT(),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,

      },
      userIdx:{
        type: DataTypes.BIGINT(),
      },
      title:{
        type: DataTypes.TEXT(), 
        allowNull: true,
        defaultValue: "",
      },
      context:{
        type: DataTypes.TEXT(),
        allowNull: true,
        defaultValue: "",
      },
      status:{
          type:DataTypes.TINYINT(),
          allowNull : true,
          defaultValue : 0,
      },
      createdAt:{
        type:DataTypes.DATE(3),
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP(3)"),
        allowNull:true,
      },
      deletedAt:{
        type:DataTypes.DATE(3),
        allowNull:true,
      },
      updatedAt:{
        type:DataTypes.DATE(3),
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP(3)"),
        allowNull:true,
      },
      
    },
    {
      timestamps: true,
      paranoid: true,
    },
  );