require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

// Starter data
const ingredients = [
  { name: 'Plasma Berries', tags: ['sweet', 'rare'] },
  { name: 'Nebula Flour', tags: ['powder', 'grain'] },
  { name: 'Solar Salt', tags: ['salty', 'mineral'] },
];

const methods = [
  { name: 'Blasting', tags: ['intense', 'quick'] },
  { name: 'Gravity Stirring', tags: ['gentle', 'continuous'] },
  { name: 'Photon Baking', tags: ['slow', 'even'] },
];

const seedData = async () => {
  try {
    console.log('Clearing existing data...');
    await supabase.from('recipes').delete().neq('id', 0); // Clear recipes
    await supabase.from('ingredients').delete().neq('id', 0); // Clear ingredients
    await supabase.from('methods').delete().neq('id', 0); // Clear methods

    console.log('Seeding ingredients...');
    for (const ingredient of ingredients) {
      await supabase.from('ingredients').insert(ingredient);
    }

    console.log('Seeding methods...');
    for (const method of methods) {
      await supabase.from('methods').insert(method);
    }

    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error.message);
  }
};

seedData();
