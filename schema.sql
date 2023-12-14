CREATE TABLE `Question_choices` (
  `choice_id` int(12) NOT NULL AUTO_INCREMENT,
  `question_id` int(11) DEFAULT NULL,
  `is_correct` tinyint(1) DEFAULT NULL,
  `choice_text` text DEFAULT NULL,
  PRIMARY KEY (`choice_id`),
  KEY `question_id` (`question_id`),
  CONSTRAINT `Question_choices_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `Questions` (`question_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 46 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
CREATE TABLE `Questions` (
  `question_id` int(11) NOT NULL AUTO_INCREMENT,
  `question_text` text DEFAULT NULL,
  `quiz_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`question_id`),
  KEY `Questions_FK` (`quiz_id`),
  CONSTRAINT `Questions_FK` FOREIGN KEY (`quiz_id`) REFERENCES `Quizzes` (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 30 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
CREATE TABLE `QuizCompletions` (
  `CompletionID` int(11) NOT NULL AUTO_INCREMENT,
  `UserID` int(11) DEFAULT NULL,
  `QuizID` int(11) DEFAULT NULL,
  `CompletionDate` datetime DEFAULT NULL,
  `Score` int(11) DEFAULT NULL,
  `Result` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`CompletionID`),
  KEY `UserID` (`UserID`),
  CONSTRAINT `QuizCompletions_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `users` (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 17 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
DELIMITER;
;
DELIMITER;
SET @saved_cs_client = @@character_set_client;
SET character_set_client = utf8;
SET character_set_client = @saved_cs_client;
CREATE TABLE `Quizzes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 0,
  `created_by` varchar(100) NOT NULL,
  `date` datetime DEFAULT NULL,
  `userID` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Quizzes_FK` (`userID`),
  CONSTRAINT `Quizzes_FK` FOREIGN KEY (`userID`) REFERENCES `users` (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 35 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
SET @saved_cs_client = @@character_set_client;
SET character_set_client = utf8;
SET character_set_client = @saved_cs_client;
SET @saved_cs_client = @@character_set_client;
SET character_set_client = utf8;
SET character_set_client = @saved_cs_client;
SET @saved_cs_client = @@character_set_client;
SET character_set_client = utf8;
SET character_set_client = @saved_cs_client;
SET @saved_cs_client = @@character_set_client;
SET character_set_client = utf8;
SET character_set_client = @saved_cs_client;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `occupation` varchar(255) NOT NULL,
  `QuizCompletionsCount` int(11) DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 15 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
SET @saved_cs_client = @@character_set_client;
SET character_set_client = utf8;
SET character_set_client = @saved_cs_client;
;
DELIMITER;
;
CREATE DEFINER = `root` @`localhost` PROCEDURE `average_score`(IN input_user_id INT) BEGIN
SELECT AVG(Score) as average_score
FROM QuizCompletions
WHERE UserID = input_user_id;
END;
;
DELIMITER;
DELIMITER;
;
CREATE DEFINER = `root` @`localhost` PROCEDURE `create_user`(
  IN firstName VARCHAR(255),
  IN lastName VARCHAR(255),
  IN email VARCHAR(255),
  IN password VARCHAR(255),
  IN occupation VARCHAR(255)
) BEGIN
INSERT INTO users (firstName, lastName, email, password, occupation)
VALUES (firstName, lastName, email, password, occupation);
END;
;
DELIMITER;
DELIMITER;
;
CREATE DEFINER = `root` @`localhost` PROCEDURE `delete_quiz`(IN input_quiz_id INT) BEGIN
DELETE FROM Question_choices
WHERE question_id IN (
    SELECT question_id
    FROM Questions
    WHERE quiz_id = input_quiz_id
  );
DELETE FROM Questions
WHERE quiz_id = input_quiz_id;
DELETE FROM Quizzes
WHERE id = input_quiz_id;
END;
;
DELIMITER;
DELIMITER;
;
CREATE DEFINER = `root` @`localhost` PROCEDURE `delete_user`(IN user_id INT) BEGIN
DELETE FROM users
WHERE id = user_id;
END;
;
DELIMITER;
DELIMITER;
;
CREATE DEFINER = `root` @`localhost` PROCEDURE `update_user`(
  IN userId INT,
  IN firstName VARCHAR(255),
  IN lastName VARCHAR(255),
  IN email VARCHAR(255),
  IN password VARCHAR(255),
  IN occupation VARCHAR(255)
) BEGIN
UPDATE users
SET firstName = IFNULL(firstName, users.firstName),
  lastName = IFNULL(lastName, users.lastName),
  email = IFNULL(email, users.email),
  password = IFNULL(password, users.password),
  occupation = IFNULL(occupation, users.occupation)
WHERE id = userId;
END;
;
DELIMITER;