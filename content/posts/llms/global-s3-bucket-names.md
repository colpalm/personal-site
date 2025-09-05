+++
title = 'Global s3 Buckets and LLMs'
date = 2025-07-15
tags = ['LLMs']
draft = true
+++

I've been thinking more and more about Dwarkesh's [question](https://x.com/dwarkesh_sp/status/1888164523984470055)
(paraphrasing): "if LLMs have access to the entirety of human knowledge, where are all the novel discoveries?"
Scott Alexander and Daniel Kokotajlo give their response in this [clip](https://www.youtube.com/watch?v=J13EetQjYs4), which I 
find
satisfactory. But I'm finding more and more cases when working with LLMs where I have a problem, the LLM should know 
the answer, and yet...it doesn't. Take this example.

<!--more-->

## Trying to Create s3 Buckets

At work, I was transitioning a deployment in AWS to a new account. I had to configure everything the
application depended on e.g. EKS cluster, s3 bucket, etc. When I got to the s3 bucket, I tried to give it the same 
name as the original bucket. Using the same name saves me any code changes I thought. But I ran into an error:

> Bucket with the same name already exists.

Well, that's interesting. I don't see this bucket anywhere in my new account. Where is it?

Quick Note: to aid in the confusion, I didn't see the error message at first. I thought I had created the bucket but 
didn't have the correct permissions to view it. So my perceived workflow was:

1. Successfully created an s3 bucket (`project-test`)
2. Didn't have correct permissions to see/use the bucket
3. Tried to recreate the bucket and got the "Bucket with the same name already exists", which reinforced 1 and 2.

So what to do? I combed through the roles and policies associated with my AWS account, but couldn't 
find anything restricting my s3 access. So time to get some help from Claude (Sonnet 4).

## Could Claude Spot the Error?
Now Claude knows everything about AWS; surely it'll know what's going on. I brought Claude up to speed about the task,
and that the new bucket creation was failing. From some of the outputs I gave it, Claude noticed that the bucket names 
were the **same** between the new and old account and wanted to clarify that I was in the correct account. 

Now if you're familiar with AWS and s3, this is the key point. Claude spotted it...but couldn't 
connect the dots in this situation. The problem is that s3 buckets are globally unique. Because they can be accessed 
via DNS or within 
URLs, you can't have any two buckets with the same name!

Claude knows this. A quick Google Search shows multiple posts about this ([one example](https://www.reddit.com/r/aws/comments/8axd8e/how_come_s3_bucket_names_are_globally_unique/)). 
It's in the AWS documentation. Yet Claude 
glanced over this fact while recognizing I was using the same bucket name. 
    
This felt like a very human error. An error 
that you don't notice until you do, and is summed up with the facepalm emoji 🤦🏼‍♂️.

### Context and Prompt are Key
Given that this error should be caught by LLMs, reprompted GPT4.1 and Claude with just the basics:
> I am migrating a project from one AWS account to a new one. I have to set up a s3 bucket in the new account. I'm 
> trying to use the same bucket name in the original account, but I'm getting the error: "Bucket with the same name 
> already exists."
 
Both models see the issue right away and correctly identify that you cannot use the same bucket name.

## Conclusion
I've noticed this happen multiple times with LLMs where I'm stuck, the LLM is stuck, and when I finally figure it out,
I think, "wow, why didn't the LLM get there faster." This is interesting with respect to Dwarkesh's question. 
Here the LLM has all the relevant information. It knows the AWS documentation. It knows s3 bucket names are global. It 
knows that I'm trying to re-use a bucket name. And yet, it couldn't tell me what was wrong. How far away are 
we from novel discoveries when we can't see what's right in front of us?

I'll continue to track weird little issues that stump an LLM that I think should be able to one shot. And remember, s3 
bucket names are global! Don't reuse them.