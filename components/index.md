---
layout: default
title: Components
category: components
---

{% for component in site.categories[page.category] %}
<div class="sg-component" id="{{component.title}}">
	<h2 class="sg-component__title"><a href="{{site.baseurl}}{{component.url}}#component-detail">{{component.title|capitalize}}</a></h2>
	{{component.content}}
</div>
{% endfor %}
