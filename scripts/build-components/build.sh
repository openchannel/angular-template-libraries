#!/bin/bash
echo "Build components command : $@"

BUILD_COMPONENTS_COMMAND=${@:-''}

isWatchMode=false

if [[ $BUILD_COMPONENTS_COMMAND == *--watch* ]]
then
  isWatchMode=true
fi

echo "Watch mode : $isWatchMode"

# ---------------------------------------------|
# --- Modify css files before project build ---|
# -------------------------------------------------------------------------------------------------------|

# remove old css files
find ./projects/angular-common-components -type f -name "*.css*" | xargs rm -f

# create empty css files
find ./projects/angular-common-components -type f -name "*.html" | sed 's/\.html/\.css/g' | xargs touch


# ---------------------------------------------|
# --- Pack all scss files to single file    ---|
# -------------------------------------------------------------------------------------------------------|

# constants
pathToSingleScssFile='./dist/angular-common-components/assets/styles/general-styles.scss'
m='WATCH-SCSS-FILES '

function createSingleScssFile() {
  echo "$m Creating single scss file ..."
  ./node_modules/.bin/scss-bundle -c scss-bundle.config.json

  echo "$m Remove mixins from single scss file."
  sed -i.bak -n '/@mixin/,/^$/!p' $pathToSingleScssFile

  echo "$m Normalize image URL paths in single scss file."
  sed -i 's|url(../../../../assets/img|url(../img|g' dist/angular-common-components/assets/styles/general-styles.scss

  echo "$m Created new single scss file."
}

function generateComponentsScssChecksum() {
  scssFilesArray=$(find ./projects/angular-common-components/ -type f -iname "*.scss")
  for file in $scssFilesArray; do
    echo "$tempShaSum $(sha1sum $file)"
  done
}

function watchScssChanges() {
  # watch scss changes and create single scss file
  echo "$m Watch scss files ..."
  oldScssFilesChecksum=''
  while [ true ]; do
    sleep 2
    newScssFilesChecksum=$(generateComponentsScssChecksum)
    if ([[ $oldScssFilesChecksum != $newScssFilesChecksum ]] || [[ ! -f $pathToSingleScssFile ]]); then
      createSingleScssFile
      oldScssFilesChecksum=$newScssFilesChecksum
    fi
  done
}

# ------------------------------------|
# --- Run build                     --|
# ---------------------------------------------------------------------------------------------------------------|

if [[ $isWatchMode == true ]]
then
  # Run two async process
  # 1. Build components to ./dist/angular-common-components folder
  # 2. Pack scss files to single file and put to ./dist/angular-common-components/assets/styles/general-styles.scss
  ./node_modules/.bin/ng build angular-common-components ${BUILD_COMPONENTS_COMMAND} & watchScssChanges
else
  # Build components to ./dist/angular-common-components folder
  ./node_modules/.bin/ng build angular-common-components ${BUILD_COMPONENTS_COMMAND}
  # Create single scss file and put to ./dist directory
  createSingleScssFile
fi
