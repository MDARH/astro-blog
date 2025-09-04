---
title: 'Vue.js Complete Guide 2025: Progressive JavaScript Framework'
description: 'Master Vue.js development with this comprehensive guide covering Vue 3, Composition API, state management with Pinia, routing, testing, and modern Vue.js patterns.'
pubDate: 'Sep 09 2025'
heroImage: '../../assets/Lucid_Origin_Flat_minimal_illustration_of_the_WordPress_logo_a_3.jpg'
---

# Vue.js Complete Guide 2025: Progressive JavaScript Framework

**Vue.js** is a progressive JavaScript framework for building user interfaces. Known for its gentle learning curve, excellent documentation, and powerful features, Vue.js has become one of the most popular frontend frameworks. This comprehensive guide covers Vue 3, the Composition API, and modern Vue.js development practices.

## What is Vue.js?

Vue.js is a progressive framework that can be incrementally adopted. It's designed to be approachable for beginners while being powerful enough for complex applications.

### Key Features

- **Progressive**: Can be adopted incrementally
- **Reactive**: Efficient reactivity system
- **Component-Based**: Reusable component architecture
- **Versatile**: Works for libraries and full-featured SPAs
- **Performant**: Small size and optimized virtual DOM
- **Approachable**: Easy to learn and use

### Vue 3 Improvements

- **Composition API**: Better logic reuse and TypeScript support
- **Multiple Root Elements**: Fragments support
- **Better Performance**: Smaller bundle size and faster rendering
- **Improved TypeScript Support**: Better type inference
- **New Built-in Components**: Teleport, Suspense

## Getting Started with Vue.js

### Prerequisites

**Required Knowledge:**
- **JavaScript ES6+**: Modern JavaScript features
- **HTML/CSS**: Web development fundamentals
- **Node.js**: For build tools and package management

**Development Environment:**
- **Node.js**: Version 16 or higher
- **npm/yarn**: Package managers
- **Vue DevTools**: Browser extension for debugging
- **VS Code**: With Vetur or Volar extension

### Installation Methods

#### CDN (Quick Start)
```html
<!DOCTYPE html>
<html>
<head>
  <title>Vue App</title>
  <script src="https://unpkg.com/vue@next"></script>
</head>
<body>
  <div id="app">
    <h1>{{ message }}</h1>
    <button @click="count++">Count: {{ count }}</button>
  </div>
  
  <script>
    const { createApp, ref } = Vue;
    
    createApp({
      setup() {
        const message = ref('Hello Vue 3!');
        const count = ref(0);
        
        return {
          message,
          count
        };
      }
    }).mount('#app');
  </script>
</body>
</html>
```

#### Create Vue App (Recommended)
```bash
# Create new Vue project
npm create vue@latest my-vue-app
cd my-vue-app
npm install
npm run dev

# With specific features
npm create vue@latest my-vue-app -- --typescript --router --pinia
```

#### Vite (Fast Development)
```bash
# Create Vue app with Vite
npm create vite@latest my-vue-app -- --template vue
cd my-vue-app
npm install
npm run dev

# With TypeScript
npm create vite@latest my-vue-app -- --template vue-ts
```

### Project Structure

```
my-vue-app/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── HelloWorld.vue
│   │   └── TheHeader.vue
│   ├── views/
│   │   ├── Home.vue
│   │   └── About.vue
│   ├── router/
│   │   └── index.js
│   ├── stores/
│   │   └── counter.js
│   ├── assets/
│   │   └── styles.css
│   ├── App.vue
│   └── main.js
├── package.json
└── vite.config.js
```

## Vue Components

### Single File Components (SFC)

