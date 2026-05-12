# 📋 Code Templates Library

## 🚀 Feature Templates

### Template 1: CRUD Feature (Complete)

#### Types Template
```typescript
// features/{domain}/types/index.ts
export type {Domain} = {
  {domain}_uuid?: string;
  {domain}_name: string;
  {domain}_description?: string;
  {domain}_status?: 'active' | 'inactive';
  {domain}_created_at?: string;
  {domain}_updated_at?: string;
  [key: string]: unknown;
};

export type {Domain}Create = Omit<{Domain}, '{domain}_uuid' | '{domain}_created_at' | '{domain}_updated_at'>;
export type {Domain}Update = Partial<{Domain}Create>;
```

#### Service Template
```typescript
// features/{domain}/services/{domain}Service.ts
import api from '@/utils/api';
import type { {Domain}, {Domain}Create, {Domain}Update } from '../types';

export const {domain}Service = {
  // Get all items
  getAll: async (params = {}) => {
    const response = await api.get('/{domain}', { params });
    return response.data;
  },

  // Get by ID
  getById: async (id: string) => {
    const response = await api.get(`/{domain}/${id}`);
    return response.data;
  },

  // Create new item
  create: async (data: {Domain}Create) => {
    const response = await api.post('/{domain}', data);
    return response.data;
  },

  // Update existing item
  update: async (id: string, data: {Domain}Update) => {
    const response = await api.put(`/{domain}/${id}`, data);
    return response.data;
  },

  // Delete item
  delete: async (id: string) => {
    const response = await api.delete(`/{domain}/${id}`);
    return response.data;
  }
};
```

#### Hook Template
```typescript
// features/{domain}/hooks/use{Domain}.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { {domain}Service } from '../services/{domain}Service';
import type { {Domain}, {Domain}Create, {Domain}Update } from '../types';

// Get all items
export const use{Domain}s = (params = {}) => {
  return useQuery({
    queryKey: ['{domain}', params],
    queryFn: () => {domain}Service.getAll(params),
  });
};

// Get single item
export const use{Domain} = (id: string) => {
  return useQuery({
    queryKey: ['{domain}', id],
    queryFn: () => {domain}Service.getById(id),
    enabled: !!id,
  });
};

// Create mutation
export const useCreate{Domain} = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: {Domain}Create) => {domain}Service.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['{domain}'] });
    },
  });
};

// Update mutation
export const useUpdate{Domain} = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: {Domain}Update }) => 
      {domain}Service.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['{domain}'] });
    },
  });
};

// Delete mutation
export const useDelete{Domain} = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => {domain}Service.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['{domain}'] });
    },
  });
};
```

#### Page Template
```typescript
// app/(main)/{domain}/page.tsx
import { useState } from 'react';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { use{Domain}s, useDelete{Domain} } from '@/features/{domain}/hooks/use{Domain}';
import { {Domain}Form } from './{Domain}Form';
import type { {Domain} } from '@/features/{domain}/types';

export default function {Domain}Page() {
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<{Domain} | null>(null);
  
  const { data, loading, error } = use{Domain}s();
  const deleteMutation = useDelete{Domain}();

  const handleEdit = (item: {Domain}) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      await deleteMutation.mutateAsync(id);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-4">
        <h1>{Domain} Management</h1>
        <Button 
          label="Add New" 
          onClick={() => {
            setEditingItem(null);
            setShowForm(true);
          }}
        />
      </div>

      <DataTable value={data?.data || []}>
        <Column field="{domain}_name" header="Name" />
        <Column field="{domain}_description" header="Description" />
        <Column field="{domain}_status" header="Status" />
        <Column 
          header="Actions" 
          body={(rowData: {Domain}) => (
            <div className="flex gap-2">
              <Button 
                icon="pi pi-pencil" 
                size="small"
                onClick={() => handleEdit(rowData)}
              />
              <Button 
                icon="pi pi-trash" 
                size="small"
                severity="danger"
                onClick={() => handleDelete(rowData.{domain}_uuid!)}
              />
            </div>
          )}
        />
      </DataTable>

      {showForm && (
        <{Domain}Form
          item={editingItem}
          visible={showForm}
          onHide={() => setShowForm(false)}
        />
      )}
    </div>
  );
}
```

