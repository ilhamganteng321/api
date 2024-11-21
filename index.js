const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware untuk parsing JSON
app.use(express.json());

// Data sementara (mock database)
let patients = [
  { id: 1, name: "John Doe", age: 45, heartDisease: true },
  { id: 2, name: "Jane Doe", age: 30, heartDisease: false },
];

// GET semua pasien
app.get('/patients', (req, res) => {
  res.json(patients);
});

// GET pasien berdasarkan ID
app.get('/patients/:id', (req, res) => {
  const patient = patients.find(p => p.id === parseInt(req.params.id));
  if (!patient) return res.status(404).send("Patient not found");
  res.json(patient);
});

// POST tambah pasien baru
app.post('/patients', (req, res) => {
  const { name, age, heartDisease } = req.body;
  const newPatient = {
    id: patients.length + 1,
    name,
    age,
    heartDisease,
  };
  patients.push(newPatient);
  res.status(201).json(newPatient);
});

// PUT update data pasien
app.put('/patients/:id', (req, res) => {
  const patient = patients.find(p => p.id === parseInt(req.params.id));
  if (!patient) return res.status(404).send("Patient not found");

  const { name, age, heartDisease } = req.body;
  patient.name = name || patient.name;
  patient.age = age || patient.age;
  patient.heartDisease = heartDisease || patient.heartDisease;

  res.json(patient);
});

// DELETE hapus pasien berdasarkan ID
app.delete('/patients/:id', (req, res) => {
  const patientIndex = patients.findIndex(p => p.id === parseInt(req.params.id));
  if (patientIndex === -1) return res.status(404).send("Patient not found");

  patients.splice(patientIndex, 1);
  res.status(204).send();
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
