import { ContactInfo } from './components/contact';
import { EducationInfo } from './components/education';

export type CvInfo = {
    name: string;
    about: string;
    contact: ContactInfo[];
    eduMain: EducationInfo[];
    eduExtra: EducationInfo[];
};

export const EmptyCv = () => {
    return {
        name: '',
        about: '',
        contact: [],
        eduMain: [],
        eduExtra: [],
    } as CvInfo;
};

type CvContextType = [CvInfo, React.Dispatch<React.SetStateAction<CvInfo>>];

// if i cared enough this would have a reducer
export const CVContext = React.createContext<CvContextType>([
    EmptyCv(),
    () => {
        alert('some dumbass consumed the context without a provider');
    },
]);
