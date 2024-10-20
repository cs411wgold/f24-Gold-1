# not useful yet, not sure if will be needed

#!/bin/bash

# Wait for the database to be ready
while ! nc -z kt-db 5432; do
    echo "Waiting for the database to be ready..."
    sleep 1
done

echo "Database is ready. Running migrations..."

# Run Django migrations
python manage.py migrate

echo "Running custom SQL file..."

# Run the custom SQL file using dbshell
python manage.py dbshell < /app/db/config.sql

echo "Starting Gunicorn server..."

# Start the Gunicorn server
exec gunicorn --bind 0.0.0.0:8000 djangoConfig.wsgi:application
