#!/usr/bin/env sh

# Create git tag by custom name or package.json version.
# Can push tags with --force flag.

TEMP_PUSH_TAG_FORCE=$1
PUSH_TAG_FORCE=${TEMP_PUSH_TAG_FORCE:-'false'}

# Get TAG name from property or package.json file.
tagName=$(node -e "console.log('v' + require('./package.json').version)")
echo "The current TAG name is $tagName"
# TAG name validation
if [[ ! $tagName == v+([0-9]).+([0-9]).+([0-9]) ]]
then
  echo 'Error. Your TAG name must be like v123.123.123 or Release-August-123'
  exit 1
fi

git tag $tagName

# push tag with --force flag only when is 'true'
if [ $PUSH_TAG_FORCE == true ]
then
  git push origin --force $tagName
  else git push origin $tagName
fi
