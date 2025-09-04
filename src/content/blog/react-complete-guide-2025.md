---
title: 'React Complete Guide 2025: Modern Frontend Development'
description: 'Master React development with this comprehensive guide covering components, hooks, state management, routing, testing, performance optimization, and modern React patterns.'
pubDate: 'Sep 08 2025'
heroImage: '../../assets/Lucid_Origin_Minimal_flat_vector_illustration_of_a_web_dashboa_3.jpg'
---

# React Complete Guide 2025: Modern Frontend Development

**React** is the most popular JavaScript library for building user interfaces, developed by Facebook (now Meta). This comprehensive guide covers everything from React fundamentals to advanced patterns, helping you build modern, scalable web applications.

## What is React?

React is a declarative, efficient, and flexible JavaScript library for building user interfaces. It lets you compose complex UIs from small, isolated pieces of code called "components."

### Key Features

- **Component-Based**: Build encapsulated components that manage their own state
- **Declarative**: Describe what the UI should look like for any given state
- **Virtual DOM**: Efficient updates and rendering
- **Unidirectional Data Flow**: Predictable data flow makes debugging easier
- **Rich Ecosystem**: Vast collection of libraries and tools

## Getting Started with React

### Prerequisites

**Required Knowledge:**
- **JavaScript ES6+**: Arrow functions, destructuring, modules
- **HTML/CSS**: Basic web development fundamentals
- **Node.js**: Package management and build tools

**Development Environment:**
- **Node.js**: Version 14 or higher
- **npm/yarn**: Package managers
- **Code Editor**: VS Code with React extensions
- **Browser**: Chrome with React DevTools

### Creating a React App

#### Create React App (CRA)
```bash
# Create new React application
npx create-react-app my-app
cd my-app
npm start

# With TypeScript
npx create-react-app my-app --template typescript
```

#### Vite (Recommended for 2024)
```bash
# Create React app with Vite
npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev

# With TypeScript
npm create vite@latest my-app -- --template react-ts
```

#### Next.js (Full-Stack Framework)
```bash
# Create Next.js app
npx create-next-app@latest my-app
cd my-app
npm run dev
```

### Project Structure

```
my-react-app/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   └── Footer.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   └── About.jsx
│   ├── hooks/
│   │   └── useAuth.js
│   ├── utils/
│   │   └── helpers.js
│   ├── styles/
│   │   └── globals.css
│   ├── App.jsx
│   └── index.js
├── package.json
└── README.md
```

## React Components

### Functional Components

```jsx
// Basic functional component
function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>;
}

// Arrow function component
const Welcome = (props) => {
  return <h1>Hello, {props.name}!</h1>;
};

// With destructuring
const Welcome = ({ name, age }) => {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>You are {age} years old.</p>
    </div>
  );
};

// Export component
export default Welcome;
```

### JSX Fundamentals

```jsx
const UserProfile = ({ user }) => {
  const isLoggedIn = user !== null;
  
  return (
    <div className="user-profile">
      {/* Conditional rendering */}
      {isLoggedIn ? (
        <div>
          <h2>Welcome back, {user.name}!</h2>
          <img src={user.avatar} alt={`${user.name}'s avatar`} />
        </div>
      ) : (
        <div>
          <h2>Please log in</h2>
          <button onClick={() => console.log('Login clicked')}>Login</button>
        </div>
      )}
      
      {/* List rendering */}
      <ul>
        {user?.hobbies?.map((hobby, index) => (
          <li key={index}>{hobby}</li>
        ))}
      </ul>
      
      {/* Inline styles */}
      <div style={{ color: 'blue', fontSize: '16px' }}>
        Styled content
      </div>
    </div>
  );
};
```

### Props and PropTypes

```jsx
import PropTypes from 'prop-types';

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  disabled = false,
  ...props 
}) => {
  const baseClasses = 'btn';
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    danger: 'btn-danger'
  };
  
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

// PropTypes validation
Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger']),
  disabled: PropTypes.bool
};

