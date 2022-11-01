CREATE DATABASE emailserver;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    servicename TEXT NOT NULL,
    accesstoken TEXT NOT NULL,
    refreshtoken TEXT NOT NULL
);

INSERT INTO emailserver (email,password,servicename) VALUES ('joy@hotmail.com','1234','gmail');


CREATE TABLE emailcontent(
    id SERIAL PRIMARY KEY,
    uuid uuid,
    firstname TEXT,
    lastname TEXT,
    fullname TEXT,
    senderemail TEXT,
    topic TEXT,
    message TEXT,
    phone TEXT
);

INSERT INTO emailcontent (id,firstname,lastname,fullname,senderemail,topic,message,phone) VALUES ('0836ecef-a0e7-4232-ad97-f8c8d4542084','joy','james','joyjames','joy@hot.com','testing','works doi','+91 7010693566');

SELECT * FROM trainers;

CREATE TABLE trainersAnatomy(
    id SERIAL,
    trainerId INT,
    bodyFat NUMERIC (5, 2),
    height NUMERIC (5, 2),
    weight NUMERIC (5, 2),
    traineeIds INTEGER[],
    otherDetails jsonb,
    PRIMARY KEY(trainerId),
    CONSTRAINT fk_trainers
    FOREIGN KEY(trainerId) 
	REFERENCES trainers(trainerId)
    ON DELETE CASCADE
);

ALTER TABLE trainersBody
RENAME TO trainersAnatomy; 

INSERT INTO trainersBody (trainerId,bodyFat,height,weight,otherDetails) VALUES ('1','22.2','175.6','77','nothing much');


CREATE TABLE trainee(
    traineeId SERIAL PRIMARY KEY,
    traineeName VARCHAR(255) NOT NULL,
    birthDate DATE NOT NULL,     
);

INSERT INTO trainers (trainerName,birthDate,bodyFat,height,weight) VALUES ('joy james','1999-08-02','19.02','178.5','81.10');

--psql -U -postgres 