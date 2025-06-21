+++
title = 'Palm Eval'
date = 2025-06-20
tags = ['llm']
+++

Born and raised in LA and with the last name "Palmer," you can probably guess my favorite tree (do people have favorite 
trees or just me?). Ever since creating this site, I've wanted some sort of palm tree drawing or animation for 
the homepage or logo. Sounds like the perfect task for an LLM, right? But even as models have progressed, I still don't 
have anything acceptable.

Simon Willison has been tracking how well LLMs can draw [Pelicans on a bicycle](https://simonwillison.net/2024/Oct/25/pelicans-on-a-bicycle/).
This is my version of that experiment. Forget the animation, let's see how well current models can draw a simple palm tree.

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