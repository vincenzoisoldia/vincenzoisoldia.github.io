---
title: What is the background of this website?
description: Heptagons, three at every corner, and why they only fit in the hyperbolic plane.
---

If you look at the right side of this page (or the top, on a phone), you will see a pattern of curved polygons crowding toward the edge of a circle. It is a picture of the **hyperbolic plane**, and every one of those polygons is exactly the same size.

## The Poincaré disk

The picture uses the *Poincaré disk model*: the open unit disk $\mathbb{D} = \\{ z \in \mathbb{C} : \|z\| < 1 \\}$ with the metric

$$ ds = \frac{2\,|dz|}{1 - |z|^2}. $$

Distances blow up near the boundary circle, so it is infinitely far away. The tiles near the edge only *look* small: measured in the hyperbolic metric, they are all congruent. The straight lines (geodesics) of this geometry are diameters and circular arcs that meet the boundary at right angles, and those are the edges you see.

## Three heptagons at every corner

The pattern is the $\\{7,3\\}$ tiling: regular heptagons, with three of them meeting at every vertex. In the Euclidean plane this is impossible. A regular heptagon has interior angles $5\pi/7 \approx 128.6^\circ$, and three of them add up to more than $360^\circ$.

In the hyperbolic plane, polygons are "thinner" and their angles can be as small as you like. A regular $\\{p,q\\}$ tiling ($p$-gons, $q$ at each vertex) exists in the hyperbolic plane exactly when

$$ \frac{1}{p} + \frac{1}{q} < \frac{1}{2}, $$

and indeed $\tfrac17 + \tfrac13 = \tfrac{10}{21} < \tfrac12$. By Gauss–Bonnet, a hyperbolic $n$-gon with angles $\alpha_1, \dots, \alpha_n$ has area $(n-2)\pi - \sum_i \alpha_i$, so each of our heptagons, with all angles equal to $2\pi/3$, has area

$$ 5\pi - 7 \cdot \frac{2\pi}{3} = \frac{\pi}{3}. $$

## Why it moves

The orientation-preserving isometries of the disk are the Möbius transformations

$$ z \longmapsto e^{i\theta}\, \frac{z - a}{1 - \bar{a} z}, \qquad |a| < 1. $$

The background slowly changes $a$ and $\theta$ (and nudges $a$ toward your mouse), so what you are watching is the tiling being moved by isometries of the hyperbolic plane. Tiles get carried to other tiles, and the picture never distorts.

## A fun fact

Take $24$ heptagons of this tiling and glue them together in the right way: you get a closed surface of genus $3$, the famous **Klein quartic**. It has $168$ symmetries, the maximum allowed for genus $3$ by Hurwitz's bound $84(g-1)$. Surfaces like this one, and the space of all hyperbolic structures on a surface, are the kind of objects I study in my PhD.

*P.S. Try clicking my photo on the [home page]({{ '/' | relative_url }}).*
