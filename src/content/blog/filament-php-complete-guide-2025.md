---
title: 'Filament PHP Complete Guide 2025: Modern Laravel Admin Panel'
description: 'Master Filament PHP with this comprehensive guide covering installation, resources, forms, tables, dashboard widgets, custom pages, and advanced features for Laravel admin panels.'
pubDate: 'Sep 10 2025'
heroImage: '../../assets/Lucid_Origin_Minimal_flat_vector_illustration_of_a_web_dashboa_0.jpg'
---

# Filament PHP Complete Guide 2025: Modern Laravel Admin Panel

**Filament** is a collection of beautiful full-stack components for Laravel that makes building admin panels, dashboards, and internal tools a breeze. Built on top of Laravel, Livewire, and Alpine.js, Filament provides an elegant and powerful solution for rapid admin panel development.

## What is Filament?

Filament is a modern admin panel framework for Laravel that provides:

- **Beautiful UI**: Clean, modern interface built with Tailwind CSS
- **Rapid Development**: Pre-built components for common admin tasks
- **Highly Customizable**: Extensive customization options
- **Laravel Integration**: Deep integration with Laravel ecosystem
- **Real-time Updates**: Built on Livewire for reactive interfaces
- **Mobile Responsive**: Works perfectly on all devices

### Key Features

- **Resource Management**: CRUD operations with minimal code
- **Form Builder**: Powerful form components and validation
- **Table Builder**: Advanced data tables with filtering and sorting
- **Dashboard Widgets**: Customizable dashboard components
- **User Management**: Built-in authentication and authorization
- **Multi-tenancy**: Support for multi-tenant applications
- **Plugin System**: Extensible with community plugins

## Getting Started with Filament

### Prerequisites

**System Requirements:**
- **PHP**: 8.1 or higher
- **Laravel**: 9.0 or higher
- **Node.js**: For asset compilation
- **Database**: MySQL, PostgreSQL, SQLite, or SQL Server

**Required Knowledge:**
- **Laravel**: Basic understanding of Laravel framework
- **Eloquent ORM**: Laravel's database ORM
- **Livewire**: Basic concepts (helpful but not required)
- **Tailwind CSS**: For customization (optional)

### Installation

#### Fresh Laravel Project
```bash
# Create new Laravel project
composer create-project laravel/laravel filament-app
cd filament-app

# Install Filament
composer require filament/filament:"^3.0"

# Install Filament panels
php artisan filament:install --panels

# Create admin user
php artisan make:filament-user

# Run migrations
php artisan migrate

# Start development server
php artisan serve
```

#### Existing Laravel Project
```bash
# Install Filament
composer require filament/filament:"^3.0"

# Install panels
php artisan filament:install --panels

# Publish and run migrations
php artisan vendor:publish --tag=filament-config
php artisan migrate

# Create admin user
php artisan make:filament-user
```

### Configuration

```php
// config/filament.php
return [
    'default_filesystem_disk' => env('FILAMENT_FILESYSTEM_DISK', 'public'),
    'assets_path' => null,
    'cache_path' => base_path('bootstrap/cache/filament'),
    'livewire_loading_delay' => 'default',
];

// app/Providers/Filament/AdminPanelProvider.php
use Filament\Panel;
use Filament\PanelProvider;
use Filament\Support\Colors\Color;
use Filament\Widgets;

class AdminPanelProvider extends PanelProvider
{
    public function panel(Panel $panel): Panel
    {
        return $panel
            ->default()
            ->id('admin')
            ->path('admin')
            ->login()
            ->colors([
                'primary' => Color::Amber,
            ])
            ->discoverResources(in: app_path('Filament/Resources'), for: 'App\\Filament\\Resources')
            ->discoverPages(in: app_path('Filament/Pages'), for: 'App\\Filament\\Pages')
            ->pages([
                Pages\Dashboard::class,
            ])
            ->discoverWidgets(in: app_path('Filament/Widgets'), for: 'App\\Filament\\Widgets')
            ->widgets([
                Widgets\AccountWidget::class,
                Widgets\FilamentInfoWidget::class,
            ])
            ->middleware([
                EncryptCookies::class,
                AddQueuedCookiesToResponse::class,
                StartSession::class,
                AuthenticateSession::class,
                ShareErrorsFromSession::class,
                VerifyCsrfToken::class,
                SubstituteBindings::class,
                DisableBladeIconComponents::class,
                DispatchServingFilamentEvent::class,
            ])
            ->authMiddleware([
                Authenticate::class,
            ]);
    }
}
```

