# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks) and update the config:

```js
// eslint.config.js
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default tseslint.config(
  // other rules...
  {
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
)
```

## Protected Routes Setup

This project includes a protected route configuration in `src/routes/ProtectedRoute.tsx`. To use it:

### 1. Install React Router

```bash
npm install react-router-dom @types/react-router-dom
```

### 2. Setup Authentication

The `ProtectedRoute` component includes a `useAuth` hook that you need to implement based on your authentication system. You can:

- Replace it with a Context Provider
- Connect it to your state management solution (Redux, Zustand, etc.)
- Integrate with your backend authentication API

### 3. Usage Examples

```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin" element={
          <ProtectedRoute requiredRole="admin">
            <AdminPanel />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}
```

### 4. Additional Components

- `RoleGuard` - For conditional rendering based on user roles
- `usePermissions` - Hook for checking permissions in components

### 5. Customization

Update the authentication logic in the `useAuth` hook to match your authentication system:

```tsx
const useAuth = (): AuthState => {
  // Replace with your auth logic
  const token = localStorage.getItem('authToken');
  const [authState, setAuthState] = useState({
    isAuthenticated: !!token,
    isLoading: false,
    user: getUserFromToken(token)
  });
  
  return authState;
};
```
