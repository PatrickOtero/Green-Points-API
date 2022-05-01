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

create table companyMissionPosts (
	id serial primary key not null,
  	mission_name varchar(50) unique not null,
	mission_title varchar(100) unique not null,
  	mission_description varchar(1000) unique not null,
  	company_id int not null references companies (id)
)

create table missionUserLikes (
	id serial not null,
  	like_user_id int not null references individuals(id),
	like_post_id int not null references companyMissionPosts(id)
)
