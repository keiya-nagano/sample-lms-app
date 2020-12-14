@echo off

set filename=sample.sqlite3

if exist "%filename%" (
    echo %filename% is already exists
    goto :end
)

sqlite3 sample.sqlite3 < schema_sample.sql
sqlite3 sample.sqlite3 < import_sample.sql

:end