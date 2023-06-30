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

const posMachine = createMachine<MachineContext, EventTypes>({
	id: 'pos',
	predictableActionArguments: true,
	initial: 'editing',
	context: { products: [] },
	states: {
		editing: {
			on: {
				ADD_PRODUCT: {
					actions: assign({
						products: ({ products }, { product }) => [product, ...products],
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
	},
});

type PosServiceContextType = ReturnType<typeof useInterpret<typeof posMachine>>;
const posServiceContext = React.createContext<PosServiceContextType | null>(null);

type PosServiceProviderProps = { children: React.ReactNode; initialProducts: Array<Product> };
export function PosServiceProvider({ children, initialProducts }: PosServiceProviderProps) {
	const service = useInterpret(posMachine);
	const send = service.send;

	React.useEffect(() => {
		send({ type: 'SET_PRODUCTS', products: initialProducts });
	}, [initialProducts, send]);

	return <posServiceContext.Provider value={service}>{children}</posServiceContext.Provider>;
}

export function usePosService() {
	const service = React.useContext(posServiceContext);
	if (!service) throw new Error('usePosService must be used within a PosServiceProvider');
	return service;
}

export type PosStateType = StateFrom<typeof posMachine>;
