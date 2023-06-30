var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: !0 }) : target,
  mod
)), __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);

// <stdin>
var stdin_exports = {};
__export(stdin_exports, {
  assets: () => assets_manifest_default,
  assetsBuildDirectory: () => assetsBuildDirectory,
  entry: () => entry,
  future: () => future,
  publicPath: () => publicPath,
  routes: () => routes
});
module.exports = __toCommonJS(stdin_exports);

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
var import_react = require("@remix-run/react"), import_server = require("react-dom/server"), import_jsx_dev_runtime = require("react/jsx-dev-runtime");
function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  let markup = (0, import_server.renderToString)(
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_react.RemixServer, { context: remixContext, url: request.url }, void 0, !1, {
      fileName: "app/entry.server.tsx",
      lineNumber: 12,
      columnNumber: 5
    }, this)
  );
  return responseHeaders.set("Content-Type", "text/html"), new Response("<!DOCTYPE html>" + markup, {
    headers: responseHeaders,
    status: responseStatusCode
  });
}

// app/root.tsx
var root_exports = {};
__export(root_exports, {
  default: () => App,
  links: () => links,
  meta: () => meta
});
var import_react2 = require("@remix-run/react");

// app/tailwind.css
var tailwind_default = "/build/_assets/tailwind-2HG26CAI.css";

// app/root.tsx
var import_jsx_dev_runtime2 = require("react/jsx-dev-runtime"), links = () => [{ rel: "stylesheet", href: tailwind_default }], meta = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1"
});
function App() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("html", { lang: "en", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("head", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react2.Meta, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 17,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react2.Links, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 18,
        columnNumber: 5
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 16,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("body", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react2.Outlet, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 21,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react2.ScrollRestoration, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 22,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react2.Scripts, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 23,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_react2.LiveReload, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 24,
        columnNumber: 5
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 20,
      columnNumber: 4
    }, this)
  ] }, void 0, !0, {
    fileName: "app/root.tsx",
    lineNumber: 15,
    columnNumber: 5
  }, this);
}

// app/routes/index.tsx
var routes_exports = {};
__export(routes_exports, {
  default: () => Index,
  loader: () => loader
});
var React2 = __toESM(require("react")), import_react4 = require("@remix-run/react"), import_node = require("@remix-run/node"), import_react5 = require("@xstate/react");

// app/machine.tsx
var React = __toESM(require("react")), import_react3 = require("@xstate/react"), import_xstate = require("xstate"), import_jsx_dev_runtime3 = require("react/jsx-dev-runtime"), todoMachine = (0, import_xstate.createMachine)({
  id: "todo",
  predictableActionArguments: !0,
  initial: "editing",
  context: { todos: [] },
  states: {
    editing: {
      on: {
        ADD_TODO: {
          actions: (0, import_xstate.assign)({
            todos: ({ todos }, { text }) => todos.concat({ id: todos.length + 1, text, completed: !1 })
          })
        },
        SET_TODOS: { actions: (0, import_xstate.assign)({ todos: (_, { todos }) => todos }) },
        REMOVE_TODO: {
          actions: (0, import_xstate.assign)({
            todos: ({ todos }, { id }) => todos.filter((todo) => todo.id !== id)
          })
        },
        UPDATE_TODO: {
          actions: (0, import_xstate.assign)({
            todos: ({ todos }, { todo }) => {
              let index = todos.findIndex((t) => t.id === todo.id), newTodos = [...todos];
              return newTodos[index] = todo, newTodos;
            }
          })
        }
      }
    },
    working: {}
  }
}), serviceContext = React.createContext(null);
function ServiceProvider({ children, initialTodos }) {
  let service = (0, import_react3.useInterpret)(todoMachine), send = service.send;
  return React.useEffect(() => {
    send({ type: "SET_TODOS", todos: initialTodos });
  }, [initialTodos, send]), /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(serviceContext.Provider, { value: service, children }, void 0, !1, {
    fileName: "app/machine.tsx",
    lineNumber: 63,
    columnNumber: 9
  }, this);
}
function useService() {
  let service = React.useContext(serviceContext);
  if (!service)
    throw new Error("useService must be used within a ServiceProvider");
  return service;
}