```vue
<!-- UserProfile.vue -->
<template>
  <div class="user-profile">
    <img :src="user.avatar" :alt="user.name" class="avatar" />
    <h2>{{ user.name }}</h2>
    <p>{{ user.email }}</p>
    
    <div class="stats">
      <div class="stat">
        <span class="label">Posts:</span>
        <span class="value">{{ user.postsCount }}</span>
      </div>
      <div class="stat">
        <span class="label">Followers:</span>
        <span class="value">{{ formatNumber(user.followers) }}</span>
      </div>
    </div>
    
    <button @click="followUser" :disabled="isFollowing">
      {{ isFollowing ? 'Following...' : 'Follow' }}
    </button>
  </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  name: 'UserProfile',
  props: {
    user: {
      type: Object,
      required: true,
      validator: (user) => {
        return user && user.name && user.email;
      }
    }
  },
  emits: ['follow'],
  setup(props, { emit }) {
    const isFollowing = ref(false);
    
    const formatNumber = (num) => {
      if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
      } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
      }
      return num.toString();
    };
    
    const followUser = async () => {
      isFollowing.value = true;
      try {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
        emit('follow', props.user.id);
      } catch (error) {
        console.error('Failed to follow user:', error);
      } finally {
        isFollowing.value = false;
      }
    };
    
    return {
      isFollowing,
      formatNumber,
      followUser
    };
  }
};
</script>

<style scoped>
.user-profile {
  max-width: 300px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  text-align: center;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
}

.stats {
  display: flex;
  justify-content: space-around;
  margin: 15px 0;
}

.stat {
  display: flex;
  flex-direction: column;
}

.label {
  font-size: 12px;
  color: #666;
}

.value {
  font-weight: bold;
  font-size: 16px;
}

button {
  background: #42b883;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
```

### Composition API vs Options API

#### Options API (Vue 2 Style)
```vue
<template>
  <div>
    <h1>{{ title }}</h1>
    <p>Count: {{ count }}</p>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Counter App',
      count: 0
    };
  },
  computed: {
    doubleCount() {
      return this.count * 2;
    }
  },
  methods: {
    increment() {
      this.count++;
    },
    decrement() {
      this.count--;
    }
  },
  mounted() {
    console.log('Component mounted');
  }
};
</script>
```

#### Composition API (Vue 3 Style)
```vue
<template>
  <div>
    <h1>{{ title }}</h1>
    <p>Count: {{ count }}</p>
    <p>Double: {{ doubleCount }}</p>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';

export default {
  setup() {
    const title = ref('Counter App');
    const count = ref(0);
    
    const doubleCount = computed(() => count.value * 2);
    
    const increment = () => {
      count.value++;
    };
    
    const decrement = () => {
      count.value--;
    };
    
    onMounted(() => {
      console.log('Component mounted');
    });
    
    return {
      title,
      count,
      doubleCount,
      increment,
      decrement
    };
  }
};
</script>
```

#### Script Setup (Simplified Composition API)
```vue
<template>
  <div>
    <h1>{{ title }}</h1>
    <p>Count: {{ count }}</p>
    <p>Double: {{ doubleCount }}</p>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const title = ref('Counter App');
const count = ref(0);

const doubleCount = computed(() => count.value * 2);

const increment = () => {
  count.value++;
};

const decrement = () => {
  count.value--;
};

onMounted(() => {
  console.log('Component mounted');
});
</script>
```

## Reactivity System

### Reactive References

```vue
<script setup>
import { ref, reactive, computed, watch, watchEffect } from 'vue';

// Primitive values
const count = ref(0);
const message = ref('Hello');

// Objects and arrays
const user = reactive({
  name: 'John',
  email: 'john@example.com',
  preferences: {
    theme: 'dark',
    notifications: true
  }
});

const todos = reactive([
  { id: 1, text: 'Learn Vue', completed: false },
  { id: 2, text: 'Build an app', completed: false }
]);

// Computed properties
const doubleCount = computed(() => count.value * 2);
const completedTodos = computed(() => 
  todos.filter(todo => todo.completed)
);

// Watchers
watch(count, (newValue, oldValue) => {
  console.log(`Count changed from ${oldValue} to ${newValue}`);
});

// Watch multiple sources
watch([count, message], ([newCount, newMessage], [oldCount, oldMessage]) => {
  console.log('Multiple values changed');
});

// Watch object properties
watch(
  () => user.preferences.theme,
  (newTheme) => {
    console.log('Theme changed to:', newTheme);
  }
);

// Watch effect (automatic dependency tracking)
watchEffect(() => {
  console.log(`Count is ${count.value} and message is ${message.value}`);
});

// Methods
const addTodo = (text) => {
  todos.push({
    id: Date.now(),
    text,
    completed: false
  });
};

const toggleTodo = (id) => {
  const todo = todos.find(t => t.id === id);
  if (todo) {
    todo.completed = !todo.completed;
  }
};
</script>
```

### Composables (Custom Hooks)

