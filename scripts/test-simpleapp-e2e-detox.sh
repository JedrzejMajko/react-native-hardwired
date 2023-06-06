#!/bin/bash

# This script is used to build & run e2e tests for react-native-hardwired package's SimpleTest example

cd ../packages/react-native-hardwired/examples/SimpleTest/

pwd

detox build --configuration ios.sim.release
detox test --configuration ios.sim.release
