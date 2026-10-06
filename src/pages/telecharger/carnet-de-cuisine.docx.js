// Tout le carnet en un fichier Word, régénéré à chaque build.
import { getCollection } from 'astro:content';
import { carnetWord } from '../../lib/export-word.js';

export async function GET() {
  const buffer = await carnetWord(await getCollection('recettes'), await getCollection('idees'));
  return new Response(buffer, {
    headers: { 'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' },
  });
}
