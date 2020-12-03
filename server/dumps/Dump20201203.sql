CREATE DATABASE  IF NOT EXISTS `mypatrimony` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `mypatrimony`;
-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: localhost    Database: mypatrimony
-- ------------------------------------------------------
-- Server version	8.0.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `computers`
--

DROP TABLE IF EXISTS `computers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `computers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `n_patrimony` varchar(45) DEFAULT NULL,
  `user` varchar(255) DEFAULT NULL,
  `description` tinytext,
  `idsetor` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idsetor_idx` (`idsetor`),
  CONSTRAINT `idsetor1` FOREIGN KEY (`idsetor`) REFERENCES `sector` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ips`
--

DROP TABLE IF EXISTS `ips`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ips` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ipv4` varchar(15) DEFAULT NULL,
  `mask` varchar(15) DEFAULT NULL,
  `gateway` varchar(15) DEFAULT NULL,
  `idcomputer` int DEFAULT NULL,
  `idprinter` int DEFAULT NULL,
  `idroteador` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idcompute_idx` (`idcomputer`),
  KEY `idprinter1_idx` (`idprinter`),
  KEY `idroteador1_idx` (`idroteador`),
  CONSTRAINT `idcompute3` FOREIGN KEY (`idcomputer`) REFERENCES `computers` (`id`),
  CONSTRAINT `idprinter1` FOREIGN KEY (`idprinter`) REFERENCES `printers` (`id`),
  CONSTRAINT `idroteador1` FOREIGN KEY (`idroteador`) REFERENCES `routers` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `monitors`
--

DROP TABLE IF EXISTS `monitors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `monitors` (
  `id` int NOT NULL AUTO_INCREMENT,
  `model` tinytext,
  `n_patrimony` varchar(45) DEFAULT NULL,
  `inch` int DEFAULT NULL,
  `idcomputer` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idmonitor_idx` (`idcomputer`),
  CONSTRAINT `idcomputer2` FOREIGN KEY (`idcomputer`) REFERENCES `computers` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `printers`
--

DROP TABLE IF EXISTS `printers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `printers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `n_patrimony` varchar(45) DEFAULT NULL,
  `model` tinytext,
  `idcomputer` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idcomputer4_idx` (`idcomputer`),
  CONSTRAINT `idcomputer4` FOREIGN KEY (`idcomputer`) REFERENCES `computers` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `routers`
--

DROP TABLE IF EXISTS `routers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `routers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` tinytext,
  `idsetor` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idsetor2_idx` (`idsetor`),
  CONSTRAINT `idsetor2` FOREIGN KEY (`idsetor`) REFERENCES `sector` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sector`
--

DROP TABLE IF EXISTS `sector`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sector` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `stabilisers`
--

DROP TABLE IF EXISTS `stabilisers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stabilisers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `model` tinytext,
  `n_patrimony` varchar(45) DEFAULT NULL,
  `idcomputer` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idcomputer1_idx` (`idcomputer`),
  CONSTRAINT `idcomputer1` FOREIGN KEY (`idcomputer`) REFERENCES `computers` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping routines for database 'mypatrimony'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-12-03 11:35:59
