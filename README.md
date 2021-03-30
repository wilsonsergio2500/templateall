<div align="center">
<h1>templateall</h1>

<p>Create boilerplate or scafold code anytime and anywhere with ease</p>

</div>

<hr />

## The Problem
Most often your project shares consistent boilearplate all across that you wish you could avoid  re-typing. On other instances, cli can take you far but yet not far enough. **Templateall** is here for all of those other moments when the project structure feels really personal and you desired to increase your tempo by bringing about a lot of code that is consistent with the pattern you follow.

Needless to say, I have utilized templateall with a great degree of sucess. My teammates have also enjoy it tremendously and appreciate its simplicity. Feel free to make it your own!


## Installation

This module is distributed via [npm][npm]. In order to scafold or create boilerplate  - from templates - globally install this package.

```
npm install templateall -g
```

## Running The Command
The command would prompt you for document name and document type, the list of types is orginated from the Types defined in the configuration file ([config.json][configExample])

```
templateall-create
```
<p align="center">
<img src="https://im.ages.io/RTLYaintl1"/>
</p>

On Success the module will provide confirmation of the documents created

<p align="center">
<img src="https://im.ages.io/MxZjdintl1"/>
</p>

## Prelude
In order stay consistent and provide ownership to the template creator and apply the least amount of configuration when running the module. The configuration file config.json and the templates must be under one common directory. 

<div >
<p><strong>Tip:</strong> The package assumes that the configuration folder and the templates folder could be found at <strong><i>root\templateall.</i></strong> thus in a Windows machine <b><i>C:\templateall.</i></b> However, where the templates are actually located could be specified in the configuration file <b><i>config.json</i></b></p>
</div>

## Usage
- Download the contents of the [assets][templateFiles] forlder into c:\templateall
- The above will provide a few examples that you could run in order to get you started with the templates
- Point the configuration file to the diserable template folder.

######  Config File (config.json)
```
{
  "templates": "C:\\templateall\\templates",
  "types": {
    "NGXS State": "state",
    "NGXS State & List Filter Paginator": "state-list-paginator",
    "NG Component & Resolver": "ng-component-resolver",
    "NG Component": "ng-component",
    "NG Component & Formly": "ng-component-formly",
    "NG Component & List Filter Paginator": "ng-component-list-filter"

  },
  "autoIndent": false,
}
```
- In types you could specify the name of the template and under what name the templates would be found. `{ [template name]: [folder name]}`

<p align="center">
    <img src="https://im.ages.io/LxZjdintl1"/>
</p>

- Change the template according to the below options

Name               | Description
---                |---
Type               | The name of the type selected (If the first above selected then value equals **state**)
Name_original               | Name of the original document name entered -i.e *myDocument*
Name_file | Name of the file to generate (currently snake cased) -i.e *my-document*
Name_titlelized | Name of the entry as a title  -i.e *My Document*
Name_pascalized | Name of the entry as a pasca -i.e *MyDocument*
Name_camelized | Name of the entry as a camel -i.e *myDocument*

- Hence you can specify binding syntax in the document as the following, Like an the `NGXS Example`

######  Action File ({state}.actions.ts)
```Typescript
export class {Name_pascalized}Loading {
  static type = '[{Name_titlelized}] Set As Working';
}

export class {Name_pascalized}Done {
  static type = '[{Name_titlelized}] Set As Done';
}

export class {Name_pascalized}GetElements {
  static type = '[{Name_titlelized}] Get Elements';
}
```
######  State File ({state}.state.ts)

```Typescript
import { Store, State, Selector, StateContext, Action } from '@ngxs/store';
import { HttpClient } from '@angular/common/http';
import { I{Name_pascalized}StateModel } from './{Name_file}.model';
import { {Name_pascalized}Done, {Name_pascalized}Loading, {Name_pascalized}GetElements } 
from './{Name_file}.actions';
import { tap, mergeMap } from 'rxjs/operators';

@State<I{Name_pascalized}StateModel>({
name: '{Name_camelized}State',
defaults: <I{Name_pascalized}StateModel>{
    working: true,
    records: [],
}
})
export class {Name_pascalized}State {

    constructor(
        private httpClient: HttpClient
    ){}

...
```
- Will provide the following results
######  Action File (my-document.actions.ts)
```Typescript
export class MyDocumentLoading {
  static type = '[My Document] Set As Working';
}

export class MyDocumentDone {
  static type = '[My Document] Set As Done';
}

export class MyDocumentGetElements {
  static type = '[My Document] Get Elements';
}
```
######  State File (my-document.state.ts)
```Typescript
import { Store, State, Selector, StateContext, Action } from '@ngxs/store';
import { HttpClient } from '@angular/common/http';
import { IMyDocumentStateModel } from './my-document.model';
import { MyDocumentDone, MyDocumentLoading, MyDocumentGetElements } 
from './my-document.actions';
import { tap, mergeMap } from 'rxjs/operators';

@State<IMyDocumentStateModel>({
    name: 'myDocumentState',
    defaults: <IMyDocumentStateModel>{
        working: true,
        records: [],
      }
})
export class MyDocumentState {

    constructor(
        private httpClient: HttpClient
    ){}

...
```

## Alternative

You could inject custom metadata by including this in the `Data` attribute in [config.json][configExample] check the example. You could extrapolate this information by using Mustache. However the custom Mustache Tag has been defined as `['{!', '!}']` This is to avoid conflict with already common usage. 

[Ask Me More][more]

[npm]: https://www.npmjs.com/
[templateFiles]: /assets/
[configExample]: /assets/config.json
[more]: https://github.com/wilsonsergio2500/templateall/issues