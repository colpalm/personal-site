+++
title = 'Palm Eval'
date = 2025-06-18
draft = true
tags = ['llm']
+++

Born and raised in Los Angeles and with a last name of "Palmer", you can probably guess my favorite tree. Ever since creating
this site, I've wanted some sort of palm tree drawing or animation to use on the homepage or as a logo. But even as the models progressed,
I still don't have anything acceptable. Maybe I'm missing the right prompt but I still haven't found the magic recipe.

Simon Willison has been tracking how well LLMs can draw [Pelicans on a bicycle](https://simonwillison.net/2024/Oct/25/pelicans-on-a-bicycle/).
This is my version. Forget the animation, lets see how well it can draw one.

I tried two prompts, one simple and one more detaild across ChatGPT, Claude and Gemini. Judge for yourself.

## Simple Prompt
The Prompt:
> Generate an SVG of a palm tree

{{< image-pair "simple-pt-claude-sonnet-3.7.svg" "Sonnet 3.7" "simple-pt-claude-opus-3.svg" "Opus 3" >}}

{{< image-pair "simple-pt-claude-sonnet-4.svg" "Sonnet 4" "simple-pt-claude-opus-4.svg" "Opus 4" >}}

{{< image-pair "simple-pt-gpt-4o.svg" "GPT-4o" "simple-pt-gemini-2.5-pro.svg" "Gemini 2.5 Pro" >}}

Interesting results. I think you can basically tell that each one is a palm tree, besides Opus 3. Style points for Opus 4
for going for the [In-N-Out Crossed Palm look](https://www.google.com/imgres?q=in%20n%20out%20crossed%20palm%20trees&imgurl=https%3A%2F%2Flookaside.fbsbx.com%2Flookaside%2Fcrawler%2Finstagram%2FC-vXqAavicX%2F0%2Fimage.jpg&imgrefurl=https%3A%2F%2Fwww.instagram.com%2Fp%2FC-vXqAavicX%2F&docid=RLhSMIIdAFKVxM&tbnid=J0QbAglZ62zfcM&vet=12ahUKEwiPq8K-_f6NAxVJFFkFHf5QNPUQM3oECBYQAA..i&w=1080&h=1080&hcb=2&ved=2ahUKEwiPq8K-_f6NAxVJFFkFHf5QNPUQM3oECBYQAA){target="_blank"}


Check out this [Google image search](https://images.google.com/search?q=palm+trees)
{target="_blank"} for reference.


[Google image search](https://images.google.com/search?q=palm+trees){target="_blank"}




---

## Detailed Prompt
The Prompt:
> Generate an SVG of a tall, curved palm tree on a small sandy island.
The tree should have a slightly bent trunk, around 6–8 large fronds, and a few coconuts visible under the leaves.
Include a simple sun in the top right corner and two short waves at the base of the island to suggest the ocean.
Use smooth curves and avoid overly realistic shading — aim for a clean, stylized, vector illustration suitable for icons or mobile design.

{{< image-pair "detailed-pt-claude-sonnet-3.7.svg" "Sonnet 3.7" "detailed-pt-claude-opus-3.svg" "Opus 3" >}}

{{< image-pair "detailed-pt-claude-sonnet-4.svg" "Sonnet 4" "detailed-pt-claude-opus-4.svg" "Opus 4" >}}

{{< image-pair "detailed-pt-gpt-4o.svg" "GPT-4o" "detailed-pt-gemini-2.5-pro.svg" "Gemini 2.5 Pro" >}}



