export function isEmail(email: string): boolean {
    const pattern: RegExp = /^\S+@\S+\.\S+$/;
    return pattern.test(email);
}