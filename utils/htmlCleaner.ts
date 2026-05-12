/**
 * Utility functions for cleaning HTML content
 */

// Remove inline styles from HTML
export const cleanInlineStyles = (html: string): string => {
  if (!html) return '';

  return html
    // Remove style attributes
    .replace(/\sstyle="[^"]*"/gi, '')
    // Remove class attributes that might contain styling
    .replace(/\sclass="[^"]*"/gi, '')
    // Remove font tags
    .replace(/<\/?font[^>]*>/gi, '')
    // Remove span tags that only contain styling
    .replace(/<span[^>]*>(.*?)<\/span>/gi, '$1')
    // Clean up extra whitespace
    .replace(/\s+/g, ' ')
    .trim();
};

// Clean HTML for editor display (preserve basic formatting)
export const cleanHtmlForEditor = (html: string): string => {
  if (!html) return '';

  // Remove entire style attributes (more reliable than partial removal)
  return html
    .replace(/\sstyle="[^"]*"/gi, '')
    .replace(/\sclass="[^"]*"/gi, '')
    .trim();
};

// Extract clean text content from HTML
export const extractTextContent = (html: string): string => {
  if (!html) return '';

  return html
    .replace(/<[^>]*>/g, '') // Remove all HTML tags
    .replace(/&nbsp;/g, ' ') // Replace non-breaking spaces
    .replace(/\s+/g, ' ') // Clean up whitespace
    .trim();
};
