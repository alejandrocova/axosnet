USE [master]
GO
/****** Object:  Database [Axosnet]    Script Date: 21/01/2020 12:34:55 p. m. ******/
CREATE DATABASE [Axosnet]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'Axosnet', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\Axosnet.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'Axosnet_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\Axosnet_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [Axosnet] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [Axosnet].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [Axosnet] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [Axosnet] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [Axosnet] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [Axosnet] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [Axosnet] SET ARITHABORT OFF 
GO
ALTER DATABASE [Axosnet] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [Axosnet] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [Axosnet] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [Axosnet] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [Axosnet] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [Axosnet] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [Axosnet] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [Axosnet] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [Axosnet] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [Axosnet] SET  DISABLE_BROKER 
GO
ALTER DATABASE [Axosnet] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [Axosnet] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [Axosnet] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [Axosnet] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [Axosnet] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [Axosnet] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [Axosnet] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [Axosnet] SET RECOVERY FULL 
GO
ALTER DATABASE [Axosnet] SET  MULTI_USER 
GO
ALTER DATABASE [Axosnet] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [Axosnet] SET DB_CHAINING OFF 
GO
ALTER DATABASE [Axosnet] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [Axosnet] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [Axosnet] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'Axosnet', N'ON'
GO
ALTER DATABASE [Axosnet] SET QUERY_STORE = OFF
GO
USE [Axosnet]
GO
/****** Object:  User [axos]    Script Date: 21/01/2020 12:34:55 p. m. ******/
CREATE USER [axos] FOR LOGIN [axos] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_owner] ADD MEMBER [axos]
GO
/****** Object:  Table [dbo].[catCurrencies]    Script Date: 21/01/2020 12:34:55 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[catCurrencies](
	[currencyId] [int] IDENTITY(1,1) NOT NULL,
	[currency] [varchar](5) NOT NULL,
 CONSTRAINT [PK_currencyId] PRIMARY KEY CLUSTERED 
(
	[currencyId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[catSuppliers]    Script Date: 21/01/2020 12:34:55 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[catSuppliers](
	[supplierId] [int] IDENTITY(1,1) NOT NULL,
	[supplier] [varchar](255) NOT NULL,
 CONSTRAINT [PK_supplierId] PRIMARY KEY CLUSTERED 
(
	[supplierId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblReceipts]    Script Date: 21/01/2020 12:34:55 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblReceipts](
	[receiptId] [int] IDENTITY(1,1) NOT NULL,
	[supplierId] [int] NOT NULL,
	[amount] [decimal](19, 4) NOT NULL,
	[currencyId] [int] NOT NULL,
	[date] [datetime] NULL,
	[comment] [varchar](1000) NULL,
 CONSTRAINT [PK_receiptId] PRIMARY KEY CLUSTERED 
(
	[receiptId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblUsers]    Script Date: 21/01/2020 12:34:55 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblUsers](
	[userId] [int] IDENTITY(1,1) NOT NULL,
	[username] [varchar](50) NOT NULL,
	[password] [varchar](100) NOT NULL,
 CONSTRAINT [PK_userId] PRIMARY KEY CLUSTERED 
(
	[userId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[catCurrencies] ON 

INSERT [dbo].[catCurrencies] ([currencyId], [currency]) VALUES (1, N'MXN')
INSERT [dbo].[catCurrencies] ([currencyId], [currency]) VALUES (2, N'USD')
INSERT [dbo].[catCurrencies] ([currencyId], [currency]) VALUES (3, N'EUR')
SET IDENTITY_INSERT [dbo].[catCurrencies] OFF
SET IDENTITY_INSERT [dbo].[catSuppliers] ON 

INSERT [dbo].[catSuppliers] ([supplierId], [supplier]) VALUES (1, N'Proveedor 1')
INSERT [dbo].[catSuppliers] ([supplierId], [supplier]) VALUES (2, N'Proveedor 2')
INSERT [dbo].[catSuppliers] ([supplierId], [supplier]) VALUES (3, N'Proveedor 3')
SET IDENTITY_INSERT [dbo].[catSuppliers] OFF
SET IDENTITY_INSERT [dbo].[tblReceipts] ON 

INSERT [dbo].[tblReceipts] ([receiptId], [supplierId], [amount], [currencyId], [date], [comment]) VALUES (4, 2, CAST(250.0000 AS Decimal(19, 4)), 1, CAST(N'2020-01-21T00:00:00.000' AS DateTime), N'Nada')
INSERT [dbo].[tblReceipts] ([receiptId], [supplierId], [amount], [currencyId], [date], [comment]) VALUES (5, 3, CAST(500.5000 AS Decimal(19, 4)), 1, CAST(N'2020-01-21T00:00:00.000' AS DateTime), N'llll')
INSERT [dbo].[tblReceipts] ([receiptId], [supplierId], [amount], [currencyId], [date], [comment]) VALUES (6, 2, CAST(1123.0000 AS Decimal(19, 4)), 1, CAST(N'2020-01-21T00:00:00.000' AS DateTime), N'1212')
INSERT [dbo].[tblReceipts] ([receiptId], [supplierId], [amount], [currencyId], [date], [comment]) VALUES (7, 3, CAST(444.0000 AS Decimal(19, 4)), 2, CAST(N'2020-01-21T00:00:00.000' AS DateTime), N'rrrr')
INSERT [dbo].[tblReceipts] ([receiptId], [supplierId], [amount], [currencyId], [date], [comment]) VALUES (8, 1, CAST(123.0000 AS Decimal(19, 4)), 1, CAST(N'2020-01-21T00:00:00.000' AS DateTime), N'qsaqs')
INSERT [dbo].[tblReceipts] ([receiptId], [supplierId], [amount], [currencyId], [date], [comment]) VALUES (10, 1, CAST(122.0000 AS Decimal(19, 4)), 1, CAST(N'2020-01-21T00:00:00.000' AS DateTime), N'swsw')
SET IDENTITY_INSERT [dbo].[tblReceipts] OFF
SET IDENTITY_INSERT [dbo].[tblUsers] ON 

INSERT [dbo].[tblUsers] ([userId], [username], [password]) VALUES (1, N'omar', N'123')
SET IDENTITY_INSERT [dbo].[tblUsers] OFF
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__tblUsers__F3DBC572DCEB7349]    Script Date: 21/01/2020 12:34:55 p. m. ******/
ALTER TABLE [dbo].[tblUsers] ADD UNIQUE NONCLUSTERED 
(
	[username] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [dbo].[tblReceipts]  WITH CHECK ADD  CONSTRAINT [FK_currencyId] FOREIGN KEY([currencyId])
REFERENCES [dbo].[catCurrencies] ([currencyId])
GO
ALTER TABLE [dbo].[tblReceipts] CHECK CONSTRAINT [FK_currencyId]
GO
ALTER TABLE [dbo].[tblReceipts]  WITH CHECK ADD  CONSTRAINT [FK_supplierId] FOREIGN KEY([supplierId])
REFERENCES [dbo].[catSuppliers] ([supplierId])
GO
ALTER TABLE [dbo].[tblReceipts] CHECK CONSTRAINT [FK_supplierId]
GO
USE [master]
GO
ALTER DATABASE [Axosnet] SET  READ_WRITE 
GO
