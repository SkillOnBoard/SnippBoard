#!/bin/bash

# Make sure export this to be able to use gpg key
export GPG_TTY=$(tty) 

# Make sure to be logged in Github CLI
# gh auth login

# Function to display a selector prompt
select_version_type() {
  PS3="Choose the version type to update (1 for major, 2 for minor, 3 for patch): "
  options=("major" "minor" "patch")
  select opt in "${options[@]}"
  do
    case $opt in
      "major")
        echo "major"
        break
        ;;
      "minor")
        echo "minor"
        break
        ;;
      "patch")
        echo "patch"
        break
        ;;
      *)
        echo "Invalid option $REPLY"
        ;;
    esac
  done
}

# Function to increment the version based on the type
increment_version() {
  local version=$1
  local type=$2
  IFS='.' read -r -a parts <<< "$version"
  case $type in
    "major")
      parts[0]=$((parts[0] + 1))
      parts[1]=0
      parts[2]=0
      ;;
    "minor")
      parts[1]=$((parts[1] + 1))
      parts[2]=0
      ;;
    "patch")
      parts[2]=$((parts[2] + 1))
      ;;
  esac
  echo "${parts[0]}.${parts[1]}.${parts[2]}"
}

# Read the .version file to get the latest version
if [ ! -f .version ]; then
  echo "0.0.0" > .version
fi
CURRENT_VERSION=$(cat .version)

# Ask the user to choose among "major", "minor", or "patch"
VERSION_TYPE=$(select_version_type)

# Increment the version based on the user's choice
NEW_VERSION=$(increment_version $CURRENT_VERSION $VERSION_TYPE)

# Create a new branch with the format "new-tag-version-[version selected by the user]"
BRANCH_NAME="new-tag-version-$NEW_VERSION"
git checkout -b $BRANCH_NAME

# Update the version in package.json and package-lock.json
npm version --no-git-tag-version $NEW_VERSION

# Check if the version is already released
if git rev-parse "v$NEW_VERSION" >/dev/null 2>&1; then
  echo "Version $NEW_VERSION is already released."
  exit 1
fi

# Commit the new version changes in package.json and package-lock.json
git add package.json package-lock.json
git commit -m "Bump version to $NEW_VERSION"

# Create a git tag with the new version
git tag -a "v$NEW_VERSION" -m "Release version $NEW_VERSION"

# Push the changes and the tag to the remote repository
git push origin $BRANCH_NAME --tags

# Create a pull request on GitHub
PR_URL=$(gh pr create --title "Release version $NEW_VERSION" --body "This PR includes the changes for version $NEW_VERSION" --base main --head $BRANCH_NAME --draft)

echo "Pull request created: $PR_URL"

# Create a draft release on GitHub using GitHub CLI
gh release create "v$NEW_VERSION" --draft --title "v$NEW_VERSION" --notes "Release version $NEW_VERSION"

# Update the .version file with the new version
echo $NEW_VERSION > .version

echo "Version $NEW_VERSION tagged and pushed successfully. Draft release created on GitHub."