## Creating Models and Migrations

### Example Models

```php
// app/Models/Post.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Post extends Model
{
    use HasFactory, SoftDeletes;
    
    protected $fillable = [
        'title',
        'slug',
        'content',
        'excerpt',
        'featured_image',
        'published_at',
        'is_featured',
        'user_id',
        'category_id',
    ];
    
    protected $casts = [
        'published_at' => 'datetime',
        'is_featured' => 'boolean',
    ];
    
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
    
    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class);
    }
    
    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}

// app/Models/Category.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'description',
        'color',
        'is_active',
    ];
    
    protected $casts = [
        'is_active' => 'boolean',
    ];
    
    public function posts(): HasMany
    {
        return $this->hasMany(Post::class);
    }
}

// app/Models/Tag.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Tag extends Model
{
    protected $fillable = ['name', 'slug', 'color'];
    
    public function posts(): BelongsToMany
    {
        return $this->belongsToMany(Post::class);
    }
}
```

### Migrations

```php
// database/migrations/create_categories_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->string('color')->default('#6366f1');
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }
    
    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};

// database/migrations/create_posts_table.php
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->longText('content');
            $table->text('excerpt')->nullable();
            $table->string('featured_image')->nullable();
            $table->timestamp('published_at')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('category_id')->constrained()->cascadeOnDelete();
            $table->timestamps();
            $table->softDeletes();
            
            $table->index(['published_at', 'is_featured']);
        });
    }
    
    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
```

## Filament Resources

### Creating Resources

```bash
# Create a resource
php artisan make:filament-resource Post

# Create resource with pages
php artisan make:filament-resource Post --generate

# Create simple resource (single page)
php artisan make:filament-resource Post --simple

# Create resource with soft deletes
php artisan make:filament-resource Post --soft-deletes
```

### Post Resource Example

