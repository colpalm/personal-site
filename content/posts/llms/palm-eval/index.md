+++
title = 'Surfing Palm Eval'
date = 2026-08-18
draft = true
tags = ['LLMs']
+++

Simon Willison has been tracking how well LLMs can draw [Pelicans on a bicycle](https://simonwillison.net/2024/Oct/25/pelicans-on-a-bicycle/) since 2024. I figured I needed my own version of that experiment.

<!--more-->

Since creating this site, I wanted some sort of simple palm tree animation on the home page. Why a palm tree? Well I'm from LA, I love the beach and my last name is "Palmer", so it's always been an obvious pick for my favorite tree. Do other people have favorite trees?

Even with how fast LLMs have improved, I haven't been able to get a result I'm happy with. Forget the animation for now, lets see how well current models can create palm tree SVGs. But in the spirit of the pelican on a bicycle benchmark, we can't just ask for a palm tree. So the prompt is:

> Generate an SVG of a palm tree surfing a wave

I tested the prompt on ChatGPT and Claude from the web chat and will continue to test on future model releases.

{{< image-pair "gpt-5.5-high.svg" "GPT-5.5" "gpt-5.6-sol-high.svg" "GPT-5.6 Sol" >}}

Notes
- GPT 5.5 and 5.6 both created PNGs first. Had to ask again for an SVG and it was working from the PNG so maybe a bit of cheating?
- 5.5 and 5.6 were both high effort. o3 was medium



I tested two prompts across ChatGPT, Claude, and Gemini: one simple and one more detailed. Judge for yourself.

## Simple Prompt
The Prompt:
> Generate an SVG of a palm tree

{{< image-pair "simple-pt-claude-sonnet-3.7.svg" "Sonnet 3.7" "simple-pt-claude-opus-3.svg" "Opus 3" >}}

{{< image-pair "simple-pt-claude-sonnet-4.svg" "Sonnet 4" "simple-pt-claude-opus-4.svg" "Opus 4" >}}

{{< image-pair "simple-pt-gpt-4o.svg" "GPT-4o" "simple-pt-gemini-2.5-pro.svg" "Gemini 2.5 Pro" >}}

Interesting results. The outputs came in all shapes and sizes, but I standardized them here for display. You can 
basically tell that each one is a palm tree, except maybe Opus 3 and GPT-4o. Style points to Opus 4 for attempting the 
[In-N-Out Crossed Palm](https://www.google.com/imgres?q=in%20n%20out%20crossed%20palm%20trees&imgurl=https%3A%2F%2Flookaside.fbsbx.com%2Flookaside%2Fcrawler%2Finstagram%2FC-vXqAavicX%2F0%2Fimage.jpg&imgrefurl=https%3A%2F%2Fwww.instagram.com%2Fp%2FC-vXqAavicX%2F&docid=RLhSMIIdAFKVxM&tbnid=J0QbAglZ62zfcM&vet=12ahUKEwiPq8K-_f6NAxVJFFkFHf5QNPUQM3oECBYQAA..i&w=1080&h=1080&hcb=2&ved=2ahUKEwiPq8K-_f6NAxVJFFkFHf5QNPUQM3oECBYQAA)
look. But are any of these good enough for a logo? Not quite.

---

## Detailed Prompt
Let's see if we can do better with more direction.

The Prompt:
> Generate an SVG of a tall, curved palm tree on a small sandy island.
The tree should have a slightly bent trunk, around 6–8 large fronds, and a few coconuts visible under the leaves.
Include a simple sun in the top right corner and two short waves at the base of the island to suggest the ocean.
Use smooth curves and avoid overly realistic shading — aim for a clean, stylized, vector illustration suitable for icons or mobile design.

{{< image-pair "detailed-pt-claude-sonnet-3.7.svg" "Sonnet 3.7" "detailed-pt-claude-opus-3.svg" "Opus 3" >}}

{{< image-pair "detailed-pt-claude-sonnet-4.svg" "Sonnet 4" "detailed-pt-claude-opus-4.svg" "Opus 4" >}}

{{< image-pair "detailed-pt-gpt-4o.svg" "GPT-4o" "detailed-pt-gemini-2.5-pro.svg" "Gemini 2.5 Pro" >}}

All models get a passing grade for following instructions — we've got palm trees, coconuts, islands with waves, and suns in the upper right. 
Sonnet 3.7 isn't bad and could work (minus the missing trunk top). Opus 3 kept its distinctive frond style, though I'm not
familiar with that palm tree variety. Still, not exactly production ready. 

## Conclusion
LLMs can generate pictures of palm trees just fine, but they struggle with realistic, well-formed SVGs. Why is this?
On the surface, these tasks seem similar, but there are key differences underneath:

1. **Sequential vs holistic generation**: Image generation models can consider spatial relationships and how elements fit 
   together across the entire canvas. With SVGs, language models generate code sequentially, one token 
   at a time from `<svg ...` to `</svg>` without ever "seeing" the rendered result. They rely entirely on learned patterns 
   about how SVG coordinates and shapes should work together and their "memory" of what they've already drawn.
2. **Training distribution**: While models have seen billions of palm tree images, there are far fewer examples of 
   SVG palm trees in their training data.
3. **Error visibility** — In [raster](https://en.wikipedia.org/wiki/Raster_graphics) images, individual pixel errors 
   blend into the overall picture. In SVG, a single incorrect coordinate or poorly shaped path can break an entire shape or 
   throw off the whole image.

For whatever reason, I find this gap interesting and will continue tracking palm tree SVG generation until there's a 
breakthrough. Or until this post shows up in a model's training set and teaches it to draw the perfect palm tree. Either
way, still waiting for my palm tree animation. 🌴