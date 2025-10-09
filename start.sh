#!/bin/bash
echo "Migrating Database..."
npx sequelize-cli db:migrate

echo "Seeding Database..."
npx sequelize-cli db:seed:all

echo "Starting Server Services..."
node dist/service/index.js &

echo "Starting Client Services..."
node dist/gateway/index.js &

wait -n
exit $?