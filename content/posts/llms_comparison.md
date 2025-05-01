+++
date = '2025-04-16T15:16:08-05:00'
draft = false
title = 'LLM comparison' 
authors = ["diego"]
description = "These are a few llms I have been testing for a personal project"

tags= ["LLM", "Deep Learning", "AI"]
categories= ["AI"]
+++

# LLM Comparison

Standard LLM pipeline from Hugging Face.

```python
from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline

# Replace this with the model you want
model_name = "Qwen/Qwen2-1.5B-Instruct"

# Load tokenizer and model
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)

# Set up the text generation pipeline
text_generator = pipeline("text-generation", model=model, tokenizer=tokenizer)

# Example input
prompt = "Explain the importance of large language models."

# Generate output
output = text_generator(prompt, max_length=200, do_sample=True, top_k=50)

print(output[0]['generated_text'])

```

## Qwen

### [Qwen/Qwen2-1.5B-Instruct](https://huggingface.co/Qwen/Qwen2-1.5B-Instruct)

This is a compact instruction-tuned model from the Qwen series. It’s designed for general instruction following, making it versatile for tasks like summarization, question answering, and conversation.  
Though small at 1.5B parameters, it delivers solid performance for lightweight applications.

| Variable              | Value             |
| ----------------------|-------------------|
| Params                | 1.5 Billion       |
| Context Length        | 32k              |
| Use Case             | General-purpose, instruction following |
| Knowledge Cutoff      | 2024             |

---

## deepseek

### [deepseek-ai/DeepSeek-R1-Distill-Qwen-1.5B](https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Qwen-1.5B)

This model is a distilled version of Qwen, optimized for faster inference with lower compute demands. It’s particularly useful when you need decent performance on limited hardware.

| Variable              | Value             |
| ----------------------|-------------------|
| Params                | 671 Million       |
| Context Length        | 128k              |  
| Token Count           | 32,768            |
| Distilled From        | Qwen-1.5B         |
| Strengths             | Speed, Efficiency |
| Knowledge Cutoff      | 2024             |

---

## meta-llama

### [meta-llama/Llama-3.2-1B](https://huggingface.co/meta-llama/Llama-3.2-1B)

Llama 3.2 is part of Meta’s renowned Llama family, known for strong multilingual capabilities and robust performance across a wide range of tasks. Despite being only 1B parameters, it benefits from the advanced training methodologies Meta has applied.

| Variable              | Value             |
| ----------------------|-------------------|
| Params                | 1.23 Billion      |
| Context Length        | 128k              |  
| Token Count           | 9 Trillion        |
| GQA                   | Yes               |
| Shared Embeddings     | Yes               |
| Knowledge Cutoff      | December 2023     |
| Use Case             | Multilingual, general-purpose |
| Strengths             | Balanced accuracy and efficiency |

---

## Others

### [sshleifer/distilbart-cnn-12-6](https://huggingface.co/sshleifer/distilbart-cnn-12-6)

This is a distilled version of BART, optimized for summarization tasks. While smaller, it offers strong performance on text generation and summarization pipelines, especially on news and long documents.

| Variable              | Value             |
| ----------------------|-------------------|
| Params                | 306 Million       |
| Inference Time        | ~307 ms           |
| Task Specialization   | Summarization     |
| Strengths             | Lightweight, fast |

---