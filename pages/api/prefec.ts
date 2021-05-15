import { Sequelize, Model, DataTypes } from 'sequelize';

const sequelize = new Sequelize({
  database: 'address',
  username: 'umehara',
  password: null,
  dialect: 'postgres',
  port: 5432,
  host: 'localhost',
  timezone: 'Asia/Tokyo',
});

class Address extends Model {}
Address.init({
  post: {type:DataTypes.STRING,primaryKey:true},
  prefectures: DataTypes.STRING,
  municipalities: DataTypes.STRING,
  address: DataTypes.STRING
}, { sequelize, modelName: 'address',freezeTableName:true,timestamps:false });

export default async(req, res) => {
  await sequelize.sync();
  console.log(await Address.count());
  
  const address = await Address.findOne({
    where: {
     prefectures: req.query['post'],
    }
  });
console.log(address)
  res.status(200).send(JSON.stringify(address))
}