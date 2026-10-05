# HOANGGIA STUDIO — Unified Platform Blueprint V1.0

Status: architecture specification, not implemented features. Preserve existing deployed applications.

## Modules
- Dashboard: module status, project entrypoints, release information.
- Design Lab: architecture, interior, landscape, urban planning.
- Edit Lab: furniture, materials, lighting, camera, removal, reference replication, space sync.
- Video Lab: storyboard, shot continuity, camera, character/scene DNA.
- Image Lab: image processing and upscale, distinguishing interpolation from model-based super-resolution.
- Vision: optional browser-side image analysis with capability checks, explicit uncertainty and no fabricated detections.
- Expert Core: versioned rules and conflict resolution; each expert declares inputs, scope, invariants, outputs, validation.
- Asset Library: project references, products, material provenance and permissions.
- Project Memory: opt-in local persistence, export/import, version history; privacy-first.
- Quality Gate: prompt invariants, camera/architecture lock, output validation.
- System Health: smoke tests, diagnostics, build checks and release history.

## Integration contracts
Each module declares id, version, entry URL, capabilities, input/output schema and availability. External apps must not be represented as integrated until data exchange is tested. Shared project manifest should contain schemaVersion, projectId, spaceType, designIntent, sourceAssets (local references only), constraints, expertDecisions, history and provenance. Do not transfer raw files across origins without explicit user action.

## Safe rollout
1. Inventory existing repos, functionality and deployment URLs; record baseline screenshots and smoke tests.
2. Add Studio dashboard behind a feature flag without replacing existing apps.
3. Standardize tokens, branding, Vietnamese labels, PWA icons, cache versions and accessibility.
4. Implement adapter-based navigation and explicit import/export; verify on desktop, tablet and mobile.
5. Add deterministic expert tests, image-size/memory limits and security checks.
6. Deploy only after build, smoke, regression and rollback verification. Never claim AI image analysis without a real verified model.

## Quality gates
- No console errors or missing assets in tested browsers.
- All existing module flows pass regression tests.
- PWA install/update works with cache busting and rollback.
- No secrets in client bundle; no unconsented uploads.
- Keyboard and touch navigation functional; minimum usable text and targets.
- Release notes and verified test evidence for each rollout.

## Priorities
P0: baseline tests, critical defects, backup and rollback.
P1: Studio shell, shared identity/branding, health panel, module registry.
P2: expert schema, vision validation, project portability.
P3: advanced image/video interoperability and automated monitoring.
