# Architecture Decision Records (ADR)

This directory contains Architecture Decision Records (ADRs) documenting significant architectural and technical decisions made for the Advent of Code repository.

## What is an ADR?

An Architecture Decision Record (ADR) is a document that captures an important architectural decision made along with its context and consequences. ADRs help teams understand:
- Why certain technical choices were made
- What alternatives were considered
- What trade-offs were accepted
- When and by whom decisions were made

## Format

Each ADR follows this structure:
- **Title**: Brief description of the decision
- **Status**: Proposed, Accepted, Deprecated, Superseded
- **Context**: Background and motivation
- **Decision**: The change being proposed or made
- **Consequences**: Expected outcomes (positive and negative)
- **Alternatives**: Other options considered
- **References**: Links to relevant resources

## Index

| # | Title | Status | Date |
|---|-------|--------|------|
| [001](001-use-vitest-for-typescript.md) | Use Vitest for TypeScript Testing | Accepted | 2025-11-17 |

## Contributing

When making significant technical decisions:
1. Create a new ADR in this directory
2. Use the next sequential number
3. Follow the established format
4. Update this index
5. Link related ADRs if applicable

## References

- [ADR GitHub Organization](https://adr.github.io/)
- [Michael Nygard's Original Article](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions)
