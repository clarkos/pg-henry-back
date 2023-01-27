Naming conventions for tables:

* Table names are singular nouns.
* Table names are capitalize.
* Every table has an "Id" field that is the PK:
```javascript
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'Id'
    } 
```
* Every table has the following options:
    {
        timestamps: false,
        freezeTableName: true
    }
* Field names are capitalize.
* Intermediate tables have its own file.
* Example with the dogs models:

```javascript
//breed.js:
const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('Breed', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: 'Id'
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      field: 'Name'
    },
    height: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'Height'
    },
    weight: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'Weight'
    },
    lifeSpan: {
      type: DataTypes.STRING(50),
      field: 'LifeSpan'
    },
    image: {
      type: DataTypes.STRING,
      field: 'Image'
    },
  }, {
    timestamps: false,
    freezeTableName: true
  });
};
```

```javascript
//temperament.js
const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define('Temperament', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            field: 'Id'
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            field: 'Name'
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });
}
```
```javascript
//breed-temperament.js
const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define('BreedTemperament', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            field: 'Id'
        },
    }, {
        timestamps: false,
        freezeTableName: true
    })
}
```