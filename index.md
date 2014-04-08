---
layout: default
title: Jekyll CSS Styleguide
description: Easily generate a CSS Styleguide—or 'Pattern Library'— on Jekyll
---

## A Jekyll CSS Styleguide

{: .intro} Tired of updating a collection of screenshots (PSD/PDF) to show new website components? Remember the horror that was `homepage.v2.REVISED.UPDATED.psd`? You need a '*HTML/CSS Styleguide*'…

Manually editing `HTML` and `CSS` files is hard work. This is where `Jekyll-Styleguide` comes in.

{: .message} [Jekyll](http://jekyllrb.com) is a *static site generator*: a script that takes a folder of [Markdown](http://daringfireball.net/projects/markdown/) files and converts them to a complete website.

{: style="width:352px;float:right;margin-left:1em;" class="sg-figure"} ![Styleguide example]({{site.baseurl}}/static/scss/themes/hotel-chevalier-theme.png "Pattern Library")

Jekyll's main focus is to quickly setup a weblog, but we can use it to create a collection of `HTML` and `CSS` *components* just as easily. Now, to add a new Component, simply create a new markdown (`.md` or `.html`) file with the HTML for your component in the `posts/components` folder and run `jekyll build` (or use the included `GulpJS` script).

Then add your project's CSS file to Jekyll Styleguide (or `@import` is in its `app.scss`) and see how these components render.

{: .message} Notice how the *included* project CSS is applied to the content (white area)? In the website example you'll see my [DH kickstart-style](https://github.com/davidhund/dh-kickstart-style/) styles. If you have not (yet) included *your* styles in `static/scss/app.scss` you'll see unstyled text. Jekyll Styleguide themes do not interfere with your project's CSS.

## Table Of Contents

{: .linklist}
- [Overview](#overview)
- [Requirements](#requirements)
- [Installation](#install)
- [Using Jekyll Styleguide](#usage)
- [Troubleshooting](#troubleshooting)

### Overview {: #overview}

- Creates a simple Pattern Library of HTML components in `posts/components`.
- `@import` your Sass files in `static/scss/app.scss`...
  - ...or just add `your.css` to `_includes/head.html`
- Source Highlighting through [PrismJS](http://prismjs.com/)
- \[Optional\] [GulpJS](http://GulpJS.com) workflow (compile Sass, concat and autoprefix, auto-run Jekyll)
- \[Optional\] Themes: see `static/scss/themes/`

### Requirements {: #requirements}

{: .message} So, I basically created this for [myself](http://twitter.com/valuedstandards). I am on a Mac. This *probably* works on Windows and \*nix but you'd have to probably change a bunch of stuff. So, these instructions are Mac only a.t.m. Sorry.

[Jekyll requires Ruby, Rubygems and a Linux, Unix or Mac OSX system](http://jekyllrb.com/docs/installation/). If you do not yet have those installed—and are on Mac OSX—I strongly advise you to install those as follows:

{: .message .message--warning} **Note:** Skip these steps if you already have the needed tools (Ruby, Gems, etc) installed. Avoid using `sudo`

1. Make sure you have the [OSX Xcode *Command Line Tools* installed](https://encrypted.google.com/search?hl=en&q=How+to+install+Xcode+command+line+tools)
2. Install Ruby via [RVM](http://rvm.io):  
`\curl -sSL https://get.rvm.io | bash -s stable`

### Installation {: #install}

Now you should have all the requirements for installing Jekyll. The [GulpJS](http://gulpjs.com/) workflow requires NodeJS, NPM and a bunch of Gulp plugins. But let's ignore those and start simple, OK?

1. Install [Jekyll](http://jekyllrb.com): `gem update --system && gem install jekyll`
2. [Download]({{site.repo}}) **or** `git clone git@github.com:davidhund/jekyll-styleguide.git`
3. Add your colors in `colors/index.md`
4. Add your components in `posts/components/`
5. Run Jekyll: `jekyll build --config=_config.dev.yml`
6. Go to `4.` and repeat...

### Usage {: #usage}

Take a look at the `_config.dev.yml` (`_config.yml`) to set some global variables such as the `baseurl`, `name` and `version` of your Style Guide, a link to the `repository` etc.

### Gulp

I've added an **experimental** [GulpJS](http://GulpJS.com) workflow—[GruntJS](http://gruntjs.com) should be very similar—to automate re-generating the Styleguide, while compiling your Sass files, Concatenating your JS, etc.

To install and use Gulp (you should be at the root of the project, in a command prompt):

1. `npm install -g gulp` to install Gulp globally
2. `npm install` to install all needed Gulp plugins
3. Simply run `gulp`: this fires up a local webserver and watches your Sass, JS and components.
4. Now go change some files, save, and watch your browser autoreload ;)


### Troubleshooting {: #troubleshooting}

- Using the Gulp task, sometimes `jekyll` child processes crap out and keep running (multiple) in the background. This could cause issues. One way to `kill` all of those child processes, and start over, is to stop the Gulp task (CTRL+C) and do: `ps aux | awk '/jekyll/ {print $2}' | xargs kill`

Check out the defined {: .btn}[Colors](/colors) or {: .btn}[Components](/components)