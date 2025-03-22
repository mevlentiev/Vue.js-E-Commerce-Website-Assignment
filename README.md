# Vue.js-E-Commerce-Website-Assignment
Develop a simple e-commerce website using Vue.js and the Platzi Fake Store API. The application should include pagination, search functionality, and state management for favorites and last visited items. This will evaluate how well you structure your Vue.js application, interact with APIs, and implement key e-commerce functionalities.

# 🛒 Features Implemented

# ✅ Categories Navigation

Fetched from: https://api.escuelajs.co/api/v1/categories
Displayed in the App.vue navbar using <router-link>
Dynamic routing: /category/:id shows products per category

# ✅ Products by Category

Fetched via fetchProductsByCategoryId action with pagination:
https://api.escuelajs.co/api/v1/products?categoryId=:id&offset=&limit=
Pagination: Previous / Next buttons
Category ID retrieved from $route.params.id
Image loading="lazy" for performance

# ✅ Product Details

Navigates to /product/:id
No extra fetch; product is retrieved from productsInCategory in Vuex
Shows: image, name, price, description, category

# ✅ Favorites System

Vuex favoritesProducts state
Toggle button adds/removes product from favorites
Dynamic styles with bg-green / bg-red based on favorite state
Getter isFavorite(id) used across components

# ✅ Recently Viewed Products

Stored in recentlyViewedProducts in Vuex
Last 5 viewed products saved per session
Auto-updated when visiting a product page
Displayed in HomeView or other components

# ✅ Sorting System

Dropdown sort options:
Price ↑ / ↓
Title A→Z / Z→A
Implemented via computed property: sortedProductsInCategory

# ✅ Dark Mode Toggle

Toggle button in App.vue switches dark/light mode
Uses document.documentElement.classList.add('dark')
Tailwind configured with darkMode: 'class'
Preference saved in localStorage

#✅ Extras

Tailwind CSS integrated
Responsive layouts with grid-cols & breakpoints
Vuex state management used for:
Categories
Products per category
Favorites
Recently viewed
Vue Router for all dynamic routing

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


