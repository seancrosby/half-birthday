# GEMINI.md - Half Birthday Calculator Website

## Project Overview
A modern, React-based static website hosted on GitHub Pages that calculates traditional and accurate half birthdays using the `half-birthday-calc` library.

## Mandates & Priorities
- **UI/UX:** Modern aesthetic, responsive design, and smooth animations (specifically a "gradual sweep" for result revelation).
- **Tech Stack:** React (TypeScript), Vite, Vanilla CSS.
- **Library:** Use `getTraditionalHalfBirthday()` and `getAccurateHalfBirthday()` from `half-birthday-calc` which is hosted on npmjs.com under the name @seancrosby/half-birthday-calc
- **Deployment:** Automated via GitHub Actions to GitHub Pages.
- **Testing:** Unit tests for core logic and component behavior.

## Core Features
1. **Header:** Large "1/2" and "Calculate your half birthday".
2. **Inputs:**
   - Date picker for the birthday preceding the half birthday.
   - Optional time picker (defaults to 12:00 AM).
3. **Action:** "Compute Half Birthday" button.
4. **Results:** Display both traditional and accurate calculations with a sweep animation.

## Development Workflow
1. **Scaffold:** Initialize React/Vite/TS project.
2. **Implementation:**
   - Integrate `half-birthday-calc`.
   - Build UI components with CSS modules or standard CSS.
   - Implement animation using CSS transitions/animations.
3. **Verification:**
   - Add Vitest for unit testing.
   - Ensure linting and type-checking pass.
4. **CI/CD:** Configure `.github/workflows/deploy.yml` for GitHub Pages.
5. **Documentation:** Comprehensive `README.md` covering installation, usage, testing, and deployment.
