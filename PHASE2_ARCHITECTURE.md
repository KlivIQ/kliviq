# Kroviq Studio v1.1 — Phase 2 Architecture

## PART 1: Phase 1 Review

### A. Must Fix Before Phase 2

| # | Issue | Category | Impact |
|---|-------|----------|--------|
| 1 | ProjectContext lost on page refresh (in-memory only) | UX | Users lose sidebar context on F5 |
| 2 | No loading states during API calls | UX | Users see blank tables while fetching |
| 3 | Icon buttons (Edit/Delete) lack `aria-label` | Accessibility | Screen readers can't identify actions |
| 4 | No pagination on list endpoints | Scalability | Will break with 100+ entities |
| 5 | `RuntimeException` for all business errors — no error codes | API Quality | Frontend can't differentiate error types |
| 6 | No `@Transactional` on service methods | Data Integrity | Partial writes possible on failure |
| 7 | Duplicate CRUD patterns across 3 pages (copy-paste) | Maintainability | Will multiply to 8+ pages in Phase 2 |
| 8 | No entity count on parent (Project shows no module count) | UX | Users can't see relationship depth |
| 9 | Toast messages don't distinguish success/error severity | UX | Green toast for errors is confusing |
| 10 | `useEffect` dependency warnings (missing `pid` in some deps) | Code Quality | Can cause stale data |

### B. Can Wait Until Phase 3

| # | Issue | Category |
|---|-------|----------|
| 1 | No soft delete (hard delete only) | Data Safety |
| 2 | No audit trail / change history | Governance |
| 3 | No bulk operations | Efficiency |
| 4 | No keyboard shortcuts | Power Users |
| 5 | No global search | Discovery |
| 6 | No export/import of Studio data | Portability |
| 7 | No websocket for real-time updates | Collaboration |

---

## PART 2: Product Architecture

### User Mental Model

```
"What am I testing?"

Project (STATIM Insurance)
  └── Module (Product Configuration)
       └── Page (Basic Info)
            └── Objects (Product Name, Description, Start Date)
                 └── Test Cases (TC_PC_BASIC_INFO_001)
                      └── Steps (enter, click, verify)
                           └── Test Data (CompanyName=Novac)

→ Generate → Run → Results
```

### Generated Asset Philosophy

Users never think about files. They think about:
- "What page am I testing?"
- "What objects are on this page?"
- "What scenario am I verifying?"
- "What data do I need?"

The **Generated Assets** page is a transparency layer — not the primary workflow.

---

## PART 3: Database Schema

```sql
-- EXISTING (unchanged)
-- projects, modules, execution_profiles

-- NEW: Pages
CREATE TABLE pages (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    module_id BIGINT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(1000),
    icon VARCHAR(50),
    page_group VARCHAR(100),
    display_order INT DEFAULT 0,
    status VARCHAR(20) DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (module_id) REFERENCES modules(id) ON DELETE CASCADE,
    UNIQUE (module_id, name)
);

-- NEW: Elements (Object Repository)
CREATE TABLE elements (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    page_id BIGINT NOT NULL,
    name VARCHAR(255) NOT NULL,
    display_name VARCHAR(255),
    element_type VARCHAR(50) NOT NULL,
    locator_strategy VARCHAR(30) NOT NULL,
    locator_value VARCHAR(2000) NOT NULL,
    action_type VARCHAR(50),
    wait_strategy VARCHAR(30) DEFAULT 'STANDARD',
    description VARCHAR(500),
    tags VARCHAR(500),
    display_order INT DEFAULT 0,
    status VARCHAR(20) DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (page_id) REFERENCES pages(id) ON DELETE CASCADE,
    UNIQUE (page_id, name)
);

-- NEW: Test Cases
CREATE TABLE test_cases (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    module_id BIGINT NOT NULL,
    test_case_id VARCHAR(100) NOT NULL,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(1000),
    priority VARCHAR(20) DEFAULT 'MEDIUM',
    status VARCHAR(20) DEFAULT 'DRAFT',
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (module_id) REFERENCES modules(id) ON DELETE CASCADE,
    UNIQUE (module_id, test_case_id)
);

-- NEW: Test Steps
CREATE TABLE test_steps (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    test_case_id BIGINT NOT NULL,
    step_order INT NOT NULL,
    keyword VARCHAR(10) NOT NULL,
    action VARCHAR(50) NOT NULL,
    target_element_id BIGINT,
    value VARCHAR(2000),
    description VARCHAR(500),
    enabled BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (test_case_id) REFERENCES test_cases(id) ON DELETE CASCADE,
    FOREIGN KEY (target_element_id) REFERENCES elements(id) ON DELETE SET NULL
);

-- NEW: Test Data
CREATE TABLE test_data (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    test_case_id BIGINT NOT NULL,
    data_key VARCHAR(255) NOT NULL,
    data_value VARCHAR(2000),
    data_type VARCHAR(30) DEFAULT 'STRING',
    description VARCHAR(500),
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (test_case_id) REFERENCES test_cases(id) ON DELETE CASCADE,
    UNIQUE (test_case_id, data_key)
);

-- NEW: Generated Assets (tracking)
CREATE TABLE generated_assets (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    project_id BIGINT NOT NULL,
    module_id BIGINT,
    asset_type VARCHAR(50) NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(1000),
    content_hash VARCHAR(64),
    status VARCHAR(20) DEFAULT 'IN_SYNC',
    generated_at TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (module_id) REFERENCES modules(id) ON DELETE SET NULL
);

-- INDEXES
CREATE INDEX idx_pages_module ON pages(module_id);
CREATE INDEX idx_elements_page ON elements(page_id);
CREATE INDEX idx_elements_status ON elements(status);
CREATE INDEX idx_test_cases_module ON test_cases(module_id);
CREATE INDEX idx_test_steps_case ON test_steps(test_case_id);
CREATE INDEX idx_test_data_case ON test_data(test_case_id);
CREATE INDEX idx_generated_assets_project ON generated_assets(project_id);
```