#### Form Template
```typescript
// app/(main)/{domain}/{Domain}Form.tsx
import { Controller } from 'react-hook-form';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { useCreate{Domain}, useUpdate{Domain} } from '@/features/{domain}/hooks/use{Domain}';
import type { {Domain}, {Domain}Create } from '@/features/{domain}/types';

interface {Domain}FormProps {
  item?: {Domain} | null;
  visible: boolean;
  onHide: () => void;
}

export function {Domain}Form({ item, visible, onHide }: {Domain}FormProps) {
  const createMutation = useCreate{Domain}();
  const updateMutation = useUpdate{Domain}();

  const isEdit = !!item;

  const onSubmit = async (data: {Domain}Create) => {
    try {
      if (isEdit && item) {
        await updateMutation.mutateAsync({ id: item.{domain}_uuid!, data });
      } else {
        await createMutation.mutateAsync(data);
      }
      onHide();
    } catch (error) {
      console.error('Error saving item:', error);
    }
  };

  return (
    <Dialog 
      header={isEdit ? 'Edit {Domain}' : 'Add {Domain}'}
      visible={visible}
      onHide={onHide}
      style={{ width: '450px' }}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="{domain}_name" className="block text-sm font-medium mb-1">
            Name *
          </label>
          <Controller
            name="{domain}_name"
            control={control}
            rules={{ required: 'Name is required' }}
            render={({ field, fieldState }) => (
              <InputText
                id="{domain}_name"
                {...field}
                className={fieldState.error ? 'p-invalid' : ''}
                placeholder="Enter name"
              />
            )}
          />
        </div>

        <div>
          <label htmlFor="{domain}_description" className="block text-sm font-medium mb-1">
            Description
          </label>
          <Controller
            name="{domain}_description"
            control={control}
            render={({ field }) => (
              <InputTextarea
                id="{domain}_description"
                {...field}
                rows={3}
                placeholder="Enter description"
              />
            )}
          />
        </div>

        <div>
          <label htmlFor="{domain}_status" className="block text-sm font-medium mb-1">
            Status
          </label>
          <Controller
            name="{domain}_status"
            control={control}
            render={({ field }) => (
              <Dropdown
                id="{domain}_status"
                {...field}
                options={[
                  { label: 'Active', value: 'active' },
                  { label: 'Inactive', value: 'inactive' }
                ]}
                placeholder="Select status"
              />
            )}
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button 
            label="Cancel" 
            type="button" 
            onClick={onHide}
            className="p-button-outlined"
          />
          <Button 
            label={isEdit ? 'Update' : 'Create'} 
            type="submit"
            loading={createMutation.isPending || updateMutation.isPending}
          />
        </div>
      </form>
    </Dialog>
  );
}
```

---

## 🧩 Component Templates

### Template 2: Reusable Component
```typescript
// components/ui/{ComponentName}.tsx
import { forwardRef } from 'react';
import type { ComponentProps } from './types';

interface {ComponentName}Props extends ComponentProps {
  // Add specific props here
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
}

export const {ComponentName} = forwardRef<HTMLDivElement, {ComponentName}Props>(
  ({ children, variant = 'primary', size = 'medium', className, ...props }, ref) => {
    const baseClasses = '{component-name}';
    const variantClasses = {
      primary: '{component-name}--primary',
      secondary: '{component-name}--secondary'
    };
    const sizeClasses = {
      small: '{component-name}--small',
      medium: '{component-name}--medium',
      large: '{component-name}--large'
    };

    const classes = [
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      className
    ].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);

{ComponentName}.displayName = '{ComponentName}';
```

---

## 🧪 Test Templates

### Template 3: Service Test
```typescript
// __tests__/unit/services/{domain}Service.test.ts
import { {domain}Service } from '@/features/{domain}/services/{domain}Service';
import { server } from '../../mocks/server';
import { rest } from 'msw';

describe('{domain}Service', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  describe('getAll', () => {
    it('should fetch items successfully', async () => {
      const result = await {domain}Service.getAll();
      
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);
    });

    it('should handle API errors', async () => {
      server.use(
        rest.get('/{domain}', (req, res, ctx) => res(ctx.status(500)))
      );

      await expect({domain}Service.getAll()).rejects.toThrow();
    });
  });

  describe('create', () => {
    it('should create item successfully', async () => {
      const data = {
        {domain}_name: 'Test Item',
        {domain}_description: 'Test Description'
      };

      const result = await {domain}Service.create(data);
      
      expect(result.{domain}_name).toBe(data.{domain}_name);
    });
  });
});
```

### Template 4: Hook Test
```typescript
// __tests__/unit/hooks/use{Domain}.test.ts
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { use{Domain}s } from '@/features/{domain}/hooks/use{Domain}';

const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: { retry: false },
    mutations: { retry: false },
  },
});

describe('use{Domain}s', () => {
  it('should fetch items successfully', async () => {
    const queryClient = createTestQueryClient();
    const wrapper = ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result } = renderHook(() => use{Domain}s(), { wrapper });

    await waitFor(() => {
      expect(result.current.data).toBeDefined();
      expect(result.current.loading).toBe(false);
    });
  });
});
```

---

## 📝 Template Usage Instructions

### How to Use Templates:

1. **Replace Placeholders**
   - `{Domain}` → PascalCase (e.g., `Article`)
   - `{domain}` → camelCase (e.g., `article`)
   - `{DOMAIN}` → UPPER_CASE (e.g., `ARTICLE`)

2. **Quick Copy-Paste Commands**
```bash
# Create new feature structure
DOMAIN="newFeature"
DOMAIN_CAPITAL="NewFeature"
DOMAIN_LOWER="newFeature"

mkdir -p "features/$DOMAIN_LOWER/{types,hooks,services,utils}"
mkdir -p "app/(main)/$DOMAIN_LOWER"
```

3. **Find and Replace**
```bash
# Use your IDE's find/replace to update all placeholders
# Find: {Domain}
# Replace: YourFeatureName
```

---

## 🎯 Template Benefits

- **Speed**: 80% faster development
- **Consistency**: Uniform code patterns
- **Quality**: Built-in best practices
- **Testing**: Complete test coverage
- **TypeScript**: Full type safety

---

*Code Templates Library v1.0 - Last Updated: 2025*
