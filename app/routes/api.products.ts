import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';

export async function loader({ request }: LoaderArgs) {
	const { searchParams } = new URL(request.url);
	const search = searchParams.get('search');
	const products = [
		{ id: 1, name: 'SUERO CELULAS MADRE DMAG *260ML', price: 100, stock: 10, tax: 19 },
		{ id: 2, name: 'DRISTANDOL NUEVO', price: 200, stock: 10, tax: 19 },
		{ id: 3, name: 'PDIALYTE *500ML', price: 300, stock: 10, tax: 19 },
		{ id: 4, name: 'ADVIL GRIPA *10UNDS', price: 100, stock: 10, tax: 19 },
		{ id: 5, name: 'MICROPORE 1 PULGADA', price: 200, stock: 10, tax: 19 },
		{ id: 6, name: 'CANDELA GIL', price: 300, stock: 10, tax: 19 },
		{ id: 7, name: 'PAX FORTE PASTILLA', price: 100, stock: 10, tax: 19 },
		{ id: 8, name: 'ADVIL MAX *10 UNIDADES', price: 200, stock: 10, tax: 19 },
		{ id: 9, name: 'ACETAMINOFEN PASTILLAS *300UND', price: 300, stock: 10, tax: 19 },
		{ id: 10, name: 'ADVIL MAX *4UNDS', price: 100, stock: 10, tax: 19 },
		{ id: 11, name: 'DRISTAN TRIPLE ACCION *12UNDS', price: 200, stock: 10, tax: 19 },
		{ id: 12, name: 'DURAFEX PASTILLA *6UNDS', price: 300, stock: 10, tax: 19 },
	];

	return json({
		products: products.filter(product =>
			product.name.toLowerCase().includes(search?.toLowerCase() || ''),
		),
	});
}