### Entity Relationships

```
Project 1──* Module
Project 1──* ExecutionProfile
Project 1──* GeneratedAsset

Module 1──* Page
Module 1──* TestCase

Page 1──* Element

TestCase 1──* TestStep
TestCase 1──* TestData

TestStep *──1 Element (nullable FK — step can reference object)

GeneratedAsset *──1 Module (nullable — project-level assets)
```

### Key Design Decision: TestStep → Element FK

Test steps reference elements directly by FK. This enables:
- Auto-update step text when element is renamed
- Impact analysis ("which test cases use this object?")
- Validation ("step references deleted object")
- AI: suggest steps based on element type

---

## PART 4: Entity Model

### Enums

```java
enum ElementType { INPUT, BUTTON, LINK, DROPDOWN, CHECKBOX, RADIO, TOGGLE, DATE_PICKER, TABLE, TEXT, CONTAINER, UPLOAD, OTHER }
enum LocatorStrategy { XPATH, CSS, ID, NAME, CLASS, TAG, LINK_TEXT, PARTIAL_LINK }
enum ActionType { CLICK, TYPE, SELECT, CHECK, UNCHECK, UPLOAD, WAIT, VERIFY, HOVER, CLEAR, SCROLL }
enum WaitStrategy { STANDARD, SHORT, MEDIUM, LONG, NONE }
enum StepKeyword { GIVEN, WHEN, THEN, AND, BUT }
enum StepAction { ENTER, CLICK, SELECT, VERIFY, WAIT, NAVIGATE, LOG, UPLOAD, CHECK, UNCHECK, HOVER, CLEAR }
enum TestCaseStatus { DRAFT, READY, IN_REVIEW, APPROVED, DEPRECATED }
enum AssetType { FEATURE_FILE, CONSTANTS_JAVA, TEST_DATA_JSON, RUN_MANAGER_JSON }
enum AssetStatus { IN_SYNC, OUT_OF_SYNC, NEEDS_REGENERATION, ERROR }
enum DataType { STRING, NUMBER, BOOLEAN, DATE, EMAIL, PHONE, URL, PASSWORD, CUSTOM }
```

---

## PART 5: API Design

### Pages

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/modules/{moduleId}/pages` | List pages (with element count) |
| POST | `/api/modules/{moduleId}/pages` | Create page |
| GET | `/api/pages/{id}` | Get page with elements |
| PUT | `/api/pages/{id}` | Update page |
| DELETE | `/api/pages/{id}` | Delete page (cascades elements) |

### Elements (Object Repository)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/pages/{pageId}/elements` | List elements |
| POST | `/api/pages/{pageId}/elements` | Create element |
| GET | `/api/elements/{id}` | Get element |
| PUT | `/api/elements/{id}` | Update element |
| DELETE | `/api/elements/{id}` | Delete element |
| GET | `/api/modules/{moduleId}/elements` | All elements in module (flat) |
| GET | `/api/elements/{id}/usage` | Test cases using this element |

