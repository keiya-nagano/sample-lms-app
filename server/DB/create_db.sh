#!/bin/sh

if [ -f /DB/sample.sqlite3 ] ; then
    echo 'sample.sqlite3 is already exists'
    exist;
fi

sqlite3 /DB/sample.sqlite3 < /DB/schema_sample.sql
sqlite3 -separator , /DB/sample.sqlite3 '.import /DB/book.csv book'