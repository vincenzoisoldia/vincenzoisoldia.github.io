---
layout: page
title: Teaching & co.
permalink: /teaching/
---

## Teaching assistant

{% for y in site.data.teaching %}
### A.Y. {{ y.year }}

{% for c in y.courses %}
<div class="course">
  <span class="course-title">{{ c.title }}</span><span class="entry-detail">, {{ c.where }}</span>{% if c.note %} <span class="tag">{{ c.note }}</span>{% endif %}
  <p>{% if c.instructor contains " and " %}Instructors{% else %}Instructor{% endif %}: {{ c.instructor }}</p>
  {% if c.materials %}
  <details class="materials-box">
    <summary>{{ c.materials_note | default: "Course materials" }} <span class="count">{{ c.materials.size }} files</span></summary>
    <ul class="materials">
      {% for m in c.materials %}
      <li>
        <a href="{{ m.file | relative_url }}">{{ m.title }}</a>
        {% if m.solutions %} · <a href="{{ m.solutions | relative_url }}">Solutions</a>{% endif %}
        {% if m.extra %} · <a href="{{ m.extra | relative_url }}">{{ m.extra_label | default: "Extra" }}</a>{% endif %}
      </li>
      {% endfor %}
    </ul>
  </details>
  {% endif %}
</div>
{% endfor %}
{% endfor %}

{% if site.data.mentoring.size > 0 %}
## Mentoring

{% for m in site.data.mentoring %}
<div class="course">
  <span class="course-title">{{ m.name }}</span><span class="entry-detail">, {{ m.role }}{% if m.date %}, {{ m.date }}{% endif %}</span>
  {% if m.project %}<p>Project: {{ m.project }}</p>{% endif %}
  {% if m.supervisor %}<p>Main supervisor: {{ m.supervisor }}</p>{% endif %}
</div>
{% endfor %}
{% endif %}

{% assign rg = site.data.reading_group %}
{% if rg.name != "" %}
## Reading groups

### {{ rg.name }}
{: #reading_group}

{{ rg.description | markdownify }}

{% if rg.meetings.size > 0 %}
<ul class="entries">
  {% for m in rg.meetings %}
  <li class="entry">
    <span class="entry-date">{{ m.date }}</span>
    <div>
      <span class="entry-title">{{ m.topic }}</span>{% if m.speaker %}<span class="entry-detail">, {{ m.speaker }}</span>{% endif %}
      {% if m.notes %}<span class="entry-links"><a href="{{ m.notes | relative_url }}">Notes</a></span>{% endif %}
      {% if m.note %}<p class="entry-detail">{{ m.note }}</p>{% endif %}
    </div>
  </li>
  {% endfor %}
</ul>
{% endif %}
{% if rg.closing %}<p class="entry-detail">{{ rg.closing }}</p>{% endif %}
{% endif %}

{% if site.data.external_courses.size > 0 %}
## External courses

{% for c in site.data.external_courses %}
### {{ c.title }}

{{ c.description | markdownify }}
{% endfor %}
{% endif %}
