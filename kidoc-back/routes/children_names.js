const express = require('express');
const connection = require('../conf');

const router = express.Router();

/* GET ALL NAMES OF CHILDREN */

router.get('/',(req, res) =>{
    connection.query('SELECT firstname from child', (err, results) => {
      if (err) {
        res.status(500).send('Erreur lors de la récupération des noms des enfants');
      } else {
        res.status(200).json(results);
      }
    });
});

module.exports = router;