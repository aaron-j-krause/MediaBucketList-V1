create role mediabucketlist with login encrypted password 'changemenow';
create database "mediabucketlist-test" with owner mediabucketlist;
create database "mediabucketlist-dev" with owner mediabucketlist;
create database "mediabucketlist-prod" with owner mediabucketlist;
