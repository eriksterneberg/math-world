# Math World Constitution

<!--
Sync Impact Report:
- Version change: Initial → 1.0.0
- This is the initial constitution for Math World
- Principles defined:
  1. Functional Programming First
  2. Python Backend with uv
  3. Backend Testing (NON-NEGOTIABLE)
  4. Frontend Localization (L10N)
  5. Child-Friendly Design
  6. Anti-Engagement-Manipulation
- Templates status: ⚠ pending validation (plan-template.md, spec-template.md, tasks-template.md)
- Follow-up TODOs: Review template consistency after initial setup
-->

## Core Principles

### I. Functional Programming First (NON-NEGOTIABLE)

**MUST** avoid Object-Oriented Programming patterns in all code. **MUST** use Functional Programming paradigm as much as possible. All functions should be small, pure when possible, easily composable, and independently testable.

**Rationale**: Smaller, focused functions reduce complexity, improve reusability, and make testing straightforward.

### II. Python Backend with uv (NON-NEGOTIABLE)

All backend code **MUST** be written in Python. The project **MUST** use the `uv` package manager for all Python dependency management and virtual environment handling.

**Rationale**: Python provides excellent readability and ecosystem support for educational applications. The `uv` package manager ensures fast, reliable dependency resolution and modern Python tooling practices.

### III. Backend Testing (NON-NEGOTIABLE)

Testing is **MANDATORY** for all backend code. Test coverage **MUST** be as close to 100% as possible for all backend functionality. Testing is **NOT REQUIRED** for frontend code.

**Rationale**: Backend logic handles critical educational content and data. High test coverage ensures reliability and correctness. Frontend testing is skipped to reduce overhead while maintaining focus on user experience development speed.

### IV. Frontend Localization (L10N) (NON-NEGOTIABLE)

All frontend components **MUST** consider localization into other languages. All strings shown in user interfaces **MUST** exist in specific JSON or XML files where anyone can easily add a new language.

**Rationale**: Making math education accessible to children worldwide requires easy localization. Separating content from code enables community contributions and rapid language additions.

### V. Child-Friendly Design (NON-NEGOTIABLE)

The user interface **MUST** have a "cute" style appropriate for small children. CSS **MUST** be used extensively for interactive effects (e.g., hover animations, enlarging elements). Interfaces **MUST** be clean and modern without extraneous UI elements.

**Rationale**: Children learn best when engaged with visually appealing, playful interfaces. Clean design prevents cognitive overload while cute styling maintains interest and joy in learning.

### VI. Anti-Engagement-Manipulation (NON-NEGOTIABLE)

The web app **MUST NOT** maximize engagement just for the sake of it. It is **FORBIDDEN** to add:
- Reminders or notifications
- "Streak reward" systems
- Daily login rewards
- Time-pressure mechanics
- Any dark patterns designed to create compulsive behavior

**Rationale**: Children's wellbeing and healthy learning habits take precedence over engagement metrics. Math World exists to provide educational value in a safe, pressure-free environment.

## Technology Stack

### Backend
- **Language**: Python (latest stable version)
- **Package Manager**: uv
- **Testing Framework**: pytest (or equivalent approved by project maintainers)
- **Code Style**: Follow PEP 8 with functional programming emphasis

### Frontend
- **Framework**: To be determined based on project needs
- **Localization Format**: JSON or XML for string resources
- **CSS Approach**: Extensive use of modern CSS for animations and interactive elements

## Development Workflow

### Code Review Requirements
- All backend code changes **MUST** include tests achieving near 100% coverage
- All frontend code **MUST** use localized strings (no hardcoded text in components)
- All code **MUST** follow functional programming patterns
- All PRs **MUST** be reviewed for compliance with constitutional principles

### Quality Gates
- Backend: Tests must pass with high coverage (target: 100%)
- Frontend: Localization files must be complete for all new UI text
- Design: Changes must maintain child-friendly, clean aesthetic
- Anti-patterns: Reviewers must reject any engagement manipulation features

## Governance

This constitution supersedes all other development practices and guidelines. All pull requests and code reviews **MUST** verify compliance with the principles defined herein.

### Amendment Process
Amendments to this constitution require:
1. Documentation of the rationale for change
2. Assessment of impact on existing code and templates
3. Approval from project maintainers
4. Migration plan for any breaking changes

### Version Policy
Constitution follows semantic versioning (MAJOR.MINOR.PATCH):
- **MAJOR**: Backward incompatible principle removals or redefinitions
- **MINOR**: New principles added or material expansions
- **PATCH**: Clarifications, wording improvements, non-semantic refinements

### Compliance Review
Project maintainers will periodically review codebase compliance. Non-compliant code must be refactored or justified with exceptional circumstances documented.

**Version**: 1.0.0 | **Ratified**: 2025-10-25 | **Last Amended**: 2025-10-25