// app/routes/index.tsx
var import_jsx_dev_runtime4 = require("react/jsx-dev-runtime");
async function loader() {
  return (0, import_node.json)({
    todos: [
      { id: 1, text: "Buy milk", completed: !1 },
      { id: 2, text: "Buy eggs", completed: !1 },
      { id: 3, text: "Buy bread", completed: !1 }
    ]
  });
}
function Index() {
  let { todos } = (0, import_react4.useLoaderData)();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(ServiceProvider, { initialTodos: todos, children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("main", { className: "mx-auto w-[95%] max-w-md py-6", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("h1", { className: "text-2xl font-medium text-center mb-6", children: [
      "Todo App made by",
      " ",
      /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(
        "a",
        {
          href: "https://github.com/lukasalvarezdev",
          className: "underline",
          target: "_blank",
          rel: "noreferrer",
          children: "Luki"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/index.tsx",
          lineNumber: 27,
          columnNumber: 6
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/routes/index.tsx",
      lineNumber: 25,
      columnNumber: 5
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: "bg-white border border-slate-200 shadow-sm rounded-md overflow-hidden", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: "flex bg-slate-50 border-b border-slate-200 p-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("h2", { className: "text-xl font-medium", children: "Todos" }, void 0, !1, {
        fileName: "app/routes/index.tsx",
        lineNumber: 38,
        columnNumber: 7
      }, this) }, void 0, !1, {
        fileName: "app/routes/index.tsx",
        lineNumber: 37,
        columnNumber: 6
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(TodosList, {}, void 0, !1, {
        fileName: "app/routes/index.tsx",
        lineNumber: 41,
        columnNumber: 6
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(AddTodoForm, {}, void 0, !1, {
        fileName: "app/routes/index.tsx",
        lineNumber: 42,
        columnNumber: 6
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/index.tsx",
      lineNumber: 36,
      columnNumber: 5
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(Totals, {}, void 0, !1, {
      fileName: "app/routes/index.tsx",
      lineNumber: 45,
      columnNumber: 5
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/index.tsx",
    lineNumber: 24,
    columnNumber: 4
  }, this) }, void 0, !1, {
    fileName: "app/routes/index.tsx",
    lineNumber: 23,
    columnNumber: 3
  }, this);
}
var AddTodoForm = React2.memo(() => {
  let [text, setText] = React2.useState(""), { send } = useService();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(
    "form",
    {
      onSubmit: (e) => {
        e.preventDefault(), send({ type: "ADD_TODO", text }), setText("");
      },
      className: "flex gap-2 p-4 items-end",
      children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: "flex-1", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("p", { className: "font-medium mb-2", children: "Add todo" }, void 0, !1, {
            fileName: "app/routes/index.tsx",
            lineNumber: 65,
            columnNumber: 5
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("label", { htmlFor: "add-todo", className: "font-medium text-sm pl-1 text-slate-600", children: "Todo name" }, void 0, !1, {
            fileName: "app/routes/index.tsx",
            lineNumber: 67,
            columnNumber: 5
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(
            "input",
            {
              type: "text",
              name: "text",
              value: text,
              onChange: (e) => setText(e.target.value),
              className: "border border-gray-200 rounded-md pl-3 h-10 block w-full",
              placeholder: 'E.g. "Buy Milk"',
              id: "add-todo"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/index.tsx",
              lineNumber: 70,
              columnNumber: 5
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/routes/index.tsx",
          lineNumber: 64,
          columnNumber: 4
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("button", { className: "h-10 border border-emerald-200 rounded-md bg-emerald-50 text-emerald-600 text-sm px-3 hover:bg-emerald-100 transition-colors whitespace-nowrap", children: "Add Todo" }, void 0, !1, {
          fileName: "app/routes/index.tsx",
          lineNumber: 80,
          columnNumber: 4
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "app/routes/index.tsx",
      lineNumber: 56,
      columnNumber: 3
    },
    this
  );
});
function todosSelector(state) {
  return state.context.todos;
}
var TodosList = React2.memo(() => {
  let service = useService(), todos = (0, import_react5.useSelector)(service, todosSelector);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(import_jsx_dev_runtime4.Fragment, { children: todos.map((todo) => /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(TodoItem, { id: todo.id }, todo.id, !1, {
    fileName: "app/routes/index.tsx",
    lineNumber: 98,
    columnNumber: 5
  }, this)) }, void 0, !1, {
    fileName: "app/routes/index.tsx",
    lineNumber: 96,
    columnNumber: 3
  }, this);
});
function todoItemSelector(state, id) {
  let todo = state.context.todos.find((todo2) => todo2.id === id);
  if (!todo)
    throw new Error(`Todo with id ${id} not found`);
  return todo;
}
var TodoItem = React2.memo(({ id }) => {
  let service = useService(), todo = (0, import_react5.useSelector)(service, (state) => todoItemSelector(state, id)), inputId = React2.useId();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(
    "div",
    {
      className: "flex gap-2 p-4 border-b border-slate-100 justify-between items-end",
      children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: "flex-1", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("label", { htmlFor: inputId, className: "font-medium text-sm pl-1 text-slate-600", children: "Todo name" }, void 0, !1, {
            fileName: "app/routes/index.tsx",
            lineNumber: 121,
            columnNumber: 5
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(
            "input",
            {
              type: "text",
              name: "text",
              className: "border border-gray-200 rounded-md pl-3 h-10 block w-full",
              placeholder: 'E.g. "Buy Milk"',
              value: todo.text,
              onChange: (e) => {
                let text = e.currentTarget.value;
                service.send({ type: "UPDATE_TODO", todo: { ...todo, text } });
              },
              id: inputId
            },
            void 0,
            !1,
            {
              fileName: "app/routes/index.tsx",
              lineNumber: 124,
              columnNumber: 5
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/routes/index.tsx",
          lineNumber: 120,
          columnNumber: 4
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(
          "button",
          {
            className: "h-10 border border-red-200 rounded-md bg-red-50 text-red-600 text-sm px-3 hover:bg-red-100 transition-colors",
            onClick: () => service.send({ type: "REMOVE_TODO", id: todo.id }),
            children: "Delete"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/index.tsx",
            lineNumber: 137,
            columnNumber: 4
          },
          this
        )
      ]
    },
    todo.id,
    !0,
    {
      fileName: "app/routes/index.tsx",
      lineNumber: 116,
      columnNumber: 3
    },
    this
  );
});
function totalsSelector(state) {
  return state.context.todos.length;
}
function Totals() {
  let service = useService(), todosLength = (0, import_react5.useSelector)(service, totalsSelector);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("p", { className: "mt-4", children: [
    "Total todos: ",
    /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("strong", { children: todosLength }, void 0, !1, {
      fileName: "app/routes/index.tsx",
      lineNumber: 157,
      columnNumber: 17
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/index.tsx",
    lineNumber: 156,
    columnNumber: 3
  }, this);
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { entry: { module: "/build/entry.client-C47BMCBS.js", imports: ["/build/_shared/chunk-EYZBAEYQ.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-UUUM7RE7.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/index": { id: "routes/index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/index-GRVJHAUV.js", imports: void 0, hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 } }, version: "18393753", hmr: void 0, url: "/build/manifest-18393753.js" };

// server-entry-module:@remix-run/dev/server-build
var assetsBuildDirectory = "public/build", future = { v2_dev: !1, unstable_postcss: !1, unstable_tailwind: !1, v2_errorBoundary: !1, v2_headers: !1, v2_meta: !1, v2_normalizeFormMethod: !1, v2_routeConvention: !1 }, publicPath = "/build/", entry = { module: entry_server_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/index": {
    id: "routes/index",
    parentId: "root",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: routes_exports
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  assets,
  assetsBuildDirectory,
  entry,
  future,
  publicPath,
  routes
});
//# sourceMappingURL=index.js.map
