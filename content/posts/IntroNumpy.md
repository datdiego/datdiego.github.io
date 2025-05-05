+++
date = '2025-05-02T15:02:42-05:00'
draft = false
title = 'IntroNumpy'
authors = ["diego"]
description = "An quick intro to numpy"

tags= ["Data Science", "numpy"]
categories= ["Review"]
+++
# Intro to Numpy

There are many notebooks out there that cover some of these subjects, including Numpy's [quickstart](https://numpy.org/doc/stable/user/absolute_beginners.html#).

I am using this notebook to gather the most important and maybe not so important parts of this library, which will depend on what you are using it for.

## Why numpy?

Well numpy is used in many mathematical computations due to its blazing fast calculations speeds.

The reason its so fast is due to the vectoriszation of matrices which calculations are done through pre-compiled C code.

Some of the [advantages](https://numpy.org/doc/stable/user/whatisnumpy.html):

- It creates a fixed size `ndarray`, which requires that all elements within this array are the same data type.
- It faciliates tadvances mathematical and scientifical operations of large numbers of data.
- Due to vectorization, its easier for `numpy` to perform calculations, which at the same time resembles standard mathematical notation.


## Importing and starting numpy arrays

Like any library, it should be installed in a virtual environment for easier maintenenace of the code.

```bash
!pip install numpy
```

Then it is imported in with its usual prefix `np`.


```python
import numpy as np
```

### Simple Arrays

Initializing an array as a variable using the `np.array`.


```python
array = np.array([1, 2, 3])
```

Simple operations, like selecting a element using an index. The array list is mutable.


```python
# prints element 1
print(array[1])
# changes element 1 to 4
array[1] = 4
print(array)
```

    2
    [1 4 3]


Slicing an array does not create a copy of the original array, in this case it only provides a view of the original array.


```python
b = array[1:]
print(b)
print(array)
```

    [4 3]
    [1 4 3]


Higher dimensioal arrays can be created and accessed in different ways.


```python
high_array = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
print("Printing high_array")
print(high_array)

print("\nPrints row 0")
print(high_array[0])  # prints row 0

print("\nPrints column 1")
print(high_array[:, 1])  # prints column 1

print("\nPrints element at row 1, column 2")
print(high_array[1, 2])  # prints element at row 1, column 2

print("\nPrints a sub-array from row 1 to 2 and column 1 to 2")
print(high_array[0:2, 0:2])  # prints a sub-array from row 1 to 2 and column 1 to 2

print("\nPrints sub-array from row 1 to end and column 1 to end")
print(high_array[1:, 1:])  # prints a sub-array from row 1 to end and column 1 to end
```

    Printing high_array
    [[1 2 3]
     [4 5 6]
     [7 8 9]]
    
    Prints row 0
    [1 2 3]
    
    Prints column 1
    [2 5 8]
    
    Prints element at row 1, column 2
    6
    
    Prints a sub-array from row 1 to 2 and column 1 to 2
    [[1 2]
     [4 5]]
    
    Prints sub-array from row 1 to end and column 1 to end
    [[5 6]
     [8 9]]


### Array attributes

All arrays have the same attributes:
- `ndim` : number of dimensions
- `shape` : the shape is a tuple that specifies the number of elements along each dimension.
- `size` : the total number of elements in the array.
- `dtype` : arrays usually only have one data type, meaning homogeneous. This returns the data type of the array.


```python
print("Array dimensions")
print(high_array.ndim)  # prints the number of dimensions of the array
print("\nArray shape")
print(high_array.shape)  # prints the shape of the array
print("\nArray size")
print(high_array.size)  # prints the size of the array
print("\nArray data type")
print(high_array.dtype)  # prints the data type of the array
```

    Array dimensions
    2
    
    Array shape
    (3, 3)
    
    Array size
    9
    
    Array data type
    int64


### Basic array creations
These following functions create basic array sequence of elements.
- `np.zeros( n )` : creates an array with `n` zeros.
- `np.ones( n )` : creates an array witn `n` ones.
- `np.empty( n )` : creates an empty array of random `n` elements.
- `np.arange( first, last, step )` : creates an array with an initial number `first` to `last` with `n` number of `steps` between.
- `np.linspace( first, last, num )` : creates an array with values that are linearly spaced in an specified interval.

To any of these functions, the data type of the function can be explicitly specified, which the default is `np.float64`.



```python
print("Array of 4 zeros")
print(np.zeros(4))  # prints an array of 4 zeros
print("\nArray of 4 ones")
print(np.ones(4))  # prints an array of 4 ones
print("\nEmpty array of 6")
print(np.empty(6))  # prints an empty array of 6
print("\nArray of a range of 10 from 0 to 10 with step 2")
print(np.arange(0, 10, 2))  # prints an array of a range of 10 from 0 to 10 with step 2
print("\nArray of linear spaced numbers from 0 to 10 with 5 points")
print(np.linspace(0, 10, 4))  # prints an array of linear spaced numbers from 0 to 10 with 5 points
```

    Array of 4 zeros
    [0. 0. 0. 0.]
    
    Array of 4 ones
    [1. 1. 1. 1.]
    
    Empty array of 6
    [1.33747420e-315 0.00000000e+000 6.94058762e-310 6.94058788e-310
     6.94058788e-310 6.94058788e-310]
    
    Array of a range of 10 from 0 to 10 with step 2
    [0 2 4 6 8]
    
    Array of linear spaced numbers from 0 to 10 with 5 points
    [ 0.          3.33333333  6.66666667 10.        ]

