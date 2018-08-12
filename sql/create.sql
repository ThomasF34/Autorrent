DROP TABLE IF EXISTS users;

CREATE TABLE users (
  idUser bigint NOT NULL,
  ip varchar(15),
  registerDate timestamp NOT NULL default NOW(),
  CONSTRAINT pk_User PRIMARY KEY (idUser)
);
