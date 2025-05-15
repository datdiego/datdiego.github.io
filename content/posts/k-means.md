+++
date = '2025-04-11T16:04:44-05:00'
draft = true
title = 'K-Means Clustering' 
authors = ["diego"]
description = "This is a basic overview of k-Means clustering"
featuredImage = "/images/posts/k-means.webp"
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

The K-Means algorithm works by minimizing the **within-cluster sum of squares** (WCSS), sometimes called inertia.  
Mathematically, it aims to solve:

$$
\underset{S}{\operatorname{arg\,min}} \sum_{i=1}^k \sum_{x \in S_i} \| x - \mu_i \|^2
$$

Where:
- \( k \) = number of clusters
- \( S_i \) = set of points assigned to cluster \( i \)
- \( \mu_i \) = mean (centroid) of points in \( S_i \)

The algorithm iterates between assigning points to the nearest centroid and updating centroids based on current cluster memberships.

---

## Code

The following code shows how a sample `.csv` file is parsed and clusters are produced using [`sklearn`](https://scikit-learn.org/stable/modules/generated/sklearn.cluster.KMeans.html) library.

```python
## Imports
import pandas as pd 
import seaborn as sns
import matplotlib.pyplot as plt

# K-Means
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler

# Load data
data = pd.read_csv("your_file.csv")

# Optional: scale data
scaler = StandardScaler()
scaled_data = scaler.fit_transform(data)

# Fit KMeans
kmeans = KMeans(n_clusters=3, random_state=42)
kmeans.fit(scaled_data)

# Add cluster labels to dataframe
data['Cluster'] = kmeans.labels_

# Visualize clusters (if data has two main features)
sns.scatterplot(x=data['Feature1'], y=data['Feature2'], hue=data['Cluster'], palette='Set2')
plt.title('K-Means Clustering')
plt.show()
```