#!/bin/bash

# Make sure export this to be able to use gpg key
export GPG_TTY=$(tty) 

# Check if GitHub CLI is logged in
if ! gh auth status >/dev/null 2>&1; then
  gh auth login
fi

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
    *)
      echo "Invalid version type: $type"
      exit 1
      ;;
  esac
  echo "${parts[0]}.${parts[1]}.${parts[2]}"
}

# Function to handle errors and undo changes
handle_error() {
  echo "An error occurred. Undoing changes..."
  git reset HEAD package.json package-lock.json .version
  git checkout -- package.json package-lock.json .version
  git checkout -
  git branch -D "$BRANCH_NAME"
  git tag -d "v$NEW_VERSION"
  exit 1
}


version_manager() {
  # Read the .version file to get the latest version
  if [ ! -f .version ]; then
    echo "0.0.0" > .version
  fi
  CURRENT_VERSION=$(cat .version)

  # Ask the user to choose among "major", "minor", or "patch"
  VERSION_TYPE=$(select_version_type)

  # Increment the version based on the user's choice
  NEW_VERSION=$(increment_version $CURRENT_VERSION $VERSION_TYPE)

  # Create a new branch with the format "new-tag-version-[new version]"
  BRANCH_NAME="new-tag-version-v$NEW_VERSION"
  git checkout -b $BRANCH_NAME || handle_error

  # Update the version in package.json and package-lock.json
  npm version --no-git-tag-version $NEW_VERSION || handle_error

  # Check if the version is already released
  if git rev-parse "v$NEW_VERSION" >/dev/null 2>&1; then
    echo "Version $NEW_VERSION is already released."
    handle_error
  fi

  # Update the .version file with the new version
  echo $NEW_VERSION > .version

  # Commit the new version changes in package.json and package-lock.json
  git add package.json package-lock.json .version
  if ! git commit -m "Bump version to $NEW_VERSION"; then
    echo "Error: gpg failed to sign the data. Exiting."
    handle_error
  fi
}

create_tag() {
  # Check if there is an existing tag for the new version
  if git rev-parse "v$NEW_VERSION" >/dev/null 2>&1; then
    # Check if there is an existing draft release for the tag
    EXISTING_DRAFT=$(gh release list --draft --json tagName --jq '.[0].tagName')
    if [ "$EXISTING_DRAFT" == "v$NEW_VERSION" ]; then
      # Edit the existing draft release
      gh release edit "$EXISTING_DRAFT" --draft --title "$EXISTING_DRAFT" --generate-notes || handle_error
    else
      echo "Tag v$NEW_VERSION already exists but no draft release found."
      handle_error
    fi
  else
    # Create a new git tag with the new version
    git tag -a "v$NEW_VERSION" -m "Release version $NEW_VERSION" || handle_error
    git push origin $BRANCH_NAME --tags || handle_error
  fi

  # Create a pull request on GitHub
  PR_URL=$(gh pr create --title "Release version $NEW_VERSION" --body "This PR includes the changes for version $NEW_VERSION" --base main --head $BRANCH_NAME) || handle_error

  echo "Pull request created: $PR_URL"
}

create_draft_release() {
  # Check if there is an existing draft release
  EXISTING_DRAFT=$(gh release list --draft --json tagName --jq '.[0].tagName')

  if [ -n "$EXISTING_DRAFT" ]; then
    # Edit the existing draft release
    gh release edit "$EXISTING_DRAFT" --draft --title "$EXISTING_DRAFT" --generate-notes || handle_error
  else
    # Create a new draft release on GitHub using GitHub CLI with automatically generated release notes
    gh release create "v$NEW_VERSION" --draft --title "v$NEW_VERSION" --generate-notes || handle_error
  fi

  echo "Version $NEW_VERSION tagged and pushed successfully. Draft release created or updated on GitHub."
}

# Main script execution
version_manager
create_tag
create_draft_release