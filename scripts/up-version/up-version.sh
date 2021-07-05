#!/usr/bin/env sh

JIRA_EMAIL=$1
JIRA_API_KEY=$2
JIRA_RELEASE_VERSION=$3
PACKAGE_VERSION=$4
GIT_REPOSITORY_NAME=$5

echo "Up version to ${PACKAGE_VERSION}"

# ==== Get latest changes
git pull

# ==== To project directory ===
cd ../..
projectDirectory=$(pwd);

# ==== Up version ====
function upPackageJsonVersion() {
  # $1 - it is path to library
  cd $1 && npm version ${PACKAGE_VERSION}
  if [ $? != 1 ]; then
    echo "${result} Up package.json version to ${PACKAGE_VERSION} (path: $1)"
    else echo "${result} Can't update package.json version $1 ." && exit 1
  fi
}
## => In main package.json (create a new commit with version)
upPackageJsonVersion "${projectDirectory}"
## => In services package.json
upPackageJsonVersion "${projectDirectory}/projects/angular-common-services"
## => In components package.json
upPackageJsonVersion "${projectDirectory}/projects/angular-common-components"
cd ${projectDirectory}

npm i

# ==== changelog.md ====
## => Create changelog.md file
echo 'Creating a new changelog.md from JIRA issues.'
cd ${projectDirectory}/scripts/up-version
EMAIL=${JIRA_EMAIL} API_KEY=${JIRA_API_KEY} RELEASE_VERSION=${JIRA_RELEASE_VERSION} PACKAGE_VERSION=${PACKAGE_VERSION} GIT_REPOSITORY_NAME=${GIT_REPOSITORY_NAME} node jira-changelog-builder.js
if [ $? == 1 ]; then
  echo "Can't create changelog.md file" && exit 1
fi

# ==== Commit changes + create a tag + push changes
git add '../../projects/angular-common-components/package.json' '../../projects/angular-common-services/package.json'
git add '../../package-lock.json'
git add '../../changelog.md'
git commit --amend -m "Up version to ${PACKAGE_VERSION}"
git push
