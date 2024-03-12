# Issue to Databasse Entry conversion

## Pre-requisites
- Install requirements form the `requirements.txt`-file `pip install -r requirements.txt`
- Add a Github access token to a `.env` file with the following content:
  ```
  GITHUB_TOKEN="<your token>"
  ```
  The token has to have "repo" permissions.

## Usage
- run `python3 add-publication-from-issue.py`