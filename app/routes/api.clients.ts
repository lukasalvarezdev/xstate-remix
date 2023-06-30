import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';

type Client = { name: string; id: number };

export async function loader({ request }: LoaderArgs) {
	const { searchParams } = new URL(request.url);
	const search = searchParams.get('search');
	const clients = [
		{ id: 1, name: 'LUKAS ALVAREZ GIRALDO' },
		{ id: 2, name: 'ISABEL CRISTINA ARBELAEZ GIRALDO' },
		{ id: 3, name: 'MATEO RAMIREZ HERNANDEZ' },
	];

	if (search === 'ISA') {
		clients.push({ id: 4, name: 'ISABELA RAMIREZ HERNANDEZ' });
	}

	await sleep(1000);

	return json({
		clients: search ? match(clients, search) : clients,
	});
}

function match(clients: Client[], search: string) {
	return clients.filter(client => client.name.toLowerCase().includes(search.toLowerCase()));
}

// create a sleep function
function sleep(ms: number) {
	return new Promise(resolve => setTimeout(resolve, ms));
}
