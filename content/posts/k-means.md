+++
date = '2025-04-11T16:04:44-05:00'
draft = false
title = 'K-Means Clustering' 
authors = ["diego"]
description = "This is a basic overview of k-Means clustering"

tags= ["Data Science", "Clustering"]
categories= ["Data Science"]
+++

# k-Means clustering

- When trying to [cluster](../posts/cluster) data together, K-means is an unsupervised learning algorithm which groups unlabeled data points into clusters.

- It is one the most popular methods in machine learning.

- It is a centroid-based or distance based algorithm, where it calculates the distances to the mean point around a set of data.

## Objectives

Its main objective it to *group similar data points* that allows us to discover insights within the data.

These points are usually segmented into groups that share similar characteristics.

## Math



## Code

The following code follows how a sample `.csv` file is parsed and clusters are produced using [`sklearn`](https://scikit-learn.org/stable/modules/generated/sklearn.cluster.KMeans.html) library.


```python
## Imports
import pandas as pd 
import seaborn as sns

# Data preprocessing
from sklearn.model_selection import train_test_split
from sklearn import preprocessing

# K-Means
from sklearn import KMeans

```

Importing and visualizing the data

