# Setting Service

A microservice for managing application settings with key-value storage using PostgreSQL JSONB.

## Features

- Store settings as key-value pairs with JSONB support
- CRUD operations for settings
- Bulk operations for multiple keys
- TypeORM integration with PostgreSQL
- RESTful API endpoints

## Database Schema

The service uses a `settings` table with the following structure:

```sql
CREATE TABLE settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key VARCHAR(255) UNIQUE NOT NULL,
  value JSONB,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by VARCHAR(255),
  updated_by VARCHAR(255)
);
```

## API Endpoints

### Settings Management

- `POST /settings` - Create a new setting
- `GET /settings` - Get all settings
- `GET /settings/keys?keys=key1,key2,key3` - Get multiple settings by keys
- `GET /settings/:key` - Get a specific setting by key
- `GET /settings/:key/value` - Get only the value of a setting
- `PUT /settings/:key` - Update a setting by key
- `PUT /settings/:key/value` - Update only the value of a setting
- `DELETE /settings/:key` - Delete a setting by key

### Examples

#### Create a setting

```bash
curl -X POST http://localhost:3000/settings \
  -H "Content-Type: application/json" \
  -d '{
    "key": "app.theme",
    "value": {"primary": "#007bff", "secondary": "#6c757d"},
    "description": "Application theme colors"
  }'
```

#### Get a setting value

```bash
curl http://localhost:3000/settings/app.theme/value
```

#### Update a setting value

```bash
curl -X PUT http://localhost:3000/settings/app.theme/value \
  -H "Content-Type: application/json" \
  -d '{
    "value": {"primary": "#28a745", "secondary": "#6c757d"},
    "description": "Updated theme colors"
  }'
```

#### Get multiple settings

```bash
curl "http://localhost:3000/settings/keys?keys=app.theme,database.host,api.timeout"
```

## Environment Variables

- `PORT` - Service port (default: 3000)
- `DATABASE_HOST` - Database host (default: localhost)
- `DATABASE_PORT` - Database port (default: 25432)
- `DATABASE_USERNAME` - Database username (default: admin)
- `DATABASE_PASSWORD` - Database password (default: 123456)
- `DATABASE_NAME` - Database name (default: setting)

## Running the Service

### Development

```bash
npm run start:setting:dev
```

### Production

```bash
npm run build:setting-service
npm run start:setting:prod
```

## Data Types

The `value` field supports any JSON-serializable data:

- Strings: `"hello world"`
- Numbers: `42`, `3.14`
- Booleans: `true`, `false`
- Objects: `{"key": "value", "nested": {"data": 123}}`
- Arrays: `[1, 2, 3, "four"]`
- Null: `null`
