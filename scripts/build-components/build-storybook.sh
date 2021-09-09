#!/bin/bash

echo "Build components command : $@"

BUILD_COMPONENTS_COMMAND=${@:-''}

isWatchMode=false
m='CSS-FILES'
if [[ $BUILD_COMPONENTS_COMMAND == *--watch* ]]
then
  isWatchMode=true
  m='WATCH-CSS-FILES'
fi

echo "Watch mode : $isWatchMode"

# -------------------------------------|
# --- Build new css from scss files ---|
# ---------------------------------------------------------------------------------------------------------------|

function recreateCssFiles() {
  echo "$m Recreate all css files."

  echo "$m => Remove old css files."
  find ./projects/angular-common-components -type f -name "*.css*" | xargs rm -f

  echo "$m => Generate new css files."
  ./node_modules/.bin/sass ./projects/angular-common-components/src/lib
}

# recreate all css files
recreateCssFiles

# ------------------------------------|
# --- Watch scss changes (functions)--|
# ---------------------------------------------------------------------------------------------------------------|

function generateScssChecksumForUntrackedFiles() {
  scssFilesArray=$(find ./projects/angular-common-components/assets/styles -type f -iname "*.scss")
  for file in $scssFilesArray; do
    echo "$tempShaSum $(sha1sum $file)"
  done
}

function watchComponentScssFiles() {
  echo "$m Watch component scss files ..."
  # Watch scss files for any angular component, and create new css files.
  ./node_modules/.bin/sass --watch ./projects/angular-common-components/src/lib
}

function watchUntrackedScssFiles() {
  echo "$m Watch untracked scss files ..."
  # Watch untracked scss files in ./assets/styles directory
  oldScssFilesChecksum=$(generateScssChecksumForUntrackedFiles)
  while [ true ]; do
    sleep 2
    newScssFilesChecksum=$(generateScssChecksumForUntrackedFiles)
    if [[ $oldScssFilesChecksum != $newScssFilesChecksum ]]
    then
      echo "$m Recreate all css files, because one of files in './assets/styles' was changed ..."
      # recreate all css files
      recreateCssFiles
      oldScssFilesChecksum=$newScssFilesChecksum
    fi
  done
}

# ------------------------------------|
# --- Run build                     --|
# ---------------------------------------------------------------------------------------------------------------|

if [[ $isWatchMode == true ]]
then
  # --- watch mode ---
  # Run three async process
  # 1. Build components to ./dist/angular-common-components folder
  # 2. Watch component scss files and create css
  # 3. Watch untracked scss files in ./assets/styles directory and create new css files for all components
  ./node_modules/.bin/ng build angular-common-components ${BUILD_COMPONENTS_COMMAND} & watchComponentScssFiles & watchUntrackedScssFiles
else
  # --- without watch mode ---
  # Build components
  ./node_modules/.bin/ng build angular-common-components ${BUILD_COMPONENTS_COMMAND}
fi
