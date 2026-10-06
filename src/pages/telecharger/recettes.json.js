// Toutes les données brutes (recettes et idées), pour sauvegarde ou réutilisation.
import { getCollection } from 'astro:content';

export async function GET() {
  const recettes = (await getCollection('recettes')).map((r) => ({ slug: r.id, ...r.data }));
  const idees = (await getCollection('idees')).map((i) => ({ id: i.id, ...i.data }));
  return new Response(JSON.stringify({ exporte: new Date().toISOString(), recettes, idees }, null, 2), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
