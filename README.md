# gulp-file-additional

A [gulp](http://gulpjs.com) helper, add additional data to file and list all files in the gulp pipeline.

## Install

Install  with [npm](https://npmjs.org/package/gulp-file-additional)

```
npm install --save-dev gulp-file-additional
```

## Example

```javascript
var fileAdditional = require('gulp-file-additional');
var twigFile = ['src/pages/**/*.html.twig'];

gulp.task('default', function() {
  gulp.watch(twigFile, function() {
    gulp.src(twigFile).pipe(fileAdditional({
      additional: {
        data: {
          key: 'data',
          value: (filepath) => {
            return 'test';
          }

          // value: 'asdfa' // support function or normal value
        }
      }
    }))
  })
})
```

type `gulp` in terminal, change twigFile, then output:

```
[gulp] Using file ./src/pages/normal.html.twig
[gulp] Additional data {"key":"data","value":"test"}
```

## Options


### defaults

```javascript
{
  logfile: {
    on: true,
    prefix: 'Using file',
    color: 'magenta',
    path: 'cwd'
  },
  additional: {
    on: true,
    prefix: 'Additional data',
    color: 'magenta',
    data: {},
  }
}
```

### logfile

**on**

* type: `boole`
* default: `true`
* values: `true`, `false`

**prefix**

* type: `string`
* default: `Using file`

**color**

* type: `string`
* default: `magenta`
* values: `black`, `blue`, `cyan`, `gray`, `green`, `magenta`, `red`, `white`, `yellow`

**path**

* type: `string`
* default: `cwd`
* values: `cwd`, `path`, `relative`

### additional

**on**

the same as **[logfile](#logfile)**

**prefix**

the same as **[logfile](#logfile)**

**color**

the same as **[logfile](#logfile)**

**data**

* type: `array` or `object`
* default: `{}`

```javascript
{
  key: 'data', // force convert to string
  value: (filepath) => {
    return 'test';
  }
}
```

or 

```javascript
[{
  key: 'foo',
  value: (filepath) => { // function
    return 'test';
  }
}, {
  key: 'bar',
  value: 'test' // string
}, {
  key: 'foobar',
  value: 110 // number
}]
```