### Test Cases

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/modules/{moduleId}/test-cases` | List test cases |
| POST | `/api/modules/{moduleId}/test-cases` | Create test case |
| GET | `/api/test-cases/{id}` | Get test case with steps + data |
| PUT | `/api/test-cases/{id}` | Update test case |
| DELETE | `/api/test-cases/{id}` | Delete test case |

### Test Steps

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/test-cases/{id}/steps` | List steps (ordered) |
| POST | `/api/test-cases/{id}/steps` | Add step |
| PUT | `/api/test-cases/{id}/steps` | Batch update (reorder) |
| PUT | `/api/steps/{id}` | Update single step |
| DELETE | `/api/steps/{id}` | Delete step |

### Test Data

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/test-cases/{id}/data` | Get all data entries |
| POST | `/api/test-cases/{id}/data` | Add data entry |
| PUT | `/api/data/{id}` | Update data entry |
| DELETE | `/api/data/{id}` | Delete data entry |

### Generated Assets

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/projects/{id}/assets` | List all generated assets |
| POST | `/api/modules/{id}/generate` | Generate all assets for module |
| POST | `/api/projects/{id}/generate-all` | Generate all assets for project |
| GET | `/api/assets/{id}/preview` | Preview asset content |
| POST | `/api/assets/{id}/download` | Download asset file |
| POST | `/api/assets/{id}/regenerate` | Regenerate single asset |

### Pagination & Filtering (all list endpoints)

```
GET /api/modules/{id}/elements?page=0&size=20&sort=name,asc&search=login&status=ACTIVE
```

Response envelope:
```json
{
  "content": [...],
  "page": 0,
  "size": 20,
  "totalElements": 47,
  "totalPages": 3
}
```

---

## PART 6: Navigation Structure

```
Sidebar:
├── Dashboard
├── Projects
│
├── ─── [Active Project] ───
├── Modules
├── Pages
├── Object Repository
├── Test Cases
├── Test Data
├── Execution Profiles
├── Generated Assets
│
└── Settings
```

### Breadcrumbs
Every page shows: `Project > Module > Page > Element` contextual breadcrumb.

### Context
- Selecting a Project sets project context
- Selecting a Module sets module context
- Pages, Objects, Test Cases are scoped to active module

---

## PART 7: UI Wireframe Descriptions

### Pages Screen
- **Header**: "Pages" + search bar + filter dropdown (group, status) + "New Page" button
- **Table**: Icon | Name | Group | Objects (count) | Test Cases (count) | Status badge | Actions
- **Empty state**: Illustration + "Create your first page to define your application structure"
- **Dialog**: Name, Description, Group (autocomplete), Icon picker, Status dropdown

### Object Repository Screen
- **Layout**: Split pane — left tree (modules → pages), right table (elements)
- **Table columns**: Name | Type (badge) | Strategy | Value (truncated) | Action | Status | Actions menu
- **Toolbar**: Search | Filter by type | Filter by status | Bulk actions dropdown
- **Preview panel**: Bottom drawer showing generated `Constants.java` preview (read-only Monaco)
- **Empty state per page**: "Add objects to represent the interactive elements on this page"

### Test Case Designer Screen
- **Layout**: Left panel (test case list), Right panel (step editor)
- **Step editor**: Drag-handle | # | Keyword dropdown | Action dropdown | Object selector | Value field | ⋮ menu
- **Step actions menu**: Duplicate, Disable/Enable, Delete, Move to group
- **Bottom bar**: "Add Step" button, "Preview Feature" button
- **Data tab**: Inline key-value editor below steps

### Generated Assets Screen
- **Cards grid**: One card per generated file
- **Card content**: File icon | File name | Type badge | Status indicator (🟢/🟡/🔴) | Last generated timestamp
- **Card actions**: Preview | Download | Regenerate
- **Provenance**: Click card → shows source entities (which pages, test cases generated this)
- **Bulk actions**: "Generate All" | "Download All" | "Check Sync Status"

---

