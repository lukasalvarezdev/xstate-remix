import * as React from 'react';
import { useInterpret } from '@xstate/react';
import type { StateFrom } from 'xstate';
import { assign, createMachine } from 'xstate';

type Todo = { id: number; text: string; completed: boolean };
type MachineContext = { todos: Array<Todo> };
type EventTypes =
	| { type: 'ADD_TODO'; text: Todo['text'] }
	| { type: 'SET_TODOS'; todos: Array<Todo> }
	| { type: 'REMOVE_TODO'; id: Todo['id'] }
	| { type: 'UPDATE_TODO'; todo: Todo };

const todoMachine = createMachine<MachineContext, EventTypes>({
	id: 'todo',
	predictableActionArguments: true,
	initial: 'editing',
	context: { todos: [] },
	states: {
		editing: {
			on: {
				ADD_TODO: {
					actions: assign({
						todos: ({ todos }, { text }) => {
							return todos.concat({ id: todos.length + 1, text, completed: false });
						},
					}),
				},
				SET_TODOS: { actions: assign({ todos: (_, { todos }) => todos }) },
				REMOVE_TODO: {
					actions: assign({
						todos: ({ todos }, { id }) => todos.filter(todo => todo.id !== id),
					}),
				},
				UPDATE_TODO: {
					actions: assign({
						todos: ({ todos }, { todo }) => {
							const index = todos.findIndex(t => t.id === todo.id);
							const newTodos = [...todos];
							newTodos[index] = todo;
							return newTodos;
						},
					}),
				},
			},
		},
		working: {},
	},
});

type ServiceContextType = ReturnType<typeof useInterpret<typeof todoMachine>>;
const serviceContext = React.createContext<ServiceContextType | null>(null);

type ServiceProviderProps = { children: React.ReactNode; initialTodos: Array<Todo> };
export function ServiceProvider({ children, initialTodos }: ServiceProviderProps) {
	const service = useInterpret(todoMachine);
	const send = service.send;

	React.useEffect(() => {
		send({ type: 'SET_TODOS', todos: initialTodos });
	}, [initialTodos, send]);

	return <serviceContext.Provider value={service}>{children}</serviceContext.Provider>;
}

export function useService() {
	const service = React.useContext(serviceContext)!;
	if (!service) throw new Error('useService must be used within a ServiceProvider');
	return service;
}

export type StateType = StateFrom<typeof todoMachine>;
