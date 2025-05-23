+++
title = 'List Growth'
date = 2025-05-09
draft = true
tags = ['code']
+++

## Notes
- Benchmarking is hard
  - Should number=1 or repeat multiple times (number=100) and divide total time by number
    - For this experiment, all times were greater when I tested number=10 vs number=1. I think this was because I'm initializing
    the list each time in the statement. Do I want to do that? Or just test append? I guess Apples to Apples to List comphrension
    I should do that. But these are questions that I didn't think about at all when I thought, hey lets test some python speed.


Why this "from scratch" approach remains good:

Reflects Common Use Cases: Often, you need to generate a new collection of data.
Encapsulates Full Cost: It captures the total cost associated with each method's typical way of producing the final data structure.
Fairness for Comprehensions/NumPy: List comprehensions and typical NumPy array creation inherently produce new objects. Forcing them into an "append to existing" model can be awkward or unidiomatic, while the loop-based append naturally fits both "from scratch" and "append to existing". By choosing "from scratch" for all, you maintain a consistent scenario.
When might it be different? (And why it's still okay for your current goal)

If my specific interest/goal changed - "Given a pre-existing list, how fast can I add N more items using different techniques (like extend vs. a loop of append vs. += with a generator)?"

Then, I would put the initial list creation in setup.

{{< table >}}
| method | N          |   append | comprehension | generator | numpy_array | numpy_to_list |
|--------|------------|----------|---------------|-----------|-------------|---------------|
| 0      | 100,000    | 0.001017 |      0.000676 |  0.001734 |    0.000009 |      0.000593 |
| 1      | 1,000,000  | 0.011074 |      0.008455 |  0.017818 |    0.000305 |      0.007174 |
| 2      | 10,000,000 | 0.113638 |      0.088883 |  0.193964 |    0.004165 |      0.084701 |
{{< /table >}}

{{< chart
    id="list-performance-chart"
    height="450"
    type="line"
    title="Python List Creation Performance"
    xTitle="List Size (n)"
    yTitle="Time (seconds)"
    dataFile="min_chart_data"
/>}}