# HOANGGIA STUDIO V3.0 — MASTER UNIFIED PLATFORM

**Trạng thái:** Kiến trúc mục tiêu, không phải xác nhận các tính năng đã triển khai. **Nguyên tắc:** Hiểu đúng → Phân tích → Quyết định → Thực thi → Kiểm chứng.

## 1. Phạm vi và phân loại
Năm hệ thống hiện hữu theo định hướng sản phẩm: Design AI, Edit AI, Video AI, Upscale AI, Visual AI. Cần kiểm toán repository và website của từng hệ thống; không suy diễn trạng thái triển khai từ tên gọi. Ba công cụ mở rộng: Plan AI, Material AI, BOQ AI. Project Center là dịch vụ nền tảng, không phải AI độc lập. 3D/CAD Bridge là mô-đun kết nối kỹ thuật.

## 2. Sáu nhóm sản phẩm
1. **Creative Studio:** Design, Edit, Video, Upscale, Visual.
2. **Technical Studio:** Plan, Material, BOQ, 3D/CAD Bridge.
3. **Intelligence Core:** Expert Brain, Vision, Spatial Intelligence, Design Critic, Prompt Compiler, Camera, Lighting, nhận diện nhất quán.
4. **Project & Assets:** Project Memory, Asset Library, Knowledge Library, phiên bản, so sánh, lịch sử, Export Center.
5. **Workflow & Quality:** Workflow Engine, Quality Gate, regression tests, validation, provenance.
6. **System Administration:** Dashboard, Design System, permissions, privacy, security, monitoring, updates, backup and rollback.

## 3. Năng lực cốt lõi và giới hạn
- **Vision:** phân đoạn ảnh, phân loại vùng/vật thể, phát hiện vật liệu/ánh sáng/camera khi mô hình thực tế hỗ trợ; phân biệt quan sát và suy đoán; confidence, manual correction, segmentation masks. Không tự nhận đã đọc ảnh nếu chỉ lấy metadata.
- **Spatial:** tỷ lệ, lưu thông, kích thước, đơn vị mm/cm/m; kích thước ước lượng từ ảnh không được coi là số đo thực.
- **Expert:** khai báo inputs, scope, immutable locks, decision, conflicts, validation, version.
- **Identity:** scene, furniture/product, character and camera continuity across multiple images/video; explicit reference provenance and permissions.
- **Prompt:** deterministic assembly, concise Vietnamese output where appropriate, model-specific adapters, no contradictory locks.
- **CAD/BIM:** capability-based import/export; do not claim native DWG/MAX/Revit fidelity without validated parser and reference tests.
- **BOQ:** estimates must trace to verified quantities, unit prices, assumptions and dates.

## 4. Kiến trúc kỹ thuật
- **Local-first:** static PWA on GitHub Pages; IndexedDB for opt-in local project storage; export/import JSON/ZIP; Canvas/WASM/browser AI only where device capabilities are verified.
- **Module registry:** module id, version, source repo, deployment URL, capabilities, input/output schema, availability and test status.
- **Shared project schema:** schemaVersion, projectId, spaceType, siteContext, sourceAssets, references, designIntent, units, constraints, expertDecisions, camera, materials, history, provenance, privacy flags.
- **Adapters:** connect existing apps through explicit import/export first, then tested data bridges. No cross-origin raw image transfer without consent.
- **Providers:** optional backend for secrets, remote models, cloud sync or GPU; public client code must never embed private API keys. Free-tier limits must be disclosed.
- **Design system:** one versioned logo/icon package, dark luxury tokens, Vietnamese-first labels, responsive layout, accessible font/touch targets and PWA cache strategy.

## 5. UX / Điều hướng
Six main areas: Tổng quan; Xưởng sáng tạo; Trí tuệ AI; Thư viện; Dự án; Hệ thống. Advanced functions live in collapsible panels. Desktop/tablet/mobile have tested navigation and visible status. Do not display fake success or fake model processing.

## 6. Nghiệm thu và vận hành
- Baseline inventory of all five apps, URLs, repository refs, dependencies and feature status: working / experimental / proposed.
- Functional smoke tests and deterministic regression for each expert, source/reference priority, aspect/camera/architecture locks, upload/export, failure recovery.
- Visual tests on Chrome/Edge/Safari and desktop/tablet/mobile; keyboard/touch accessibility.
- Performance budgets for large images, browser memory, loading time; guardrails for unsupported devices.
- Privacy/security review, no secret leakage, consented asset handling, XSS/content sanitization and dependency checks.
- PWA icons, offline/online and cache update tests; release version, changelog and rollback proof.
- GitHub Actions CI checks, scheduled health checks and alerts. Automatically propose safe fixes; merge/deploy only after verified tests and within authorized scope.

## 7. Triển khai không phá hệ thống cũ
**P0** Backup, inventory, smoke/regression baseline, critical fixes and rollback.
**P1** Studio shell, module registry, navigation, branding, responsive PWA and status dashboard.
**P2** Common schemas, project memory, import/export, quality gate, expert rules.
**P3** Verified browser vision, multi-view identity, cross-app workflow and advanced technical tools.
**P4** Optional provider integrations, cloud collaboration, telemetry with consent, sustained monitoring.

## 8. Điều kiện phát hành
No release without: all baseline workflows passing; assets and PWA verified; no critical console/security issues; rollback ready; module statuses honestly labeled; release notes and test evidence. Keep all existing deployments live until migration is explicitly validated.

## 9. Quyết định cần giữ ổn định
Tên sản phẩm: **HOANGGIA STUDIO V3.0**. Ngôn ngữ: tiếng Việt. Giao diện: Dark Luxury, tối giản. Chi phí: miễn phí tối đa, minh bạch chi phí. Một kiến trúc thống nhất, triển khai tăng dần có kiểm chứng.
