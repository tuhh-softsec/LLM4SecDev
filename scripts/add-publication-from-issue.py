from github import Github
from github import Auth
from os import environ

GH_TOKEN = environ.get("GITHUB_TOKEN")
auth = Auth.Token(GH_TOKEN)
g = Github(auth=auth)

repo = g.get_repo("tuhh-softsec/LLM4Sec")
issues = repo.get_issues()
for i in issues:
  print(i)