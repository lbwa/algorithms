<h1 align="center">Algorithms</h1>

[![test cases](https://github.com/lbwa/algorithms/actions/workflows/rust.yml/badge.svg)](https://github.com/lbwa/algorithms/actions/workflows/rust.yml)

Basic algorithms implementations, written by `TypeScript`, `Golang`, `Rust`.

## Test

- TypeScript

  ```bash
  # using pnpm
  pnpm t

  # Specific test
  pnpm t <TEST_DIRECTORY_NAME>
  ```

- Golang

  ```bash
  go test ./...
  ```

  ```bash
  go test ./<SPECIFIC_FOLDER>
  # eg, go test ./traversal
  #     go test ./sorts
  ```

- Rust

  ```bash
  cargo t
  ```

## Further readings

- [Algorithms, 4th edition](https://algs4.cs.princeton.edu)
- [Introduction to Algorithms, 4th edition](https://a.co/d/hlWQ1Hc)
- [toptal.com - sorting algorithms](https://www.toptal.com/developers/sorting-algorithms)
- [algorithm-visualizer.org](https://algorithm-visualizer.org)
