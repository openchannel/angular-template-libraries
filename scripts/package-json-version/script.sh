#!/usr/bin/env sh
# 1) Validate incoming projectVersion like: 0.0.0 or 0.0.0-0.
# 2) Update projectVersion in three package.json files
#     - ./package.json
#     - ./projects/angular-common-services/package.json
#     - ./projects/angular-common-components/package.json


# New projectVersion
projectVersion=$1

echo "Up package.json-s to '$projectVersion' version ..."

if ! ([[ $projectVersion == +([0-9]).+([0-9]).+([0-9]) ]] || [[ $projectVersion == +([0-9]).+([0-9]).+([0-9])-+([0-9]) ]])
then
  echo "Invalid incoming projectVersion '$projectVersion'. Must be like: 0.0.0 or 0.0.0-0"
  exit 1;
fi

# Current directory
projectDirectory=$(pwd);

# Up projectVersion
function upPackageJsonVersion() {
  # $1 - it is path to library
  cd $1 && echo "Up package.json version (path: $1)" && npm version $projectVersion --no-git-tag-version
  if [ $? != 1 ];
  then
    echo "Success!"
  else
      exit 1
  fi
}

## => In main package.json (create a new commit with projectVersion)
upPackageJsonVersion "${projectDirectory}"
## => In services package.json
upPackageJsonVersion "${projectDirectory}/projects/angular-common-services"
## => In components package.json
upPackageJsonVersion "${projectDirectory}/projects/angular-common-components"

cd ${projectDirectory}