```php
// app/Filament/Resources/PostResource.php
namespace App\Filament\Resources;

use App\Filament\Resources\PostResource\Pages;
use App\Models\Post;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\Str;

class PostResource extends Resource
{
    protected static ?string $model = Post::class;
    
    protected static ?string $navigationIcon = 'heroicon-o-document-text';
    
    protected static ?string $navigationGroup = 'Content';
    
    protected static ?int $navigationSort = 1;
    
    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Post Details')
                    ->schema([
                        Forms\Components\TextInput::make('title')
                            ->required()
                            ->maxLength(255)
                            ->live(onBlur: true)
                            ->afterStateUpdated(fn (string $context, $state, callable $set) => 
                                $context === 'create' ? $set('slug', Str::slug($state)) : null
                            ),
                            
                        Forms\Components\TextInput::make('slug')
                            ->required()
                            ->maxLength(255)
                            ->unique(Post::class, 'slug', ignoreRecord: true)
                            ->rules(['alpha_dash']),
                            
                        Forms\Components\Select::make('category_id')
                            ->relationship('category', 'name')
                            ->required()
                            ->createOptionForm([
                                Forms\Components\TextInput::make('name')
                                    ->required()
                                    ->maxLength(255),
                                Forms\Components\TextInput::make('slug')
                                    ->required()
                                    ->maxLength(255),
                                Forms\Components\ColorPicker::make('color')
                                    ->default('#6366f1'),
                            ]),
                            
                        Forms\Components\Select::make('user_id')
                            ->relationship('user', 'name')
                            ->required()
                            ->default(auth()->id()),
                            
                        Forms\Components\Select::make('tags')
                            ->relationship('tags', 'name')
                            ->multiple()
                            ->preload()
                            ->createOptionForm([
                                Forms\Components\TextInput::make('name')
                                    ->required(),
                                Forms\Components\TextInput::make('slug')
                                    ->required(),
                                Forms\Components\ColorPicker::make('color'),
                            ]),
                    ])
                    ->columns(2),
                    
                Forms\Components\Section::make('Content')
                    ->schema([
                        Forms\Components\Textarea::make('excerpt')
                            ->rows(3)
                            ->columnSpanFull(),
                            
                        Forms\Components\RichEditor::make('content')
                            ->required()
                            ->columnSpanFull()
                            ->toolbarButtons([
                                'attachFiles',
                                'blockquote',
                                'bold',
                                'bulletList',
                                'codeBlock',
                                'h2',
                                'h3',
                                'italic',
                                'link',
                                'orderedList',
                                'redo',
                                'strike',
                                'underline',
                                'undo',
                            ]),
                    ]),
                    
                Forms\Components\Section::make('Media & Publishing')
                    ->schema([
                        Forms\Components\FileUpload::make('featured_image')
                            ->image()
                            ->directory('posts')
                            ->visibility('public')
                            ->imageEditor()
                            ->imageEditorAspectRatios([
                                '16:9',
                                '4:3',
                                '1:1',
                            ]),
                            
                        Forms\Components\DateTimePicker::make('published_at')
                            ->default(now()),
                            
                        Forms\Components\Toggle::make('is_featured')
                            ->default(false),
                    ])
                    ->columns(2),
            ]);
    }
    
    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('featured_image')
                    ->circular()
                    ->defaultImageUrl(url('/images/placeholder.png')),
                    
                Tables\Columns\TextColumn::make('title')
                    ->searchable()
                    ->sortable()
                    ->limit(50)
                    ->tooltip(function (Tables\Columns\TextColumn $column): ?string {
                        $state = $column->getState();
                        return strlen($state) <= 50 ? null : $state;
                    }),
                    
                Tables\Columns\TextColumn::make('category.name')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'Technology' => 'info',
                        'Business' => 'success',
                        'Lifestyle' => 'warning',
                        default => 'gray',
                    })
                    ->sortable(),
                    
                Tables\Columns\TextColumn::make('user.name')
                    ->label('Author')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                    
                Tables\Columns\IconColumn::make('is_featured')
                    ->boolean()
                    ->trueIcon('heroicon-o-star')
                    ->falseIcon('heroicon-o-star')
                    ->trueColor('warning')
                    ->falseColor('gray'),
                    
                Tables\Columns\TextColumn::make('published_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(),
                    
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('category')
                    ->relationship('category', 'name'),
                    
                Tables\Filters\Filter::make('is_featured')
                    ->query(fn (Builder $query): Builder => $query->where('is_featured', true))
                    ->label('Featured Posts'),
                    
                Tables\Filters\Filter::make('published')
                    ->query(fn (Builder $query): Builder => $query->whereNotNull('published_at'))
                    ->label('Published'),
                    
                Tables\Filters\TrashedFilter::make(),
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
                Tables\Actions\ForceDeleteAction::make(),
                Tables\Actions\RestoreAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                    Tables\Actions\ForceDeleteBulkAction::make(),
                    Tables\Actions\RestoreBulkAction::make(),
                    
                    Tables\Actions\BulkAction::make('feature')
                        ->label('Mark as Featured')
                        ->icon('heroicon-o-star')
                        ->action(function (Collection $records) {
                            $records->each(fn (Post $record) => $record->update(['is_featured' => true]));
                        })
                        ->deselectRecordsAfterCompletion(),
                ]),
            ])
            ->defaultSort('created_at', 'desc');
    }
    
    public static function getRelations(): array
    {
        return [
            //
        ];
    }
    
    public static function getPages(): array
    {
        return [
            'index' => Pages\ListPosts::route('/'),
            'create' => Pages\CreatePost::route('/create'),
            'view' => Pages\ViewPost::route('/{record}'),
            'edit' => Pages\EditPost::route('/{record}/edit'),
        ];
    }
    
    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()
            ->withoutGlobalScopes([
                SoftDeletingScope::class,
            ]);
    }
    
    public static function getNavigationBadge(): ?string
    {
        return static::getModel()::count();
    }
}
```

### Category Resource

