# 🎨 Code Patterns Library

## 🚀 Common Patterns

### Pattern 1: API Service Pattern
```typescript
// Standard service structure
export const {domain}Service = {
  getAll: async (params = {}) => {
    const response = await api.get('/{endpoint}', { params });
    return response.data;
  },
  
  getById: async (id: string) => {
    const response = await api.get(`/{endpoint}/${id}`);
    return response.data;
  },
  
  create: async (data: CreateType) => {
    const response = await api.post('/{endpoint}', data);
    return response.data;
  },
  
  update: async (id: string, data: UpdateType) => {
    const response = await api.put(`/{endpoint}/${id}`, data);
    return response.data;
  },
  
  delete: async (id: string) => {
    const response = await api.delete(`/{endpoint}/${id}`);
    return response.data;
  }
};
```

### Pattern 2: React Hook Pattern
```typescript
// Query hook
export const use{Domain}s = (params = {}) => {
  return useQuery({
    queryKey: ['{domain}', params],
    queryFn: () => {domain}Service.getAll(params),
  });
};

// Mutation hook
export const useCreate{Domain} = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateType) => {domain}Service.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['{domain}'] });
    },
  });
};
```

### Pattern 3: Form Pattern
```typescript
// Form component with validation
export function {Domain}Form({ item, visible, onHide }: Props) {
  const { control, handleSubmit, formState: { errors } } = useForm<{
    {domain}_name: string;
    {domain}_description?: string;
  }>({
    defaultValues: item || {},
  });

  const createMutation = useCreate{Domain}();
  const updateMutation = useUpdate{Domain}();

  const onSubmit = async (data) => {
    try {
      if (item) {
        await updateMutation.mutateAsync({ id: item.id, data });
      } else {
        await createMutation.mutateAsync(data);
      }
      onHide();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Dialog visible={visible} onHide={onHide}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Form fields */}
      </form>
    </Dialog>
  );
}
```

---

## 🎯 PrimeReact Patterns

### Pattern 4: DataTable Pattern
```typescript
// Standard data table with actions
<DataTable 
  value={data?.data || []}
  loading={loading}
  paginator
  rows={10}
  totalRecords={data?.pagination?.total}
  lazy
  onPage={(e) => setParams({ ...params, page: e.page + 1 })}
>
  <Column field="name" header="Name" sortable />
  <Column field="status" header="Status" body={(data) => (
    <Tag value={data.status} severity={data.status === 'active' ? 'success' : 'danger'} />
  )} />
  <Column header="Actions" body={(data) => (
    <div className="flex gap-2">
      <Button icon="pi pi-pencil" size="small" onClick={() => handleEdit(data)} />
      <Button icon="pi pi-trash" size="small" severity="danger" onClick={() => handleDelete(data.id)} />
    </div>
  )} />
</DataTable>
```

### Pattern 5: Form Validation Pattern
```typescript
// Controller with validation
<Controller
  name="field_name"
  control={control}
  rules={{ 
    required: 'This field is required',
    minLength: { value: 3, message: 'Minimum 3 characters' }
  }}
  render={({ field, fieldState }) => (
    <div>
      <InputText
        {...field}
        className={fieldState.error ? 'p-invalid' : ''}
        placeholder="Enter value"
      />
      {fieldState.error && (
        <small className="p-error">{fieldState.error.message}</small>
      )}
    </div>
  )}
/>
```

---

## 🔧 Utility Patterns

### Pattern 6: Error Handling Pattern
```typescript
// API error handling
try {
  const result = await {domain}Service.create(data);
  toast.current.show({
    severity: 'success',
    summary: 'Success',
    detail: 'Item created successfully'
  });
  return result;
} catch (error) {
  toast.current.show({
    severity: 'error',
    summary: 'Error',
    detail: error.response?.data?.message || 'Failed to create item'
  });
  throw error;
}
```

### Pattern 7: Loading State Pattern
```typescript
// Loading states with skeleton
{loading ? (
  <div className="flex flex-col gap-4">
    <Skeleton height="2rem" />
    <Skeleton height="10rem" />
    <Skeleton height="2rem" />
  </div>
) : error ? (
  <div className="text-center p-4">
    <i className="pi pi-exclamation-triangle text-4xl text-red-500" />
    <p className="mt-2">Error: {error.message}</p>
  </div>
) : (
  <div>{/* Actual content */}</div>
)}
```

---

## 🎨 Component Patterns

### Pattern 8: Page Layout Pattern
```typescript
// Standard page structure
export default function {Domain}Page() {
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  
  return (
    <div className="card">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">{Domain} Management</h1>
          <p className="text-color-secondary">Manage your {domain.toLowerCase()} items</p>
        </div>
        <Button 
          label="Add New" 
          icon="pi pi-plus"
          onClick={() => setShowForm(true)}
        />
      </div>

      {/* Main content */}
      <{Domain}List 
        onEdit={setEditingItem}
        onDelete={handleDelete}
      />

      {/* Form dialog */}
      <{Domain}Form
        visible={showForm || !!editingItem}
        item={editingItem}
        onHide={() => {
          setShowForm(false);
          setEditingItem(null);
        }}
      />
    </div>
  );
}
```

### Pattern 9: Reusable Component Pattern
```typescript
// Generic card component
interface CardProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function Card({ title, subtitle, actions, children, className }: CardProps) {
  return (
    <div className={`card ${className || ''}`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold">{title}</h3>
          {subtitle && <p className="text-color-secondary">{subtitle}</p>}
        </div>
        {actions && <div className="flex gap-2">{actions}</div>}
      </div>
      {children}
    </div>
  );
}
```

---

## 🧪 Testing Patterns

