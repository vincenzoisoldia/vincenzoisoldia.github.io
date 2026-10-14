---
layout: page
title: Research
permalink: /research/
math: true
---

## Publications and preprints

<ol class="pubs" reversed>
{% for p in site.data.publications %}
  <li>
    <span class="entry-title">{{ p.title }}</span>, {{ p.authors }}.
    {% if p.journal %}<em>{{ p.journal }}</em>.{% endif %}
    {% if p.status %}<span class="tag">{{ p.status }}</span>{% endif %}
    <span class="entry-links">
      {% if p.arxiv %}<a href="https://arxiv.org/abs/{{ p.arxiv }}">arXiv:{{ p.arxiv }}</a>{% endif %}
      {% if p.pdf %}<a href="{{ p.pdf | relative_url }}">pdf</a>{% endif %}
    </span>
  </li>
{% endfor %}
</ol>

## Talks and posters

{% include entries.html items=site.data.talks %}
