# template-docs

A templating submodule tool

## Use submodule

`git submodule add git@github.com:iGitScor/template-docs.git docs/template-docs`

_You can change source directory_

```make
update:
  git submodule foreach git pull origin master
  git submodule foreach npm install
```

## Documentation generation

The command can be inserted in a makefile or scripts part of a `package.json` file

```make
documentation:
  gulp --gulpfile docs/template-docs/gulpfile.js generate
```

**The documentation generation will create this structure.**

/ [ROOT]
- [ ] `/docs`
  - [ ] `/css`
    - [ ] `/img`
      - ...
    - `index.min.css`
  - [ ] `template-docs`
    - _All files of this repository_

## Documentation content

You need to create a `index.pug` file in a template directory.

[ROOT]
- [ ] `/docs`
  - ...
  - [ ] `template`
    - **`index.pug` (with potential includes)**
