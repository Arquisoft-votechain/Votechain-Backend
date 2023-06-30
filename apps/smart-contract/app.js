const express = require('express');
const { exec } = require('child_process');

const app = express();
const port = 3000;

// Ruta para el despliegue del Smart Contract
app.post('/deploy', (req, res) => {
  // Ejecutar el comando de compilación y despliegue usando Hardhat
  exec('npx hardhat run --network sepolia scripts/deploy.js', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      res.status(500).json({ error: 'Error en el despliegue', message: error.message });
    } else {
      console.log(`Resultado: ${stdout}`);
      const contractDeployedIndex = stdout.indexOf('Contract deployed to:');
      const contractAddress = stdout.slice(contractDeployedIndex + 'Contract deployed to:'.length).trim();
      res.status(200).json({ 
        message: 'Contrato desplegado exitosamente',
        contractAddress: contractAddress
      });
    }
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor API escuchando en http://localhost:${port}`);
});