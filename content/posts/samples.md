+++
title = 'Samples'
date = 2025-05-16
draft = true
tags = ['misc']
+++

Test out partials/shortcodes. Testing out the width of the page as well to see if the charts go to the right. Does it go further?

# Visuals

## Code Block
```python
def main():
    print("Hello from python-experiments!")


def insert_middle(arr, i, n, length):
    for index in range(i, length):
        arr[index + 1] = arr[index]
    arr[i] = n


if __name__ == "__main__":
    main()
    a = [1,2,3,5,0,0,0]
    insert_middle(a, 1, 99, 4)
    print(a)
    a2 = [10,20,30,40,0,0]
    insert_middle(a2, 1, 99, 4)
    print(a2)
```

## Chart
### Bar Chart

{{< chart type="bar" height="350" >}}
{
    "data": {
        "labels": ["January", "February", "March", "April", "May"],
        "datasets": [{
            "label": "Monthly Sales",
            "data": [65, 59, 80, 81, 56],
            "borderWidth": 1
        }]
    },
    "options": {
        "plugins": {
            "title": {
                "display": true,
                "text": "Monthly Sales Data"
            }
        },
        "scales": {
            "y": {
                "beginAtZero": true
            }
        }
    }
}
{{< /chart >}}

{{< chart type="bar" height="350" >}}
{
    "data": {
        "labels": ["January", "February", "March", "April", "May"],
        "datasets": [
            {
                "label": "2023 Sales",
                "data": [65, 59, 80, 81, 56]
            },
            {
                "label": "2024 Sales",
                "data": [45, 79, 50, 91, 66]
            },
            {
            "label": "2025 Sales",
            "data": [20, 85, 45, 60, 100]
            }
        ]
    },
    "options": {
        "plugins": {
            "title": {
                "display": true,
                "text": "Sales Comparison"
            }
        }
    }
}
{{< /chart >}}

### Line Chart
{{< chart type="line" height="350" >}}
{
    "data": {
        "labels": ["January", "February", "March", "April", "May", "June"],
        "datasets": [{
            "label": "Website Visitors",
            "data": [4500, 5900, 7000, 8100, 9600, 11200],
            "fill": false,
            "tension": 0.1
        }]
    },
    "options": {
        "plugins": {
            "title": {
                "display": true,
                "text": "Monthly Website Traffic"
            }
        }
    }
}
{{< /chart >}}


## Block Quote
> This is a block quote

## Inline Code
How does this in-line code look? `print("Hello from python-experiments!")`

## Table
Text above the table.

| Name | Age | M/F |
|------|-----|-----|
| Joe  | 25  | M   |
| Lou  | 25  | F   |

And text below the table.