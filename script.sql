create Database Axosnet
GO

USE Axosnet
GO

create table catSuppliers(
supplierId int IDENTITY(1,1) NOT NULL,
supplier varchar(255) NOT NULL
CONSTRAINT PK_supplierId PRIMARY KEY (supplierId)
)
GO
create table catCurrencies(
currencyId int IDENTITY(1,1) NOT NULL,
currency varchar(5) NOT NULL
CONSTRAINT PK_currencyId PRIMARY KEY (currencyId)
)
GO
create table tblReceipts(
receiptId int IDENTITY(1,1) NOT NULL,
supplierId int NOT NULL,
amount DECIMAL(19,4) NOT NULL,
currencyId int NOT NULL,
date DATETIME,
comment VARCHAR(1000),
CONSTRAINT PK_receiptId PRIMARY KEY (receiptId),
CONSTRAINT FK_supplierId FOREIGN KEY (supplierId)
    REFERENCES catSuppliers(supplierId),
	CONSTRAINT FK_currencyId FOREIGN KEY (currencyId)
    REFERENCES catCurrencies(currencyId)
)
GO
create table tblUsers (
userId int IDENTITY(1,1) NOT NULL,
username VARCHAR(50) not null unique,
password VARCHAR(100)not null,
CONSTRAINT PK_userId PRIMARY KEY (userId)
)
GO
insert into catSuppliers(supplier) values('Proveedor 1');
insert into catSuppliers(supplier) values('Proveedor 2');
insert into catSuppliers(supplier) values('Proveedor 3');

insert into catCurrencies(currency) values('MXN');
insert into catCurrencies(currency) values('USD');
insert into catCurrencies(currency) values('EUR');


