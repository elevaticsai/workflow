'use client';

import { useState, useEffect } from 'react';

interface TableData {
  [key: string]: any;
}

export const useTableData = (tableName: string | null) => {
  const [data, setData] = useState<TableData[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Reset state when table name changes
    setData(null);
    setError(null);
    
    // Only fetch if we have a table name and we're in the browser
    if (!tableName || typeof window === 'undefined') return;
    
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Use our Next.js API route to avoid CORS issues
        const response = await fetch(`/api/table/${tableName}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
        }
        
        // Parse the HTML response to extract table data
        const html = await response.text();
        const parsedData = parseTableDataFromHTML(html);
        setData(parsedData);
      } catch (err) {
        console.error('Error fetching table data:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        setData([]);  // Set empty array instead of mock data
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [tableName]);
  
  return { data, isLoading, error };
};

// Function to parse HTML table data from the API response
const parseTableDataFromHTML = (html: string): TableData[] => {
  try {
    // Create a DOM parser to parse the HTML string
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    // Find the table in the HTML
    const table = doc.querySelector('table');
    if (!table) {
      console.error('No table found in the HTML response');
      return [];
    }
    
    // Get table headers
    const headers: string[] = [];
    const headerRow = table.querySelector('thead tr');
    if (headerRow) {
      const headerCells = headerRow.querySelectorAll('th');
      headerCells.forEach(cell => {
        // Convert header text to camelCase for object keys
        const headerText = cell.textContent?.trim().toLowerCase() || '';
        const key = headerText.replace(/\s+/g, '_');
        headers.push(key);
      });
    }
    
    // Get table data rows
    const rows = table.querySelectorAll('tbody tr');
    const tableData: TableData[] = [];
    
    rows.forEach(row => {
      const rowData: TableData = {};
      const cells = row.querySelectorAll('td');
      
      cells.forEach((cell, index) => {
        if (index < headers.length) {
          rowData[headers[index]] = cell.textContent?.trim() || '';
        }
      });
      
      tableData.push(rowData);
    });
    
    return tableData;
  } catch (error) {
    console.error('Error parsing HTML table data:', error);
    return []; 
  }
};
