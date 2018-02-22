# Mongodb Setup

### Mongodb Installation

Download and follow the instructions here: https://www.mongodb.com/download-center. Please select the community server to download.

---

### Run Mongodb

* Create a directory to store data

Before you start MongoDB for the first time, create the directory to which the mongod process will write data. By default, the mongod process uses the /data/db directory. If you create a directory other than this one, you must specify that directory in the dbpath option when starting the mongod process later in this procedure.

The following example command creates the default /data/db directory:

```
mkdir -p /data/db
```

If you see the error `mkdir: /data/db: Permission denied`, please try

```
sudo mkdir -p /data/db
```

* Set permissions for the data directory

Before running mongod for the first time, ensure that the user account running mongod has read and write permissions for the directory. If you see the error `Attempted to create a lock file on a read-only directory: /data/db, terminating`, which means the mongoDB server tried to create some files inside the read-only directory /data/db. To fix this, you need to also give the write ability to /data/db:

```
sudo chmod -R a+w /data
```

**NOTE: The easist way is to create a directory which you (the current user) has both read and write permissions by default to store the data, for example: `~/data/db`.**

* Run MongoDB

To run MongoDB, run the mongod process at the system prompt. If necessary, specify the path of the mongod or the data directory.

```
mongod

./usr/local/bin/mongod
```

If you do not use the default data directory (i.e., /data/db), specify the path to the data directory using the --dbpath option:

```
mongod --dbpath <path to data directory>
```

* Verify that MongoDB has started successfully

Verify that MongoDB has started successfully by checking the process output for the following line:

```
[initandlisten] waiting for connections on port 27017
```

The output should be visible in the terminal or shell window.

* Start using MongoDB
  Start a mongo shell on the same host machine as the mongod. Use the --host command line option to specify the localhost address and port that the mongod listens on:

```
mongo --host 127.0.0.1:27017
```

Later, to stop MongoDB, press Control+C in the terminal where the mongod instance is running.
