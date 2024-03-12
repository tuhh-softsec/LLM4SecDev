from dataclasses import dataclass
import dataclasses
from github import Github
from github import Auth
from git import Repo
from os import environ
import re
import json

CONTRIBUTION_LABEL = "contribution accepted"
DATASET_PATH = "dataset/llms4sec_dataset.json"
GH_TOKEN = environ.get("GITHUB_TOKEN")


@dataclass
class Contribution():
    title: str
    authors: str
    year: str
    artifactUrls: list[str]
    featuredModels: list[str]
    tasks: list[str]


def load_dataset(path: str):
    with open(path) as infile:
        return json.load(infile)


def save_dataset(path: str, dataset: list[Contribution]):
    with open(path, "w") as outfile:
        json.dump(dataset, outfile, indent=2)


def get_mergable_issues(issues):
    relevant_issues = []
    for issue in issues:
        labels = [x.name for x in issue.labels]
        if CONTRIBUTION_LABEL in labels:
            relevant_issues.append(issue)
    return relevant_issues


def extract_meta_from_bibtex(bib: str):
    fields = ["title", "year", "author"]
    meta = {}
    for field in fields:
        re_str = field + "=[{\"\']?([^}\"]*)[}\"\']?,?"
        regex = re.compile(re_str)
        matches = re.search(regex, bib)
        if len(matches.groups()) != 1:
            raise Exception("Issue format not recognized! Regex not match")
        data = matches.group(1)
        meta[field] = data
    return meta


def close_issue(issue):
    issue.create_comment(
        "Added contribution to database.\nThank you for contributing to this project.")
    issue.edit(state='closed')


def parse_contribution_data(issueBody: str) -> Contribution:
    segments = []
    for line in issueBody.splitlines():
        if line == "":
            continue
        if "### " in line:
            segments.append("")
        else:
            segments[-1] += line + "\n"
    if len(segments) != 4:
        raise Exception("Issue format not recognized!")
    bibtex = segments[0]
    artifacts = segments[1].splitlines()
    tasks = segments[2].splitlines()
    models = segments[3].splitlines()
    bibtex_data = extract_meta_from_bibtex(bibtex)
    if len(bibtex_data) != 3:
        raise Exception(
            "Issue format not recognized! bibtex data not complete")

    return Contribution(title=bibtex_data["title"],
                        authors=bibtex_data["author"],
                        year=bibtex_data["year"],
                        artifactUrls=artifacts,
                        featuredModels=models,
                        tasks=tasks)


def commit_changes(msg: str):
    repo = Repo(".")
    add_files = [DATASET_PATH]
    repo.index.add(add_files)
    repo.index.commit(msg)
    print(str(add_files) + " commited to repo")


def push_changes():
    repo = Repo(".")
    repo.remote().pull()
    repo.remote().push()


if __name__ == "__main__":
    dataset = load_dataset(DATASET_PATH)
    auth = Auth.Token(GH_TOKEN)
    g = Github(auth=auth)
    repo = g.get_repo("tuhh-softsec/LLM4SecDev")
    issues = repo.get_issues()
    mergable_issues = get_mergable_issues(issues)
    commit_msg = "Added contribuions:\n"
    for issue in mergable_issues:
        contribtion = parse_contribution_data(issue.body)
        titles = [x["title"] for x in dataset]
        if contribtion.title not in titles:
            dataset.append(dataclasses.asdict(contribtion))
            save_dataset(DATASET_PATH, dataset)
            commit_msg += f"- {contribtion.title} - {contribtion.authors}\n"
            close_issue(issue)
            commit_changes(commit_msg)
        else:
            print(contribtion, "already in dataset")
    push_changes()