```js
// composables/useCounter.js
import { ref, computed } from 'vue';

export function useCounter(initialValue = 0) {
  const count = ref(initialValue);
  
  const increment = () => {
    count.value++;
  };
  
  const decrement = () => {
    count.value--;
  };
  
  const reset = () => {
    count.value = initialValue;
  };
  
  const isEven = computed(() => count.value % 2 === 0);
  
  return {
    count,
    increment,
    decrement,
    reset,
    isEven
  };
}

// composables/useFetch.js
import { ref, watchEffect } from 'vue';

export function useFetch(url) {
  const data = ref(null);
  const error = ref(null);
  const loading = ref(false);
  
  const fetchData = async () => {
    loading.value = true;
    error.value = null;
    
    try {
      const response = await fetch(url.value || url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      data.value = await response.json();
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };
  
  watchEffect(() => {
    if (url.value || url) {
      fetchData();
    }
  });
  
  return {
    data,
    error,
    loading,
    refetch: fetchData
  };
}

// Usage in component
<script setup>
import { useCounter } from '@/composables/useCounter';
import { useFetch } from '@/composables/useFetch';

const { count, increment, decrement, isEven } = useCounter(10);
const { data: users, loading, error } = useFetch('/api/users');
</script>
```

## Vue Router

### Installation and Setup

```bash
npm install vue-router@4
```

```js
// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import About from '@/views/About.vue';
import UserProfile from '@/views/UserProfile.vue';
import NotFound from '@/views/NotFound.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/users/:id',
    name: 'UserProfile',
    component: UserProfile,
    props: true
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/views/Admin.vue'), // Lazy loading
    meta: { requiresAuth: true }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Navigation guards
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next('/login');
  } else {
    next();
  }
});

function isAuthenticated() {
  return localStorage.getItem('token') !== null;
}

export default router;

// main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App);
app.use(router);
app.mount('#app');
```

### Router Usage in Components

```vue
<template>
  <div>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
      <router-link :to="{ name: 'UserProfile', params: { id: 123 } }">
        User Profile
      </router-link>
    </nav>
    
    <router-view />
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import { computed } from 'vue';

const router = useRouter();
const route = useRoute();

// Programmatic navigation
const goToUser = (userId) => {
  router.push({ name: 'UserProfile', params: { id: userId } });
};

const goBack = () => {
  router.go(-1);
};

// Access route parameters
const userId = computed(() => route.params.id);
const query = computed(() => route.query);
</script>
```

### Nested Routes

```js
// router/index.js
const routes = [
  {
    path: '/users',
    component: UsersLayout,
    children: [
      {
        path: '',
        component: UsersList
      },
      {
        path: ':id',
        component: UserProfile
      },
      {
        path: ':id/edit',
        component: UserEdit
      }
    ]
  }
];
```

```vue
<!-- UsersLayout.vue -->
<template>
  <div class="users-layout">
    <aside>
      <nav>
        <router-link to="/users">All Users</router-link>
        <router-link to="/users/new">Add User</router-link>
      </nav>
    </aside>
    
    <main>
      <router-view />
    </main>
  </div>
</template>
```

## State Management with Pinia

### Installation and Setup

```bash
npm install pinia
```

```js
// main.js
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.mount('#app');
```

### Creating Stores

```js
// stores/auth.js
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref(null);
  const token = ref(localStorage.getItem('token'));
  const loading = ref(false);
  
  // Getters
  const isAuthenticated = computed(() => !!token.value);
  const userName = computed(() => user.value?.name || 'Guest');
  
  // Actions
  const login = async (credentials) => {
    loading.value = true;
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      
      if (!response.ok) {
        throw new Error('Login failed');
      }
      
      const data = await response.json();
      user.value = data.user;
      token.value = data.token;
      localStorage.setItem('token', data.token);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      loading.value = false;
    }
  };
  
  const logout = () => {
    user.value = null;
    token.value = null;
    localStorage.removeItem('token');
  };
  
  const fetchUser = async () => {
    if (!token.value) return;
    
    try {
      const response = await fetch('/api/user', {
        headers: { Authorization: `Bearer ${token.value}` }
      });
      
      if (response.ok) {
        user.value = await response.json();
      }
    } catch (error) {
      console.error('Failed to fetch user:', error);
    }
  };
  
  return {
    user,
    token,
    loading,
    isAuthenticated,
    userName,
    login,
    logout,
    fetchUser
  };
});

// stores/todos.js
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useTodosStore = defineStore('todos', () => {
  const todos = ref([]);
  const filter = ref('all'); // 'all', 'active', 'completed'
  
  const filteredTodos = computed(() => {
    switch (filter.value) {
      case 'active':
        return todos.value.filter(todo => !todo.completed);
      case 'completed':
        return todos.value.filter(todo => todo.completed);
      default:
        return todos.value;
    }
  });
  
  const completedCount = computed(() => 
    todos.value.filter(todo => todo.completed).length
  );
  
  const addTodo = (text) => {
    todos.value.push({
      id: Date.now(),
      text,
      completed: false
    });
  };
  
  const toggleTodo = (id) => {
    const todo = todos.value.find(t => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
    }
  };
  
  const removeTodo = (id) => {
    const index = todos.value.findIndex(t => t.id === id);
    if (index > -1) {
      todos.value.splice(index, 1);
    }
  };
  
  const clearCompleted = () => {
    todos.value = todos.value.filter(todo => !todo.completed);
  };
  
  return {
    todos,
    filter,
    filteredTodos,
    completedCount,
    addTodo,
    toggleTodo,
    removeTodo,
    clearCompleted
  };
});
```