## PART 8: Component Hierarchy

### Frontend Folder Structure

```
src/
├── api/
│   ├── axiosClient.ts
│   ├── projects.ts
│   ├── modules.ts
│   ├── pages.ts
│   ├── elements.ts
│   ├── testCases.ts
│   ├── testSteps.ts
│   ├── testData.ts
│   ├── profiles.ts
│   ├── assets.ts
│   └── dashboard.ts
├── components/
│   ├── layout/
│   │   ├── AppShell.tsx
│   │   ├── Sidebar.tsx
│   │   ├── TopBar.tsx
│   │   └── Breadcrumbs.tsx
│   ├── shared/
│   │   ├── DataTable.tsx          # Reusable table with sort/filter/pagination
│   │   ├── FormDialog.tsx         # Reusable CRUD dialog
│   │   ├── ConfirmDialog.tsx
│   │   ├── PageHeader.tsx         # Title + search + actions
│   │   ├── EmptyState.tsx
│   │   ├── LoadingOverlay.tsx
│   │   ├── StatusBadge.tsx
│   │   ├── SearchBar.tsx
│   │   ├── FilterPanel.tsx
│   │   ├── ActionMenu.tsx
│   │   ├── EntitySelector.tsx     # Dropdown with search for selecting elements
│   │   ├── SplitPane.tsx
│   │   ├── PreviewPanel.tsx       # Monaco readonly viewer
│   │   └── JsonViewer.tsx
│   └── domain/
│       ├── StepEditor.tsx         # Single step row with drag handle
│       ├── StepList.tsx           # Drag-and-drop step list
│       ├── ObjectTree.tsx         # Module → Page tree navigation
│       ├── AssetCard.tsx          # Generated asset card
│       └── KeyValueEditor.tsx     # Test data key-value rows
├── pages/
│   ├── DashboardPage.tsx
│   ├── ProjectsPage.tsx
│   ├── ModulesPage.tsx
│   ├── PagesPage.tsx
│   ├── ObjectRepositoryPage.tsx
│   ├── TestCasesPage.tsx
│   ├── TestDataPage.tsx
│   ├── ExecutionProfilesPage.tsx
│   ├── GeneratedAssetsPage.tsx
│   └── SettingsPage.tsx
├── context/
│   ├── ProjectContext.tsx
│   ├── ModuleContext.tsx
│   └── ToastContext.tsx
├── hooks/
│   ├── useApi.ts                  # Generic fetch hook with loading/error states
│   ├── usePagination.ts
│   └── useDebounce.ts
├── types/
│   └── index.ts
├── utils/
│   ├── formatters.ts
│   └── validators.ts
├── App.tsx
├── main.tsx
└── theme.ts
```

### Backend Package Structure

```
com.kroviq.studio/
├── KroviqStudioApplication.java
├── config/
│   ├── CorsConfig.java
│   ├── GlobalExceptionHandler.java
│   └── JacksonConfig.java
├── entity/
│   ├── Project.java
│   ├── Module.java
│   ├── ExecutionProfile.java
│   ├── Page.java
│   ├── Element.java
│   ├── TestCase.java
│   ├── TestStep.java
│   ├── TestData.java
│   └── GeneratedAsset.java
├── repository/
│   ├── (9 repository interfaces)
├── service/
│   ├── ProjectService.java
│   ├── ModuleService.java
│   ├── ExecutionProfileService.java
│   ├── PageService.java
│   ├── ElementService.java
│   ├── TestCaseService.java
│   ├── TestStepService.java
│   ├── TestDataService.java
│   ├── GeneratedAssetService.java
│   └── RunManagerGenerator.java
├── generator/
│   ├── ConstantsGenerator.java
│   ├── FeatureFileGenerator.java
│   ├── TestDataJsonGenerator.java
│   └── AssetOrchestrator.java
├── controller/
│   ├── (10 controllers)
├── dto/
│   ├── (DTOs per entity + response envelopes)
└── enums/
    ├── ElementType.java
    ├── LocatorStrategy.java
    ├── ActionType.java
    ├── StepKeyword.java
    ├── TestCaseStatus.java
    ├── AssetType.java
    └── DataType.java
```

---

## PART 9: Phase Breakdown

