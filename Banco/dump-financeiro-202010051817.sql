-- MySQL dump 10.13  Distrib 5.7.31, for Linux (x86_64)
--
-- Host: localhost    Database: financeiro
-- ------------------------------------------------------
-- Server version	5.7.31-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `banco`
--

DROP TABLE IF EXISTS `banco`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `banco` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `no_banco` text NOT NULL,
  `nu_banco` text NOT NULL,
  `no_site` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `imagem` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `banco`
--

LOCK TABLES `banco` WRITE;
/*!40000 ALTER TABLE `banco` DISABLE KEYS */;
INSERT INTO `banco` VALUES (1,'0 Sem banco','000','','2019-06-20 16:55:59','2019-06-20 16:55:59',''),(2,'Banco A.J.Renner S.A.','654','','2019-12-05 19:53:35','2019-12-05 19:53:35','Banco A.J.Renner S.A.png'),(3,'Banco ABC Brasil S.A.','246','www.abcbrasil.com.br','2020-09-29 21:14:38','2020-09-29 21:14:38','Banco ABC Brasil S.A.png'),(4,'Banco Alfa S.A.','025','www.bancoalfa.com.br','2020-09-29 21:14:41','2020-09-29 21:14:41','Banco Alfa S.A.jpeg'),(5,'Banco Alvorada S.A.','641','','2020-09-29 21:14:42','2020-09-29 21:14:42',''),(6,'Banco Arbi S.A.','213','www.arbi.com.br','2020-09-29 21:14:42','2020-09-29 21:14:42','Banco Arbi S.A.png'),(7,'Banco Azteca do Brasil S.A.','019','','2020-09-29 21:14:43','2020-09-29 21:14:43','Banco Azteca do Brasil S.A.png'),(8,'Banco Banerj S.A.','029','www.banerj.com.br','2020-09-29 21:14:44','2020-09-29 21:14:44',''),(9,'Banco Bankpar S.A.','000','www.aexp.com','2020-09-29 21:14:44','2020-09-29 21:14:44',''),(10,'Banco Barclays S.A.','740','www.barclays.com','2020-09-29 21:14:45','2020-09-29 21:14:45','Banco Barclays S.A..jpeg'),(11,'Banco BBM S.A.','107','www.bbmbank.com.br','2020-09-29 21:14:46','2020-09-29 21:14:46','Banco BBM S.A.jpeg'),(12,'Banco Beg S.A.','031','www.itau.com.br','2020-09-29 21:14:46','2020-09-29 21:14:46',''),(13,'Banco BGN S.A.','739','www.bgn.com.br','2020-09-29 21:14:47','2020-09-29 21:14:47','Banco BGN S.A.jpg'),(14,'Banco BM&F de Serviços de Liquidação e Custódia S.A','096','www.bmf.com.br','2020-09-29 21:14:47','2020-09-29 21:14:47',''),(15,'Banco BMG S.A.','318','www.bancobmg.com.br','2020-09-29 21:14:48','2020-09-29 21:14:48','Banco BMG S.A.svg'),(16,'Banco BNP Paribas Brasil S.A.','752','www.bnpparibas.com.br','2020-09-29 21:14:49','2020-09-29 21:14:49','Banco BNP Paribas Brasil S.A.png'),(17,'Banco Boavista Interatlântico S.A.','248','','2020-09-29 21:14:49','2020-09-29 21:14:49',''),(18,'Banco Bonsucesso S.A.','218','www.bancobonsucesso.com.br','2020-09-29 21:14:50','2020-09-29 21:14:50',''),(19,'Banco Bracce S.A.','065','www.lemon.com','2020-09-29 21:14:51','2020-09-29 21:14:51',''),(20,'Banco Bradesco BBI S.A.','036','','2020-09-29 21:14:52','2020-09-29 21:14:52','BancoBradesco.png'),(21,'Banco Bradesco Cartões S.A.','204','www.iamex.com.br','2020-09-29 21:14:53','2020-09-29 21:14:53','BancoBradesco.png'),(22,'Banco Bradesco Financiamentos S.A.','394','www.bmc.com.br','2020-09-29 21:14:54','2020-09-29 21:14:54','BancoBradesco.png'),(23,'Banco Bradesco S.A.','237','www.bradesco.com.br','2020-09-29 21:14:54','2020-09-29 21:14:54','BancoBradesco.png'),(24,'Banco Brascan S.A.','225','www.bancobrascan.com.br','2020-09-29 21:14:55','2020-09-29 21:14:55',''),(25,'Banco BRJ S.A.','M15','www.brjbank.com.br','2020-09-29 21:14:56','2020-09-29 21:14:56',''),(26,'Banco BTG Pactual S.A.','208','www.pactual.com.br','2020-09-29 21:14:56','2020-09-29 21:14:56','btgpactual.png'),(27,'Banco BVA S.A.','044','www.bancobva.com.br','2020-09-29 21:14:57','2020-09-29 21:14:57',''),(28,'Banco Cacique S.A.','263','www.bancocacique.com.br','2020-09-29 21:14:58','2020-09-29 21:14:58',''),(29,'Banco Caixa Geral - Brasil S.A.','473','','2020-09-29 21:14:59','2020-09-29 21:14:59','caixa.png'),(30,'Banco Capital S.A.','412','www.bancocapital.com.br','2020-09-29 21:15:00','2020-09-29 21:15:00',''),(31,'Banco Cargill S.A.','040','www.bancocargill.com.br','2020-09-29 21:15:01','2020-09-29 21:15:01',''),(32,'Banco Citibank S.A.','745','www.citibank.com.br','2020-09-29 21:15:01','2020-09-29 21:15:01',''),(33,'Banco Clássico S.A.','241','','2020-09-29 21:15:02','2020-09-29 21:15:02',''),(34,'Banco CNH Capital S.A.','M19','www.bancocnh.com.br','2020-09-29 21:15:03','2020-09-29 21:15:03',''),(35,'Banco Citicard S.A.','M08','www.credicardbanco.com.br','2020-09-29 21:15:04','2020-09-29 21:15:04','');
/*!40000 ALTER TABLE `banco` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (57,'2014_10_12_000000_create_users_table',1),(58,'2014_10_12_100000_create_password_resets_table',1),(59,'2018_10_04_173404_create_tb_amigos_table',1),(60,'2018_10_04_173404_create_tb_cartao_credito_table',1),(61,'2018_10_04_173404_create_tb_categoria_despesa_table',1),(62,'2018_10_04_173404_create_tb_categoria_receita_table',1),(63,'2018_10_04_173404_create_tb_conta_compartilhada_valor_table',1),(64,'2018_10_04_173404_create_tb_conta_table',1),(65,'2018_10_04_173404_create_tb_despesa_cartao_table',1),(66,'2018_10_04_173404_create_tb_despesa_conta_table',1),(67,'2018_10_04_173404_create_tb_despesa_item_table',1),(68,'2018_10_04_173404_create_tb_despesa_table',1),(69,'2018_10_04_173404_create_tb_mudartexto_table',1),(70,'2018_10_04_173404_create_tb_pessoa_table',1),(71,'2018_10_04_173404_create_tb_usuario_table',1),(72,'2018_10_04_173404_create_tipo_despesa_table',1),(73,'2018_10_04_173405_add_foreign_keys_to_tb_amigos_table',1),(74,'2018_10_04_173405_add_foreign_keys_to_tb_cartao_credito_table',1),(75,'2018_10_04_173405_add_foreign_keys_to_tb_categoria_despesa_table',1),(76,'2018_10_04_173405_add_foreign_keys_to_tb_categoria_receita_table',1),(77,'2018_10_04_173405_add_foreign_keys_to_tb_conta_compartilhada_valor_table',1),(78,'2018_10_04_173405_add_foreign_keys_to_tb_conta_table',1),(79,'2018_10_04_173405_add_foreign_keys_to_tb_despesa_cartao_table',1),(80,'2018_10_04_173405_add_foreign_keys_to_tb_despesa_conta_table',1),(81,'2018_10_04_173405_add_foreign_keys_to_tb_despesa_item_table',1),(82,'2018_10_04_173405_add_foreign_keys_to_tb_despesa_table',1),(83,'2018_10_04_173405_add_foreign_keys_to_tb_mudartexto_table',1),(84,'2018_10_04_173405_add_foreign_keys_to_tb_usuario_table',1);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_resets`
--

DROP TABLE IF EXISTS `password_resets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  KEY `password_resets_email_index` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_resets`
--

LOCK TABLES `password_resets` WRITE;
/*!40000 ALTER TABLE `password_resets` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_resets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_amigos`
--

DROP TABLE IF EXISTS `tb_amigos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_amigos` (
  `id_amigos` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(11) NOT NULL,
  `id_pessoa` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `situacao` char(1) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id_amigos`),
  KEY `fk_tb_amigos_tb_usuario1_idx` (`id_usuario`),
  KEY `fk_tb_amigos_tb_pessoa1_idx` (`id_pessoa`),
  CONSTRAINT `fk_tb_amigos_tb_pessoa1` FOREIGN KEY (`id_pessoa`) REFERENCES `tb_pessoa` (`id_pessoa`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_tb_amigos_tb_usuario1` FOREIGN KEY (`id_usuario`) REFERENCES `tb_usuario` (`id_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_amigos`
--

LOCK TABLES `tb_amigos` WRITE;
/*!40000 ALTER TABLE `tb_amigos` DISABLE KEYS */;
INSERT INTO `tb_amigos` VALUES (6,3,45,'2018-11-21 13:24:47','2020-10-02 17:40:31','r'),(17,12,54,'2020-10-02 23:46:57','2020-10-02 23:47:21','a');
/*!40000 ALTER TABLE `tb_amigos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_cartao_credito`
--

DROP TABLE IF EXISTS `tb_cartao_credito`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_cartao_credito` (
  `id_cartao_credito` int(11) NOT NULL AUTO_INCREMENT,
  `no_cartao_credito` text COLLATE utf8mb4_unicode_ci,
  `vl_limite` decimal(10,2) DEFAULT NULL,
  `dia_vencimento` int(11) DEFAULT NULL,
  `dt_primeira_fatura` date DEFAULT NULL,
  `dia_fechamento_fatura` int(11) DEFAULT NULL,
  `no_titular` text COLLATE utf8mb4_unicode_ci,
  `tb_usuario_id_usuario` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `bo_ativo` tinyint(4) DEFAULT '1',
  `numero` text COLLATE utf8mb4_unicode_ci,
  `bandeira` text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id_cartao_credito`),
  KEY `fk_tb_cartao_credito_tb_usuario1_idx` (`tb_usuario_id_usuario`),
  CONSTRAINT `fk_tb_cartao_credito_tb_usuario1` FOREIGN KEY (`tb_usuario_id_usuario`) REFERENCES `tb_usuario` (`id_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_cartao_credito`
--

LOCK TABLES `tb_cartao_credito` WRITE;
/*!40000 ALTER TABLE `tb_cartao_credito` DISABLE KEYS */;
INSERT INTO `tb_cartao_credito` VALUES (1,'Cartão Itaú',2550.00,9,'2018-09-12',30,'Klebim de Souza',12,'2018-11-19 21:14:01','2018-11-19 21:49:18',0,'0000000000000000',NULL),(2,'Bradesco',30000.00,9,'2018-09-12',30,'Thiago',14,'2018-11-19 21:52:48','2018-11-19 21:52:48',1,'0000000000000000',NULL),(3,'Cartão Bradesco alterado',30000.00,9,'2018-09-12',30,'Thiago',12,'2018-11-20 13:26:03','2020-09-30 13:50:17',0,'0000000000000000',NULL),(4,'novo teste',30000.00,9,'2018-12-09',30,'Teste',12,'2020-02-17 13:14:22','2020-09-30 13:51:04',0,'0000000000000000',NULL),(5,'Cartão de teste',30000.00,9,NULL,30,'Kleber de souza',12,'2020-09-29 22:39:30','2020-09-29 22:39:30',1,'6062825624254001','hipercard'),(6,'ItauCard',25000.00,9,NULL,30,'Joao paulo pereira',12,'2020-09-30 13:21:01','2020-09-30 13:21:01',1,'5555666677778884','mastercard'),(7,'Itau',30000.00,20,NULL,11,'KLEBER S CHAGAS',12,'2020-10-02 23:44:56','2020-10-02 23:45:04',0,'542974008309','mastercard');
/*!40000 ALTER TABLE `tb_cartao_credito` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_categoria_despesa`
--

DROP TABLE IF EXISTS `tb_categoria_despesa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_categoria_despesa` (
  `id_categoria_despesa` int(11) NOT NULL AUTO_INCREMENT,
  `id_categoria_despesa_pai` int(11) DEFAULT NULL,
  `no_categoria_despesa` text COLLATE utf8mb4_unicode_ci,
  `id_usuario` int(11) NOT NULL,
  `bo_ativo` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `icon` text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id_categoria_despesa`),
  KEY `fk_tb_categoria_despesa_tb_usuario1_idx` (`id_usuario`),
  CONSTRAINT `fk_tb_categoria_despesa_tb_usuario1` FOREIGN KEY (`id_usuario`) REFERENCES `tb_usuario` (`id_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_categoria_despesa`
--

LOCK TABLES `tb_categoria_despesa` WRITE;
/*!40000 ALTER TABLE `tb_categoria_despesa` DISABLE KEYS */;
INSERT INTO `tb_categoria_despesa` VALUES (3,1,'Mobile',12,1,'2018-11-08 18:46:23','2018-11-08 18:49:14',NULL),(30,NULL,'Moradia',12,1,'2020-10-04 16:58:06','2020-10-04 16:58:06',NULL),(31,NULL,'Alimentação',12,1,'2020-10-04 16:58:13','2020-10-04 16:58:13',NULL),(32,NULL,'Saúde',12,1,'2020-10-04 16:58:16','2020-10-04 16:58:16',NULL),(33,NULL,'Educação',12,1,'2020-10-04 16:58:21','2020-10-04 16:58:21','fa fa-chalkboard-teacher'),(34,NULL,'Despesas Pessoais',12,1,'2020-10-04 16:58:26','2020-10-04 16:58:26',NULL),(35,NULL,'Transporte',12,1,'2020-10-04 16:58:30','2020-10-04 16:58:30',NULL),(36,NULL,'Celular/TV/Internet',12,0,'2020-10-04 16:58:40','2020-10-04 17:06:12',NULL),(37,NULL,'Lazer',12,1,'2020-10-04 16:58:45','2020-10-04 16:58:45',NULL),(38,30,'Aluguel',12,1,'2020-10-04 16:59:10','2020-10-04 16:59:10','fa fa-cloud-moon-rain'),(39,30,'IPTU',12,1,'2020-10-04 16:59:43','2020-10-04 16:59:43','fa fa-skull-crossbones'),(40,30,'Energia',12,1,'2020-10-04 16:59:51','2020-10-04 16:59:51','fa fa-plug'),(41,30,'Agua',12,1,'2020-10-04 16:59:56','2020-10-04 16:59:56','fa fa-tint'),(42,30,'Internet',12,0,'2020-10-04 17:00:14','2020-10-04 17:05:51','fa fa-ethernet'),(43,31,'Mercado',12,1,'2020-10-04 17:00:38','2020-10-04 17:00:38','fa fa-store'),(44,31,'Lanches',12,1,'2020-10-04 17:00:47','2020-10-04 17:00:47','fa fa-hamburger'),(45,32,'Plano de Saúde',12,1,'2020-10-04 17:01:02','2020-10-04 17:01:02','fa fa-heart'),(46,32,'Farmácia',12,1,'2020-10-04 17:01:06','2020-10-04 17:01:06','fa fa-clinic-medical'),(47,33,'Curso Udemy',12,1,'2020-10-04 17:01:29','2020-10-04 17:01:29','fa fa-chalkboard'),(48,33,'Inglês',12,1,'2020-10-04 17:01:37','2020-10-04 17:01:37','fa fa-globe-americas'),(49,33,'Jornais/revistas',12,1,'2020-10-04 17:02:04','2020-10-04 17:02:04','fa fa-newspaper'),(50,33,'Livros',12,1,'2020-10-04 17:02:10','2020-10-04 17:02:10','fa fa-book'),(51,34,'Cuidados e higiene pessoal',12,1,'2020-10-04 17:02:21','2020-10-04 17:02:21','fa fa-soap'),(52,34,'Roupas e acessórios',12,1,'2020-10-04 17:02:39','2020-10-04 17:02:39','fa fa-tshirt'),(53,34,'Presentes',12,1,'2020-10-04 17:02:44','2020-10-04 17:02:44','fa fa-gift'),(54,35,'Combustível',12,1,'2020-10-04 17:02:57','2020-10-04 17:02:57','fa fa-gas-pump'),(55,35,'Manutenção',12,1,'2020-10-04 17:03:01','2020-10-04 17:03:01','fa fa-wrench'),(56,35,'IPVA',12,1,'2020-10-04 17:03:06','2020-10-04 17:03:06','fa fa-radiation'),(57,35,'Seguro',12,1,'2020-10-04 17:03:10','2020-10-04 17:03:10','fa fa-car-crash'),(58,35,'Estacionamento',12,1,'2020-10-04 17:03:15','2020-10-04 17:03:15','fa fa-sign'),(59,35,'Transporte público',12,0,'2020-10-04 17:03:21','2020-10-04 17:05:44','fa fa-bus'),(60,36,'Plano de celular',12,1,'2020-10-04 17:03:32','2020-10-04 17:03:32','fa fa-mobile'),(61,36,'Plano de TV por assinatura',12,1,'2020-10-04 17:03:37','2020-10-04 17:03:37','fa fa-tv'),(62,37,'Cinema',12,1,'2020-10-04 17:03:52','2020-10-04 17:03:52','fa fa-film'),(63,37,'Bares e restaurantes',12,1,'2020-10-04 17:03:58','2020-10-04 17:03:58','fa fa-utensils'),(64,37,'Passeios/parques/praia',12,1,'2020-10-04 17:04:03','2020-10-04 17:04:03','fa fa-route'),(65,37,'Viagens',12,1,'2020-10-04 17:04:08','2020-10-04 17:04:08','fa fa-route');
/*!40000 ALTER TABLE `tb_categoria_despesa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_categoria_receita`
--

DROP TABLE IF EXISTS `tb_categoria_receita`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_categoria_receita` (
  `id_categoria_receita` int(11) NOT NULL AUTO_INCREMENT,
  `id_categoria_receita_pai` int(11) DEFAULT NULL,
  `no_categoria_receita` text COLLATE utf8mb4_unicode_ci,
  `id_usuario` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `bo_ativo` tinyint(1) DEFAULT '1',
  `icon` text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id_categoria_receita`),
  KEY `fk_tb_categoria_receita_tb_usuario1_idx` (`id_usuario`),
  CONSTRAINT `fk_tb_categoria_receita_tb_usuario1` FOREIGN KEY (`id_usuario`) REFERENCES `tb_usuario` (`id_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_categoria_receita`
--

LOCK TABLES `tb_categoria_receita` WRITE;
/*!40000 ALTER TABLE `tb_categoria_receita` DISABLE KEYS */;
INSERT INTO `tb_categoria_receita` VALUES (12,NULL,'Serviço',12,'2020-10-05 12:33:52','2020-10-05 12:33:52',1,'fa fa-tools'),(13,12,'Salario',12,'2020-10-05 12:37:46','2020-10-05 12:37:46',1,'fa fa-hand-holding-usd'),(14,NULL,'Investimentos',12,'2020-10-05 12:42:03','2020-10-05 12:42:03',1,'fa fa-landmark'),(15,14,'Juros poupança',12,'2020-10-05 12:43:18','2020-10-05 12:43:18',1,'fa fa-percentage'),(16,14,'Juros CDB',12,'2020-10-05 12:44:51','2020-10-05 12:44:51',1,'fa fa-percentage'),(17,14,'Dividendo',12,'2020-10-05 12:45:30','2020-10-05 12:45:30',1,'fa fa-hand-holding-usd'),(18,14,'Juros sobre capital próprio',12,'2020-10-05 12:45:56','2020-10-05 12:45:56',1,'fa fa-hand-holding-usd');
/*!40000 ALTER TABLE `tb_categoria_receita` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_conta`
--

DROP TABLE IF EXISTS `tb_conta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_conta` (
  `id_conta` int(11) NOT NULL AUTO_INCREMENT,
  `no_conta` text COLLATE utf8mb4_unicode_ci,
  `vl_saldo` decimal(10,2) DEFAULT NULL,
  `id_usuario` int(11) NOT NULL,
  `bo_ativo` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `img` text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id_conta`),
  KEY `fk_tb_conta_tb_usuario1_idx` (`id_usuario`),
  CONSTRAINT `fk_tb_conta_tb_usuario1` FOREIGN KEY (`id_usuario`) REFERENCES `tb_usuario` (`id_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_conta`
--

LOCK TABLES `tb_conta` WRITE;
/*!40000 ALTER TABLE `tb_conta` DISABLE KEYS */;
INSERT INTO `tb_conta` VALUES (1,'Conta corrente Itau',7350.50,12,1,'2018-11-08 13:55:42','2019-03-27 20:17:44','171744_20190327_logo-itau-varejo-desktop.png'),(2,'Conta corrente NuBank',3450.50,12,1,'2018-11-08 14:08:25','2018-11-08 14:08:25',NULL),(3,'Conta corrente alterada',1500.00,12,1,'2018-11-12 14:16:57','2018-11-12 14:26:59',NULL),(4,'Conta corrente NuBank thyerre',3450.55,13,1,'2018-11-12 19:42:05','2018-11-12 19:42:05',NULL),(5,'Banco Inter',1500.00,1,1,'2019-03-27 00:09:20','2019-03-27 20:05:37','170537_20190327_inter.jpg'),(6,'Itaú',1500.00,1,1,'2019-03-27 19:46:23','2019-03-27 19:46:23','164623_20190327_logo-itau-varejo-desktop.png'),(7,'Itaú',1500.00,1,0,'2019-03-27 19:51:06','2019-03-27 20:31:38','165106_20190327_logo-itau-varejo-desktop.png'),(8,'Itaú',1500.00,1,0,'2019-03-27 19:51:23','2019-03-27 20:17:09','165123_20190327_logo-itau-varejo-desktop.png'),(9,'Itaú',1500.00,1,0,'2019-03-27 19:52:02','2019-03-27 20:16:41','165202_20190327_logo-itau-varejo-desktop.png'),(10,'Banco Inter',1500.00,1,0,'2019-03-27 19:52:15','2019-03-27 20:15:39','165215_20190327_logo-itau-varejo-desktop.png'),(11,'Itau',1500.00,1,0,'2019-03-27 19:52:37','2019-03-27 20:16:48','165237_20190327_logo-itau-varejo-desktop.png'),(12,'Banco Itaú',2000.00,1,1,'2019-03-28 13:07:39','2019-03-28 13:07:39','100739_20190328_index.jpeg'),(13,'Banco inter',1500.00,1,1,'2019-03-28 13:08:05','2019-03-28 13:08:05','100805_20190328_index.png');
/*!40000 ALTER TABLE `tb_conta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_conta_compartilhada_valor`
--

DROP TABLE IF EXISTS `tb_conta_compartilhada_valor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_conta_compartilhada_valor` (
  `id_conta_compartilhada` int(11) NOT NULL AUTO_INCREMENT,
  `vl_conta_compartilhada_porcentagem` decimal(10,2) DEFAULT NULL,
  `id_despesa` int(11) NOT NULL,
  `id_pessoa` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_conta_compartilhada`),
  KEY `fk_tb_conta_compartilhada_valor_tb_despesa_idx` (`id_despesa`),
  KEY `fk_tb_conta_compartilhada_valor_tb_pessoa1_idx` (`id_pessoa`),
  CONSTRAINT `fk_tb_conta_compartilhada_valor_tb_despesa` FOREIGN KEY (`id_despesa`) REFERENCES `tb_despesa` (`id_despesa`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_tb_conta_compartilhada_valor_tb_pessoa1` FOREIGN KEY (`id_pessoa`) REFERENCES `tb_pessoa` (`id_pessoa`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_conta_compartilhada_valor`
--

LOCK TABLES `tb_conta_compartilhada_valor` WRITE;
/*!40000 ALTER TABLE `tb_conta_compartilhada_valor` DISABLE KEYS */;
INSERT INTO `tb_conta_compartilhada_valor` VALUES (2,50.00,143,45,'2018-12-07 18:58:06','2018-12-07 18:58:06'),(3,50.00,143,51,'2018-12-07 18:58:06','2018-12-07 18:58:06'),(4,75.00,144,45,'2018-12-07 18:59:26','2018-12-07 18:59:26'),(5,25.00,144,51,'2018-12-07 18:59:26','2018-12-07 18:59:26'),(6,27.50,145,45,'2018-12-07 19:58:44','2018-12-07 20:08:01'),(7,50.00,145,51,'2018-12-07 19:58:44','2018-12-07 19:58:44'),(8,50.00,146,45,'2018-12-31 16:04:42','2018-12-31 16:04:42'),(9,50.00,146,45,'2018-12-31 16:04:42','2018-12-31 16:04:42'),(10,40.00,147,54,'2018-12-31 16:09:45','2018-12-31 16:34:35'),(11,50.00,147,45,'2018-12-31 16:09:45','2018-12-31 16:09:45'),(12,48.33,148,54,'2018-12-31 16:32:52','2018-12-31 16:57:27'),(13,50.00,148,45,'2018-12-31 16:32:52','2018-12-31 16:32:52'),(14,50.00,149,45,'2020-02-17 13:23:31','2020-02-17 13:23:31'),(15,50.00,149,50,'2020-02-17 13:23:31','2020-02-17 13:23:31');
/*!40000 ALTER TABLE `tb_conta_compartilhada_valor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_despesa`
--

DROP TABLE IF EXISTS `tb_despesa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_despesa` (
  `id_despesa` int(11) NOT NULL AUTO_INCREMENT,
  `vl_despesac` decimal(10,2) DEFAULT NULL,
  `dt_despesa` date DEFAULT NULL,
  `ds_despesa` text COLLATE utf8mb4_unicode_ci,
  `bo_dividir_amigos` tinyint(1) DEFAULT NULL,
  `id_tipo_despesa` int(11) NOT NULL,
  `id_categoria_despesa` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_despesa`),
  KEY `fk_tb_despesa_tb_tipo_despesa1_idx` (`id_tipo_despesa`),
  KEY `fk_tb_despesa_tb_categoria_despesa1_idx` (`id_categoria_despesa`),
  KEY `fk_tb_despesa_tb_usuario1_idx` (`id_usuario`),
  CONSTRAINT `fk_tb_despesa_tb_categoria_despesa1` FOREIGN KEY (`id_categoria_despesa`) REFERENCES `tb_categoria_despesa` (`id_categoria_despesa`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_tb_despesa_tb_tipo_despesa1` FOREIGN KEY (`id_tipo_despesa`) REFERENCES `tb_tipo_despesa` (`id_tipo_despesa`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_tb_despesa_tb_usuario1` FOREIGN KEY (`id_usuario`) REFERENCES `tb_usuario` (`id_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=150 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_despesa`
--

LOCK TABLES `tb_despesa` WRITE;
/*!40000 ALTER TABLE `tb_despesa` DISABLE KEYS */;
INSERT INTO `tb_despesa` VALUES (134,40.00,'2018-12-07','Telefone alterado',0,2,3,12,'2018-12-07 17:06:07','2018-12-07 17:42:47'),(135,40.00,'2018-12-07','Cartão',0,2,3,12,'2018-12-07 18:13:21','2018-12-07 18:18:07'),(138,550.00,'2018-12-07','Telefone',0,2,3,12,'2018-12-07 18:46:32','2018-12-07 18:46:32'),(143,550.00,'2018-12-07','Telefone',0,2,3,12,'2018-12-07 18:58:06','2018-12-07 18:58:06'),(144,550.00,'2018-12-07','Telefone',0,2,3,12,'2018-12-07 18:59:25','2018-12-07 18:59:25'),(145,150.00,'2018-12-07','Celular',1,2,3,12,'2018-12-07 19:58:44','2018-12-31 16:48:15'),(146,579.00,'2018-12-31','Microondas',1,2,3,12,'2018-12-31 16:04:42','2018-12-31 16:04:42'),(147,400.00,'2018-12-31','Microondas',1,2,3,17,'2018-12-31 16:09:45','2018-12-31 16:34:35'),(148,150.00,'2018-12-31','Celular',1,2,3,17,'2018-12-31 16:32:52','2018-12-31 16:57:27'),(149,1000.00,'2020-02-17','Microondas teste',1,2,3,12,'2020-02-17 13:23:31','2020-02-17 13:23:31');
/*!40000 ALTER TABLE `tb_despesa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_despesa_cartao`
--

DROP TABLE IF EXISTS `tb_despesa_cartao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_despesa_cartao` (
  `id_despesa_cartao` int(11) NOT NULL AUTO_INCREMENT,
  `id_cartao_credito` int(11) NOT NULL,
  `id_despesa` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_despesa_cartao`),
  KEY `fk_tb_despesa_cartao_tb_cartao_credito1_idx` (`id_cartao_credito`),
  KEY `fk_tb_despesa_cartao_tb_despesa1_idx` (`id_despesa`),
  CONSTRAINT `fk_tb_despesa_cartao_tb_cartao_credito1` FOREIGN KEY (`id_cartao_credito`) REFERENCES `tb_cartao_credito` (`id_cartao_credito`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_tb_despesa_cartao_tb_despesa1` FOREIGN KEY (`id_despesa`) REFERENCES `tb_despesa` (`id_despesa`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_despesa_cartao`
--

LOCK TABLES `tb_despesa_cartao` WRITE;
/*!40000 ALTER TABLE `tb_despesa_cartao` DISABLE KEYS */;
INSERT INTO `tb_despesa_cartao` VALUES (1,1,135,'2018-12-07 18:13:21','2018-12-07 18:13:21');
/*!40000 ALTER TABLE `tb_despesa_cartao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_despesa_conta`
--

DROP TABLE IF EXISTS `tb_despesa_conta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_despesa_conta` (
  `id_despesa_conta` int(11) NOT NULL AUTO_INCREMENT,
  `id_conta` int(11) NOT NULL,
  `id_despesa` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_despesa_conta`),
  KEY `fk_tb_despesa_conta_tb_conta1_idx` (`id_conta`),
  KEY `fk_tb_despesa_conta_tb_despesa1_idx` (`id_despesa`),
  CONSTRAINT `fk_tb_despesa_conta_tb_conta1` FOREIGN KEY (`id_conta`) REFERENCES `tb_conta` (`id_conta`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_tb_despesa_conta_tb_despesa1` FOREIGN KEY (`id_despesa`) REFERENCES `tb_despesa` (`id_despesa`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_despesa_conta`
--

LOCK TABLES `tb_despesa_conta` WRITE;
/*!40000 ALTER TABLE `tb_despesa_conta` DISABLE KEYS */;
INSERT INTO `tb_despesa_conta` VALUES (2,1,134,'2018-12-07 17:06:07','2018-12-07 17:06:07');
/*!40000 ALTER TABLE `tb_despesa_conta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_despesa_item`
--

DROP TABLE IF EXISTS `tb_despesa_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_despesa_item` (
  `id_despesa_item` int(11) NOT NULL AUTO_INCREMENT,
  `dt_vencimento` date DEFAULT NULL,
  `vl_despesa` decimal(10,2) DEFAULT NULL,
  `nu_parcela_atual` int(11) DEFAULT NULL,
  `nu_parcela` text COLLATE utf8mb4_unicode_ci,
  `id_despesa` int(11) NOT NULL,
  `bo_paga` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_despesa_item`),
  KEY `fk_tb_despesa_item_tb_despesa1_idx` (`id_despesa`),
  CONSTRAINT `fk_tb_despesa_item_tb_despesa1` FOREIGN KEY (`id_despesa`) REFERENCES `tb_despesa` (`id_despesa`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=299 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_despesa_item`
--

LOCK TABLES `tb_despesa_item` WRITE;
/*!40000 ALTER TABLE `tb_despesa_item` DISABLE KEYS */;
INSERT INTO `tb_despesa_item` VALUES (164,'2018-12-01',40.00,1,'10',134,1,'2018-12-07 17:06:07','2018-12-07 17:43:10'),(165,'2019-01-09',55.00,2,'10',134,0,'2018-12-07 17:06:07','2018-12-07 17:06:07'),(166,'2019-02-09',55.00,3,'10',134,0,'2018-12-07 17:06:07','2018-12-07 17:06:07'),(167,'2019-03-09',55.00,4,'10',134,0,'2018-12-07 17:06:07','2018-12-07 17:06:07'),(168,'2019-04-09',55.00,5,'10',134,0,'2018-12-07 17:06:07','2018-12-07 17:06:07'),(169,'2019-05-09',55.00,6,'10',134,0,'2018-12-07 17:06:07','2018-12-07 17:06:07'),(170,'2019-06-09',55.00,7,'10',134,0,'2018-12-07 17:06:07','2018-12-07 17:06:07'),(171,'2019-07-09',55.00,8,'10',134,0,'2018-12-07 17:06:07','2018-12-07 17:06:07'),(172,'2019-08-09',55.00,9,'10',134,0,'2018-12-07 17:06:07','2018-12-07 17:06:07'),(173,'2019-09-09',55.00,10,'10',134,0,'2018-12-07 17:06:07','2018-12-07 17:06:07'),(174,'2018-12-01',40.00,1,'10',135,0,'2018-12-07 18:13:21','2018-12-07 18:18:07'),(175,'2019-01-09',55.00,2,'10',135,0,'2018-12-07 18:13:21','2018-12-07 18:13:21'),(176,'2019-02-09',55.00,3,'10',135,0,'2018-12-07 18:13:21','2018-12-07 18:13:21'),(177,'2019-03-09',55.00,4,'10',135,0,'2018-12-07 18:13:21','2018-12-07 18:13:21'),(178,'2019-04-09',55.00,5,'10',135,0,'2018-12-07 18:13:21','2018-12-07 18:13:21'),(179,'2019-05-09',55.00,6,'10',135,0,'2018-12-07 18:13:21','2018-12-07 18:13:21'),(180,'2019-06-09',55.00,7,'10',135,0,'2018-12-07 18:13:21','2018-12-07 18:13:21'),(181,'2019-07-09',55.00,8,'10',135,0,'2018-12-07 18:13:21','2018-12-07 18:13:21'),(182,'2019-08-09',55.00,9,'10',135,0,'2018-12-07 18:13:21','2018-12-07 18:13:21'),(183,'2019-09-09',55.00,10,'10',135,0,'2018-12-07 18:13:21','2018-12-07 18:13:21'),(204,'2018-12-09',55.00,1,'10',138,0,'2018-12-07 18:46:32','2018-12-07 18:46:32'),(205,'2019-01-09',55.00,2,'10',138,0,'2018-12-07 18:46:32','2018-12-07 18:46:32'),(206,'2019-02-09',55.00,3,'10',138,0,'2018-12-07 18:46:32','2018-12-07 18:46:32'),(207,'2019-03-09',55.00,4,'10',138,0,'2018-12-07 18:46:32','2018-12-07 18:46:32'),(208,'2019-04-09',55.00,5,'10',138,0,'2018-12-07 18:46:32','2018-12-07 18:46:32'),(209,'2019-05-09',55.00,6,'10',138,0,'2018-12-07 18:46:33','2018-12-07 18:46:33'),(210,'2019-06-09',55.00,7,'10',138,0,'2018-12-07 18:46:33','2018-12-07 18:46:33'),(211,'2019-07-09',55.00,8,'10',138,0,'2018-12-07 18:46:33','2018-12-07 18:46:33'),(212,'2019-08-09',55.00,9,'10',138,0,'2018-12-07 18:46:33','2018-12-07 18:46:33'),(213,'2019-09-09',55.00,10,'10',138,0,'2018-12-07 18:46:33','2018-12-07 18:46:33'),(254,'2018-12-09',55.00,1,'10',143,0,'2018-12-07 18:58:06','2018-12-07 18:58:06'),(255,'2019-01-09',55.00,2,'10',143,0,'2018-12-07 18:58:06','2018-12-07 18:58:06'),(256,'2019-02-09',55.00,3,'10',143,0,'2018-12-07 18:58:06','2018-12-07 18:58:06'),(257,'2019-03-09',55.00,4,'10',143,0,'2018-12-07 18:58:06','2018-12-07 18:58:06'),(258,'2019-04-09',55.00,5,'10',143,0,'2018-12-07 18:58:06','2018-12-07 18:58:06'),(259,'2019-05-09',55.00,6,'10',143,0,'2018-12-07 18:58:06','2018-12-07 18:58:06'),(260,'2019-06-09',55.00,7,'10',143,0,'2018-12-07 18:58:06','2018-12-07 18:58:06'),(261,'2019-07-09',55.00,8,'10',143,0,'2018-12-07 18:58:06','2018-12-07 18:58:06'),(262,'2019-08-09',55.00,9,'10',143,0,'2018-12-07 18:58:06','2018-12-07 18:58:06'),(263,'2019-09-09',55.00,10,'10',143,0,'2018-12-07 18:58:06','2018-12-07 18:58:06'),(264,'2018-12-09',55.00,1,'10',144,0,'2018-12-07 18:59:25','2018-12-07 18:59:25'),(265,'2019-01-09',55.00,2,'10',144,0,'2018-12-07 18:59:26','2018-12-07 18:59:26'),(266,'2019-02-09',55.00,3,'10',144,0,'2018-12-07 18:59:26','2018-12-07 18:59:26'),(267,'2019-03-09',55.00,4,'10',144,0,'2018-12-07 18:59:26','2018-12-07 18:59:26'),(268,'2019-04-09',55.00,5,'10',144,0,'2018-12-07 18:59:26','2018-12-07 18:59:26'),(269,'2019-05-09',55.00,6,'10',144,0,'2018-12-07 18:59:26','2018-12-07 18:59:26'),(270,'2019-06-09',55.00,7,'10',144,0,'2018-12-07 18:59:26','2018-12-07 18:59:26'),(271,'2019-07-09',55.00,8,'10',144,0,'2018-12-07 18:59:26','2018-12-07 18:59:26'),(272,'2019-08-09',55.00,9,'10',144,0,'2018-12-07 18:59:26','2018-12-07 18:59:26'),(273,'2019-09-09',55.00,10,'10',144,0,'2018-12-07 18:59:26','2018-12-07 18:59:26'),(274,'2018-12-09',1000.00,1,'1',145,0,'2018-12-07 19:58:44','2018-12-07 20:01:40'),(275,'2018-12-09',96.50,1,'6',146,0,'2018-12-31 16:04:42','2018-12-31 16:04:42'),(276,'2019-01-09',96.50,2,'6',146,0,'2018-12-31 16:04:42','2018-12-31 16:04:42'),(277,'2019-02-09',96.50,3,'6',146,0,'2018-12-31 16:04:42','2018-12-31 16:04:42'),(278,'2019-03-09',96.50,4,'6',146,0,'2018-12-31 16:04:42','2018-12-31 16:04:42'),(279,'2019-04-09',96.50,5,'6',146,0,'2018-12-31 16:04:42','2018-12-31 16:04:42'),(280,'2019-05-09',96.50,6,'6',146,0,'2018-12-31 16:04:42','2018-12-31 16:04:42'),(281,'2018-09-12',96.50,1,'6',147,0,'2018-12-31 16:09:45','2018-12-31 16:19:55'),(282,'2019-01-09',96.50,2,'6',147,0,'2018-12-31 16:09:45','2018-12-31 16:09:45'),(283,'2019-02-09',96.50,3,'6',147,0,'2018-12-31 16:09:45','2018-12-31 16:09:45'),(284,'2019-03-09',96.50,4,'6',147,0,'2018-12-31 16:09:45','2018-12-31 16:09:45'),(285,'2019-04-09',96.50,5,'6',147,0,'2018-12-31 16:09:45','2018-12-31 16:09:45'),(286,'2019-05-09',96.50,6,'6',147,0,'2018-12-31 16:09:45','2018-12-31 16:09:45'),(287,'2018-12-09',166.67,1,'6',148,0,'2018-12-31 16:32:52','2018-12-31 16:48:44'),(288,'2019-01-09',166.67,2,'6',148,0,'2018-12-31 16:32:52','2018-12-31 16:32:52'),(289,'2019-02-09',166.67,3,'6',148,0,'2018-12-31 16:32:52','2018-12-31 16:32:52'),(290,'2019-03-09',166.67,4,'6',148,0,'2018-12-31 16:32:52','2018-12-31 16:32:52'),(291,'2019-04-09',166.67,5,'6',148,0,'2018-12-31 16:32:52','2018-12-31 16:32:52'),(292,'2019-05-09',166.67,6,'6',148,0,'2018-12-31 16:32:52','2018-12-31 16:32:52'),(293,'2018-12-09',166.67,1,'6',149,0,'2020-02-17 13:23:31','2020-02-17 13:23:31'),(294,'2019-01-09',166.67,2,'6',149,0,'2020-02-17 13:23:31','2020-02-17 13:23:31'),(295,'2019-02-09',166.67,3,'6',149,0,'2020-02-17 13:23:31','2020-02-17 13:23:31'),(296,'2019-03-09',166.67,4,'6',149,0,'2020-02-17 13:23:31','2020-02-17 13:23:31'),(297,'2019-04-09',166.67,5,'6',149,0,'2020-02-17 13:23:31','2020-02-17 13:23:31'),(298,'2019-05-09',166.67,6,'6',149,0,'2020-02-17 13:23:31','2020-02-17 13:23:31');
/*!40000 ALTER TABLE `tb_despesa_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_mudartexto`
--

DROP TABLE IF EXISTS `tb_mudartexto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_mudartexto` (
  `id_mudartexto` int(11) NOT NULL AUTO_INCREMENT,
  `frase` text COLLATE utf8mb4_unicode_ci,
  `apelido` text COLLATE utf8mb4_unicode_ci,
  `id_usuario` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_mudartexto`),
  KEY `fk_tb_mudartexto_tb_usuario1_idx` (`id_usuario`),
  CONSTRAINT `fk_tb_mudartexto_tb_usuario1` FOREIGN KEY (`id_usuario`) REFERENCES `tb_usuario` (`id_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_mudartexto`
--

LOCK TABLES `tb_mudartexto` WRITE;
/*!40000 ALTER TABLE `tb_mudartexto` DISABLE KEYS */;
INSERT INTO `tb_mudartexto` VALUES (4,'Acho que vai mudar tudo','avt',3,'2018-10-23 15:43:43','2018-10-23 15:43:43'),(17,'Rua m11 quadra 10 lote 5 numero 5','meuendereco',12,'2019-02-04 12:16:58','2019-02-04 12:16:58'),(18,'Estou a caminho!','eac',12,'2019-02-04 13:33:57','2019-02-04 13:33:57'),(19,'Aeeee automação praticamente finalizada','hpy',1,'2019-03-27 21:20:30','2019-03-27 21:20:39'),(20,'Estou na porta!','enp',12,'2020-02-17 13:12:50','2020-02-17 13:12:50'),(21,'Kleber de souza','meunome',12,'2020-09-29 14:02:55','2020-09-29 14:02:55'),(22,'Estou com fome.','fome',12,'2020-10-02 23:43:55','2020-10-02 23:43:55');
/*!40000 ALTER TABLE `tb_mudartexto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_pessoa`
--

DROP TABLE IF EXISTS `tb_pessoa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_pessoa` (
  `id_pessoa` int(11) NOT NULL AUTO_INCREMENT,
  `no_pessoa` text COLLATE utf8mb4_unicode_ci,
  `sexo` varchar(1) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dt_nascimento` date DEFAULT NULL,
  `no_email` text COLLATE utf8mb4_unicode_ci,
  `nu_cpfcnpj` text COLLATE utf8mb4_unicode_ci,
  `bo_ativo` tinyint(1) DEFAULT NULL,
  `img_perfil` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_pessoa`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_pessoa`
--

LOCK TABLES `tb_pessoa` WRITE;
/*!40000 ALTER TABLE `tb_pessoa` DISABLE KEYS */;
INSERT INTO `tb_pessoa` VALUES (1,'klÉber','m',NULL,'kleber107@gmail.com',NULL,1,NULL,NULL,NULL),(2,'Thyerre Thiago','m',NULL,'tt@gmail.com',NULL,1,NULL,NULL,NULL),(17,'Roberto','m','2018-11-03','email@gmail.com','04074511546',1,'img.png','2018-11-07 23:06:09','2018-11-07 23:06:09'),(18,'Roberto','m','2018-11-03','email@gmail.com','04074511546',1,'img.png','2018-11-07 23:06:25','2018-11-07 23:06:25'),(19,'Roberto','m','2018-11-03','email@gmail.com','04074511546',1,'img.png','2018-11-07 23:06:37','2018-11-07 23:06:37'),(20,'Roberto','m','2018-11-03','email@gmail.com','04074511546',1,'img.png','2018-11-07 23:08:40','2018-11-07 23:08:40'),(21,'Roberto','m','2018-11-03','email@gmail.com','04074511546',1,'img.png','2018-11-07 23:11:51','2018-11-07 23:11:51'),(36,'Roberto','m','2018-11-03','email@gmail.com','04074511546',1,'img.png','2018-11-07 23:20:53','2018-11-07 23:20:53'),(37,'Roberto','m','2018-11-03','email@gmail.com','04074511546',1,'img.png','2018-11-07 23:20:58','2018-11-07 23:20:58'),(42,'Roberto','m','2018-11-03','email@gmail.com','04074511546',1,'img.png','2018-11-07 23:21:48','2018-11-07 23:21:48'),(45,'Kleber de souza','m','1990-11-03','klebim107@gmail.com','01201201201',1,'img.png','2018-11-08 13:02:24','2018-11-08 12:47:05'),(50,'Thyerre','m','1990-11-03','klebim107@gmail.com','01201201201',1,'img.png','2018-11-12 19:36:10','2018-11-12 19:40:45'),(51,'Thiago','m','2018-11-03','thiago@gmail.com','01201201201',1,'img.png','2018-11-12 19:41:31','2018-11-12 19:41:31'),(52,'conta 1','m','2018-11-03','thiago@gmail.com','01201201201',1,'img.png','2018-12-14 13:27:11','2018-12-14 13:27:11'),(53,'conta 1','m','2018-11-03','thiago@gmail.com','01201201201',1,'img.png','2018-12-14 13:27:24','2018-12-14 13:27:24'),(54,'anna carla','f','1990-03-11','klebim107@gmail.com','01201201201',1,'img.png','2018-12-31 15:52:08','2019-02-22 14:35:58');
/*!40000 ALTER TABLE `tb_pessoa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_receita`
--

DROP TABLE IF EXISTS `tb_receita`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_receita` (
  `id_receita` int(11) NOT NULL AUTO_INCREMENT,
  `ds_receita` text,
  `vl_receita` decimal(10,2) DEFAULT NULL,
  `dt_receita` date DEFAULT NULL,
  `dt_fim_intervalo` date DEFAULT NULL,
  `dt_vencimento_pagamento` date DEFAULT NULL,
  `dt_cancelado` date DEFAULT NULL,
  `bo_repetir` tinyint(4) DEFAULT NULL,
  `id_categoria_receita` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_receita`),
  KEY `fk_tb_receita_tb_categoria_receita1_idx` (`id_categoria_receita`),
  KEY `fk_tb_receita_tb_usuario1_idx` (`id_usuario`),
  CONSTRAINT `fk_tb_receita_tb_categoria_receita1` FOREIGN KEY (`id_categoria_receita`) REFERENCES `tb_categoria_receita` (`id_categoria_receita`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_tb_receita_tb_usuario1` FOREIGN KEY (`id_usuario`) REFERENCES `tb_usuario` (`id_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_receita`
--

LOCK TABLES `tb_receita` WRITE;
/*!40000 ALTER TABLE `tb_receita` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_receita` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_sistema_modulo`
--

DROP TABLE IF EXISTS `tb_sistema_modulo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_sistema_modulo` (
  `cd_sistema_modulo` int(11) NOT NULL,
  `no_modulo` text,
  `icone` text,
  `bo_ativo` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`cd_sistema_modulo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_sistema_modulo`
--

LOCK TABLES `tb_sistema_modulo` WRITE;
/*!40000 ALTER TABLE `tb_sistema_modulo` DISABLE KEYS */;
INSERT INTO `tb_sistema_modulo` VALUES (1,'Sem Modulo',NULL,0),(2,'Estoque','fa fa-calculator',1),(3,'Administrativo','fa fa-archive',1),(4,'Financeiro','fa fa-money',1),(5,'Relatórios Administrativos','fa fa-bar-chart',1),(6,'Relatórios Financeiros','fa fa-area-chart',1),(7,'Painel do Aluno','fa fa-columns',1),(8,'Alunos','fa fa-users ',1);
/*!40000 ALTER TABLE `tb_sistema_modulo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_sistema_rotina`
--

DROP TABLE IF EXISTS `tb_sistema_rotina`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_sistema_rotina` (
  `cd_sistema_rotina` int(11) NOT NULL AUTO_INCREMENT,
  `cd_sistema_modulo` int(11) NOT NULL,
  `no_rotina` text,
  `ds_rotina` text,
  `no_arquivo` text,
  `ds_url` text,
  `icon` text,
  PRIMARY KEY (`cd_sistema_rotina`),
  KEY `fk_tb_sistema_rotina_tb_sistema_modulo1_idx` (`cd_sistema_modulo`),
  CONSTRAINT `fk_tb_sistema_rotina_tb_sistema_modulo1` FOREIGN KEY (`cd_sistema_modulo`) REFERENCES `tb_sistema_modulo` (`cd_sistema_modulo`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_sistema_rotina`
--

LOCK TABLES `tb_sistema_rotina` WRITE;
/*!40000 ALTER TABLE `tb_sistema_rotina` DISABLE KEYS */;
INSERT INTO `tb_sistema_rotina` VALUES (1,2,'Tipo de Despesa','Tipo de Despesa','','tipo-despesa','coding'),(2,2,'Mudar Texto','Mudar Texto','','mudar-texto','repair'),(3,2,'Cartão de crédito','Cartão de crédito','','cartao-credito','credit-card-2'),(4,2,'Receita','Receita','','receita','laughing'),(5,2,'Despesa','Despesa','','despesas','wallet-2'),(6,2,'Despesa em contas','Despesa em contas','','despesas-contas','wallet-2'),(7,2,'Despesa em Cartão','Despesa em Cartão','','despesas-cartao','wallet-2'),(8,2,'Despesa Compartilhada','Despesa Compartilhada','','despesas-compartilhada','mine'),(9,2,'Amigos','Amigos','','amigos','male-female'),(10,2,'Conta','Conta','','conta','building'),(11,2,'Categoria Despesa','Categoria Despesa','','categoria-despesa','receipt-4'),(12,2,'Categoria Receita','Categoria Receita','','categoria-receita','receipt-4');
/*!40000 ALTER TABLE `tb_sistema_rotina` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_tipo_despesa`
--

DROP TABLE IF EXISTS `tb_tipo_despesa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_tipo_despesa` (
  `id_tipo_despesa` int(11) NOT NULL AUTO_INCREMENT,
  `no_tipo_despesa` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_tipo_despesa`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_tipo_despesa`
--

LOCK TABLES `tb_tipo_despesa` WRITE;
/*!40000 ALTER TABLE `tb_tipo_despesa` DISABLE KEYS */;
INSERT INTO `tb_tipo_despesa` VALUES (1,'Única','2018-10-04 21:42:43','2018-10-05 20:10:39'),(2,'Parcelada','2018-10-04 21:42:45','2018-10-04 21:42:45'),(3,'Fixa','2018-10-04 21:42:50','2018-10-04 21:42:50');
/*!40000 ALTER TABLE `tb_tipo_despesa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_usuario`
--

DROP TABLE IF EXISTS `tb_usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_usuario` (
  `id_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `login` text COLLATE utf8mb4_unicode_ci,
  `password` text COLLATE utf8mb4_unicode_ci,
  `id_pessoa` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_usuario`),
  KEY `fk_tb_usuario_tb_pessoa1_idx` (`id_pessoa`),
  CONSTRAINT `fk_tb_usuario_tb_pessoa1` FOREIGN KEY (`id_pessoa`) REFERENCES `tb_pessoa` (`id_pessoa`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_usuario`
--

LOCK TABLES `tb_usuario` WRITE;
/*!40000 ALTER TABLE `tb_usuario` DISABLE KEYS */;
INSERT INTO `tb_usuario` VALUES (1,'kleber','$2y$10$TKh8H1.PfQx37YgCzwiKb.KjNyWgaHb9cbcoQgdIVFlYg7B77UdFm',1,NULL,NULL),(3,'tt','$2y$10$8HaHCexOfgGMR/EpVmM/QuLLnhgTFvsmgv28TC71IapywgEHu54qO',2,'2018-10-23 15:42:15','2018-10-23 15:42:15'),(4,'login','$2y$10$.SnU09CIqU/uRq5anfnRROzTLcMzld0AquoChuafk4XLCP6qs.I0C',17,'2018-11-07 23:06:09','2018-11-07 23:06:09'),(5,'login','$2y$10$CFfoGaKoh6BVxfY9wRRTbOUDbYrtly/KfY2tJ0vzNq33XcnuD25oC',18,'2018-11-07 23:06:25','2018-11-07 23:06:25'),(6,'login','$2y$10$MUHA3xhhs6vpM0Bu7kZsi.r2ojoq67WzJDPoul4OJw6aYgEkujqaO',19,'2018-11-07 23:06:37','2018-11-07 23:06:37'),(7,'meuusuarioaqui','$2y$10$cwyTjARZEkpnNplsCHqDe.GPOsr0TqbMTyyyrcCyYVen8GnAlCl1G',20,'2018-11-07 23:08:40','2018-11-07 23:08:40'),(8,'meuusuarioaqui','$2y$10$ETI8aZWMld75e5CGpwACQuX7.STn85CtFulmNZFRsqodQaKN7HqfW',21,'2018-11-07 23:11:52','2018-11-07 23:11:52'),(9,'meuusuarioaquia','$2y$10$Fd8EXyXjxvtb6y43RKDDsO5av.JBo83P/ONwMG8YoKFVEnT3Hogyu',36,'2018-11-07 23:20:53','2018-11-07 23:20:53'),(10,'meuusuarioaquia','$2y$10$.Kai6wO4lEwBUscsk.oqk.CSjDAfpO/CWniG4WqiMA0SnmVioA792',37,'2018-11-07 23:20:58','2018-11-07 23:20:58'),(11,'meuusuarioaquib','$2y$10$/t7dhGG6xJURowut0dFyue6xOs6b3.mAkorzA2IczXPviV7Y2lhea',42,'2018-11-07 23:21:48','2018-11-07 23:21:48'),(12,'start107','$2y$10$CRcPFCxLP9U9HrSVsxSYhOXaEHq4qGUYZ3l/kwhIeSD.vi6G6yO.q',45,'2018-11-08 13:02:24','2018-11-08 12:47:05'),(13,'thyerre','\n$2y$12$Xlp6P.ipMYXAqmngA/oLT.Nreb4PAZBaDcUDkEIWlhcsJ59EbwUQa\n',50,'2018-11-12 19:36:10','2018-11-12 19:40:45'),(14,'joaopaulo','\n$2y$12$Xlp6P.ipMYXAqmngA/oLT.Nreb4PAZBaDcUDkEIWlhcsJ59EbwUQa\n',51,'2018-11-12 19:41:31','2018-11-12 19:41:31'),(15,'conta 1','$2y$10$0vkJP464c1NJ1.gK/SusiOZjdtZ6ZJpcPzPSod0mUqSbP/GSOo2.i',52,'2018-12-14 13:27:11','2018-12-14 13:27:11'),(16,'conta 2','$2y$10$haLLK9PHBE9FsvZb5QbF7eGcg1QxmsLxwvcalrm5twEQqohBGkcmK',53,'2018-12-14 13:27:24','2018-12-14 13:27:24'),(17,'anna','$2y$10$uCSvJhs9nSw977WV1hQrqu2Og2VG6axEIA5MB3OvdmEfaV8v/LSii',54,'2018-12-31 15:52:08','2019-02-22 14:35:58');
/*!40000 ALTER TABLE `tb_usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'financeiro'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-10-05 18:17:31
