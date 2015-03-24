create role :username with login encrypted password :pwd;
create database "mediabucketlist-test" with owner :username;
create database "mediabucketlist-dev" with owner :username;
create database "mediabucketlist-prod" with owner :username;
