export const GetAge = (birthdayStr: string): number => {
    const today = new Date();
    const birthDate = new Date(birthdayStr);

    let age = today.getFullYear() - birthDate.getFullYear();

    const happened =
        today.getMonth() > birthDate.getMonth() ||
        (today.getMonth() === birthDate.getMonth() &&
            today.getDate() >= birthDate.getDate());

    if (!happened) {
        age--;
    }

    return age;
};

type GenericWithId<T extends Object> = T & { id: string };
type ArrayReducerType<T extends Object> =
    | { type: 'Add' }
    | { type: 'Remove'; idx: number }
    | { type: 'Edit'; idx: number; data: Partial<T> }
    | { type: 'Sort'; data: GenericWithId<T>[] };

const GenericArrayReducer = <T extends Object>(
    empty: () => T,
    state: GenericWithId<T>[],
    action: ArrayReducerType<T>
): GenericWithId<T>[] => {
    switch (action.type) {
        case 'Add':
            return [...state, { ...empty(), id: crypto.randomUUID() }];
        case 'Remove':
            return state.filter((_, i) => i !== action.idx);
        case 'Edit':
            return state.map((e, i) =>
                i === action.idx ? { ...e, ...action.data } : e
            );
        case 'Sort':
            return action.data;
        default:
            throw new Error(
                `Congrats you broke the reducer: ${(action as any).type}`
            );
    }
};

export function CreateArrayReducer<T extends Object>(
    emptyFactory: () => T
): (
    state: GenericWithId<T>[],
    action: ArrayReducerType<T>
) => GenericWithId<T>[] {
    return (state: GenericWithId<T>[], action: ArrayReducerType<T>) => {
        return GenericArrayReducer(emptyFactory, state, action);
    };
}

