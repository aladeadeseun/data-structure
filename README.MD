# Data Structures Implementation in Typescript

This repository contains implementations of essential data structures: Binary Tree, Binary Search Tree (BST), Linked List, Set, Stack, and Trie. These data structures are fundamental in computer science and are widely used in algorithms, software development, and competitive programming.

## Data Structures Overview

### 1. Binary Tree

A **Binary Tree** is a tree data structure in which each node has at most two children, referred to as the left child and the right child. Binary trees are widely used in searching and sorting algorithms, as well as in representing hierarchical structures.

#### Features:

- Each node can have at most two children.
- Recursive in nature.
- In-order, Pre-order, and Post-order traversal techniques.

#### Operations:

- Insertion
- Deletion
- Traversal (In-order, Pre-order, Post-order, Level-order, boundary, diagonal)

### 2. Binary Search Tree (BST)

A **Binary Search Tree (BST)** is a special type of binary tree where the value of each node is greater than the values in its left subtree and smaller than the values in its right subtree. BSTs are useful for efficient searching, insertion, and deletion.

#### Features:

- Left child’s value < parent node’s value.
- Right child’s value > parent node’s value.
- Provides efficient search operations.

#### Operations:

- Insertion
- Deletion
- Search
- Traversal (In-order, Pre-order, Post-order)

### 3. Linked List

A **Linked List** is a linear data structure where each element (node) points to the next, forming a sequence. Unlike arrays, linked lists provide dynamic memory allocation and are efficient for insertions and deletions.

#### Types:

- **Singly Linked List**: Each node points to the next node.
- **Doubly Linked List**: Each node points to both the next and the previous node.

#### Operations:

- Insertion (At beginning, end, or middle)
- Deletion (By value or position)
- Search

### 4. Set

A **Set** is a collection data structure that contains only unique elements, typically implemented using hash tables. Sets are commonly used to eliminate duplicates and perform membership checks.

#### Features:

- Unordered collection of unique elements.
- Fast membership checks.
- Supports operations like union, intersection, and difference.

#### Operations:

- Add
- Remove
- Membership testing
- Union, Intersection, Difference

### 5. Stack

A **Stack** is a linear data structure that follows the Last In First Out (LIFO) principle. Stacks are used in various algorithms, particularly for maintaining the call stack in recursion and backtracking.

#### Features:

- Follows LIFO (Last In First Out).
- Supports push (add) and pop (remove) operations.

#### Operations:

- Push
- Pop
- Peek
- IsEmpty

### 6. Trie

A **Trie** (also called a prefix tree) is a tree-like data structure used to store strings. It is particularly useful for tasks like autocomplete and spell checking.

#### Features:

- Used for efficient retrieval of strings.
- Stores strings character by character.
- Each node represents a prefix.

#### Operations:

- Insert
- Search
- Delete
- Autocomplete

## Getting Started

To use the data structures in this repository, clone the repo and run the desired implementation.

```bash
git clone git@github.com:aladeadeseun/data-structure.git
cd data-structure

yarn run dev
```

Feel free to customize the repository.
