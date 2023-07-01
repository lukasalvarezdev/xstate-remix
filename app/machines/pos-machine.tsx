import * as React from 'react';
import { useInterpret } from '@xstate/react';
import type { StateFrom } from 'xstate';
import { assign, createMachine } from 'xstate';

export type Product = {
	id: number;
	name: string;
	price: number;
	quantity: number;
	tax: number;
};
type PaymentForm = { id: number; amount: number; type: 'cash' | 'card' };

type MachineContext = {
	products: Array<Product>;
	paymentForms: Array<PaymentForm>;
	clientId?: number;
	priceListId?: number;
};
type EventTypes =
	| { type: 'ADD_PRODUCT'; product: Product }
	| { type: 'REMOVE_PRODUCT'; id: Product['id'] }
	| { type: 'SET_PRODUCTS'; products: Array<Product> }
	| { type: 'UPDATE_PRODUCT'; product: Product }
	| { type: 'SET_CLIENT'; clientId: number }
	| { type: 'SET_PRICE_LIST'; priceListId: number }
	| { type: 'RESET_SALE' }
	| { type: 'SET_PAYMENT_FORMS'; paymentForms: Array<PaymentForm> }
	| { type: 'ADD_PAYMENT_FORM'; paymentForm: PaymentForm }
	| { type: 'REMOVE_PAYMENT_FORM'; id: PaymentForm['id'] }
	| { type: 'UPDATE_PAYMENT_FORM'; paymentForm: PaymentForm };

const posMachine = createMachine<MachineContext, EventTypes>({
	id: 'pos',
	predictableActionArguments: true,
	initial: 'editing',
	context: { products: [], paymentForms: [] },
	states: {
		editing: {
			on: {
				ADD_PRODUCT: {
					actions: assign({
						products: ({ products }, { product }) => [product, ...products],
					}),
				},
				SET_PRODUCTS: { actions: assign({ products: (_, { products }) => products }) },
				RESET_SALE: {
					actions: assign({ products: [], clientId: undefined, priceListId: undefined }),
				},
				REMOVE_PRODUCT: {
					actions: assign({
						products: ({ products }, { id }) => products.filter(product => product.id !== id),
					}),
				},
				UPDATE_PRODUCT: {
					actions: assign({
						products: ({ products }, { product }) => {
							const index = products.findIndex(t => t.id === product.id);
							const newProducts = [...products];
							newProducts[index] = product;
							return newProducts;
						},
						paymentForms: ({ paymentForms, products }, { product }) => {
							const paymentForm = paymentForms.length === 1 ? paymentForms[0] : undefined;

							if (paymentForm && products.length === 1) {
								const total = product.price * product.quantity;
								return [{ ...paymentForm, amount: total }];
							}

							return paymentForms;
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
