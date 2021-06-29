const express = require('express');
const connection = require('../conf.js');

const router = express.Router();

/* GET ALL BADGES FOR ALL CHILDREN */

router.get('/',(req, res) =>{
    connection.query('SELECT * from child_badge', (err, results) => {
      if (err) {
        res.status(500).send('Erreur lors de la récupération des badges pour les enfants');
      } else {
        res.status(200).json(results);
      }
    });
});

/* GET ALL BADGES FOR ONE CHILDREN BY ID */

router.get('/:id', (req, res) => {
    const idChildren = req.params.id;
    connection.query('SELECT child_badge.child_id, child_badge.badge_id, badge.path, badge.title, badge.description FROM badge JOIN child_badge ON child_badge.badge_id=badge.id WHERE child_id = ?', [idChildren], (err, results) => {
      if (err) {
        res.status(500).send(`Erreur lors de la récupération des badges d'un enfant`);
      } 
      if (results.length === 0) {
        return res.status(404).send('Badges non trouvé');
      } else {
        res.json(results);
      }
    });
});

/* POST */

router.post('/', (req, res) => {
    const formData = req.body;
    if (formData.child_id == null || formData.child_id === '') {
      res.status(400).send("L'id est mal renseigné");
    } else {
      connection.query('INSERT INTO child_badge SET ?', formData, (err, results) => {
        if (err) {
          console.log(err);
          res.status(500).send("Erreur lors de la sauvegarde.");
        } else {
          res.status(201).send({...formData});
        }
      });
    }
});

/* PUT  BY ID*/

router.put('/:id', (req, res) => {
    const idBadges = req.params.id;
    const formData = req.body;
    if (formData.child_id == null || formData.child_id === '') {
      res.status(400).send("Les données sont mal renseignées");
    } else {
      connection.query('UPDATE child_badge SET ? WHERE id=?' , [formData, idBadges], (err, results) => {
        if (err) {
          console.log(err);
          res.status(500).send("Erreur lors de la sauvegarde");
        } else {
          res.status(200).send({...formData});
        }
      });
    }
});

/* DELETE BY ID*/

router.delete('/:id', (req, res) => {
    const idBadges = req.params.id;
    connection.query('DELETE FROM child_badge WHERE id = ?', idBadges, err => {
      if (err) {
        console.log(err)
        return res.status(500).send(`Erreur lors de la suppression.`);
      } else {
        res.status(204).send(`Suppression effectuée.`);
      }
    });
});

module.exports = router;
