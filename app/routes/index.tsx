import * as React from 'react';
import { useLoaderData } from '@remix-run/react';
import { json } from '@remix-run/node';
import { useSelector } from '@xstate/react';

import type { StateType } from '~/machine';
import { ServiceProvider, useService } from '~/machine';

export async function loader() {
	return json({
		todos: [
			{ id: 1, text: 'Buy milk', completed: false },
			{ id: 2, text: 'Buy eggs', completed: false },
			{ id: 3, text: 'Buy bread', completed: false },
		],
	});
}

export default function Index() {
	const { todos } = useLoaderData<typeof loader>();

	return (
		<ServiceProvider initialTodos={todos}>
			<main className="mx-auto w-[95%] max-w-md py-6">
				<h1 className="text-2xl font-medium text-center mb-6">
					Todo App made by{' '}
					<a
						href="https://github.com/lukasalvarezdev"
						className="underline"
						target="_blank"
						rel="noreferrer"
					>
						Luki
					</a>
				</h1>
				<div className="bg-white border border-slate-200 shadow-sm rounded-md overflow-hidden">
					<div className="flex bg-slate-50 border-b border-slate-200 p-4">
						<h2 className="text-xl font-medium">Todos</h2>
					</div>

					<TodosList />
					<AddTodoForm />
				</div>

				<Totals />
			</main>
		</ServiceProvider>
	);
}

const AddTodoForm = React.memo(() => {
	const [text, setText] = React.useState('');
	const { send } = useService();

	return (
		<form
			onSubmit={e => {
				e.preventDefault();
				send({ type: 'ADD_TODO', text });
				setText('');
			}}
			className="flex gap-2 p-4 items-end"
		>
			<div className="flex-1">
				<p className="font-medium mb-2">Add todo</p>

				<label htmlFor="add-todo" className="font-medium text-sm pl-1 text-slate-600">
					Todo name
				</label>
				<input
					type="text"
					name="text"
					value={text}
					onChange={e => setText(e.target.value)}
					className="border border-gray-200 rounded-md pl-3 h-10 block w-full"
					placeholder='E.g. "Buy Milk"'
					id="add-todo"
				/>
			</div>
			<button className="h-10 border border-emerald-200 rounded-md bg-emerald-50 text-emerald-600 text-sm px-3 hover:bg-emerald-100 transition-colors whitespace-nowrap">
				Add Todo
			</button>
		</form>
	);
});

function todosSelector(state: StateType) {
	return state.context.todos;
}

const TodosList = React.memo(() => {
	const service = useService();
	const todos = useSelector(service, todosSelector);

	return (
		<>
			{todos.map(todo => (
				<TodoItem key={todo.id} id={todo.id} />
			))}
		</>
	);
});

function todoItemSelector(state: StateType, id: number) {
	const todo = state.context.todos.find(todo => todo.id === id);
	if (!todo) throw new Error(`Todo with id ${id} not found`);
	return todo;
}

const TodoItem = React.memo(({ id }: { id: number }) => {
	const service = useService();
	const todo = useSelector(service, state => todoItemSelector(state, id));
	const inputId = React.useId();

	return (
		<div
			key={todo.id}
			className="flex gap-2 p-4 border-b border-slate-100 justify-between items-end"
		>
			<div className="flex-1">
				<label htmlFor={inputId} className="font-medium text-sm pl-1 text-slate-600">
					Todo name
				</label>
				<input
					type="text"
					name="text"
					className="border border-gray-200 rounded-md pl-3 h-10 block w-full"
					placeholder='E.g. "Buy Milk"'
					value={todo.text}
					onChange={e => {
						const text = e.currentTarget.value;
						service.send({ type: 'UPDATE_TODO', todo: { ...todo, text } });
					}}
					id={inputId}
				/>
			</div>
			<button
				className="h-10 border border-red-200 rounded-md bg-red-50 text-red-600 text-sm px-3 hover:bg-red-100 transition-colors"
				onClick={() => service.send({ type: 'REMOVE_TODO', id: todo.id })}
			>
				Delete
			</button>
		</div>
	);
});

function totalsSelector(state: StateType) {
	return state.context.todos.length;
}

function Totals() {
	const service = useService();
	const todosLength = useSelector(service, totalsSelector);

	return (
		<p className="mt-4">
			Total todos: <strong>{todosLength}</strong>
		</p>
	);
}
