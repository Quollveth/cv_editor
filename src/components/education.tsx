interface Course {
    name: string;
    start: Date;
    end: Date;
    yearOnly?: boolean;
}
export interface EducationInfo {
    name: string;
    what: Course[];
}
