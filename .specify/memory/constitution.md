<!--
Sync Impact Report
- Version change: template-draft -> 1.0.0
- Modified principles:
	- Principle 1 (template) -> I. Clean Code First
	- Principle 2 (template) -> II. Simple UX by Default
	- Principle 3 (template) -> III. Responsive Design Is Mandatory
	- Principle 4 (template) -> IV. Zero Automated Testing Policy (NON-NEGOTIABLE)
	- Principle 5 (template) -> V. Minimal Dependencies and Angular SSR/SSG Baseline
- Added sections:
	- Technical Constraints
	- Delivery Workflow
- Removed sections:
	- None
- Templates requiring updates:
	- .specify/templates/plan-template.md: ✅ updated
	- .specify/templates/spec-template.md: ✅ updated
	- .specify/templates/tasks-template.md: ✅ updated
	- .specify/templates/commands/*.md: ✅ not present (no updates required)
	- README.md: ✅ updated
- Follow-up TODOs:
	- None
-->

# Etable Landing Constitution

## Core Principles

### I. Clean Code First
All production code MUST prioritize readability, small focused units, explicit naming,
and low complexity. Dead code, commented-out legacy blocks, and unclear abstractions
MUST NOT be merged. Every change MUST leave touched code at least as clear as before.
Rationale: clear code lowers maintenance cost and reduces regression risk.

### II. Simple UX by Default
User flows MUST minimize steps, choices, and cognitive load. Every screen MUST present
one primary action, clear hierarchy, and plain language labels. Decorative complexity
that does not improve comprehension MUST be removed.
Rationale: simple UX improves task completion and reduces user error.

### III. Responsive Design Is Mandatory
All user-facing pages MUST work on mobile, tablet, and desktop breakpoints without
layout breakage, clipped content, or inaccessible interactions. Responsive behavior MUST
be validated manually in browser responsive modes before merge.
Rationale: consistent cross-device access is a baseline product requirement.

### IV. Zero Automated Testing Policy (NON-NEGOTIABLE)
This project MUST NOT add or run unit tests, integration tests, or end-to-end tests.
Any prior guidance requiring tests is superseded by this constitution. Quality checks
MUST use manual validation and acceptance criteria walkthroughs instead.
Rationale: this repository adopts a documentation and manual-validation-only process.

### V. Minimal Dependencies and Angular SSR/SSG Baseline
New dependencies MUST be avoided unless they provide clear, documented value that cannot
be achieved with existing platform or Angular capabilities. The application baseline
MUST remain Angular SSR/SSG-compatible and aligned with versions declared in package.json,
including @angular/ssr and related Angular packages.
Rationale: fewer dependencies reduce attack surface and upgrade complexity while
preserving deployment architecture consistency.

## Technical Constraints

- Framework and rendering model MUST remain Angular SSR/SSG based on package.json.
- Dependency additions MUST include justification in implementation artifacts.
- Accessibility and responsive behavior MUST be manually validated for changed views.
- Automated test files, test scripts, and test pipelines MUST NOT be introduced.

## Delivery Workflow

- Specifications MUST define user scenarios and manual validation outcomes.
- Implementation plans MUST pass constitution gates before design and before coding.
- Tasks MUST be grouped by user story and include manual validation checkpoints.
- Reviews MUST check clean code quality, UX simplicity, responsive behavior,
	dependency impact, and compliance with the no-testing policy.

## Governance

This constitution supersedes conflicting guidance in templates, prompts, and legacy
project docs. Amendments require: (1) a documented rationale, (2) explicit update of
affected templates/docs, and (3) a version bump using the policy below.

Versioning policy:
- MAJOR: incompatible governance change or principle removal/redefinition.
- MINOR: new principle/section or materially expanded rule.
- PATCH: wording clarifications and non-semantic refinements.

Compliance review expectations:
- Every plan and implementation review MUST include a constitution compliance check.
- Non-compliant work MUST be corrected before merge.
- Exceptions MUST be explicitly documented and approved in writing in the feature docs.

**Version**: 1.0.0 | **Ratified**: 2026-05-10 | **Last Amended**: 2026-05-10
