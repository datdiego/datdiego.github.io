+++
date = '2025-06-24T10:25:26-05:00'
draft = true
title = 'print directory structure'
authors = ["diego"]
description = "cmd to print directory structure"
tags= ["cli", "cmd"]
categories=["Programming"]
+++

Quick tip to print directory structure in the command line.

Requires `tree` library, usually comes with linux distros.

```bash
tree -L 6 -I '.next|node_modules'
```

`-L` flag is number of levels

`-I` Ignore folders