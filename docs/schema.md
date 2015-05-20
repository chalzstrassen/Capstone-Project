# Schema Information

## books
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
author_id   | integer   | not null, foreign key (references users)
title       | string    | not null
synopsis    | text      | not null
genre       | string    | not null

## collections
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references users)
name        | string    | not null
description | text      | not null

## collects
column name   | data type | details
--------------|-----------|-----------------------
id            | integer   | not null, primary key
collection_id | integer   | not null, foreign key (references collections)
book_id       | integer   | not null, foreign key (references books)

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
email           | string    | not null, unique
password_digest | string    | not null
session_token   | string    | not null, unique

# Bonus Implementation
## sales
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
buyer_id    | integer   | not null, foreign key (references users)
book_id     | integer   | not null, foreign key (references books)

