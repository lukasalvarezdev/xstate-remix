import * as React from 'react';
import { useFetcher } from '@remix-run/react';
import type { PosStateType } from '~/machines/pos-machine';
import { PosServiceProvider, usePosService } from '~/machines/pos-machine';
import { useSelector } from '@xstate/react';

type SearchProduct = { id: number; name: string; price: number; stock: number };

export default function Component() {
	return (
		<PosServiceProvider initialProducts={[]}>
			<main className="h-screen flex flex-col">
				<div className="w-full md:grid grid-cols-40/60 flex-1">
					<div className="border-r border-slate-200 flex flex-col">
						<ProductsSearchList />
						<div className="flex-1"></div>
					</div>

					<SelectedProductsList />
				</div>

				<TotalsSummaryFooter />
			</main>
		</PosServiceProvider>
	);
}

function ProductsSearchList() {
	const fetcher = useFetcher();
	const [search, setSearch] = React.useState('');
	const products = fetcher.data?.products as SearchProduct[] | undefined;
	const load = fetcher.load;

	React.useEffect(() => {
		load(`/api/products?search=${search}`);
	}, [load, search]);

	return (
		<div className="flex-1 border-b border-slate-200 overflow-auto relative">
			<div className="flex border-b border-slate-200 sticky top-0 bg-white">
				<button className="h-10 px-3 grid place-items-center border-r border-slate-200 bg-blue-600 text-white hover:bg-blue-700 text-sm">
					Menú
				</button>
				<div className="flex-1">
					<input
						type="text"
						className="pl-3 h-10 block w-full"
						placeholder="Introduce tu búsqueda aquí"
						value={search}
						onChange={e => setSearch(e.target.value)}
						id="products-search-input"
					/>
				</div>
			</div>

			<div>
				{products?.map(product => (
					<ProductSearchItem key={product.id} product={product} />
				))}
			</div>
		</div>
	);
}

function addedQuantitySelector(state: PosStateType, id: number) {
	try {
		const product = productItemSelector(state, id);
		return product.quantity;
	} catch (error) {
		return 0;
	}
}
const ProductSearchItem = React.memo(({ product }: { product: SearchProduct }) => {
	const service = usePosService();
	const addedQuantity = useSelector(service, state => addedQuantitySelector(state, product.id));

	function focusQuantityInput() {
		setTimeout(() => {
			const addedProduct = document.getElementById(`selected-product-${product.id}`);
			const quantityInput = addedProduct?.querySelector('input');
			quantityInput?.focus();
		}, 50);
	}

	return (
		<button
			key={product.id}
			className={`flex justify-between border-b border-slate-200 py-1 px-2 hover:bg-slate-100 w-full ${
				addedQuantity ? 'bg-slate-50' : ''
			}`}
			onClick={() => {
				if (addedQuantity) {
					service.send({
						type: 'UPDATE_PRODUCT',
						product: { ...product, quantity: addedQuantity + 1 },
					});
					focusQuantityInput();
				} else {
					service.send({ type: 'ADD_PRODUCT', product: { ...product, quantity: 1 } });
					focusQuantityInput();
				}
			}}
		>
			<div>
				<p>
					{product.name}{' '}
					{addedQuantity ? (
						<span className="text-xs">
							({addedQuantity === 1 ? '1 agregado' : `${addedQuantity} agregados`})
						</span>
					) : null}
				</p>
			</div>
			<p>
				<span className="text-xs">(x{product.stock - addedQuantity})</span> ${product.price}
			</p>
		</button>
	);
});

function selectedProductsSelector(state: PosStateType) {
	return state.context.products;
}

function SelectedProductsList() {
	const service = usePosService();
	const products = useSelector(service, selectedProductsSelector);

	return (
		<div>
			<div className="grid grid-cols-desktop_pos_products border-b border-slate-200 gap-2">
				<p className="pl-2">Nombre</p>
				<p>Cant.</p>
				<p>Precio</p>
				<p>Total</p>
				<p>Más</p>
			</div>

			<div id="selected-products">
				{products.map(product => (
					<SelectedProductItem key={product.id} id={product.id} />
				))}
			</div>
		</div>
	);
}

function productItemSelector(state: PosStateType, id: number) {
	const product = state.context.products.find(product => product.id === id);
	if (!product) throw new Error(`Product with id ${id} not found`);
	return product;
}

const SelectedProductItem = React.memo(({ id }: { id: number }) => {
	const service = usePosService();
	const product = useSelector(service, state => productItemSelector(state, id));

	return (
		<div
			className="grid grid-cols-desktop_pos_products text-sm py-1 border-b border-slate-200 gap-2 odd:bg-slate-50 items-center"
			id={`selected-product-${id}`}
		>
			<p className="whitespace-nowrap overflow-hidden text-ellipsis pl-2">{product.name}</p>
			<p>
				<input
					type="text"
					className="text-center block border border-slate-200 rounded-none w-16 h-7 focus:ring-0 focus:border-blue-600"
					placeholder="10"
					value={product.quantity}
					onChange={e => {
						const rawValue = parseInt(e.currentTarget.value);
						const value = isNaN(rawValue) ? 0 : rawValue;
						const quantity = value < 0 ? 0 : value;
						service.send({ type: 'UPDATE_PRODUCT', product: { ...product, quantity } });
					}}
					onFocus={e => e.currentTarget.select()}
					onKeyDown={e => {
						const isEnter = e.key === 'Enter';

						// focus price input
						if (isEnter) {
							const nextInput =
								e.currentTarget.parentElement?.nextElementSibling?.querySelector('input');
							nextInput?.focus();
						}
					}}
				/>
			</p>
			<p>
				<input
					type="text"
					className="block border border-slate-200 rounded-none w-full h-7 focus:ring-0 focus:border-blue-600 pl-2"
					placeholder="$ 10,000"
					value={product.price}
					onChange={e => {
						const rawValue = parseInt(e.currentTarget.value);
						const value = isNaN(rawValue) ? 0 : rawValue;
						const price = value < 0 ? 0 : value;
						service.send({ type: 'UPDATE_PRODUCT', product: { ...product, price } });
					}}
					onFocus={e => e.currentTarget.select()}
					onKeyDown={e => {
						const isEnter = e.key === 'Enter';

						// focus search input
						if (isEnter) {
							const nextInput = document.getElementById('products-search-input');
							nextInput?.focus();
						}
					}}
				/>
			</p>
			<p>${product.quantity * product.price}</p>
			<p>Más</p>
		</div>
	);
});

function totalsSelector(state: PosStateType) {
	return state.context.products.reduce(
		(acc, product) => {
			return {
				quantity: acc.quantity + product.quantity,
				total: acc.total + product.quantity * product.price,
			};
		},
		{ quantity: 0, total: 0 },
	);
}

function TotalsSummaryFooter() {
	const service = usePosService();
	const { total } = useSelector(service, totalsSelector);

	return (
		<div className="w-full flex border-t border-slate-200 p-4 justify-between items-center">
			<p className="text-2xl font-medium">
				<span className="text-base">Total:</span> ${total}
			</p>

			<button
				className="px-6 py-2 bg-blue-600 font-medium text-white"
				onClick={() => service.send({ type: 'SET_PRODUCTS', products: [] })}
			>
				Crear venta e imprimir
			</button>
		</div>
	);
}
