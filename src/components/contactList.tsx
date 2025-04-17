import { ReactSortable } from 'react-sortablejs';
import { ContactInfo, CVContext, EmptyContact } from '../data';
import { useContext, useEffect, useReducer } from 'react';
import ContactEdit from './contact';

import { AddSymbol, RemoveSymbol } from './svg';
import { CreateArrayReducer } from '../helpers';

type ContactWithId = ContactInfo & { id: string };

export default function ContactList() {
    //prettier-ignore
    const [contacts, dispatch] = useReducer(
		CreateArrayReducer(EmptyContact), 
		[{ ...EmptyContact(), id: crypto.randomUUID() },] as ContactWithId[]
	);

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
