CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `occupation` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `Quizzes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 0,
  `created_by` varchar(100) NOT NULL,
  `date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `Questions` (
  `question_id` int(11) NOT NULL AUTO_INCREMENT,
  `question_text` text DEFAULT NULL,
  `quiz_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`question_id`),
  KEY `Questions_FK` (`quiz_id`),
  CONSTRAINT `Questions_FK` FOREIGN KEY (`quiz_id`) REFERENCES `Quizzes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `Question_choices` (
  `choice_id` int(11) NOT NULL AUTO_INCREMENT,
  `question_id` int(11) DEFAULT NULL,
  `is_correct` tinyint(1) DEFAULT NULL,
  `choice_text` text DEFAULT NULL,
  PRIMARY KEY (`choice_id`),
  KEY `question_id` (`question_id`),
  CONSTRAINT `Question_choices_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `Questions` (`question_id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `User_question_answers` (
  `user_id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `choice_id` int(11) DEFAULT NULL,
  `is_right` enum('0','1') DEFAULT NULL,
  `answer_time` datetime DEFAULT NULL,
  PRIMARY KEY (`user_id`,`question_id`),
  KEY `question_id` (`question_id`),
  KEY `choice_id` (`choice_id`),
  CONSTRAINT `User_question_answers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `User_question_answers_ibfk_2` FOREIGN KEY (`question_id`) REFERENCES `Questions` (`question_id`),
  CONSTRAINT `User_question_answers_ibfk_3` FOREIGN KEY (`choice_id`) REFERENCES `Question_choices` (`choice_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
SET character_set_client = @saved_cs_client;


DELIMITER ;;
CREATE  PROCEDURE `create_user`(
  IN firstName VARCHAR(255),
  IN lastName VARCHAR(255),
  IN email VARCHAR(255),
  IN password VARCHAR(255), 
  IN occupation VARCHAR(255)
)
BEGIN
  INSERT INTO users (firstName, lastName, email, password, occupation) VALUES (firstName, lastName, email, password, occupation);
END ;;
DELIMITER ;

DELIMITER ;;
CREATE  PROCEDURE `delete_quiz`(
  IN quiz_id INT
)
BEGIN
  DELETE FROM Quizzes WHERE id = quiz_id;
END ;;
DELIMITER ;

DELIMITER ;;
CREATE  PROCEDURE `delete_user`(
  IN user_id INT
)
BEGIN
  DELETE FROM users WHERE id = user_id;
END ;;
DELIMITER ;

DELIMITER ;;
CREATE  PROCEDURE `update_user`(
  IN userId INT,
  IN firstName VARCHAR(255),
  IN lastName VARCHAR(255),
  IN email VARCHAR(255),
  IN password VARCHAR(255),
  IN occupation VARCHAR(255)
)
BEGIN
  UPDATE users
  SET firstName = IFNULL(firstName, users.firstName),
      lastName = IFNULL(lastName, users.lastName),
      email = IFNULL(email, users.email),
      password = IFNULL(password, users.password),
      occupation = IFNULL(occupation, users.occupation)
  WHERE id = userId;
END ;;
DELIMITER ;
