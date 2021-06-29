const express = require('express');
const connection = require('../conf');

const router = express.Router();

/* GET ALL CHILDREN */

router.get('/', (req, res) => {
  connection.query('SELECT * from child', (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération des enfants');
    } else {
      res.status(200).json(results);
    }
  });
});

/* GET A CHILD BY ID */

router.get('/:id', (req, res) => {
  const idChildren = req.params.id;
  connection.query('SELECT * from child WHERE id = ?', [idChildren], (err, results) => {
    if (err) {
      res.status(500).send(`Erreur lors de la récupération d'un enfant`);
    }
    if (results.length === 0) {
      return res.status(404).send('Enfant non trouvé');
    } else {
      res.json(results[0]);
    }
  });
});

/* POST A CHILD */

router.post('/', (req, res) => {
  const formData = req.body;
  if (formData.firstname == null || formData.firstname === '') {
    res.status(400).send("Le nom de l'enfant est mal renseigné");
  } else {
    connection.query('INSERT INTO child SET ?', formData, (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Erreur lors de la sauvegarde d'un enfant");
      } else {
        res.status(201).send({ ...formData });
      }
    });
  }
});

/* PUT A CHILD BY ID */

router.put('/:id', (req, res) => {
  const idChildren = req.params.id;
  const formData = req.body;
  connection.query('UPDATE child SET ? WHERE id=?', [formData, idChildren], (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la sauvegarde d'un enfant");
    } else {
      res.status(200).send({ ...formData });
    }
  });
});

/* DELETE A CHILD BY ID */

router.delete('/:id', (req, res) => {
  const idChildren = req.params.id;
  connection.query('DELETE FROM child WHERE id = ?', idChildren, err => {
    if (err) {
      res.status(500).send(`Erreur lors de la suppression d'un enfant`);
    } else {
      res.status(204);
    }
  });
});

module.exports = router;