### Phase 2A — Foundation Fixes + Pages (Week 1)
- Fix Phase 1 "Must Fix" items (context persistence, loading states, aria-labels, transactions)
- Extract reusable DataTable, FormDialog, PageHeader, EmptyState
- Implement Page entity (backend + frontend)
- Add breadcrumbs component

### Phase 2B — Object Repository (Week 2)
- Implement Element entity (backend)
- Build Object Repository page (split pane: tree + table)
- Element CRUD with type/strategy/action dropdowns
- Search + filter by type/status
- Preview Constants.java (read-only)

### Phase 2C — Test Case Designer (Week 3)
- Implement TestCase + TestStep entities (backend)
- Build Test Case list page
- Build Step Editor (drag-and-drop, keyword/action/object/value)
- Step → Element FK resolution
- Preview Feature file (read-only)

### Phase 2D — Test Data + Generated Assets (Week 4)
- Implement TestData entity (backend)
- Build inline key-value editor
- Implement generators (Constants, Feature, TestData JSON)
- Build Generated Assets page (cards, preview, download, status tracking)
- Sync status detection

---

## PART 10: Acceptance Criteria

| # | Criterion |
|---|-----------|
| 1 | User can create/manage Pages under a Module |
| 2 | User can create/manage Elements under a Page (Object Repository) |
| 3 | Object Repository shows split-pane tree + table layout |
| 4 | User can create Test Cases with unique test_case_id |
| 5 | User can visually design test steps (keyword + action + object + value) |
| 6 | Steps support drag-and-drop reordering |
| 7 | Steps reference Elements via selector (not free text) |
| 8 | User can define key-value test data per test case |
| 9 | "Generate" produces Constants.java matching Kroviq Core format |
| 10 | "Generate" produces .feature file matching Kroviq Core format |
| 11 | "Generate" produces test data JSON matching Kroviq Core format |
| 12 | Generated Assets page shows all outputs with sync status |
| 13 | Preview shows generated code without downloading |
| 14 | All pages have loading states, empty states, and error handling |
| 15 | Navigation breadcrumbs show full context path |
| 16 | E2E: Create Page → Add Objects → Create Test Case → Design Steps → Generate Assets |

---

## PART 11: Development Estimate

| Phase | Scope | Duration |
|-------|-------|----------|
| 2A | Fixes + Pages + Reusable Components | 4-5 days |
| 2B | Object Repository (split pane + tree + CRUD) | 5-6 days |
| 2C | Test Case Designer (steps + drag-drop + element FK) | 5-6 days |
| 2D | Test Data + Generators + Asset Tracking | 4-5 days |
| **Total** | | **~18-22 days** |

---

## PART 12: Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|-----------|
| Drag-and-drop complexity | High | Use `@dnd-kit/sortable` — proven library, minimal bundle |
| Split pane performance with large trees | Medium | Virtualize tree nodes, lazy-load elements per page |
| Step → Element FK integrity | Medium | ON DELETE SET NULL + UI warning for orphaned steps |
| Generator format drift from Kroviq Core | High | Integration test: generate → parse → validate against Core format |
| Feature creep (AI, import, etc.) | High | Strict scope gate — only items in acceptance criteria |

---

## PART 13: Recommendations

1. **Extract shared components FIRST** (Phase 2A) — prevents 8 pages of copy-paste
2. **Add `ModuleContext`** alongside ProjectContext — most pages need both
3. **Persist context in localStorage** — prevents F5 data loss
4. **Add `@Transactional` to all service write methods** — before adding more entities
5. **Use Spring Data JPA projections** for list queries (avoid N+1 on counts)
6. **Add pagination to ALL list APIs now** — retrofitting later is painful
7. **Step action vocabulary should map to Kroviq Core's step-catalog.json** — ensures generated steps are valid
8. **Element `name` should auto-generate UPPER_SNAKE from `displayName`** — users type "Product Name", system stores "PRODUCT_NAME"
9. **Test data `data_key` should auto-prefix with TD_** — matches Kroviq Core convention

### AI Readiness Notes

Every entity has:
- `description` field (natural language input for AI)
- `tags` or `status` for classification
- Proper FK relationships for graph traversal
- Audit timestamps for change detection

Future AI capabilities can:
- Suggest elements from page URL scan (fill Object Repository)
- Generate test steps from test case description
- Generate test data from element types
- Detect out-of-sync assets from timestamp comparison
- Recommend missing test coverage from page → test case gaps