export default Button;
```

## React Hooks

### useState Hook

```jsx
import { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState({ name: '', email: '' });
  
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(prev => prev - 1);
  
  const updateUser = (field, value) => {
    setUser(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      
      <input
        type="text"
        placeholder="Name"
        value={user.name}
        onChange={(e) => updateUser('name', e.target.value)}
      />
      
      <input
        type="email"
        placeholder="Email"
        value={user.email}
        onChange={(e) => updateUser('email', e.target.value)}
      />
    </div>
  );
};
```

### useEffect Hook

```jsx
import { useState, useEffect } from 'react';

const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Effect with dependency array
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/users/${userId}`);
        if (!response.ok) throw new Error('Failed to fetch user');
        const userData = await response.json();
        setUser(userData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    if (userId) {
      fetchUser();
    }
  }, [userId]); // Re-run when userId changes
  
  // Cleanup effect
  useEffect(() => {
    const timer = setInterval(() => {
      console.log('Timer tick');
    }, 1000);
    
    return () => clearInterval(timer); // Cleanup
  }, []);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>No user found</div>;
  
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
};
```

### Custom Hooks

```jsx
// useLocalStorage hook
import { useState, useEffect } from 'react';

const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });
  
  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };
  
  return [storedValue, setValue];
};

// useFetch hook
const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [url]);
  
  return { data, loading, error };
};

// Usage
const App = () => {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  const { data: users, loading, error } = useFetch('/api/users');
  
  return (
    <div className={`app ${theme}`}>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </button>
      
      {loading && <div>Loading users...</div>}
      {error && <div>Error: {error}</div>}
      {users && (
        <ul>
          {users.map(user => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
```

## State Management

### Context API

```jsx
// Create context
import { createContext, useContext, useReducer } from 'react';

const AuthContext = createContext();

// Auth reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };
    default:
      return state;
  }
};

// Auth provider
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthenticated: false,
    loading: true
  });
  
  const login = async (credentials) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      const user = await response.json();
      dispatch({ type: 'LOGIN', payload: user });
    } catch (error) {
      console.error('Login failed:', error);
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };
  
  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };
  
  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Usage
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};
```

### Redux Toolkit (Modern Redux)

```bash
# Install Redux Toolkit
npm install @reduxjs/toolkit react-redux
```

```jsx
// store/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      
      if (!response.ok) {
        throw new Error('Login failed');
      }
      
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;

// store/index.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer
  }
});

// Usage in component
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, logout } from './store/authSlice';

const LoginForm = () => {
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector(state => state.auth);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const credentials = {
      email: formData.get('email'),
      password: formData.get('password')
    };
    dispatch(loginUser(credentials));
  };
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <input name="email" type="email" required />
      <input name="password" type="password" required />
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};
```

## Routing with React Router

```bash
# Install React Router
npm install react-router-dom
```

```jsx
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Main App with routing
const App = () => {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/products">Products</Link>
        <Link to="/dashboard">Dashboard</Link>
      </nav>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        
        {/* Nested routes */}
        <Route path="/products" element={<ProductsLayout />}>
          <Route index element={<ProductsList />} />
          <Route path=":id" element={<ProductDetail />} />
          <Route path="new" element={<NewProduct />} />
        </Route>
        
        {/* Protected routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        
        {/* Catch-all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

// Products layout with nested routing
import { Outlet } from 'react-router-dom';

const ProductsLayout = () => {
  return (
    <div>
      <h1>Products</h1>
      <nav>
        <Link to="/products">All Products</Link>
        <Link to="/products/new">Add Product</Link>
      </nav>
      <Outlet /> {/* Renders nested routes */}
    </div>
  );
};

// Product detail with URL parameters
import { useParams, useNavigate } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: product, loading } = useFetch(`/api/products/${id}`);
  
  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;
  
  return (
    <div>
      <button onClick={() => navigate(-1)}>Go Back</button>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
    </div>
  );
};
```

## Forms and Validation

### Controlled Components

```jsx
import { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    category: 'general'
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    return newErrors;
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        alert('Message sent successfully!');
        setFormData({ name: '', email: '', message: '', category: 'general' });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      alert('Error sending message: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={errors.name ? 'error' : ''}
        />
        {errors.name && <span className="error-message">{errors.name}</span>}
      </div>
      
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? 'error' : ''}
        />
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>
      
      <div className="form-group">
        <label htmlFor="category">Category:</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="general">General</option>
          <option value="support">Support</option>
          <option value="sales">Sales</option>
        </select>
      </div>
      
      <div className="form-group">
        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          className={errors.message ? 'error' : ''}
        />
        {errors.message && <span className="error-message">{errors.message}</span>}
      </div>
      
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
};
```

### React Hook Form (Recommended)

```bash
npm install react-hook-form
```

```jsx
import { useForm } from 'react-hook-form';

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      message: '',
      category: 'general'
    }
  });
  
  const onSubmit = async (data) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      if (response.ok) {
        alert('Message sent successfully!');
        reset();
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Name:</label>
        <input
          {...register('name', {
            required: 'Name is required',
            minLength: {
              value: 2,
              message: 'Name must be at least 2 characters'
            }
          })}
        />
        {errors.name && <span>{errors.name.message}</span>}
      </div>
      
      <div>
        <label>Email:</label>
        <input
          type="email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Email is invalid'
            }
          })}
        />
        {errors.email && <span>{errors.email.message}</span>}
      </div>
      
      <div>
        <label>Message:</label>
        <textarea
          {...register('message', {
            required: 'Message is required',
            minLength: {
              value: 10,
              message: 'Message must be at least 10 characters'
            }
          })}
        />
        {errors.message && <span>{errors.message.message}</span>}
      </div>
      
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Send'}
      </button>
    </form>
  );
};
```

## Performance Optimization

### React.memo and useMemo

```jsx
import { memo, useMemo, useCallback } from 'react';

// Memoized component
const ExpensiveComponent = memo(({ data, onItemClick }) => {
  console.log('ExpensiveComponent rendered');
  
  const processedData = useMemo(() => {
    return data.map(item => ({
      ...item,
      processed: item.value * 2
    }));
  }, [data]);
  
  return (
    <div>
      {processedData.map(item => (
        <div key={item.id} onClick={() => onItemClick(item.id)}>
          {item.name}: {item.processed}
        </div>
      ))}
    </div>
  );
});

// Parent component with useCallback
const ParentComponent = () => {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  
  // Memoized callback
  const handleItemClick = useCallback((id) => {
    console.log('Item clicked:', id);
  }, []);
  
  // Expensive calculation
  const expensiveValue = useMemo(() => {
    console.log('Calculating expensive value...');
    return data.reduce((sum, item) => sum + item.value, 0);
  }, [data]);
  
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <p>Total: {expensiveValue}</p>
      <ExpensiveComponent data={data} onItemClick={handleItemClick} />
    </div>
  );
};
```

### Code Splitting and Lazy Loading

```jsx
import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Lazy load components
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

// Loading component
const LoadingSpinner = () => (
  <div className="loading-spinner">
    <div>Loading...</div>
  </div>
);

// App with lazy loading
const App = () => {
  return (
    <Router>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

// Dynamic imports with error handling
const LazyComponent = lazy(() => 
  import('./HeavyComponent')
    .catch(() => ({ default: () => <div>Error loading component</div> }))
);
```

### Virtual Scrolling

```jsx
import { FixedSizeList as List } from 'react-window';

const VirtualizedList = ({ items }) => {
  const Row = ({ index, style }) => (
    <div style={style}>
      <div className="list-item">
        <h3>{items[index].title}</h3>
        <p>{items[index].description}</p>
      </div>
    </div>
  );
  
  return (
    <List
      height={600}
      itemCount={items.length}
      itemSize={100}
      width="100%"
    >
      {Row}
    </List>
  );
};
```

## Testing

### Jest and React Testing Library

```bash
# Install testing dependencies
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

```jsx
// Button.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

describe('Button Component', () => {
  test('renders button with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });
  
  test('calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    
    render(<Button onClick={handleClick}>Click me</Button>);
    
    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  
  test('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
  
  test('applies correct variant class', () => {
    render(<Button variant="danger">Delete</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn-danger');
  });
});

// UserProfile.test.jsx
import { render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import UserProfile from './UserProfile';

// Mock API server
const server = setupServer(
  rest.get('/api/users/:id', (req, res, ctx) => {
    return res(
      ctx.json({
        id: 1,
        name: 'John Doe',
        email: 'john@example.com'
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('displays user information', async () => {
  render(<UserProfile userId={1} />);
  
  expect(screen.getByText('Loading...')).toBeInTheDocument();
  
  await waitFor(() => {
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
  });
});

test('displays error message on API failure', async () => {
  server.use(
    rest.get('/api/users/:id', (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );
  
  render(<UserProfile userId={1} />);
  
  await waitFor(() => {
    expect(screen.getByText(/error/i)).toBeInTheDocument();
  });
});
```

## Modern React Patterns

### Compound Components

```jsx
// Modal compound component
const Modal = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null;
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

const ModalHeader = ({ children }) => (
  <div className="modal-header">{children}</div>
);

const ModalBody = ({ children }) => (
  <div className="modal-body">{children}</div>
);

const ModalFooter = ({ children }) => (
  <div className="modal-footer">{children}</div>
);

// Attach sub-components
Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

// Usage
const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
      
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Modal.Header>
          <h2>Confirm Action</h2>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to proceed?</p>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={() => setIsModalOpen(false)}>Cancel</button>
          <button onClick={() => setIsModalOpen(false)}>Confirm</button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
```

### Render Props Pattern

```jsx
// DataFetcher with render props
const DataFetcher = ({ url, children }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [url]);
  
  return children({ data, loading, error });
};

// Usage
const UsersList = () => (
  <DataFetcher url="/api/users">
    {({ data, loading, error }) => {
      if (loading) return <div>Loading...</div>;
      if (error) return <div>Error: {error}</div>;
      
      return (
        <ul>
          {data?.map(user => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      );
    }}
  </DataFetcher>
);
```

## Conclusion

React continues to be the leading library for building user interfaces, with a rich ecosystem and active community. Its component-based architecture, powerful hooks system, and excellent developer experience make it an excellent choice for projects of all sizes.

**Key Takeaways:**
- Master functional components and hooks
- Understand state management patterns
- Implement proper error boundaries and loading states
- Write comprehensive tests for your components
- Optimize performance with memoization and code splitting
- Follow React best practices and patterns
- Stay updated with the latest React features
- Leverage the React ecosystem (Next.js, Gatsby, etc.)

By following this guide and continuing to practice, you'll be well-equipped to build modern, scalable React applications that provide excellent user experiences.

**Next Steps:**
- Explore React frameworks like Next.js or Remix
- Learn about React Server Components
- Practice building real-world applications
- Contribute to open-source React projects
- Stay updated with React's roadmap and new features

---

*Ready to start building with React? Set up your development environment, create your first component, and begin exploring the powerful world of React development.*