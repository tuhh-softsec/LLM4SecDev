 name: Bug Report
description: File a bug report
title: "[Paper Contribution]: "
labels: ["Paper"]
projects: []
assignees:
  - gOATiful
body:
  - type: markdown
    attributes:
      value: |
        Thanks for taking the time to contribute to this project!
  - type: input
    id: title
    attributes:
      label: Title
      description: "What is the title of the paper you want to contribute?"
    validations:
      required: true
  - type: input
    id: authors
    attributes:
      label: Authors
      description: "Who are the authors of the paper (seperate multiple authors with 'and')"
    validations:
      required: true
  - type: input
    id: year
    attributes:
      label: Year
      description: "When was the work published?"
    validations:
      required: true
  - type: textarea
    id: artifacts
    attributes:
      label: Artifacts
      description: "Enter the artifact urls here (new line for each artifact url)"
    validations:
      required: true
  - type: textarea
    id: tasks
    attributes:
      label: Tasks
      description: "For which tasks are the model(s) used in the work (new line for each task)"
    validations:
      required: true
  - type: textarea
    id: models
    attributes:
      label: Models
      description: "Which models are used in the paper? (new line for each model)"
    validations:
      required: true
    