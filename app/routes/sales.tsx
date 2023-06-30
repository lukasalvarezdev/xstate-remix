import * as React from 'react';
import { useLoaderData } from '@remix-run/react';
import { json } from '@remix-run/node';
import type { SaleStateType } from '~/machines/sales-machine';
import { SaleServiceProvider, useSaleService } from '~/machines/sales-machine';
import { useSelector } from '@xstate/react';

type SearchProduct = { id: number; name: string; price: number };

export async function loader() {
	return json({
		products: [
			{ id: 1, name: 'Product 1', price: 100 },
			{ id: 2, name: 'Product 2', price: 200 },
			{ id: 3, name: 'Product 3', price: 300 },
		],
	});
}

export default function Component() {
	const { products } = useLoaderData<typeof loader>();

	return (
		<SaleServiceProvider initialProducts={[]}>
			<main className="mx-auto w-[95%] max-w-7xl py-6">
				<div className="flex gap-6 w-full">
					<div className="flex-1">
						<h3 className="font-medium text-xl mb-4">Products</h3>

						<ul>
							{products.map(product => (
								<SearchProductItem key={product.id} product={product} />
							))}
						</ul>
					</div>
					<div className="flex-1">
						<h3 className="font-medium text-xl mb-4">Selected products</h3>

						<SelectedProductsList />

						<TotalToPay />
					</div>
				</div>
			</main>
		</SaleServiceProvider>
	);
}

function addedQuantitySelector(state: SaleStateType, id: number) {
	try {
		const product = productItemSelector(state, id);
		return product.quantity;
	} catch (error) {
		return 0;
	}
}

function SearchProductItem({ product }: { product: SearchProduct }) {
	const service = useSaleService();
	const addedQuantity = useSelector(service, state => addedQuantitySelector(state, product.id));

	return (
		<li key={product.id}>
			<button
				className="w-full p-2 border border-slate-100 rounded-md hover:bg-slate-50 transition-colors mb-4 text-left"
				onClick={() => {
					if (addedQuantity) {
						service.send({
							type: 'UPDATE_PRODUCT',
							product: { ...product, quantity: addedQuantity + 1 },
						});
					} else {
						service.send({ type: 'ADD_PRODUCT', product: { ...product, quantity: 1 } });
					}
				}}
			>
				<div className="flex items-center gap-4 justify-between">
					<p className="font-medium">{product.name}</p>
					<p>${product.price}</p>
				</div>
				{addedQuantity ? (
					<span className="text-sm text-slate-600">{addedQuantity} added</span>
				) : null}
			</button>
		</li>
	);
}

function selectedProductsSelector(state: SaleStateType) {
	return state.context.products;
}

function SelectedProductsList() {
	const service = useSaleService();
	const products = useSelector(service, selectedProductsSelector);

	return (
		<ul>
			{products.map(product => (
				<SelectedProductItem key={product.id} id={product.id} />
			))}
		</ul>
	);
}

function productItemSelector(state: SaleStateType, id: number) {
	const product = state.context.products.find(product => product.id === id);
	if (!product) throw new Error(`Product with id ${id} not found`);
	return product;
}

const SelectedProductItem = React.memo(({ id }: { id: number }) => {
	const service = useSaleService();
	const product = useSelector(service, state => productItemSelector(state, id));
	const inputId = React.useId();

	return (
		<div className="p-4 border-b border-slate-100">
			<div className="flex-1">
				<p className="font-medium">{product.name}</p>
			</div>
			<div className="flex gap-2 justify-between items-end">
				<div className="flex-1">
					<label htmlFor={inputId} className="font-medium text-sm pl-1 text-slate-600">
						Quantity
					</label>
					<input
						type="text"
						name="text"
						className="border border-gray-200 rounded-md pl-3 h-10 block w-full"
						placeholder="10"
						value={product.quantity}
						onChange={e => {
							const rawValue = parseInt(e.currentTarget.value);
							const value = isNaN(rawValue) ? 0 : rawValue;
							const quantity = value < 0 ? 0 : value;
							service.send({ type: 'UPDATE_PRODUCT', product: { ...product, quantity } });
						}}
						id={inputId}
					/>
				</div>
				<button
					className="h-10 border border-red-200 rounded-md bg-red-50 text-red-600 text-sm px-3 hover:bg-red-100 transition-colors"
					onClick={() => service.send({ type: 'REMOVE_PRODUCT', id: product.id })}
				>
					Delete
				</button>
			</div>
		</div>
	);
});

function totalsSelector(state: SaleStateType) {
	return state.context.products.reduce(
		(acc, product) => acc + product.price * product.quantity,
		0,
	);
}

function TotalToPay() {
	const service = useSaleService();
	const total = useSelector(service, totalsSelector);

	return (
		<p className="mt-4">
			Total to pay: <strong>${total}</strong>
		</p>
	);
}
