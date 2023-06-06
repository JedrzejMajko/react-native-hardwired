#!/bin/bash

# This script is used to test & build transpiler for react-native-hardwired-transpiler package

cd ../packages/react-native-hardwired-transpiler

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