```php
// app/Filament/Resources/CategoryResource.php
namespace App\Filament\Resources;

use App\Filament\Resources\CategoryResource\Pages;
use App\Models\Category;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class CategoryResource extends Resource
{
    protected static ?string $model = Category::class;
    
    protected static ?string $navigationIcon = 'heroicon-o-folder';
    
    protected static ?string $navigationGroup = 'Content';
    
    protected static ?int $navigationSort = 2;
    
    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('name')
                    ->required()
                    ->maxLength(255)
                    ->live(onBlur: true)
                    ->afterStateUpdated(fn (string $context, $state, callable $set) => 
                        $context === 'create' ? $set('slug', Str::slug($state)) : null
                    ),
                    
                Forms\Components\TextInput::make('slug')
                    ->required()
                    ->maxLength(255)
                    ->unique(Category::class, 'slug', ignoreRecord: true)
                    ->rules(['alpha_dash']),
                    
                Forms\Components\Textarea::make('description')
                    ->rows(3)
                    ->columnSpanFull(),
                    
                Forms\Components\ColorPicker::make('color')
                    ->default('#6366f1'),
                    
                Forms\Components\Toggle::make('is_active')
                    ->default(true),
            ]);
    }
    
    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ColorColumn::make('color'),
                
                Tables\Columns\TextColumn::make('name')
                    ->searchable()
                    ->sortable(),
                    
                Tables\Columns\TextColumn::make('slug')
                    ->searchable()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                    
                Tables\Columns\TextColumn::make('posts_count')
                    ->counts('posts')
                    ->label('Posts')
                    ->sortable(),
                    
                Tables\Columns\IconColumn::make('is_active')
                    ->boolean(),
                    
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\Filter::make('is_active')
                    ->query(fn (Builder $query): Builder => $query->where('is_active', true))
                    ->label('Active Categories'),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }
    
    public static function getPages(): array
    {
        return [
            'index' => Pages\ManageCategories::route('/'),
        ];
    }
}
```

## Dashboard Widgets

### Creating Widgets

```bash
# Create a stats widget
php artisan make:filament-widget StatsOverview --stats

# Create a chart widget
php artisan make:filament-widget PostsChart --chart

# Create a table widget
php artisan make:filament-widget LatestPosts --table
```

### Stats Widget

```php
// app/Filament/Widgets/StatsOverview.php
namespace App\Filament\Widgets;

use App\Models\Post;
use App\Models\User;
use App\Models\Category;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverview extends BaseWidget
{
    protected function getStats(): array
    {
        return [
            Stat::make('Total Posts', Post::count())
                ->description('All posts in the system')
                ->descriptionIcon('heroicon-m-document-text')
                ->color('success')
                ->chart([7, 2, 10, 3, 15, 4, 17]),
                
            Stat::make('Published Posts', Post::whereNotNull('published_at')->count())
                ->description('Currently published')
                ->descriptionIcon('heroicon-m-eye')
                ->color('info'),
                
            Stat::make('Featured Posts', Post::where('is_featured', true)->count())
                ->description('Featured content')
                ->descriptionIcon('heroicon-m-star')
                ->color('warning'),
                
            Stat::make('Total Users', User::count())
                ->description('Registered users')
                ->descriptionIcon('heroicon-m-users')
                ->color('primary'),
        ];
    }
}
```

### Chart Widget

```php
// app/Filament/Widgets/PostsChart.php
namespace App\Filament\Widgets;

use App\Models\Post;
use Filament\Widgets\ChartWidget;
use Flowframe\Trend\Trend;
use Flowframe\Trend\TrendValue;

class PostsChart extends ChartWidget
{
    protected static ?string $heading = 'Posts Created';
    
    protected static ?int $sort = 2;
    
    protected function getData(): array
    {
        $data = Trend::model(Post::class)
            ->between(
                start: now()->subMonths(12),
                end: now(),
            )
            ->perMonth()
            ->count();
            
        return [
            'datasets' => [
                [
                    'label' => 'Posts created',
                    'data' => $data->map(fn (TrendValue $value) => $value->aggregate),
                    'backgroundColor' => '#36A2EB',
                    'borderColor' => '#9BD0F5',
                ],
            ],
            'labels' => $data->map(fn (TrendValue $value) => $value->date),
        ];
    }
    
    protected function getType(): string
    {
        return 'line';
    }
}
```

