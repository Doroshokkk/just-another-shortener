import app from './app.js';
import config from './config.js';
import sequelize from './sequelize.js';



const port = config.port || 3000;

sequelize.sync({ force: false }).then(() => {
  console.log('Models synchronized with the database');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`); 
});