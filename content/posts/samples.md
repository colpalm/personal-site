+++
title = 'Samples'
date = 2025-05-16
draft = true
tags = ['misc']
+++

Test out partials/shortcodes

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



## Block Quote
> This is a block quote

## Inline Code
How does this in-line code look? `print("Hello from python-experiments!")`

## Table
| Name | Age | M/F |
|------|-----|-----|
| Joe  | 25  | M   |
| Lou  | 25  | F   |