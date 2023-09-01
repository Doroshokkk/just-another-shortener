import app from './app';
import config from './config';
import sequelize from './sequelize';



const port = config.port || 3000;

sequelize.sync({ force: false }).then(() => {
  console.log('Models synchronized with the database');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`); 
});