### Table Widget

```php
// app/Filament/Widgets/LatestPosts.php
namespace App\Filament\Widgets;

use App\Models\Post;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget as BaseWidget;

class LatestPosts extends BaseWidget
{
    protected static ?int $sort = 3;
    
    protected int | string | array $columnSpan = 'full';
    
    public function table(Table $table): Table
    {
        return $table
            ->query(
                Post::query()->latest()->limit(5)
            )
            ->columns([
                Tables\Columns\ImageColumn::make('featured_image')
                    ->circular(),
                    
                Tables\Columns\TextColumn::make('title')
                    ->limit(50)
                    ->searchable(),
                    
                Tables\Columns\TextColumn::make('category.name')
                    ->badge(),
                    
                Tables\Columns\TextColumn::make('user.name')
                    ->label('Author'),
                    
                Tables\Columns\TextColumn::make('created_at')
                    ->since(),
            ])
            ->actions([
                Tables\Actions\Action::make('view')
                    ->url(fn (Post $record): string => route('posts.show', $record))
                    ->openUrlInNewTab(),
            ]);
    }
}
```

## Custom Pages

### Creating Custom Pages

```bash
# Create a custom page
php artisan make:filament-page Settings

# Create a page with a specific path
php artisan make:filament-page Reports --path=reports
```

### Settings Page Example

```php
// app/Filament/Pages/Settings.php
namespace App\Filament\Pages;

use Filament\Forms;
use Filament\Forms\Form;
use Filament\Pages\Page;
use Filament\Actions\Action;
use Filament\Notifications\Notification;

class Settings extends Page
{
    protected static ?string $navigationIcon = 'heroicon-o-cog-6-tooth';
    
    protected static string $view = 'filament.pages.settings';
    
    protected static ?string $navigationGroup = 'System';
    
    public ?array $data = [];
    
    public function mount(): void
    {
        $this->form->fill([
            'site_name' => config('app.name'),
            'site_description' => 'A modern blog platform',
            'posts_per_page' => 10,
            'allow_comments' => true,
            'maintenance_mode' => false,
        ]);
    }
    
    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('General Settings')
                    ->schema([
                        Forms\Components\TextInput::make('site_name')
                            ->required()
                            ->maxLength(255),
                            
                        Forms\Components\Textarea::make('site_description')
                            ->rows(3),
                            
                        Forms\Components\TextInput::make('posts_per_page')
                            ->numeric()
                            ->required()
                            ->minValue(1)
                            ->maxValue(50),
                    ])
                    ->columns(2),
                    
                Forms\Components\Section::make('Features')
                    ->schema([
                        Forms\Components\Toggle::make('allow_comments')
                            ->label('Allow Comments'),
                            
                        Forms\Components\Toggle::make('maintenance_mode')
                            ->label('Maintenance Mode'),
                    ])
                    ->columns(2),
                    
                Forms\Components\Section::make('Email Settings')
                    ->schema([
                        Forms\Components\TextInput::make('mail_from_address')
                            ->email()
                            ->required(),
                            
                        Forms\Components\TextInput::make('mail_from_name')
                            ->required(),
                    ])
                    ->columns(2),
            ])
            ->statePath('data');
    }
    
    protected function getFormActions(): array
    {
        return [
            Action::make('save')
                ->label(__('filament-panels::resources/pages/edit-record.form.actions.save.label'))
                ->submit('save'),
        ];
    }
    
    public function save(): void
    {
        $data = $this->form->getState();
        
        // Save settings to database or config files
        // This is a simplified example
        
        Notification::make()
            ->title('Settings saved successfully')
            ->success()
            ->send();
    }
}
```

```blade
{{-- resources/views/filament/pages/settings.blade.php --}}
<x-filament-panels::page>
    <form wire:submit="save">
        {{ $this->form }}
        
        <x-filament-panels::form.actions
            :actions="$this->getFormActions()"
        />
    </form>
</x-filament-panels::page>
```

## Advanced Features

### Custom Form Components

