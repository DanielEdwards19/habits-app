# Project Structure

This project follows industry-standard best practices for Expo Router applications.

## App Directory Structure

```
app/
├── _layout.tsx          # Root layout defining navigation stack
├── index.tsx            # Entry point that redirects to home screen
├── +not-found.tsx       # 404 error page
├── screens/             # Main app screens
│   └── home.tsx         # Home screen
└── modals/              # Modal screens (full-screen overlays)
    └── add-habit.tsx    # Add habit modal
```

## Key Concepts

### Screens vs Modals
- **screens/** - Regular app screens with standard navigation
- **modals/** - Full-screen modal presentations (overlays)

### File Naming Conventions
- `_layout.tsx` - Layout/navigation container files
- `+not-found.tsx` - Special files start with `+`
- Regular screens use descriptive names (e.g., `home.tsx`, `profile.tsx`)

### Routing
- The app uses Expo Router for file-based routing
- Routes are automatically generated based on file structure
- Example routes:
  - `/screens/home` - Home screen
  - `/modals/add-habit` - Add habit modal

## Navigation Flow
1. User opens app → `index.tsx` redirects to `/screens/home`
2. User taps "Add habit" → Navigates to `/modals/add-habit`
3. Modal closes → Returns to home screen

This structure makes it easy to:
- Find specific screens
- Understand the app's navigation hierarchy
- Add new features in organized folders
- Maintain and scale the application

