import app from './app.js';
import config from './config.js';

const port = config.port || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`); 
});