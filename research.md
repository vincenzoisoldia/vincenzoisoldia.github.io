---
layout: page
title: Research
permalink: /research/
math: true
---

My research interests lie at the intersection of geometry, dynamics, and representation theory. My recent work has concerned homogeneous varieties and their secant varieties, tensor geometry, discrete differential geometry, and interactions between algebraic geometry, combinatorics, and game theory.

During my PhD, I plan to focus on Riemann surfaces and their moduli, higher Teichmüller theory, and Anosov representations, with an eye toward connecting Lie-theoretic structures with the analytic and dynamical geometry of surfaces.

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

## Theses

<ul class="entries">
  <li class="entry">
    <span class="entry-date">2025</span>
    <div><span class="entry-title">Schur Apolarity and the Dual Terracini Lemma for Flag Varieties: A Geometric and Representation-Theoretic Approach</span><p class="entry-detail">M.Sc. thesis, University of Trento. Supervised by Prof. Alessandra Bernardi and Dr. Stefano Canino.</p></div>
  </li>
  <li class="entry">
    <span class="entry-date">2023</span>
    <div><span class="entry-title">Plane Algebraic Curves: Local Study and Plücker Formulas</span><p class="entry-detail">B.Sc. final seminar, University of Milan.</p></div>
  </li>
</ul>

## Talks and posters

{% include entries.html items=site.data.talks %}
