import { ReactNode, useReducer } from 'react';
import { AddSymbol, RemoveSymbol } from './svg';
import { ReactSortable } from 'react-sortablejs';

// ReactSortable type definitions only allows objects with an 'id' field
type ListItem = {
    id: string;
};

type ListReducerAction =
    | { type: 'Add' }
    | { type: 'Remove'; idx: number }
    | { type: 'Sort'; data: ListItem[] };

const ListReducer = (
    state: ListItem[],
    action: ListReducerAction
): ListItem[] => {
    switch (action.type) {
        case 'Add':
            return [...state, { id: crypto.randomUUID() }];
        case 'Remove':
            return state.filter((_, i) => i !== action.idx);
        case 'Sort':
            return action.data;
        default:
            throw new Error(
                `Congrats you broke the reducer: ${(action as any).type}`
            );
    }
};

const DynamicList = ({ children }: { children: ReactNode }) => {
    const [items, dispatch] = useReducer(ListReducer, []);

    return (
        <div className="p-4 max-w-md mx-auto">
            <button
                onClick={() => dispatch({ type: 'Add' })}
                className="mb-4 flex items-center gap-2 px-4 py-2 border-1 border-gray-600 rounded transition"
            >
                <div className="hover:text-blue-700">
                    <AddSymbol />
                </div>
                <span>Add Item</span>
            </button>

            <ReactSortable
                list={items}
                setList={(newState: ListItem[]) => {
                    dispatch({ type: 'Sort', data: newState });
                }}
            >
                {items.map((it, idx) => (
                    <div
                        key={it.id}
                        className="mb-2 flex items-center justify-between p-3 bg-white rounded border-1 border-gray-600 transition"
                    >
                        <div className="flex-1">{children}</div>
                        <button
                            onClick={() =>
                                dispatch({ type: 'Remove', idx: idx })
                            }
                            className="ml-4 hover:text-red-700 transition"
                        >
                            <RemoveSymbol />
                        </button>
                    </div>
                ))}
            </ReactSortable>
        </div>
    );
};

export default DynamicList;