### Using Stores in Components

```vue
<template>
  <div>
    <div v-if="authStore.isAuthenticated">
      <h1>Welcome, {{ authStore.userName }}!</h1>
      <button @click="authStore.logout">Logout</button>
    </div>
    
    <div v-else>
      <form @submit.prevent="handleLogin">
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <button type="submit" :disabled="authStore.loading">
          {{ authStore.loading ? 'Logging in...' : 'Login' }}
        </button>
      </form>
    </div>
    
    <!-- Todos Section -->
    <div class="todos">
      <h2>Todos ({{ todosStore.completedCount }}/{{ todosStore.todos.length }})</h2>
      
      <form @submit.prevent="addTodo">
        <input v-model="newTodo" placeholder="Add a todo" />
        <button type="submit">Add</button>
      </form>
      
      <div class="filters">
        <button 
          v-for="filterOption in ['all', 'active', 'completed']"
          :key="filterOption"
          @click="todosStore.filter = filterOption"
          :class="{ active: todosStore.filter === filterOption }"
        >
          {{ filterOption }}
        </button>
      </div>
      
      <ul>
        <li v-for="todo in todosStore.filteredTodos" :key="todo.id">
          <input 
            type="checkbox" 
            :checked="todo.completed"
            @change="todosStore.toggleTodo(todo.id)"
          />
          <span :class="{ completed: todo.completed }">{{ todo.text }}</span>
          <button @click="todosStore.removeTodo(todo.id)">Remove</button>
        </li>
      </ul>
      
      <button @click="todosStore.clearCompleted">Clear Completed</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useTodosStore } from '@/stores/todos';

const authStore = useAuthStore();
const todosStore = useTodosStore();

const email = ref('');
const password = ref('');
const newTodo = ref('');

const handleLogin = async () => {
  try {
    await authStore.login({
      email: email.value,
      password: password.value
    });
    email.value = '';
    password.value = '';
  } catch (error) {
    alert('Login failed: ' + error.message);
  }
};

const addTodo = () => {
  if (newTodo.value.trim()) {
    todosStore.addTodo(newTodo.value.trim());
    newTodo.value = '';
  }
};
</script>

<style scoped>
.completed {
  text-decoration: line-through;
  opacity: 0.6;
}

.filters button.active {
  background: #42b883;
  color: white;
}
</style>
```

## Forms and Validation

### Basic Form Handling

