# www.vincenzoantonioisoldi.com

Sito personale, pubblicato automaticamente da GitHub Pages a ogni push su `master`.

## Come modificare

| Cosa | Dove |
|---|---|
| Testo della pagina About | `index.md` |
| Nome, ruolo, email, link social, menu | `_config.yml` |
| Pubblicazioni | `_data/publications.yml` |
| Talk e poster (con slide) | `_data/talks.yml` |
| Conferenze, outreach, premi | `_data/activities.yml` |
| Corsi e materiale didattico | `_data/teaching.yml` |
| Reading group | `_data/reading_group.yml` |
| Testo introduttivo della pagina Research | `research.md` |
| CV | sostituisci `files/cv.pdf` |
| Foto | sostituisci `images/profile.jpg` |

## File (problem set, slide, note)

- Materiale dei corsi: `files/teaching/`, poi aggiungilo in `_data/teaching.yml`
- Slide dei talk: `files/talks/`, poi in `_data/talks.yml` scrivi `slides: /files/talks/nome.pdf`
- Nomi dei file: usa `_` al posto degli spazi; le date si scrivono con i trattini e sono seguite da `-`, es. `2026-11-stable_coexistence_1.pdf` (stessa regola dei post del blog)

## Nuovo post nel blog

Crea un file in `_posts/` chiamato `AAAA-MM-GG-titolo.md`, ad esempio `2026-10-01-fun_fact.md`.
La data deve avere i trattini (`-`), altrimenti Jekyll non riconosce il post; nel titolo usa `_` al posto degli spazi.
Il titolo del file diventa l'indirizzo del post, es. `/blog/2026/10/fun_fact/`:

```
---
title: Il titolo del post
description: Una riga di riassunto (facoltativa)
---

Il testo in Markdown. La matematica funziona: $e^{i\pi} + 1 = 0$
```

Un esempio completo è in `_drafts/example_post.md` (i file in `_drafts/` non vengono pubblicati).

## Pubblicare

Salva le modifiche, poi in GitHub Desktop: scrivi un messaggio di commit, clicca **Commit to master** e poi **Push origin**. Il sito si aggiorna in circa un minuto. Non usare mai **Force push**.
