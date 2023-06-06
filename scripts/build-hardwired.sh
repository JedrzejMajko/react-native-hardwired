#!/bin/bash

# This script is used to test & build the react-native-hardwired package

cd ../packages/react-native-hardwired


if npm run lint src/*; then
    echo "Linting passed"
else
    echo "Linting failed. Exiting..."
    exit 1
fi

if npm run test; then
    echo "Test passed"
else
    echo "Test failed. Exiting..."
    exit 1
fi

npm run build:esm
npm run build:cjs
npm run build:package

