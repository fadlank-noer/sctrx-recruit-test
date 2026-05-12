#!/bin/sh
set -e

echo "Applying database schema..."
npx prisma db push --accept-data-loss

echo "Seeding database..."
npx prisma db seed

echo "Starting Next.js..."
npm start
