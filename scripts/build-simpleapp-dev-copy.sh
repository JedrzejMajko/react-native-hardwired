#!/bin/bash

# This script is used to build the react-native-hardwired package and rsync it for speedy development

cd ../packages/react-native-hardwired

pwd

src_dir="."
dest_dir="./examples/SimpleTest/node_modules/react-native-hardwired/"

npmignore_file="${src_dir}/.npmignore"


# Check if .npmignore file exists
if [ ! -f "${npmignore_file}" ]; then
    echo "Error: .npmignore file not found in the source directory"
    exit 1
fi

exclude_patterns=()
exclude_patterns+=("--exclude=examples")

while IFS= read -r line; do
    # Ignore empty lines and comments
    if [[ -n "$line" ]] && [[ ! "$line" =~ ^\# ]]; then
        exclude_patterns+=("--exclude=$line")
    fi
done < "${npmignore_file}"

echo ${exclude_patterns[@]}

rsync -av --progress "${exclude_patterns[@]}" "${src_dir}/" "${dest_dir}"


cd ../..

#detox build --configuration ios.sim.release
#detox test --configuration ios.sim.release
