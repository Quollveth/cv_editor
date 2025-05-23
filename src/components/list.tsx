import { JSX, useContext, useEffect, useReducer, useState } from 'react';
import { AddSymbol, RemoveSymbol } from './svg';
import { ReactSortable } from 'react-sortablejs';
import DropdownButton from './dropdownButton';
import { SettingsContext } from '../settings';
import { EditorLocale } from '../locale';

// ReactSortable type definitions only allows objects with an 'id' field
export type ListItem<T extends Object> = T & {
    id: string;
};

type ListReducerAction<T extends Object> =
    | { type: 'Add' }
    | { type: 'Remove'; idx: number }
    | { type: 'Sort'; data: ListItem<T>[] }
    | { type: 'Edit'; idx: number; data: ListItem<T> };

function ListReducer<T extends Object>(
    factory: () => T,
    state: ListItem<T>[],
    action: ListReducerAction<T>
): ListItem<T>[] {
    switch (action.type) {
        case 'Add':
            return [...state, { ...factory(), id: crypto.randomUUID() }];
        case 'Remove':
            return state.filter((_, i) => i !== action.idx);
        case 'Sort':
            return action.data;
        case 'Edit':
            return state.map((it, idx) =>
                idx === action.idx ? action.data : it
            );
        default:
            const exhaustive: never = action;
            throw new Error(`Dumbass broke the reducer: ${exhaustive}`);
    }
}

//prettier-ignore
type ListReducerType<T extends Object> = (state:ListItem<T>[],action:ListReducerAction<T>) => ListItem<T>[];
//prettier-ignore
function CreateListReducer<T extends Object>(factory: ()=>T): ListReducerType<T> {
    return (state: ListItem<T>[], action: ListReducerAction<T>) => {
        return ListReducer(factory, state, action);
    };
}

export interface ListRenderProps<T> {
    initial: T;
    onChange: (data: T) => void;
}

interface DynamicListProps<T> {
    render: (props: ListRenderProps<T>) => JSX.Element;
    title: () => JSX.Element;
    onChange: (data: T[]) => void;
    emptyFactory: () => T;
    starting?: T[];
}

const DynamicList = <T extends Object>(props: DynamicListProps<T>) => {
    const [settings] = useContext(SettingsContext);

    const initializer = () => {
        const list = (props.starting ?? []).map((item) => ({
            ...item,
            id: crypto.randomUUID(),
        }));
        return list;
    };

    const [items, dispatch] = useReducer(
        CreateListReducer<T>(props.emptyFactory),
        undefined,
        initializer
    );

    useEffect(() => {
        props.onChange(items);
    }, [items]);

    const [expand, setExpand] = useState(true);
    return (
        <div className="p-4 flex flex-1 flex-col mx-auto border-1 border-gray-600 rounded transition my-2">
            <div className="flex gap-2 items-center justify-between mb-4">
                <span className="flex-1">{props.title()}</span>
                <div className="flex gap-2">
                    <DropdownButton state={expand} setState={setExpand} />
                    <button
                        className="flex items-center gap-4 border-1 border-gray-400 p-1 px-2 rounded"
                        onClick={() => dispatch({ type: 'Add' })}
                    >
                        <span>{EditorLocale[settings.language]['ADD']}</span>
                        <div className="hover:text-blue-700">
                            <AddSymbol />
                        </div>
                    </button>
                </div>
            </div>
            {expand && (
                <ReactSortable
                    list={items}
                    setList={(newState: ListItem<T>[]) => {
                        dispatch({ type: 'Sort', data: newState });
                    }}
                >
                    {items.map((it, idx) => (
                        <div
                            key={it.id}
                            className="mb-2 flex items-center justify-between p-3 bg-white rounded border-1 border-gray-400 transition"
                        >
                            <div className="flex-1">
                                {props.render({
                                    initial: it as T,
                                    onChange: (data: T) => {
                                        dispatch({
                                            type: 'Edit',
                                            idx: idx,
                                            data: { ...data, id: it.id },
                                        });
                                    },
                                })}
                            </div>
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
            )}
        </div>
    );
};

export default DynamicList;
