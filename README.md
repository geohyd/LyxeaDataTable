<p align="center">
  <h1 align="center">Lyxea Datatable</h1>
    <p align="center">Developed by Antea Group</p>
</p>

<p align="center">
<a href="https://github.com/geohyd/LyxeaDataTable/actions/workflows/build.yml">
<img src="https://github.com/geohyd/LyxeaDataTable/actions/workflows/build.yml/badge.svg">
</a>
<a href="https://github.com/geohyd/LyxeaDataTable/actions/workflows/test.yml">
<img src="https://github.com/geohyd/LyxeaDataTable/actions/workflows/test.yml/badge.svg">
</a>
<a href="https://github.com/geohyd/LyxeaDataTable/actions/workflows/code_quality.yml">
<img src="https://github.com/geohyd/LyxeaDataTable/actions/workflows/code_quality.yml/badge.svg">
</a>
<a href='https://coveralls.io/github/geohyd/LyxeaDataTable'><img src='https://coveralls.io/repos/github/geohyd/LyxeaDataTable/badge.svg' alt='Coverage Status' /></a>

</p>

### Caution ! This lib use node > 18

You need to use nvm to change your node version if required.

```bash
nvm use # used to change node version with .nvmrc present in the root directory
```

- [Intro](#intro)
- [Notes de version](#notes-de-version)
- [Installation](#installation)
- [Configuration](#configuration)

## Intro

Lyxea custom typescript library for integrated datatable.

Automation the datatable content and visualisation from a custom configuration object.

## Installation

Run

```bash
npm install
```

This project use datatable.net and their extensions.

For more information, please visit <a href="https://datatables.net/">https://datatables.net/</a>, or for a more precise documentation, use ChatGPT.

## Examples / Playground

You can find many example in this repo, that can serve aswell as playground to test some configuration.

Go on `/example` to find them.

To run it, go on the wanted example directory, and run `npm run dev`.
Then, go on <a href="http://localhost:5173/">`http://localhost:5173/`</a>

## Configuration

You can provide Datatable native configuration in the main object. It works properly.

If you want more info about the base configuration, please refer to the official documentation.

If you want to add the specific Lyxea custom object, you need to add the key `lxConfig`.

The following sections are dedicated to this configuration.

### Lyxea Configuration Object

| Name                   |                                           Description                                            | Default |
| :--------------------- | :----------------------------------------------------------------------------------------------: | ------: |
| url                    |                                    url to provide to get data                                    |       - |
| headers                |                                   headers and cols definition                                    |       - |
| filters                |                                              False                                               |    true |
| handleBootrapTabChange |      Handle the issue with bootstrap where the click on tab nav broke the datatable headers      |    true |
| row_action             |            Provide action you can define and add a column at the end of the DataTable            |       - |
| columnsDefaultKey      | Provide a default key for each column. Overriden by the key `defaultValue` in columns definition |       - |

### Global Headers definition

On a standard usage, you must specify the columns definition in the `columns` or `columnsDef` key of the stadard config object.

On this override, you can declare it on the Lyxea config object, as follow :

```js
new LyxeaDatatable({
  lxConfig: {
    headers: [
      {
        columns: [
          {
            data: 'first_name',
            name: 'first_name',
            title: 'Prénom',
            className: 'ma-super-classe',
          },
        ],
      },
      {
        headerGroup: 'Mon super groupe de header',
        columns: [
          { data: 'last_name', name: 'last_name', title: 'Nom' },
          { data: 'start_date', name: 'start_date', title: 'Date' },
        ],
      },
    ],
  },
});
```

The headerGroup will return the correct colspan size depend on the number of key with this key-value pair in the config object.

### Specific header definition

You can provide more key depend on the use case you want.
In the future, more keys can be added in this project.

### Transformers

If you want to modify the data exposed in the datatable, you must add a transforer.

In this function, you need to return all the data.

You can add it to implement the dedicated function :

```js
const table = new LyxeaDatatable({
  /*config*/
});

table.tranformer.add((data) =>
  data.map((d) => {
    d.first_name = d.first_name.toUpperCase();
    return d; // return of the data needed ! function .map did it natively
  })
);
```

This transformer will be execute just before datatable initialisation.

### Actions

If you want to add an action on each row of the datatable, we need to implement the action module.

To do it, simply add the key `actions` on the LyxaDatatable specific config object.

### Renderer

| name               | description                                                                                | example                                   |
|--------------------|--------------------------------------------------------------------------------------------|-------------------------------------------|
| DATE_TO_FORMAT_    | parse date to defined format                                                               | {render: 'DATE_TO_FORMAT_YYYY'} => '2024' |
| DATE               | parse date to predefined date format                                                       | '2024-04-23 12:23'                        |
| DATE_WITH_SECOND   | parse date to predefined date format                                                       | '2024-04-23 12:23:34'                     |
| LOCAL_NUMBER       | parse number to string with correct format                                                 | 1300 => '1 300'                           |
| BOOLEAN_YESNO      | return a string 'Yes' / 'No' depend on the bool value                                      | true => "Yes" or false => "No"            |
| NUMBER_FIXED_2     | fix the number value to two digit                                                          | 1.3443 => 1.34, 1 => 1.00                 |
| NUMBER_2_DIGIT_MAX | fix the number value to two digit max                                                      | 1.3443 => 1.34, 1 => 1                    |
| CUT_LONG_TEXT      | In case of a long text, prevent the overflow by cutting the text and replace it with '...' | "a very long text" => "a very ..."        |
| PARSE_INT          | parse a string to integer                                                                  | "3" => 3                                  |
| CHECKBOX           | [plugin] add a checkbox at the first columns of the table                                  |                                           |
| EDITABLE           | [plugin] set the selected column to be editable                                                          |                                           |

## Architecture

### Project structure

Source file are avalaible at `/lib`

- core : main classes of LyxeaDatable
- Dao : Data acquisition object - specific to data acquisition (fetching)
- Dto : Data transformation object - specifiq to data manipulation
- dom : Classes specfic to DOM manipulation or DOM Element generation
- plugins : You can retrieve there all extension develop on top of LyxeaDatatable

# Work with State object

A state is a dynamic property you can set by adding a State object.

Instanciate it with your initial value.

```ts
const state = new State({ count: 0 });
```

In a more complexe example :

```ts
type MyObjectState<T> = {
  // define the type of the state you want
  loading: boolean;
  data: Array<T> | null;
  error: Error | null;
};

class MyObject<T> {
  state: State<MyObjectState<T>>;

  constructor() {
    this.state = new State<MyObjectState<T>>({
      // set the initial value
      loading: false,
      error: null,
      data: null,
    });
  }
}
```

Then, you can retrive the state of the object with the method `getState`

```js
const initialState = { count: 0 };
const state = new State(initialState);
state.getState(); // { count: 0 }
```

To subscribe to a state, simply call the function `subscribe` exposed by the state of the object.

It is like an event listener on the state, and the procedure you define in the callback will be call on each change of the state.

```js
// in this example, dao object have a state.
// on each setState, the function define in the subsribe method is called

const table = new LyxeaDatatable({
  /* config */
});

table.dao.state.subscribe((state) => {
  console.log('my state have change !');
  const myLoader = document.getElementById('mon-super-loader');
  if (state.loading) myLoader.style.display = 'block';
  else myLoader.style.display = 'none';
});

table.dao.state.setState(() => ({ loading: true })); // update the state and call the subscribe

// console : my state have change !
```