```vue
<template>
  <form @submit.prevent="handleSubmit" class="contact-form">
    <div class="form-group">
      <label for="name">Name:</label>
      <input
        id="name"
        v-model="form.name"
        type="text"
        :class="{ error: errors.name }"
        @blur="validateField('name')"
      />
      <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
    </div>
    
    <div class="form-group">
      <label for="email">Email:</label>
      <input
        id="email"
        v-model="form.email"
        type="email"
        :class="{ error: errors.email }"
        @blur="validateField('email')"
      />
      <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
    </div>
    
    <div class="form-group">
      <label for="message">Message:</label>
      <textarea
        id="message"
        v-model="form.message"
        rows="5"
        :class="{ error: errors.message }"
        @blur="validateField('message')"
      ></textarea>
      <span v-if="errors.message" class="error-message">{{ errors.message }}</span>
    </div>
    
    <div class="form-group">
      <label>
        <input v-model="form.subscribe" type="checkbox" />
        Subscribe to newsletter
      </label>
    </div>
    
    <button type="submit" :disabled="!isFormValid || isSubmitting">
      {{ isSubmitting ? 'Sending...' : 'Send Message' }}
    </button>
  </form>
</template>

<script setup>
import { reactive, ref, computed } from 'vue';

const form = reactive({
  name: '',
  email: '',
  message: '',
  subscribe: false
});

const errors = reactive({});
const isSubmitting = ref(false);

const validationRules = {
  name: {
    required: true,
    minLength: 2
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  message: {
    required: true,
    minLength: 10
  }
};

const validateField = (field) => {
  const value = form[field];
  const rules = validationRules[field];
  
  if (rules.required && !value.trim()) {
    errors[field] = `${field} is required`;
    return false;
  }
  
  if (rules.minLength && value.length < rules.minLength) {
    errors[field] = `${field} must be at least ${rules.minLength} characters`;
    return false;
  }
  
  if (rules.pattern && !rules.pattern.test(value)) {
    errors[field] = `${field} format is invalid`;
    return false;
  }
  
  delete errors[field];
  return true;
};

const validateForm = () => {
  let isValid = true;
  Object.keys(validationRules).forEach(field => {
    if (!validateField(field)) {
      isValid = false;
    }
  });
  return isValid;
};

const isFormValid = computed(() => {
  return Object.keys(validationRules).every(field => 
    validateField(field) && !errors[field]
  );
});

const handleSubmit = async () => {
  if (!validateForm()) return;
  
  isSubmitting.value = true;
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    
    if (response.ok) {
      alert('Message sent successfully!');
      Object.assign(form, { name: '', email: '', message: '', subscribe: false });
      Object.keys(errors).forEach(key => delete errors[key]);
    } else {
      throw new Error('Failed to send message');
    }
  } catch (error) {
    alert('Error: ' + error.message);
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

input, textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

input.error, textarea.error {
  border-color: #e74c3c;
}

.error-message {
  color: #e74c3c;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

button {
  background: #42b883;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
```

## Testing Vue Applications

### Unit Testing with Vitest

```bash
# Install testing dependencies
npm install --save-dev vitest @vue/test-utils jsdom
```

```js
// vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom'
  }
});

// package.json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "coverage": "vitest --coverage"
  }
}
```

```js
// tests/Counter.test.js
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Counter from '@/components/Counter.vue';

describe('Counter', () => {
  it('renders initial count', () => {
    const wrapper = mount(Counter, {
      props: { initialCount: 5 }
    });
    
    expect(wrapper.text()).toContain('Count: 5');
  });
  
  it('increments count when button is clicked', async () => {
    const wrapper = mount(Counter);
    
    await wrapper.find('[data-test="increment"]').trigger('click');
    
    expect(wrapper.text()).toContain('Count: 1');
  });
  
  it('emits update event when count changes', async () => {
    const wrapper = mount(Counter);
    
    await wrapper.find('[data-test="increment"]').trigger('click');
    
    expect(wrapper.emitted('update')).toBeTruthy();
    expect(wrapper.emitted('update')[0]).toEqual([1]);
  });
});

// tests/composables/useCounter.test.js
import { describe, it, expect } from 'vitest';
import { useCounter } from '@/composables/useCounter';

describe('useCounter', () => {
  it('initializes with default value', () => {
    const { count } = useCounter();
    expect(count.value).toBe(0);
  });
  
  it('initializes with custom value', () => {
    const { count } = useCounter(10);
    expect(count.value).toBe(10);
  });
  
  it('increments count', () => {
    const { count, increment } = useCounter();
    increment();
    expect(count.value).toBe(1);
  });
  
  it('computes isEven correctly', () => {
    const { count, increment, isEven } = useCounter();
    
    expect(isEven.value).toBe(true); // 0 is even
    
    increment();
    expect(isEven.value).toBe(false); // 1 is odd
    
    increment();
    expect(isEven.value).toBe(true); // 2 is even
  });
});
```

### Component Testing with Pinia

```js
// tests/UserProfile.test.js
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { describe, it, expect, beforeEach } from 'vitest';
import UserProfile from '@/components/UserProfile.vue';
import { useAuthStore } from '@/stores/auth';

describe('UserProfile', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  
  it('displays user information when authenticated', () => {
    const wrapper = mount(UserProfile, {
      global: {
        plugins: [createPinia()]
      }
    });
    
    const authStore = useAuthStore();
    authStore.user = {
      name: 'John Doe',
      email: 'john@example.com'
    };
    authStore.token = 'fake-token';
    
    expect(wrapper.text()).toContain('John Doe');
    expect(wrapper.text()).toContain('john@example.com');
  });
  
  it('displays login form when not authenticated', () => {
    const wrapper = mount(UserProfile, {
      global: {
        plugins: [createPinia()]
      }
    });
    
    expect(wrapper.find('form').exists()).toBe(true);
    expect(wrapper.find('input[type="email"]').exists()).toBe(true);
  });
});
```

