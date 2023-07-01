import { useFetcher } from '@remix-run/react';
import * as React from 'react';

// TODO: WORK WITH SEARCH PARAMS
// TODO: USEONCLICKOUTSIDE
// TODO: USEDEBOUNCE

type ClientComboboxProps = { onChange?: (client: Client) => void; defaultValue?: Client };
export function ClientCombobox({ onChange, defaultValue }: ClientComboboxProps) {
	const [state, dispatch] = React.useReducer(reducer, {
		...initialState,
		selectedClient: defaultValue || initialState.selectedClient,
	});
	const { isOpen, selectedClient, search } = state;
	const inputRef = React.useRef<HTMLInputElement>(null);
	const fetcher = useFetcher();

	const load = fetcher.load;
	const clientsData = (fetcher.data?.clients || []) as Client[];
	const isLoading = fetcher.state !== 'idle';
	const clients = isLoading && search ? match(clientsData, search) : clientsData;

	React.useEffect(() => {
		load(`/api/clients?search=${search}`);
	}, [load, search]);

	React.useEffect(() => {
		if (isOpen) inputRef.current?.focus();
	}, [isOpen]);

	return (
		<div className="relative">
			<button
				className="border border-slate-200 flex items-center justify-between px-3 py-2 w-full hover:bg-slate-50 whitespace-nowrap overflow-hidden overflow-ellipsis"
				onClick={() => dispatch({ type: isOpen ? 'close' : 'open' })}
			>
				{selectedClient.name}
			</button>

			{isOpen ? (
				<div className="absolute top-full mt-4 bg-white shadow-md rounded-md w-full z-10">
					<div className="p-2">
						<input
							type="text"
							name="text"
							className="border border-gray-200 pl-3 h-10 block w-full"
							placeholder="Buscar cliente"
							ref={inputRef}
							value={search}
							onChange={e => dispatch({ type: 'search', payload: e.target.value })}
						/>
					</div>

					{isLoading && clients.length === 0 ? (
						<p className="p-2">Cargando...</p>
					) : (
						<ul className="divide-y divide-slate-100">
							{clients.map(client => (
								<li key={client.id}>
									<button
										className={`w-full text-left px-3 py-2 hover:bg-slate-100 ${
											client.id === selectedClient.id ? 'bg-slate-50 font-medium' : ''
										}`}
										onClick={() => {
											dispatch({ type: 'select', payload: client });
											onChange?.(client);
										}}
									>
										{client.name}
									</button>
								</li>
							))}
						</ul>
					)}
				</div>
			) : null}
		</div>
	);
}

type Client = { id: number; name: string };
type State = { isOpen: boolean; selectedClient: Client; search: string };
type Action =
	| { type: 'open' }
	| { type: 'close' }
	| { type: 'select'; payload: Client }
	| { type: 'search'; payload: string };

function reducer(state: State, action: Action) {
	switch (action.type) {
		case 'open':
			return { ...state, isOpen: true };
		case 'close':
			return { ...state, isOpen: false };
		case 'select':
			return { ...state, selectedClient: action.payload, isOpen: false, search: '' };
		case 'search':
			return { ...state, search: action.payload };
		default:
			return state;
	}
}

const initialState = {
	isOpen: false,
	selectedClient: { id: 1, name: 'LUKAS ALVAREZ GIRALDO' },
	search: '',
};

function match(clients: Client[], search: string) {
	return clients.filter(client => client.name.toLowerCase().includes(search.toLowerCase()));
}

type PriceListPopoverProps = {
	onChange: (priceList: PriceList) => void;
	defaultValue: PriceList;
};
export function PriceListPopover({ onChange, defaultValue }: PriceListPopoverProps) {
	const [priceList, setPriceList] = React.useState(defaultValue);
	const [isOpen, setIsOpen] = React.useState(false);

	return (
		<div className="relative">
			<button
				className="border border-slate-200 flex items-center justify-between px-3 py-2 w-full hover:bg-slate-50"
				onClick={() => setIsOpen(!isOpen)}
			>
				{priceList.name}
			</button>

			{isOpen ? (
				<div className="absolute top-full mt-4 bg-white shadow-md rounded-md w-full z-10">
					{priceLists.length === 0 ? (
						<p className="p-2">No hay listas de precios</p>
					) : (
						<ul className="divide-y divide-slate-100">
							{priceLists.map(price => (
								<li key={price.id}>
									<button
										className={`w-full text-left px-3 py-2 hover:bg-slate-100 ${
											price.id === priceList.id ? 'bg-slate-50 font-medium' : ''
										}`}
										onClick={() => {
											setPriceList(price);
											setIsOpen(false);
											onChange(price);
										}}
									>
										{price.name}
									</button>
								</li>
							))}
						</ul>
					)}
				</div>
			) : null}
		</div>
	);
}

type PriceList = { id: number; name: string };
const priceLists = [
	{ id: 1, name: 'Lista 1' },
	{ id: 2, name: 'Lista 2' },
	{ id: 3, name: 'Lista 3' },
];
