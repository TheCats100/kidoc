DROP DATABASE IF EXISTS KiDoc;

CREATE DATABASE KiDoc;

USE KiDoc;

/* Création des tables  */

CREATE TABLE `badge`(
	`id` INT NOT NULL AUTO_INCREMENT,
	`path` VARCHAR (255) NOT NULL,
    `title` VARCHAR (255) NOT NULL,
    `description` VARCHAR (255) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `child` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `firstname` VARCHAR (255) NOT NULL,
    `birth` DATE NOT NULL,
    `level` INTEGER NOT NULL,
    `password` VARCHAR(255),
    PRIMARY KEY (`id`)
);

CREATE TABLE `task` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `title` VARCHAR (255) NOT NULL,
    `hour` TIME NOT NULL,
    `check` BOOL NOT NULL,
    `child_id` INT(11),
    PRIMARY KEY (`id`)
);

/* Création des tables de jointure */

CREATE TABLE `child_badge` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `child_id` INT(11),
    `badge_id` INT(11),
    PRIMARY KEY (`id`)
);

/* Insertions */

INSERT INTO badge (`path`, `title`, `description`) VALUES 
('https://zupimages.net/up/20/26/44gu.png', 'Level 1', 'You\'ve reached level 1 !'), 
('https://zupimages.net/up/20/26/81g0.png', 'Level 2', 'You\'ve reached level 2 !'), 
('https://zupimages.net/up/20/26/15zu.png', 'Level 3', 'You\'ve reached level 3 !'),
('https://zupimages.net/up/20/26/hr5x.png', 'Level 4', 'You\'ve reached level 4 !'), 
('https://zupimages.net/up/20/26/k267.png', 'Level 5', 'You\'ve reached level 5 !'), 
('https://zupimages.net/up/20/26/2ian.png', 'Birthday', 'Use KiDoc on your birthday !'), 
('https://zupimages.net/up/20/26/ddnp.png', 'List 1', 'First list completed !'), 
('https://zupimages.net/up/20/26/ise0.png', 'List 2', 'Second list completed !'), 
('https://zupimages.net/up/20/26/jc6q.png', 'List 3', 'Third list completed !'), 
('https://zupimages.net/up/20/26/jf9h.png', 'On time', 'You took your medicine on time !'), 
('https://zupimages.net/up/20/26/l847.png', 'Welcome', 'It\'s your first day !');

INSERT INTO child (`firstname`, `birth`, `level`, `password`) VALUES ('John', '2010-01-25', 1, '123'), ('Marcus', '2010-01-25', 1, '123');

INSERT INTO task (`title`, `hour`, `check`, `child_id`) VALUES ('Morning treatment !', '08:00:00', false, 1), ('Lunchtime treatment !', '12:00:00', false, 1), ('Evening treatment !', '20:00:00', false, 1);

INSERT INTO child_badge (`child_id`, `badge_id`) VALUES (1,1), (1,2), (1,3), (1,4), (1,5);

/* Contraintes */

ALTER TABLE task
ADD CONSTRAINT `fk_task_child`
FOREIGN KEY (`child_id`)
REFERENCES `child`(`id`);

ALTER TABLE child_badge
ADD CONSTRAINT `fk_child_badge_child`
FOREIGN KEY (`child_id`)
REFERENCES `child`(`id`);

ALTER TABLE child_badge
ADD CONSTRAINT `fk_child_badge_badge`
FOREIGN KEY (`badge_id`)
REFERENCES `badge`(`id`);