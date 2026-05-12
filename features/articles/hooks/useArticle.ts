import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getArticleBySlug, updateArticle } from '../services/articleService';
import type { Article } from '../types';

// Hook untuk get article by slug dengan caching
export const useArticleBySlug = (slug?: string) => {
  return useQuery({
    queryKey: ['article', slug],
    queryFn: () => getArticleBySlug(slug!),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Hook untuk update article dengan cache invalidation
export const useUpdateArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ articleUuid, data }: { articleUuid: string; data: Partial<Article> }) =>
      updateArticle(articleUuid, data),
    onSuccess: (_, variables) => {
      // Invalidate cache untuk article yang diupdate
      queryClient.invalidateQueries({ queryKey: ['article'] });
      queryClient.invalidateQueries({ queryKey: ['articles'] });

      // Force refetch article data untuk memastikan data terbaru
      queryClient.refetchQueries({ queryKey: ['article'] });
    },
  });
};

// Hook untuk get articles list dengan caching
export const useArticles = (params = {}) => {
  return useQuery({
    queryKey: ['articles', params],
    queryFn: () => import('../services/articleService').then(({ getArticles }) => getArticles(params)),
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
};
