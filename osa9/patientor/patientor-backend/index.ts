import express from 'express';
import diagnoseRouter from './src/routes/diagnoseRoute';
import patientRouter from './src/routes/patientsRoute';
const cors = require('cors');


const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
    console.log('pinged');
  res.send('pong');
});

app.use('/api/diagnoses', diagnoseRouter);
app.use('/api/patients', patientRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});