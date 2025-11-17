# Conventional Commits Guidelines

## Format

```
type(scope)!: subject
```

- **subject**: imperative, lower case, no trailing period, ≤ 50 chars
- Wrap body/footer at 72 chars
- **scope** is optional; use comma-separated scopes for multiple (scope1,scope2)
- Use "!" when the change is breaking, and add a BREAKING CHANGE footer

## Allowed Types

- **feat**: user-facing feature
- **fix**: bug fix
- **docs**: documentation only
- **style**: formatting/whitespace; no code behavior change
- **refactor**: code change that neither fixes a bug nor adds a feature
- **perf**: performance improvement
- **test**: add or update tests only
- **build**: build system or external dependencies (e.g., npm, msbuild, nuget)
- **ci**: CI config/scripts (e.g., GitHub Actions)
- **chore**: maintenance tasks (no src/test behavior change)
- **revert**: revert a previous commit

## Body

- Explain the what and why, not the how
- Mention context, motivation, and notable trade-offs
- Use bullet points if helpful

## Footer

- **BREAKING CHANGE**: describe the breaking change and migration steps
- **Closes #123**, **Fixes #123**, **Refs #123** (issue references)
- **Co-authored-by**: Name (if applicable)

## Heuristics from diff

- Public API changes or contract changes → add "!" and BREAKING CHANGE footer
- Only package/lockfile/.csproj updates → `chore(deps): …`
- Performance-oriented changes (allocations, Span, caching) → `perf(scope): …`
- Pure renames/moves or extraction without behavior change → `refactor(scope): …`
- Only test files updated → `test(scope): …`
- Only docs/readme/xml comments → `docs(scope): …`
- Pipeline/config (yml) → `ci(scope): …`
- Build scripts/props/targets → `build(scope): …`
- Mixed changes → prefer splitting commits; otherwise pick primary type and explain others in body

## Scopes (prefer consistent, repo-specific)

core, api, domain, infra, ui, data, db, http, auth, logging, config, cli, tests, docs, build, ci, deps

## Style

- No emojis or prefixes like [WIP]
- English only, concise and specific
- Do not include secrets, stack traces, or transient paths

## Examples

### Basic Examples

```
feat(api): add pagination to GET /orders
fix(core): prevent NRE when customer has no address
perf(parser): reduce allocations using ArrayPool
refactor(domain): extract OrderValidator from OrderService
docs(readme): add setup instructions for contributors
test(infra): add integration tests for SqlRepository
build(msbuild): enable deterministic builds
ci(github-actions): cache NuGet packages
chore(deps): bump Serilog to 3.1.0
```

### Breaking Change Example

```
feat(core)!: remove legacy XML config

BREAKING CHANGE: XML-based configuration has been removed. Use appsettings.json.
```

## Template

```
type(scope)!: short imperative subject

Optional longer body explaining what and why. Wrap at 72 chars.

BREAKING CHANGE: details and migration steps
Refs #123
```
