import { ReactSortable } from 'react-sortablejs';
import { ContactInfo, CVContext, EmptyContact } from '../data';
import { useContext, useEffect, useReducer } from 'react';
import ContactEdit from './contact';

//prettier-ignore
type ContactWithId = ContactInfo & {id: string};

type ContactsActions =
    | { type: 'Add' }
    | { type: 'Remove'; idx: number }
    | { type: 'Edit'; idx: number; data: Partial<ContactInfo> }
    | { type: 'Sort'; data: ContactWithId[] };

//prettier-ignore
const ContactsReducer = (state: ContactWithId[], action: ContactsActions):ContactWithId[] => {
    switch (action.type) {
        case 'Add':
            return [...state, {...EmptyContact(),id:crypto.randomUUID()}];
        case 'Remove':
            return state.filter((_, i) => i !== action.idx);
        case 'Edit':
            return state.map((e, i) =>
                i === action.idx ? { ...e, ...action.data } : e
            );
		case 'Sort':
			return action.data;
		default:
			throw new DOMException("Congrats you broke the reducer")
    }
};

const AddSymbol = () => (
    <svg
        className="w-12 h-12"
        width="1em"
        height="1em"
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="currentColor"
    >
        <circle cx="32" cy="32" r="24" />
        <line x1="20" y1="32" x2="44" y2="32" />
        <line x1="32" y1="20" x2="32" y2="44" />
    </svg>
);

const RemoveSymbol = () => (
    <svg
        className="w-12 h-12 icon text-gray-500"
        width="1em"
        height="1em"
        viewBox="0 0 1024 1024"
        fill="currentColor"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M512 897.6c-108 0-209.6-42.4-285.6-118.4-76-76-118.4-177.6-118.4-285.6 0-108 42.4-209.6 118.4-285.6 76-76 177.6-118.4 285.6-118.4 108 0 209.6 42.4 285.6 118.4 157.6 157.6 157.6 413.6 0 571.2-76 76-177.6 118.4-285.6 118.4z m0-760c-95.2 0-184.8 36.8-252 104-67.2 67.2-104 156.8-104 252s36.8 184.8 104 252c67.2 67.2 156.8 104 252 104 95.2 0 184.8-36.8 252-104 139.2-139.2 139.2-364.8 0-504-67.2-67.2-156.8-104-252-104z"
            fill=""
        />
        <path
            d="M707.872 329.392L348.096 689.16l-31.68-31.68 359.776-359.768z"
            fill=""
        />
        <path d="M328 340.8l32-31.2 348 348-32 32z" fill="" />
    </svg>
);

export default function ContactList() {
    const [contacts, dispatch] = useReducer(ContactsReducer, [
        { ...EmptyContact(), id: crypto.randomUUID() },
    ] as ContactWithId[]);

    const [CvData, setCvData] = useContext(CVContext);

    useEffect(() => {
        setCvData({ ...CvData, contact: contacts });
    }, [contacts]);

    return (
        <>
            <button
                className="cursor-pointer"
                onClick={() => dispatch({ type: 'Add' })}
            >
                <AddSymbol />
            </button>
            <ReactSortable
                list={contacts}
                setList={(newState: ContactWithId[]) => {
                    dispatch({ type: 'Sort', data: newState });
                }}
            >
                {contacts.map((c, i) => (
                    <div key={c.id}>
                        <div className="flex items-center">
                            <ContactEdit
                                initial={contacts[i]}
                                onChange={(newData: ContactInfo) =>
                                    dispatch({
                                        type: 'Edit',
                                        idx: i,
                                        data: newData,
                                    })
                                }
                            />
                            <button
                                onClick={() =>
                                    dispatch({ type: 'Remove', idx: i })
                                }
                            >
                                <RemoveSymbol />
                            </button>
                        </div>
                    </div>
                ))}
            </ReactSortable>
        </>
    );
}