## Performance Optimization

### Lazy Loading and Code Splitting

```js
// router/index.js - Route-based code splitting
const routes = [
  {
    path: '/',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/admin',
    component: () => import('@/views/Admin.vue')
  }
];

// Component-based lazy loading
<script setup>
import { defineAsyncComponent } from 'vue';

const HeavyComponent = defineAsyncComponent({
  loader: () => import('./HeavyComponent.vue'),
  loadingComponent: LoadingSpinner,
  errorComponent: ErrorComponent,
  delay: 200,
  timeout: 3000
});
</script>
```

### Virtual Scrolling

```vue
<template>
  <div class="virtual-list" :style="{ height: containerHeight + 'px' }">
    <div 
      class="virtual-list-phantom" 
      :style="{ height: totalHeight + 'px' }"
    ></div>
    
    <div 
      class="virtual-list-container"
      :style="{ transform: `translateY(${offsetY}px)` }"
    >
      <div
        v-for="item in visibleItems"
        :key="item.id"
        class="virtual-list-item"
        :style="{ height: itemHeight + 'px' }"
      >
        <slot :item="item" :index="item.index">
          {{ item.text }}
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  itemHeight: {
    type: Number,
    default: 50
  },
  containerHeight: {
    type: Number,
    default: 400
  }
});

const scrollTop = ref(0);

const totalHeight = computed(() => props.items.length * props.itemHeight);
const visibleCount = computed(() => Math.ceil(props.containerHeight / props.itemHeight));
const startIndex = computed(() => Math.floor(scrollTop.value / props.itemHeight));
const endIndex = computed(() => Math.min(startIndex.value + visibleCount.value, props.items.length));
const offsetY = computed(() => startIndex.value * props.itemHeight);

const visibleItems = computed(() => {
  return props.items.slice(startIndex.value, endIndex.value).map((item, index) => ({
    ...item,
    index: startIndex.value + index
  }));
});

const handleScroll = (e) => {
  scrollTop.value = e.target.scrollTop;
};

onMounted(() => {
  const container = document.querySelector('.virtual-list');
  container?.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  const container = document.querySelector('.virtual-list');
  container?.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.virtual-list {
  overflow-y: auto;
  position: relative;
}

.virtual-list-phantom {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: -1;
}

.virtual-list-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}

.virtual-list-item {
  display: flex;
  align-items: center;
  padding: 0 16px;
  border-bottom: 1px solid #eee;
}
</style>
```

## Build and Deployment

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Analyze bundle size
npm install --save-dev rollup-plugin-visualizer
```

```js
// vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    vue(),
    visualizer({
      filename: 'dist/stats.html',
      open: true
    })
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router', 'pinia'],
          ui: ['@/components/ui']
        }
      }
    }
  }
});
```

### Environment Configuration

```bash
# .env.development
VITE_API_URL=http://localhost:3000/api
VITE_APP_TITLE=My Vue App (Dev)

# .env.production
VITE_API_URL=https://api.myapp.com
VITE_APP_TITLE=My Vue App
```

```js
// Using environment variables
const apiUrl = import.meta.env.VITE_API_URL;
const appTitle = import.meta.env.VITE_APP_TITLE;
```

## Conclusion

Vue.js continues to be an excellent choice for building modern web applications, offering a perfect balance of simplicity and power. With Vue 3's Composition API, improved performance, and excellent TypeScript support, it's well-positioned for the future of web development.

**Key Takeaways:**
- Master the Composition API for better code organization
- Use Pinia for state management in modern Vue applications
- Implement proper routing with Vue Router
- Write comprehensive tests for your components and composables
- Optimize performance with lazy loading and virtual scrolling
- Follow Vue.js best practices and conventions
- Stay updated with the Vue.js ecosystem

By following this guide and continuing to practice, you'll be well-equipped to build scalable, maintainable Vue.js applications that provide excellent user experiences.

**Next Steps:**
- Explore Nuxt.js for full-stack Vue applications
- Learn about Vue's Server-Side Rendering (SSR)
- Practice building real-world applications
- Contribute to the Vue.js community
- Stay updated with Vue.js releases and RFC discussions

---

*Ready to start building with Vue.js? Set up your development environment, create your first component, and begin exploring the elegant world of Vue.js development.*