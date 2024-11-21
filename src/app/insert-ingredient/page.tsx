"use client"
import React, { useState, useEffect } from 'react';
import supabase from '../supabaseClient/supabaseClient';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Ingredient {
  id: number;
  name: string;
}


function MyComponent() {
  const [data, setData] = useState<Ingredient[]>([]);

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase
        .from('Ingredients')
        .select('*');

      if (error) {
        console.error('Error fetching data:', error);
      } else {
        setData(data || []);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      {data.map((item) => (
        <p key={item.id}>{item.name}</p>
      ))}
    </div>
  );
}

export default MyComponent;