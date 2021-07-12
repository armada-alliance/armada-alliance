# Scripts

## TODO

6. setup the links in the footer, with links i think should be put there

7. simplify the data generation and documenting it

8. make sure all the possible pages are generated in simple form, without the complete data for each page

9. generate the data for each page as a json file. so whenever someone opens a link that file is used to generate the frontend

10. make sure links in the pages work

11. make sure switching languages only works if the page is available in the other language

12. make sure the navigation points to the translated pages if they're available, otherwise the english version of that page

13. test out translated pages (markdown)

14. allow words, sentences to be translated that are used in the general layout

15. make sure the right metadata is outputted for seo

16. generate a sitemap for each language that lists all the available pages in that language, this way we can keep an overview of which pages exist where

17. make sure the pages that are linked from within the main navigation do exist and have content

18. add badges to the pool detail page based on specific criteria that are met

19. generate check results for each pool, those checks can be displayed as issues to solve on the pool detail page (define criteria)

## Available Endpoints

- adapools.json - provide adapools with the alli file to display a list of members on adapools.org
- schema.json - general purpose variable file, contains information that's used throughout the whole website
- pools.json - list of pools 
- pools_extended.json - extended list of pools, containing all metadata
- translations.json - complete list of translations (key, value)
- topology.json - list of public relays of all our members
- languages.json - list of supported languages in the website

- /pages/[...slug].json - complete data object for each page (e.g. /pages/en.json)

## Generate Pages

This script will generate a list of all pages that can be visited.

This list contains pages generated for each defined template and is in turn also generated for each defined language (optional).

This script will output a file called `pages.json` which will look like this:

```
[
  {
    "originalTitle": "Homepage",
    "title": "Homepage",
    "template": "HomePage",
    "language": "en",
    "translateSlug": true,
    "origin": "/",
    "slug": "/",
    "params": {}
  },
  {
    "originalTitle": "Homepage",
    "title": "Pàgina inicial",
    "template": "HomePage",
    "language": "ca",
    "translateSlug": true,
    "origin": "/",
    "slug": "/ca",
    "params": {}
  }
]
```

The fields can be explained as followed:
- originalTitle - subject to change
- title - The title being shown in tab, the page title
- template - The template that will be loaded once the page has been requested
- language - The language code of this page. Used to find pages in alternative languages that have the same origin.
- translateSlug - subject to change
- origin - As of now there always needs to be an origin, this origin should refer back to the slug of the english version of the page
- slug - The url on which this page is going to be found
- params - subject to change