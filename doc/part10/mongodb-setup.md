# Mongodb Basic

### What is Mongodb?

MongoDB is a cross-platform, document oriented database that provides, high performance, high availability, and easy scalability. MongoDB works on concept of collection and document.

##### Database

Database is a physical container for collections. Each database gets its own set of files on the file system. A single MongoDB server typically has multiple databases.

##### Collection

Collection is a group of MongoDB documents. It is the equivalent of an RDBMS table. A collection exists within a single database. Collections do not enforce a schema. Documents within a collection can have different fields. Typically, all documents in a collection are of similar or related purpose.

##### Document

A document is a set of key-value pairs. Documents have dynamic schema. Dynamic schema means that documents in the same collection do not need to have the same set of fields or structure, and common fields in a collection's documents may hold different types of data.

---

### Why Use Mongodb

Organizations of all sizes are adopting MongoDB because it enables them to build applications faster, handle highly diverse data types, and manage applications more efficiently at scale.

* Development is simplified as MongoDB documents map naturally to modern, object-oriented programming languages.
* MongoDB can be easily scaled within and across multiple distributed data centers.
* Working with data as flexible JSON documents, rather than as rigid rows and columns, is proven to help developers move faster.

---

### Query Language Comparison

MySQL

```
INSERT INTO users (user_id, age, status)VALUES ('bcd001', 45, 'A')

SELECT * FROM users

UPDATE users SET status = 'C' WHERE age > 25
```

MongoDB

```
db.users.insert({
  user_id: 'bcd001',
  age: 45,
  status: 'A'
});

db.users.find();

db.users.update(
  { age: { $gt: 25 } },
  { $set: { status: 'C' } },
  { multi: true }
)
```

---

### Mongodb Installation

Download and follow the instructions here: https://www.mongodb.com/download-center?jmp=nav#community

---

### Run Mongodb

* Create a directory to store data

Before you start MongoDB for the first time, create the directory to which the mongod process will write data. By default, the mongod process uses the /data/db directory. If you create a directory other than this one, you must specify that directory in the dbpath option when starting the mongod process later in this procedure.

The following example command creates the default /data/db directory:

```
mkdir -p /data/db
```

* Set permissions for the data directory

Before running mongod for the first time, ensure that the user account running mongod has read and write permissions for the directory.

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
