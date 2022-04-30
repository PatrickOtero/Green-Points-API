create database greenPoints;

create table individuals (
    id serial primary key not null,
  	individual_name varchar(100) not null,
  	individual_cpf varchar(14) unique not null,
  	individual_email text unique not null,
  	individual_password text not null
);

create table companies (
    id serial primary key not null,
    company_name varchar(100) unique not null,
  	company_description varchar(600) not null,
    company_cnpj text unique not null,
  	company_email text unique not null,
    company_password text not null
);