```php
// app/Filament/Forms/Components/ColorPalette.php
namespace App\Filament\Forms\Components;

use Filament\Forms\Components\Field;

class ColorPalette extends Field
{
    protected string $view = 'filament.forms.components.color-palette';
    
    protected array $colors = [
        '#ef4444', // red
        '#f97316', // orange
        '#eab308', // yellow
        '#22c55e', // green
        '#3b82f6', // blue
        '#8b5cf6', // violet
        '#ec4899', // pink
    ];
    
    public function colors(array $colors): static
    {
        $this->colors = $colors;
        
        return $this;
    }
    
    public function getColors(): array
    {
        return $this->colors;
    }
}
```

```blade
{{-- resources/views/filament/forms/components/color-palette.blade.php --}}
<x-dynamic-component
    :component="$getFieldWrapperView()"
    :field="$field"
>
    <div class="grid grid-cols-7 gap-2">
        @foreach ($getColors() as $color)
            <button
                type="button"
                class="w-8 h-8 rounded-full border-2 transition-all
                    {{ $getState() === $color ? 'border-gray-900 scale-110' : 'border-gray-300' }}"
                style="background-color: {{ $color }}"
                wire:click="$set('{{ $getStatePath() }}', '{{ $color }}')"
            >
                <span class="sr-only">{{ $color }}</span>
            </button>
        @endforeach
    </div>
</x-dynamic-component>
```

### Global Search

```php
// app/Models/Post.php
use Filament\GlobalSearch\Contracts\GlobalSearchableContract;
use Filament\GlobalSearch\GlobalSearchResult;

class Post extends Model implements GlobalSearchableContract
{
    // ... existing code
    
    public static function getGlobalSearchResults(string $search): array
    {
        return static::where('title', 'like', "%{$search}%")
            ->orWhere('content', 'like', "%{$search}%")
            ->limit(10)
            ->get()
            ->map(function (Post $post): GlobalSearchResult {
                return new GlobalSearchResult(
                    title: $post->title,
                    url: PostResource::getUrl('edit', ['record' => $post]),
                    details: [
                        'Category' => $post->category->name,
                        'Author' => $post->user->name,
                    ],
                    actions: [
                        'edit' => PostResource::getUrl('edit', ['record' => $post]),
                        'view' => PostResource::getUrl('view', ['record' => $post]),
                    ]
                );
            })
            ->toArray();
    }
    
    public static function getGlobalSearchResultTitle(Model $record): string
    {
        return $record->title;
    }
    
    public static function getGlobalSearchResultDetails(Model $record): array
    {
        return [
            'Category' => $record->category->name,
            'Author' => $record->user->name,
        ];
    }
    
    public static function getGlobalSearchResultActions(Model $record): array
    {
        return [
            'edit' => PostResource::getUrl('edit', ['record' => $record]),
            'view' => PostResource::getUrl('view', ['record' => $record]),
        ];
    }
}
```

### Multi-tenancy

```php
// app/Models/Team.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Team extends Model
{
    protected $fillable = ['name', 'slug'];
    
    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class);
    }
    
    public function posts(): HasMany
    {
        return $this->hasMany(Post::class);
    }
}

// app/Providers/Filament/AdminPanelProvider.php
use App\Models\Team;
use Filament\Http\Middleware\Authenticate;
use Filament\Http\Middleware\DisableBladeIconComponents;
use Filament\Http\Middleware\DispatchServingFilamentEvent;
use Filament\Panel;
use Filament\PanelProvider;
use Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse;
use Illuminate\Cookie\Middleware\EncryptCookies;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;
use Illuminate\Routing\Middleware\SubstituteBindings;
use Illuminate\Session\Middleware\AuthenticateSession;
use Illuminate\Session\Middleware\StartSession;
use Illuminate\View\Middleware\ShareErrorsFromSession;

class AdminPanelProvider extends PanelProvider
{
    public function panel(Panel $panel): Panel
    {
        return $panel
            ->default()
            ->id('admin')
            ->path('admin')
            ->login()
            ->tenant(Team::class)
            ->tenantRegistration()
            ->tenantProfile()
            ->colors([
                'primary' => Color::Amber,
            ])
            // ... rest of configuration
            ;
    }
}
```

