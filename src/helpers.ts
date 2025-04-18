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
