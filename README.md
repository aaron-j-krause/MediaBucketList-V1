# Media Bucket List

To run this, you have to add constants.js to the ./lib folder with the following content:

```
module.exports = {
	THEMOVIEDB_APIKEY: 'YOUR OWN API KEY'
}
```

##Database Setup

The Media Bucket List application uses the Postgres database. Install and configure Postgress and then run the setup script:

```
$ psql postgres -f ./scripts/mediabucketlist-setup-db.sql -v username=<user name> -v pwd="'<password>'"
```
