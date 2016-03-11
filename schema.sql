SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`Login`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Login` (
  `login_id` INT NOT NULL AUTO_INCREMENT,
  `login_username` VARCHAR(45) NOT NULL,
  `login_displayname` VARCHAR(45) NOT NULL,
  `login_role` TINYINT NOT NULL,
  `login_password` BINARY(128) NOT NULL,
  PRIMARY KEY (`login_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`FreeTime`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`FreeTime` (
  `free_id` INT NOT NULL AUTO_INCREMENT,
  `free_start` INT NOT NULL,
  `free_end` INT NOT NULL,
  `free_label` VARCHAR(45) NOT NULL,
  `free_target_id` INT,
  `login_id` INT NOT NULL,
  PRIMARY KEY (`free_id`, `login_id`),
  INDEX `fk_FreeTime_Login_idx` (`login_id` ASC),
  CONSTRAINT `fk_FreeTime_Login`
    FOREIGN KEY (`login_id`)
    REFERENCES `mydb`.`Login` (`login_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;