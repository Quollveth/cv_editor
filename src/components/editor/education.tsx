import React, { useContext, useEffect, useState } from 'react';
import { Course, EducationInfo, EmptyCourse, EmptyEducation } from '../../data';
import DynamicList, { ListRenderProps } from '../list';
import { SettingsContext } from '../../settings';
import { EditorLocale } from '../../locale';

const CourseEdit = (props: ListRenderProps<Course>) => {
    const [settings] = useContext(SettingsContext);
    const [course, setCourse] = useState(props.initial ?? EmptyCourse());

    const getISODate = (date: Date) => {
        return date instanceof Date && !isNaN(date.getTime())
            ? date.toISOString().split('T')[0]
            : '';
    };

    const initialStartDate = getISODate(course.start);
    const initialEndDate = getISODate(course.end);

    useEffect(() => {
        props.onChange(course);
    }, [course]);

    function parseDateFromInput(value: string): Date {
        const [year, month, day] = value.split('-').map(Number);
        return new Date(year, month - 1, day);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const field = e.target.name;

        let value: string | Date | boolean;

        if (field === 'start' || field === 'end') {
            value = parseDateFromInput(e.target.value);
        } else if (field === 'yearOnly') {
            value = e.target.checked;
        } else {
            value = e.target.value;
        }

        setCourse((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    return (
        <div className="flex items-center space-x-4 p-4 bg-white rounded shadow-sm">
            <input
                type="text"
                placeholder={EditorLocale[settings.language]['COURSE']}
                name="name"
                value={course.name}
                onChange={handleChange}
                className="input input-sm border border-gray-300 rounded px-2 py-1 flex-1"
            />

            <div className="flex items-center space-x-1">
                <label htmlFor="start" className="text-sm text-gray-600">
                    {EditorLocale[settings.language]['START']}
                </label>
                <input
                    id="start"
                    type="date"
                    name="start"
                    value={initialStartDate}
                    onChange={handleChange}
                    className="input input-sm border border-gray-300 rounded px-2 py-1"
                />
            </div>

            <div className="flex items-center space-x-1">
                <label htmlFor="end" className="text-sm text-gray-600">
                    {EditorLocale[settings.language]['END']}
                </label>
                <input
                    id="end"
                    type="date"
                    name="end"
                    value={initialEndDate}
                    onChange={handleChange}
                    className="input input-sm border border-gray-300 rounded px-2 py-1"
                />
            </div>

            <div className="flex items-center space-x-1">
                <input
                    id="yearOnly"
                    type="checkbox"
                    name="yearOnly"
                    checked={course.yearOnly ?? false}
                    onChange={handleChange}
                    className="form-checkbox h-4 w-4 text-blue-600"
                />
                <label htmlFor="yearOnly" className="text-sm text-gray-600">
                    {EditorLocale[settings.language]['YEARONLY']}
                </label>
            </div>
        </div>
    );
};

export default function EducationEdit(props: ListRenderProps<EducationInfo>) {
    const [settings] = useContext(SettingsContext);

    const [data, setData] = useState(props.initial ?? EmptyEducation());
    const editData = (newData: Partial<EducationInfo>) => {
        setData({
            ...data,
            ...newData,
        });
    };

    const CourseChanger = (data: Course[]) => {
        editData({
            what: data,
        });
    };

    useEffect(() => {
        props.onChange(data);
    }, [data]);

    return (
        <div className="p-2 border-1 border-gray-300">
            <DynamicList<Course>
                title={() => (
                    <input
                        className="border-1 border-gray-300 w-full"
                        type="text"
                        value={data.name}
                        placeholder={EditorLocale[settings.language]['SCHOOL']}
                        onInput={(e) =>
                            editData({
                                name: (e.target as HTMLInputElement).value,
                            })
                        }
                    />
                )}
                emptyFactory={EmptyCourse}
                onChange={CourseChanger}
                starting={data.what}
                render={(config: ListRenderProps<Course>) => (
                    <CourseEdit
                        initial={config.initial}
                        onChange={config.onChange}
                    />
                )}
            />
        </div>
    );
}
