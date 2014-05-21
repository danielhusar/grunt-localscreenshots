# [grunt](http://gruntjs.com/)-localscreenshots [![Build Status](https://secure.travis-ci.org/danielhusar/grunt-localscreenshots.svg?branch=master)](http://travis-ci.org/danielhusar/grunt-localscreenshots)

> This is my modification of original grunt-autoshot plugin. (https://github.com/Ferrari/grunt-autoshot)

## Getting Started
This plugin requires Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins.

With this plugin you can make screenshots of all static html files located inside of some directory.

Create a quick screenshot for your site which could help for document or testing.
Inspired by [Testing your responsive design with PhantomJS](http://daker.me/2013/07/testing-your-responsive-design-with-phantomjs.html), also suport different resolution base on your viewport, it's useful to responsive design.

It will start a static web server and from options path directory and pass all the html files as ursl to it, and create teh screenshots from it.

```shell
npm install grunt-localscreenshots --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-localscreenshots');
```

Final and the most important thing, please make sure [**phantomjs**](http://phantomjs.org/) are in your PATH, cause this plugin use it to generate screenshot, so remember [install](http://phantomjs.org/download.html) first.

## The "localscreenshots" task

### Overview
In your project's Gruntfile, add a section named `localscreenshots` to the data object passed into `grunt.initConfig()`.


```javascript
grunt.initConfig({
  		localscreenshots: {
				options: {
					path: 'screenshots',
					type: 'png',
					local : {
						path: 'public',
						port: 3000
					},
					viewport: ['600x800', '768x1024', '1024x1024'],
				},
				src: ['public/*.html']
		}
})
```

### Options

#### options.path
Type: `String`

Path to the directory which screenshots will be saved.


#### options.type
Type: String

Image type of screenshot.
PhantomJS supports JPEG, PNG, GIF and PDF right now.


#### options.local
Type: String

Start a local http server to host your webpage then get the screenshot. There are several config options:

```javascript
{
  path: './dist', // path to directory of the webpage
  port: 8080      // port of startup http server
}
```

#### options.viewport
Type: Array

Autoshot could create the screenshot base on given viewport, it's helpful if you want to test responsive webpage.

```javascript
ex: ['1024x768', '1920x1080']
```

You could add any resolution you want, just follow the same format.