import * as React from 'react';
import { useInterpret } from '@xstate/react';
import type { StateFrom } from 'xstate';
import { assign, createMachine } from 'xstate';

export type Product = { id: number; name: string; price: number; quantity: number };
type MachineContext = { products: Array<Product> };
type EventTypes =
	| { type: 'ADD_PRODUCT'; product: Product }
	| { type: 'SET_PRODUCTS'; products: Array<Product> }
	| { type: 'REMOVE_PRODUCT'; id: Product['id'] }
	| { type: 'UPDATE_PRODUCT'; product: Product };

const saleMachine = createMachine<MachineContext, EventTypes>({
	id: 'sale',
	predictableActionArguments: true,
	initial: 'editing',
	context: { products: [] },
	states: {
		editing: {
			on: {
				ADD_PRODUCT: {
					actions: assign({
						products: ({ products }, { product }) => products.concat(product),
					}),
				},
				SET_PRODUCTS: { actions: assign({ products: (_, { products }) => products }) },
				REMOVE_PRODUCT: {
					actions: assign({
						products: ({ products }, { id }) => products.filter(product => product.id !== id),
					}),
				},
				UPDATE_PRODUCT: {
					actions: assign({
						products: ({ products }, { product }) => {
							const index = products.findIndex(t => t.id === product.id);
							const newTodos = [...products];
							newTodos[index] = product;
							return newTodos;
						},
					}),
				},
			},
		},
		working: {},
	},
});

type SaleServiceContextType = ReturnType<typeof useInterpret<typeof saleMachine>>;
const saleServiceContext = React.createContext<SaleServiceContextType | null>(null);

type SaleServiceProviderProps = { children: React.ReactNode; initialProducts: Array<Product> };
export function SaleServiceProvider({ children, initialProducts }: SaleServiceProviderProps) {
	const service = useInterpret(saleMachine);
	const send = service.send;

	React.useEffect(() => {
		send({ type: 'SET_PRODUCTS', products: initialProducts });
	}, [initialProducts, send]);

	return <saleServiceContext.Provider value={service}>{children}</saleServiceContext.Provider>;
}

export function useSaleService() {
	const service = React.useContext(saleServiceContext);
	if (!service) throw new Error('useSaleService must be used within a SaleServiceProvider');
	return service;
}

export type SaleStateType = StateFrom<typeof saleMachine>;
