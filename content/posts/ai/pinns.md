+++
date = '2025-06-24T10:35:48-05:00'
draft = false
title = 'Physics informed neural networks'
authors = ["diego"]
description = "A review of physics informed neural networks"
tags= ["ai", "physics", "deep learning"]
categories=["AI"]
+++

Neural networks have proven to be powerful tools for solving complex physics problems  [[1],(https://www.pnas.org/doi/10.1073/pnas.1907373117) and partial differential equations (PDEs)[2],(https://www.sciencedirect.com/science/article/pii/S0021999119305364)[3],(https://arxiv.org/abs/1707.02568)[4],(https://arxiv.org/abs/1907.04502)[5](https://www.sciencedirect.com/science/article/pii/S0021999118307125)] across various domains, including fluid dynamics[[6](https://www.sciencedirect.com/science/article/abs/pii/S0045782519306814)], heat transfer[[7](https://www.arxiv.org/pdf/2506.17726)], and quantum mechanics[[8](https://www.mdpi.com/1099-4300/26/8/649)]. By leveraging their ability to approximate high-dimensional functions and learn non-linear relationships from data, neural networks have been applied to model complex physical systems with remarkable accuracy. In particular, advancements in deep learning have enabled the development of architectures that not only fit data but also incorporate governing physical laws, paving the way for more robust and interpretable solutions.

Physics-Informed Neural Networks (PINNs) have emerged as a powerful tool for solving high-dimensional partial differential equations (PDEs) and modeling dynamical systems by embedding physical laws directly into the learning process[[9](https://www.nature.com/articles/s42254-021-00314-5)].  This framework has gained traction in quantum computing and control, where accurately modeling quantum dynamics is critical for tasks such as state preparation, quantum gates, and optimization of control pulses. Recent studies have explored PINNs for quantum systems, including continuous variable quantum computing[[10](https://www.frontiersin.org/journals/applied-mathematics-and-statistics/articles/10.3389/fams.2022.1036711/full)], eigenvalue problems[[11](https://arxiv.org/abs/2203.00451)], and quantum [[12](https://arxiv.org/abs/2407.00444)]. However, the potential of PINNs to approximate control fields and expectation values in qubit systems remains an open challenge.

Data-driven neural networks have also demonstrated remarkable flexibility and efficiency in approximating mappings in complex systems. These models excel when high-quality training data is available, offering computational efficiency and simplicity[[12](https://arxiv.org/abs/1808.05232)]. However, their lack of inherent physical constraints can lead to inaccurate or unphysical predictions in scenarios where the data distribution is incomplete or complex dynamics are involved.