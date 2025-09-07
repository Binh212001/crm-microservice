CREATE DATABASE "inventory";

-- tạo user (nếu chưa có)
DO
$do$
BEGIN
   IF NOT EXISTS (
      SELECT FROM pg_catalog.pg_roles
      WHERE rolname = 'admin') THEN
      CREATE ROLE admin LOGIN PASSWORD '123456';
   END IF;
END
$do$;

CREATE DATABASE "user";

DO
$do$
BEGIN
   IF NOT EXISTS (
      SELECT FROM pg_catalog.pg_roles
      WHERE rolname = 'admin') THEN
      CREATE ROLE admin LOGIN PASSWORD '123456';
   END IF;
END
$do$;