<h1>Looker Datastory one-pager</h1>

This basically generates a bunch of cards for each public Look, allowing you to add a title and a description.

<h2>How to</h2>

There's two ways to use this one-pager:
* Copy the HTML file and replace the value for `SPREADSHEET_PUBLIC_URL` in the script with your own sheet
* Pass through your embed id as a URL parameter, for example: `.../looker_datastory/index.html?spreadsheet_id=151wYbceiQIj8NEBiLCZNDFX1CEtirddu7tCOU4NR6AA

<h2>Format of the spreadsheet</h2>

There's three expected columns: **title**, **description** and **embed_id**
The first row is the Story title & description (and your instance URL), any row after that renders as a separate card on the story. The 'embed_id' is the public ID given by Looker when you make the Look public (`{{instance_url}}/embed/public/{{look_public_id}}`).


<h2>Demo</h2>

[Try it out here!](https://rawgit.com/brechtv/looker_datastory/master/index.html)
