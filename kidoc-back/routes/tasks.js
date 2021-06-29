const express = require('express');
const connection = require('../conf');

const router = express.Router();

/* GET ALL TASKS */

router.get('/',(req, res) =>{
    connection.query('SELECT * from task', (err, results) => {
      if (err) {
        res.status(500).send('Erreur lors de la récupération des tâches');
      } else {
        res.status(200).json(results);
      }
    });
});

/* GET A TASK BY ID */

router.get('/:id', (req, res) => {
    const idTasks = req.params.id;
    connection.query('SELECT * from task WHERE child_id = ?', [idTasks], (err, results) => {
      if (err) {
        res.status(500).send(`Erreur lors de la récupération d'une tâche`);
      } 
      if (results.length === 0) {
        return res.status(404).send('Tâche non trouvée');
      } else {
        res.json(results);
      }
    });
});

/* POST A TASK */

router.post('/', (req, res) => {
    const formData = req.body;
    if (formData.title == null || formData.title === '') {
      res.status(400).send("Le nom de la tâche est mal renseignée");
    } else {
      connection.query('INSERT INTO task SET ?', formData, (err, results) => {
        if (err) {
          console.log(err);
          res.status(500).send("Erreur lors de la sauvegarde d'une tâche");
        } else {
          res.status(201).send({...formData, id: results.insertId});
        }
      });
    }
});

/* PUT A TASK BY ID */

router.put('/:id', (req, res) => {
    const idTasks = req.params.id;
    const formData = req.body;
    if (formData.title == null || formData.title === '') {
      res.status(400).send("Les données sont mal renseignées");
    } else {
      connection.query('UPDATE task SET ? WHERE id=?' , [formData, idTasks], (err, results) => {
        if (err) {
          console.log(err);
          res.status(500).send("Erreur lors de la sauvegarde d'une tâche");
        } else {
          res.status(200).send({...formData});
        }
      });
    }
});

/* DELETE A TASK BY ID */

router.delete('/:id', (req, res) => {
    const idTasks = req.params.id;
    connection.query('DELETE FROM task WHERE id = ?', idTasks, err => {
      if (err) {
        res.status(500).send(`Erreur lors de la suppression d'une tâche`);
      } else {
        res.status(204);
      }
    });
});

module.exports = router;