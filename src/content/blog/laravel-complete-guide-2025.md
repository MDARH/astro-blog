---
title: 'Laravel Complete Guide 2025: Modern PHP Development'
description: 'Master Laravel framework with this comprehensive guide covering installation, MVC architecture, Eloquent ORM, authentication, API development, testing, and deployment best practices.'
pubDate: 'Sep 07 2025'
heroImage: '../../assets/Lucid_Origin_Flat_modern_vector_illustration_of_the_Laravel_lo_0.jpg'
---

# Laravel Complete Guide 2025: Modern PHP Development

**Laravel** is the most popular PHP framework, known for its elegant syntax, powerful features, and developer-friendly approach. This comprehensive guide will take you from Laravel basics to advanced concepts, covering everything you need to build modern web applications.

## What is Laravel?

Laravel is a free, open-source PHP web framework created by Taylor Otwell. It follows the Model-View-Controller (MVC) architectural pattern and provides:

- **Elegant syntax** that's expressive and readable
- **Built-in features** for common web development tasks
- **Robust ecosystem** with packages and tools
- **Active community** and extensive documentation
- **Modern PHP practices** and design patterns

## Why Choose Laravel?

### Key Advantages

1. **Rapid Development**: Built-in features accelerate development
2. **Security**: Built-in protection against common vulnerabilities
3. **Scalability**: Designed for applications of all sizes
4. **Testing**: Comprehensive testing tools included
5. **Community**: Large, active community and ecosystem
6. **Documentation**: Excellent, comprehensive documentation

### Laravel vs Other Frameworks

**Laravel vs Symfony:**
- Laravel: More beginner-friendly, rapid development
- Symfony: More flexible, component-based architecture

**Laravel vs CodeIgniter:**
- Laravel: Modern features, better architecture
- CodeIgniter: Lighter weight, simpler learning curve

## Getting Started with Laravel

### System Requirements

**Minimum Requirements:**
- **PHP**: 8.1 or higher
- **Composer**: Dependency manager
- **Extensions**: OpenSSL, PDO, Mbstring, Tokenizer, XML, Ctype, JSON, BCMath

**Recommended Setup:**
- **Web Server**: Apache or Nginx
- **Database**: MySQL 5.7+, PostgreSQL 10+, or SQLite 3.8.8+
- **Node.js**: For asset compilation
- **Redis**: For caching and sessions (optional)

### Installation Methods

#### 1. Laravel Installer
```bash
# Install Laravel installer globally
composer global require laravel/installer

# Create new Laravel project
laravel new project-name

# Navigate to project directory
cd project-name

# Start development server
php artisan serve
```

#### 2. Composer Create-Project
```bash
# Create project via Composer
composer create-project laravel/laravel project-name

# Navigate and serve
cd project-name
php artisan serve
```

#### 3. Laravel Sail (Docker)
```bash
# Create project with Sail
curl -s https://laravel.build/project-name | bash

# Start Sail environment
cd project-name
./vendor/bin/sail up
```

### Environment Configuration

#### .env File Setup
```env
# Application
APP_NAME=Laravel
APP_ENV=local
APP_KEY=base64:generated-key
APP_DEBUG=true
APP_URL=http://localhost

# Database
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=root
DB_PASSWORD=

# Cache
CACHE_DRIVER=file
SESSION_DRIVER=file
QUEUE_CONNECTION=sync
```

## Laravel Architecture

### MVC Pattern

#### Model
Represents data and business logic:
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class User extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'name', 'email', 'password'
    ];
    
    protected $hidden = [
        'password', 'remember_token'
    ];
    
    public function posts()
    {
        return $this->hasMany(Post::class);
    }
}
```

#### View
Presentation layer using Blade templates:
```blade
{{-- resources/views/users/index.blade.php --}}
@extends('layouts.app')

@section('content')
<div class="container">
    <h1>Users</h1>
    
    @foreach($users as $user)
        <div class="user-card">
            <h3>{{ $user->name }}</h3>
            <p>{{ $user->email }}</p>
        </div>
    @endforeach
    
    {{ $users->links() }}