### Pattern 10: Service Test Pattern
```typescript
describe('{domain}Service', () => {
  beforeEach(() => {
    // Setup mocks
  });

  it('should handle successful request', async () => {
    const mockData = { id: '1', name: 'Test' };
    server.use(
      rest.get('/{endpoint}', (req, res, ctx) => 
        res(ctx.json({ data: [mockData] }))
      )
    );

    const result = await {domain}Service.getAll();
    expect(result.data).toEqual([mockData]);
  });

  it('should handle error response', async () => {
    server.use(
      rest.get('/{endpoint}', (req, res, ctx) => 
        res(ctx.status(500), ctx.json({ error: 'Server error' }))
      )
    );

    await expect({domain}Service.getAll()).rejects.toThrow();
  });
});
```

### Pattern 11: Component Test Pattern
```typescript
describe('{Domain}Component', () => {
  const renderComponent = (props = {}) => {
    return render(
      <QueryClientProvider client={createTestQueryClient()}>
        <{Domain}Component {...props} />
      </QueryClientProvider>
    );
  };

  it('should render loading state', () => {
    renderComponent({ loading: true });
    expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument();
  });

  it('should render data when loaded', async () => {
    const mockData = [{ id: '1', name: 'Test' }];
    renderComponent({ data: mockData });
    
    await waitFor(() => {
      expect(screen.getByText('Test')).toBeInTheDocument();
    });
  });
});
```

---

## 🔄 State Management Patterns

### Pattern 12: Local State Pattern
```typescript
// Form state management
const [formData, setFormData] = useState({
  name: '',
  description: '',
  status: 'active'
});

const handleChange = (field: string, value: any) => {
  setFormData(prev => ({ ...prev, [field]: value }));
};

const handleSubmit = async () => {
  try {
    await service.create(formData);
    setFormData({ name: '', description: '', status: 'active' });
  } catch (error) {
    // Handle error
  }
};
```

### Pattern 13: Global State Pattern
```typescript
// Context for global state
const {Domain}Context = createContext<{
  items: {Domain}[];
  loading: boolean;
  refresh: () => void;
}>({
  items: [],
  loading: false,
  refresh: () => {}
});

export function {Domain}Provider({ children }: { children: React.ReactNode }) {
  const { data, loading, refetch } = use{Domain}s();

  return (
    <{Domain}Context.Provider value={{ 
      items: data?.data || [], 
      loading, 
      refresh: refetch 
    }}>
      {children}
    </{Domain}Context.Provider>
  );
}
```

---

## 🎯 Performance Patterns

### Pattern 14: Memoization Pattern
```typescript
// Expensive computation
const expensiveValue = useMemo(() => {
  return data.reduce((acc, item) => acc + item.value, 0);
}, [data]);

// Event handler optimization
const handleClick = useCallback((id: string) => {
  onItemClick(id);
}, [onItemClick]);

// Component memoization
export const {Domain}Card = React.memo(({ item, onClick }: Props) => {
  return (
    <div onClick={() => onClick(item.id)}>
      {/* Card content */}
    </div>
  );
});
```

### Pattern 15: Lazy Loading Pattern
```typescript
// Component lazy loading
const {Domain}Form = lazy(() => import('./{Domain}Form'));

// Usage with suspense
<Suspense fallback={<Skeleton height="200px" />}>
  <{Domain}Form visible={showForm} onHide={handleClose} />
</Suspense>
```

---

## 🔍 Debug Patterns

### Pattern 16: Error Boundary Pattern
```typescript
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center p-4">
          <h2>Something went wrong</h2>
          <p>{this.state.error?.message}</p>
          <Button onClick={() => this.setState({ hasError: false })}>
            Try Again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
```

### Pattern 17: Logging Pattern
```typescript
// Development logging
const logger = {
  info: (message: string, data?: any) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[INFO] ${message}`, data);
    }
  },
  error: (message: string, error?: any) => {
    console.error(`[ERROR] ${message}`, error);
    // Send to error tracking service in production
  },
  debug: (message: string, data?: any) => {
    if (process.env.NODE_ENV === 'development') {
      console.debug(`[DEBUG] ${message}`, data);
    }
  }
};
```

---

## 🎨 Styling Patterns

### Pattern 18: CSS Classes Pattern
```typescript
// Consistent class naming
const classes = {
  card: 'card shadow-2 border-round',
  header: 'flex justify-between items-center mb-4',
  title: 'text-2xl font-bold text-color',
  button: 'p-button p-component',
  loading: 'flex justify-center items-center p-4',
  error: 'text-center text-red-500 p-4'
};

// Usage
<div className={classes.card}>
  <div className={classes.header}>
    <h2 className={classes.title}>Title</h2>
  </div>
</div>
```

### Pattern 19: Responsive Pattern
```typescript
// Responsive design with Tailwind
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {items.map(item => (
    <div key={item.id} className="col-span-1">
      {/* Card content */}
    </div>
  ))}
</div>
```

---

## 🚀 Quick Reference

### When to Use Which Pattern:

| Situation | Pattern | Time to Implement |
|-----------|---------|-------------------|
| New CRUD | Pattern 1, 2, 3 | 20 min |
| Data Table | Pattern 4 | 10 min |
| Form with Validation | Pattern 5 | 15 min |
| Error Handling | Pattern 6 | 5 min |
| Loading States | Pattern 7 | 5 min |
| Page Layout | Pattern 8 | 10 min |
| Reusable Component | Pattern 9 | 15 min |
| Testing | Pattern 10, 11 | 10 min |
| Performance | Pattern 14 | 5 min |

---

*Code Patterns Library v1.0 - Last Updated: 2025*
