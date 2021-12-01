# tretton37 code assignment

## The product

As solution for my code assignment, I rebuilt tretton37's [people page](https://tretton37.com/meet). It fetches a list of all employees from their server and displays all of them in a grid. The list can be filtered by office and be employee name, and the individual cards are rendered lazily.

You can see the result here!
https://1337.netlify.app/

## Features selected

From the list of features available, I choose the following:

### Responsive design

Responsiveness is one of the defining features of websites as a medium. Websites having to work on all kind of devices is a given nowadays, so this was an easy pick.

### Modern CSS

Modern CSS comes with a lot of awesome features, like CSS custom properties, blend modes, grid and much more. Grid has made layouting a blast (anyone remembers having to build multi-column designs using floats?), and CSS variables allow us support multiple themes with little effort. Easy pick as well :)

### Filter by name & office

Although unconventional on an employees page, I thought this feature would give me the chance to go a bit more into depth when it comes to component design. The filtering itself is easy, but I knew in advance that getting the data flow in the controls right would be a fun challenge. To make it a bit more difficult (and user friendly), I added an "All" option as well!

### Infinity scroll

The current employee page does not apply any kind of lazy loading yet - it fires 282 image requests and downloads 15MB of images on initial page load! Adding infinity scroll offered a great chance to improve the performance of the page for better user experience and SEO.
From the 3 options available (infinity scroll, pagination, load more button) the first one was the only one I've never dealt with before, so that was the pick.

### Available on a free public URL

The goal of building any page is for the page to be seen, not to be limited to the eyes of a few developers that know how to run the code :)
https://1337.netlify.app/

### Integration tests

I must admit that picking the testing feature was difficult for me. For components, so far I tested everything using visual regression tests, unit tests I would only use for testing JavaScript functionalities. This task was a great opportunity to get familiar with [Vue Test Utils](https://vue-test-utils.vuejs.org/).

## Code design

### Framework choice & folder structure

I picked [Vue.js](https://vuejs.org/) as a framework, and [Nuxt.js](https://nuxtjs.org/) as a meta framework. With both I have been working professionally for years, so I would need to spend the least amount of time on setting things up for this task.

I use the default folder structure of Nuxt.js:

- `assets/`: Contains uncompiled assets like SCSS files
- `components/`: Contains reusable components
- `pages/index.vue`: The page
- `layouts/default.vue`: Wrapper around every page
- `static`: Static files that will be mapped to `/`

### Content & representation

When it comes to components, I try to keep representation (UI) and content separated. All of the components make no assumptions about the structure of the data. It is on page level that we fetch the data and transform it into a format that is compatible with our components.

### Decoupled components

We try to keep our components separated to allow for more flexibility and testability. For example, keeping the filters and the grid separated allows us to use alternative compositions as well.

Note that it would have been totally possible to make the components even more generic, like changing `LeetEmployeeCard` to `LeetCard`, or having `LeetFilter` support any numbers of generic filters. For times sake I settled with more specific components.

### Lifting state

Only really applies to `LeetFilters`. This component itself doesn't actually keep track of the filters itself, it merely informs its parent about changes, which then feeds it back into the filter. This setup allows us to easily hook in other features that affect the filter choice - for example filters applied via URL that should change the initial selection of `LeetFilters` as well!

### Design tokens & theming

All design tokens are defined as CSS custom properties under `/assets/styles/tokens.css`. Opposed to SCSS variables, CSS variables can change in the browser. We use this to easily apply themes.
Example: All titles apply the same color variable (`--color-title`). But they still display different colors, depending on the theme for the current section. Themes can be manipulated using `LeetTheme`.

## Ideas for improvement

We can discuss them in detail together :)

Design:

- use [style dictionary](https://github.com/amzn/style-dictionary) or [theo](https://github.com/salesforce-ux/theo) for multi-format design token management
- staggered animation once cards enter the viewport
- apply a dark theme to all those employees that have been marked as "highlighted"
- display a small button that scrolls back to the top after having scrolled down a bit
- reuse certain patterns like stack layouts by creating layout components, global classes or SCSS mixins

Functionality:

- push filters to the browsers history. On page load, apply any filters present in the URL
- Apply fuzzy search to name filter to allow slight typos in the search
- Link each card to an individual employee page
- Fix infinity scroll getting stuck (if you scroll very fast)

Testing:

- Use [Storybook](https://storybook.js.org/) to develop & test components in isolation
- Add visual regression tests by taking screenshots automatically
- Achieve full coverage

## Install

### Environment variables

An `.env` file must be present in the root folder. Make sure to never commit this file. The following keys should be set:

- `API_KEY`: API key for fetching employees

### Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out Nuxt.js's [documentation](https://nuxtjs.org).

### Other commands

```bash
# run tests
$ yarn test

# lint code
$ yarn lint

# lint code and fix automatically whenever possible
$ yarn lint-fix
```
