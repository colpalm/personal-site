+++
title = 'Global s3 Buckets and LLMs'
date = 2025-07-15
tags = ['LLMs']
draft = true
+++

I've been thinking about Dwarkesh's [question](https://x.com/dwarkesh_sp/status/1888164523984470055):
(paraphrased) "if LLMs have access to the entirety of human knowledge, where are all the novel discoveries?"
Scott Alexander and Daniel Kokotajlo give their response in this [clip](https://www.youtube.com/watch?v=J13EetQjYs4),
which I
find satisfactory. But I keep running into situations where I have a problem, the LLM should know the answer (and
probably does), and yet...it doesn't or I can't coax it out. Here's one example where Claude failed to connect some
basic dots that were already in the training distribution.

<!--more-->

## Trying to Create s3 Buckets

At work, I was transitioning a deployment in AWS to a new account. I had to configure everything the application
depended on (EKS cluster, s3 bucket, etc.). When I got to the s3 bucket, I tried to give it the same name as the
original (no code or config changes). But I ran into an error:

> ‼️ Bucket with the same name already exists.

That's odd. I didn't see this bucket anywhere in my new account. Where is it?

**Quick Note**: to add to the confusion, I didn't notice the error message at first. I thought I had created the bucket
but didn't have the correct permissions to view it. So my (incorrect) workflow looked like:

1. Successfully create an s3 bucket (e.g. `project-test`)
2. Don't see the bucket...Did I actually create it or do I lack permissions to view/use it?
3. Try to recreate the bucket which results in "Bucket with the same name already exists" error.
4. So I created it! But can't see it? Weird.

What to do? I combed through all the roles and policies associated with my AWS account, but couldn't find anything
restricting s3 access. Time to get some help from Claude (Sonnet 4).

## Could Claude Spot my Error?

Now Claude knows everything about AWS — surely it would know what was going on. I explained my (flawed) workflow, the
task, and the bucket creation failure. From what I shared, Claude noticed that the bucket names were the **same**
between the new and old accounts and asked me to confirm I was in the correct account.

Now, if you're familiar with AWS and s3, this is the key point. Claude spotted it...but couldn't connect the dots. The
problem is that s3 bucket names are globally unique. Because buckets are accessed via DNS and URLs, no two buckets can
share the same name.

Claude knows this. A quick Google Search shows multiple posts on
it ([example](https://www.reddit.com/r/aws/comments/8axd8e/how_come_s3_bucket_names_are_globally_unique/)). It's in the
AWS documentation. Yet Claude glanced over this fact while recognizing I was using the same name.

It felt like a very human error. One of those things you don't notice until suddenly you do 🤦🏼‍♂️.

### Context and Prompt are Key

Since this error should have been caught by LLMs, I tried again with a simpler prompt (an no incorrect workflow) to
GPT-4.1 and Claude:
> I am migrating a project from one AWS account to a new one. I have to set up an s3 bucket in the new account. I'm
> trying to use the same bucket name from the original account, but I'm getting the error: "Bucket with the same name
> already exists."

This time, both models nailed it and correctly identified the issue: bucket names are global and cannot be reused.

So the problem was purely in how I framed it. My messy and incorrect explanation lead Claude down the wrong path. An
astute listener might have caught it: "Wait, you said you recreated the bucket with the same name but can't see it?
Impossible! Bucket names are unique." I'm surprised Claude didn't.

## Conclusion

I've noticed this pattern with LLMs: I get stuck, the model gets stuck, and after some back and forth we finally figure
it out. But then
I wonder, "Why didn't the LLM get there faster?"

In this case, the model had all the relevant information. It knew the AWS documentation, that s3 bucket names are
global, and that I was reusing a bucket name. Yet, it happily followed me down the rabbit hole, not realizing my initial
assumptions were wrong. Thats what makes Dwarkesh's question so interesting. If a messy explanation can trip Claude up
on well documented s3 bucket naming conventions, how far are we from LLMs generating genuine discoveries? Or maybe we're
closer than I think and it's just a matter of providing the right context and prompt.

I'll keep tracking and writing about these cases where LLMs stumble on something they should "one-shot". And remember, *
*s3**
**bucket names are global!** Don't reuse them.