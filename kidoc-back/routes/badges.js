const express = require('express');
const connection = require('../conf.js');

const router = express.Router();


/* GET ALL BADGES */

router.get('/',(req, res) =>{
    connection.query('SELECT * from badge', (err, results) => {
      if (err) {
        res.status(500).send('Erreur lors de la récupération des badges');
      } else {
        res.status(200).json(results);
      }
    });
});

/* GET A BADGE BY ID */

router.get('/:id', (req, res) => {
    const idBadges = req.params.id;
    connection.query('SELECT * from badge WHERE id = ?', [idBadges], (err, results) => {
      if (err) {
        res.status(500).send(`Erreur lors de la récupération d'un badge`);
      } 
      if (results.length === 0) {
        return res.status(404).send('Badge non trouvé');
      } else {
        res.json(results[0]);
      }
    });
});

/* POST A BADGE */

router.post('/', (req, res) => {
    const formData = req.body;
    if (formData.title == null || formData.title === '') {
      res.status(400).send("Le nom du badge est mal renseigné");
    } else {
      connection.query('INSERT INTO badge SET ?', formData, (err, results) => {
        if (err) {
          console.log(err);
          res.status(500).send("Erreur lors de la sauvegarde d'un badge");
        } else {
          res.status(201).send({...formData});
        }
      });
    }
});

/* PUT A BADGE BY ID */

router.put('/:id', (req, res) => {
    const idBadges = req.params.id;
    const formData = req.body;
    if (formData.title == null || formData.title === '') {
      res.status(400).send("Les données sont mal renseignées");
    } else {
      connection.query('UPDATE badge SET ? WHERE id=?' , [formData, idBadges], (err, results) => {
        if (err) {
          console.log(err);
          res.status(500).send("Erreur lors de la sauvegarde d'un badge");
        } else {
          res.status(200).send({...formData});
        }
      });
    }
});

/* DELETE A BADGE BY ID */

router.delete('/:id', (req, res) => {
    const idBadges = req.params.id;
    connection.query('DELETE FROM badge WHERE id = ?', idBadges, err => {
      if (err) {
        console.log(err)
        return res.status(500).send(`Erreur lors de la suppression d'un badge`);
      } else {
        res.status(204).send(`Badge supprimé`);
      }
    });
});

module.exports = router;