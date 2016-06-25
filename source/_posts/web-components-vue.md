---
title: Web Components and Vue.js
author: Denis Karabaza
description: Will standard Web Components ever replace component-based frameworks?
tags: [vue, mvvm, web-components]
og:
  type: article
  section: Technology
  published: 2016-06-25 00:27:01
---

> This is a short post, born out of discussion about Web Components and Vue.js. Albeit being about Vue, it applies to any component-based framework out there (React, Angular 2, etc.).

# Different problems

It appears to me, that Web Components are designed for **semantic markup-driven documents**. With Web Components you will find yourself using Shadow DOM components with slots to assemble small things into big ones, and specify **values** in component attributes.

``` html
<app-tabs>
  <app-tab title="Home">
    Home tab content
  </app-tab>
  <app-tab title="Settings">
    Settings tab content
  </app-tab>
</app-tabs>
```

Vue on the other hand is designed for **dynamic data-driven applications**. With Vue you will often use components encapsulated within other components, and will **bind** attributes to the viewmodel of the "owner" component.

``` js
tabs: [
  { title: 'Home', content: 'Home tab content' },
  { title: 'Settings', content: 'Settings tab content' },
],
```

``` html
<!-- application code -->
<tabs :tabs="tabs"></app>
```

``` html
<!-- within `tabs` template -->
<tab v-for="tab in tabs" :title="tab.title" :content="tab.content"></tab>
```

Some time ago there was this shift of separating components into two categories, [presentational and container components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0). I think that this exactly fits the difference between Web Components and Vue components, with Web Components being about presentation, and Vue being about data flow.

That said, there is no reason why Vue could not be used in markup-driven style, or why Web Components could not be used in data-driven style. But they are really good at what they were designed for.

# No winner

A curious reader might ask, whether Vue can be implemented on top of Web Components. It seems unlikely, because (arguably) Web Components do not provide all the answers to the problems Vue tries to solve. Vue already uses `template` tag, and may embrace Shadow DOM to simplify content distribution and styles isolation. But I doubt it will ever pick up lifecycle API of custom elements, or HTML imports.

So can Web Components eventually replace Vue? Well, they not are exclusive technologies. I'm pretty sure, that once Web Components are available in all the relevant browsers, people will start using then together with Vue rather them in place of Vue. I would not be surprised to see this in the future:

``` html
<app-tabs>
  <app-tab v-for="tab in tabs" :title="Home">
    {{ tab.content }}
  </app-tab>
</app-tabs>
```

, with `app-tabs` and `app-tab` being presentational Web Components, and Vue driving the data flow.

# One ring to rule them all

But there's more. Due to simple API, Web Components can provide **interoperaility** between different frameworks. This is where Web Components will shine.
