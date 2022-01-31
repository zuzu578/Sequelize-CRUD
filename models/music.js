module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    'music',
    {
      idx:{
        type: DataTypes.BIGINT(),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,

      },
      title:{
        type: DataTypes.TEXT(), 
        allowNull: true,
        defaultValue: "",
      },
      type:{
         type: DataTypes.TEXT(), 
      },
      level:{
        type: DataTypes.BIGINT(),
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