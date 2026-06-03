const express = require('express');
const app = express();

const PORT = 3000;

const apiRoutes = require('./routes/api');
const mainRoutes = require('./routes/mainRoutes');

app.use('/api', apiRoutes);
app.use('/', mainRoutes);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});