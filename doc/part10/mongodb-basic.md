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
