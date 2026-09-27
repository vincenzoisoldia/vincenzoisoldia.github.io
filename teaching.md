---
layout: page
title: Teaching
permalink: /teaching/
---

{% assign rg = site.data.reading_group %}
{% if rg.name != "" %}
## {{ rg.name }}

{{ rg.description | markdownify }}

{% if rg.meetings.size > 0 %}
<ul class="entries">
  {% for m in rg.meetings %}
  <li class="entry">
    <span class="entry-date">{{ m.date }}</span>
    <div>
      <span class="entry-title">{{ m.topic }}</span>{% if m.speaker %}<span class="entry-detail">, {{ m.speaker }}</span>{% endif %}
      {% if m.notes %}<span class="entry-links"><a href="{{ m.notes | relative_url }}">notes</a></span>{% endif %}
    </div>
  </li>
  {% endfor %}
</ul>
{% endif %}
{% endif %}

## Teaching assistant

{% for y in site.data.teaching %}
### A.Y. {{ y.year }}

{% for c in y.courses %}
<div class="course">
  <span class="course-title">{{ c.title }}</span>{% if c.note %} <span class="tag">{{ c.note }}</span>{% endif %}
  <p>{{ c.where }}. Instructor: {{ c.instructor }}.</p>
  {% if c.materials %}
  <details class="materials-box">
    <summary>{{ c.materials_note | default: "Course materials" }} <span class="count">{{ c.materials.size }} files</span></summary>
    <ul class="materials">
      {% for m in c.materials %}
      <li>
        <a href="{{ m.file | relative_url }}">{{ m.title }}</a>
        {% if m.solutions %} · <a href="{{ m.solutions | relative_url }}">solutions</a>{% endif %}
        {% if m.extra %} · <a href="{{ m.extra | relative_url }}">{{ m.extra_label | default: "extra" }}</a>{% endif %}
      </li>
      {% endfor %}
    </ul>
  </details>
  {% endif %}
</div>
{% endfor %}
{% endfor %}
