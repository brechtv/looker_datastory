# Looker Datastory one-pager

This basically generates a bunch of cards for each public Look, allowing you to add a title and a description.

## How to

There's two ways to use this one-pager:
* Copy the HTML file and replace the value for `SPREADSHEET_PUBLIC_URL` in the script with your own sheet
* Pass through your embed id as a URL parameter, for example: `.../looker_datastory/index.html?spreadsheet_id=151wYbceiQIj8NEBiLCZNDFX1CEtirddu7tCOU4NR6AA

## Format of the spreadsheet

There's three expected columns: **title**, **description** and **embed_id**
The first row is the Story title & description (and your instance URL), any row after that renders as a separate card on the story.

[Try it out here!](https://rawgit.com/brechtv/looker_datastory/master/index.html)