## Performance Optimization

### Eager Loading

```php
// In your Resource
public static function getEloquentQuery(): Builder
{
    return parent::getEloquentQuery()
        ->with(['category', 'user', 'tags']);
}

// For table queries
public static function table(Table $table): Table
{
    return $table
        ->modifyQueryUsing(fn (Builder $query) => $query->with(['category', 'user']))
        ->columns([
            // ... columns
        ]);
}
```

### Caching

```php
// app/Filament/Widgets/StatsOverview.php
use Illuminate\Support\Facades\Cache;

class StatsOverview extends BaseWidget
{
    protected function getStats(): array
    {
        return Cache::remember('dashboard-stats', 300, function () {
            return [
                Stat::make('Total Posts', Post::count()),
                Stat::make('Published Posts', Post::whereNotNull('published_at')->count()),
                // ... other stats
            ];
        });
    }
}
```

### Database Optimization

```php
// Add indexes to your migrations
Schema::table('posts', function (Blueprint $table) {
    $table->index(['published_at', 'is_featured']);
    $table->index(['category_id', 'published_at']);
    $table->index(['user_id', 'created_at']);
});

// Use database views for complex queries
DB::statement('
    CREATE VIEW post_stats AS
    SELECT 
        posts.id,
        posts.title,
        categories.name as category_name,
        users.name as author_name,
        COUNT(comments.id) as comments_count
    FROM posts
    LEFT JOIN categories ON posts.category_id = categories.id
    LEFT JOIN users ON posts.user_id = users.id
    LEFT JOIN comments ON posts.id = comments.post_id
    GROUP BY posts.id
');
```

## Deployment and Production

### Environment Configuration

```bash
# .env.production
APP_ENV=production
APP_DEBUG=false
FILAMENT_FILESYSTEM_DISK=s3

# Database
DB_CONNECTION=mysql
DB_HOST=your-db-host
DB_DATABASE=your-database
DB_USERNAME=your-username
DB_PASSWORD=your-secure-password

# File Storage
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=your-bucket-name
```

### Production Optimization

```bash
# Optimize for production
composer install --optimize-autoloader --no-dev
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan filament:cache-components

# Clear caches when needed
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear
```

### Security Best Practices

```php
// app/Providers/Filament/AdminPanelProvider.php
public function panel(Panel $panel): Panel
{
    return $panel
        ->default()
        ->id('admin')
        ->path('admin')
        ->login()
        ->passwordReset()
        ->emailVerification()
        ->profile()
        ->spa() // Enable SPA mode for better performance
        ->unsavedChangesAlerts()
        ->databaseNotifications()
        ->middleware([
            EncryptCookies::class,
            AddQueuedCookiesToResponse::class,
            StartSession::class,
            AuthenticateSession::class,
            ShareErrorsFromSession::class,
            VerifyCsrfToken::class,
            SubstituteBindings::class,
            DisableBladeIconComponents::class,
            DispatchServingFilamentEvent::class,
        ])
        ->authMiddleware([
            Authenticate::class,
        ])
        ->authGuard('web');
}
```

## Conclusion

Filament PHP is a powerful and elegant solution for building admin panels and internal tools with Laravel. Its component-based architecture, extensive customization options, and excellent developer experience make it an ideal choice for rapid development.

**Key Takeaways:**
- Master the resource system for CRUD operations
- Utilize form and table builders effectively
- Create custom widgets for dashboard insights
- Implement proper relationships and eager loading
- Follow security and performance best practices
- Leverage the plugin ecosystem for extended functionality
- Stay updated with Filament releases and community contributions

By following this guide and exploring Filament's extensive documentation, you'll be well-equipped to build sophisticated admin interfaces that provide excellent user experiences and maintainable codebases.

**Next Steps:**
- Explore Filament plugins and community packages
- Build custom form components and table columns
- Implement advanced features like multi-tenancy
- Contribute to the Filament community
- Stay updated with Filament v3 features and improvements

---

*Ready to start building with Filament? Install it in your Laravel project and begin creating beautiful, functional admin panels with minimal effort.*