</div>
@endsection
```

#### Controller
Handles HTTP requests and responses:
```php
<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of users
     */
    public function index()
    {
        $users = User::paginate(10);
        return view('users.index', compact('users'));
    }
    
    /**
     * Store a newly created user
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8|confirmed'
        ]);
        
        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => bcrypt($validated['password'])
        ]);
        
        return redirect()->route('users.index')
            ->with('success', 'User created successfully');
    }
}
```

### Service Container

Laravel's IoC container manages class dependencies:
```php
// Binding in service provider
public function register()
{
    $this->app->bind('App\Contracts\PaymentGateway', function ($app) {
        return new StripePaymentGateway(
            config('services.stripe.secret')
        );
    });
}

// Dependency injection in controller
public function __construct(PaymentGateway $paymentGateway)
{
    $this->paymentGateway = $paymentGateway;
}
```

## Routing

### Basic Routing

```php
// routes/web.php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

// Basic routes
Route::get('/', function () {
    return view('welcome');
});

Route::get('/users', [UserController::class, 'index'])->name('users.index');
Route::post('/users', [UserController::class, 'store'])->name('users.store');

// Route parameters
Route::get('/users/{id}', [UserController::class, 'show'])->name('users.show');
Route::get('/users/{id}/edit', [UserController::class, 'edit'])->name('users.edit');

// Optional parameters
Route::get('/posts/{slug?}', [PostController::class, 'show']);

// Route constraints
Route::get('/users/{id}', [UserController::class, 'show'])->where('id', '[0-9]+');
```

### Resource Routes

```php
// Generate all CRUD routes
Route::resource('posts', PostController::class);

// API resource routes (excludes create/edit forms)
Route::apiResource('api/posts', PostController::class);

// Nested resources
Route::resource('posts.comments', CommentController::class);

// Partial resources
Route::resource('photos', PhotoController::class)->only([
    'index', 'show'
]);

Route::resource('photos', PhotoController::class)->except([
    'create', 'store', 'update', 'destroy'
]);
```

### Route Groups

```php
// Middleware groups
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index']);
    Route::resource('posts', PostController::class);
});

// Prefix groups
Route::prefix('admin')->group(function () {
    Route::get('/users', [AdminController::class, 'users']);
    Route::get('/posts', [AdminController::class, 'posts']);
});

// Subdomain routing
Route::domain('{account}.example.com')->group(function () {
    Route::get('/', [AccountController::class, 'show']);
});
```

## Eloquent ORM

### Model Relationships

#### One-to-Many
```php
// User model
public function posts()
{
    return $this->hasMany(Post::class);
}

// Post model
public function user()
{
    return $this->belongsTo(User::class);
}

// Usage
$user = User::find(1);
$posts = $user->posts; // Get all posts by user

$post = Post::find(1);
$author = $post->user; // Get post author
```

#### Many-to-Many
```php
// User model
public function roles()
{
    return $this->belongsToMany(Role::class)
        ->withPivot('assigned_at')
        ->withTimestamps();
}

// Role model
public function users()
{
    return $this->belongsToMany(User::class);
}

// Usage
$user = User::find(1);
$user->roles()->attach($roleId);
$user->roles()->detach($roleId);
$user->roles()->sync([$role1, $role2]);
```

### Query Builder

```php
// Basic queries
$users = User::where('active', true)
    ->orderBy('created_at', 'desc')
    ->take(10)
    ->get();

// Advanced queries
$posts = Post::with('user', 'comments')
    ->where('published', true)
    ->whereHas('user', function ($query) {
        $query->where('verified', true);
    })
    ->paginate(15);

// Raw queries
$users = DB::select('SELECT * FROM users WHERE active = ?', [1]);

// Query scopes
class Post extends Model
{
    public function scopePublished($query)
    {
        return $query->where('published', true);
    }
    
    public function scopeByAuthor($query, $authorId)
    {
        return $query->where('user_id', $authorId);
    }
}

// Usage
$posts = Post::published()->byAuthor(1)->get();
```

### Migrations

```php
// Create migration
php artisan make:migration create_posts_table

// Migration file
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePostsTable extends Migration
{
    public function up()
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('content');
            $table->boolean('published')->default(false);
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->timestamps();
            
            $table->index(['published', 'created_at']);
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('posts');
    }
}

// Run migrations
php artisan migrate
php artisan migrate:rollback
php artisan migrate:fresh --seed
```

## Authentication & Authorization

### Laravel Breeze Setup

```bash
# Install Breeze
composer require laravel/breeze --dev
php artisan breeze:install

# Install dependencies and build assets
npm install && npm run dev

# Run migrations
php artisan migrate
```

### Custom Authentication

```php
// Login controller
public function login(Request $request)
{
    $credentials = $request->validate([
        'email' => 'required|email',
        'password' => 'required'
    ]);
    
    if (Auth::attempt($credentials, $request->boolean('remember'))) {
        $request->session()->regenerate();
        return redirect()->intended('/dashboard');
    }
    
    return back()->withErrors([
        'email' => 'The provided credentials do not match our records.'
    ]);
}

// Logout
public function logout(Request $request)
{
    Auth::logout();
    $request->session()->invalidate();
    $request->session()->regenerateToken();
    return redirect('/');
}
```

### Authorization with Policies

```php
// Create policy
php artisan make:policy PostPolicy --model=Post

// Policy class
class PostPolicy
{
    public function update(User $user, Post $post)
    {
        return $user->id === $post->user_id;
    }
    
    public function delete(User $user, Post $post)
    {
        return $user->id === $post->user_id || $user->isAdmin();
    }
}

// Register policy in AuthServiceProvider
protected $policies = [
    Post::class => PostPolicy::class,
];

// Usage in controller
public function update(Request $request, Post $post)
{
    $this->authorize('update', $post);
    
    // Update logic here
}

// Usage in Blade
@can('update', $post)
    <a href="{{ route('posts.edit', $post) }}">Edit</a>
@endcan
```

## API Development

### API Routes

```php
// routes/api.php
use App\Http\Controllers\Api\PostController;

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('posts', PostController::class);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});
```

### API Resources

```php
// Create resource
php artisan make:resource PostResource

// Resource class
class PostResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'content' => $this->content,
            'published' => $this->published,
            'author' => new UserResource($this->whenLoaded('user')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}

// Usage in controller
public function index()
{
    $posts = Post::with('user')->paginate(15);
    return PostResource::collection($posts);
}

public function show(Post $post)
{
    return new PostResource($post->load('user'));
}
```

### API Authentication with Sanctum

```bash
# Install Sanctum
composer require laravel/sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
php artisan migrate
```

```php
// Generate token
public function createToken(Request $request)
{
    $request->validate([
        'email' => 'required|email',
        'password' => 'required',
        'device_name' => 'required'
    ]);
    
    $user = User::where('email', $request->email)->first();
    
    if (!$user || !Hash::check($request->password, $user->password)) {
        throw ValidationException::withMessages([
            'email' => ['The provided credentials are incorrect.'],
        ]);
    }
    
    return $user->createToken($request->device_name)->plainTextToken;
}

// Revoke token
public function revokeToken(Request $request)
{
    $request->user()->currentAccessToken()->delete();
    return response()->json(['message' => 'Token revoked']);
}
```

## Testing

### Feature Tests

```php
// Create test
php artisan make:test PostTest

// Test class
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PostTest extends TestCase
{
    use RefreshDatabase;
    
    public function test_user_can_create_post()
    {
        $user = User::factory()->create();
        
        $response = $this->actingAs($user)
            ->post('/posts', [
                'title' => 'Test Post',
                'content' => 'This is a test post content.'
            ]);
            
        $response->assertRedirect('/posts');
        $this->assertDatabaseHas('posts', [
            'title' => 'Test Post',
            'user_id' => $user->id
        ]);
    }
    
    public function test_guest_cannot_create_post()
    {
        $response = $this->post('/posts', [
            'title' => 'Test Post',
            'content' => 'This is a test post content.'
        ]);
        
        $response->assertRedirect('/login');
    }
}
```

### Unit Tests

```php
// Create unit test
php artisan make:test UserTest --unit

// Unit test class
class UserTest extends TestCase
{
    public function test_user_has_posts_relationship()
    {
        $user = new User();
        $this->assertInstanceOf(
            'Illuminate\Database\Eloquent\Relations\HasMany',
            $user->posts()
        );
    }
    
    public function test_user_full_name_attribute()
    {
        $user = User::factory()->make([
            'first_name' => 'John',
            'last_name' => 'Doe'
        ]);
        
        $this->assertEquals('John Doe', $user->full_name);
    }
}
```

### Database Testing

```php
// Model factory
class UserFactory extends Factory
{
    public function definition()
    {
        return [
            'name' => $this->faker->name(),
            'email' => $this->faker->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => bcrypt('password'),
            'remember_token' => Str::random(10),
        ];
    }
    
    public function admin()
    {
        return $this->state(function (array $attributes) {
            return [
                'role' => 'admin',
            ];
        });
    }
}

// Usage in tests
$user = User::factory()->create();
$admin = User::factory()->admin()->create();
$users = User::factory()->count(10)->create();
```

## Performance Optimization

### Query Optimization

```php
// Eager loading
$posts = Post::with(['user', 'comments.user'])->get();

// Lazy eager loading
$posts = Post::all();
$posts->load('user');

// Select specific columns
$users = User::select('id', 'name', 'email')->get();

// Chunking large datasets
User::chunk(100, function ($users) {
    foreach ($users as $user) {
        // Process user
    }
});

// Query optimization
$posts = Post::whereHas('user', function ($query) {
    $query->where('active', true);
})->with('user:id,name')->get();
```

### Caching

```php
// Cache configuration
'default' => env('CACHE_DRIVER', 'file'),

'stores' => [
    'redis' => [
        'driver' => 'redis',
        'connection' => 'cache',
    ],
],

// Cache usage
use Illuminate\Support\Facades\Cache;

// Store cache
Cache::put('key', 'value', 3600); // 1 hour
Cache::forever('key', 'value');

// Retrieve cache
$value = Cache::get('key');
$value = Cache::get('key', 'default');

// Cache with closure
$posts = Cache::remember('posts', 3600, function () {
    return Post::with('user')->published()->get();
});

// Model caching
class Post extends Model
{
    protected static function booted()
    {
        static::updated(function ($post) {
            Cache::forget("post.{$post->id}");
        });
    }
}
```

### Queue Jobs

```php
// Create job
php artisan make:job SendEmailNotification

// Job class
class SendEmailNotification implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    
    protected $user;
    protected $message;
    
    public function __construct(User $user, $message)
    {
        $this->user = $user;
        $this->message = $message;
    }
    
    public function handle()
    {
        Mail::to($this->user->email)->send(
            new NotificationMail($this->message)
        );
    }
}

// Dispatch job
SendEmailNotification::dispatch($user, $message);

// Delayed dispatch
SendEmailNotification::dispatch($user, $message)
    ->delay(now()->addMinutes(10));

// Queue worker
php artisan queue:work
php artisan queue:work --queue=emails,default
```

## Deployment

### Production Optimization

```bash
# Optimize for production
composer install --optimize-autoloader --no-dev
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache

# Clear caches
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear
```

### Environment Configuration

```env
# Production .env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://yourdomain.com

# Database
DB_CONNECTION=mysql
DB_HOST=your-db-host
DB_DATABASE=your-database
DB_USERNAME=your-username
DB_PASSWORD=your-secure-password

# Cache
CACHE_DRIVER=redis
SESSION_DRIVER=redis
QUEUE_CONNECTION=redis

# Mail
MAIL_MAILER=smtp
MAIL_HOST=your-smtp-host
MAIL_PORT=587
MAIL_ENCRYPTION=tls
```

### Server Configuration

#### Nginx Configuration
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/html/public;
    
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";
    
    index index.php;
    
    charset utf-8;
    
    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }
    
    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }
    
    error_page 404 /index.php;
    
    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }
    
    location ~ /\.(?!well-known).* {
        deny all;
    }
}
```

## Conclusion

Laravel continues to be the leading PHP framework, offering a perfect balance of simplicity and power. Its elegant syntax, comprehensive feature set, and vibrant ecosystem make it an excellent choice for projects of all sizes.

**Key Takeaways:**
- Master the MVC architecture and Eloquent ORM
- Implement proper authentication and authorization
- Write comprehensive tests for your applications
- Optimize performance with caching and queues
- Follow Laravel best practices and conventions
- Stay updated with the latest Laravel features
- Leverage the Laravel ecosystem (Forge, Vapor, Nova)

By following this guide and continuing to practice, you'll be well-equipped to build robust, scalable web applications with Laravel.

**Next Steps:**
- Explore Laravel packages like Livewire, Inertia.js
- Learn about Laravel's ecosystem tools
- Practice building real-world applications
- Contribute to the Laravel community
- Stay updated with Laravel news and releases

---

*Ready to start building with Laravel? Set up your development environment, create your first project, and begin exploring the framework's powerful features.*