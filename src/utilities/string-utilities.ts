export function padWithZeros(value: any, padCount: number, padValue?: string): string {
    return Array(padCount - String(value).length + 1).join(padValue || '0') + value;
}

export function isStringNullOrEmpty(value: string | null): boolean {
    if (!value) {
        return true;
    }

    if (value.length == 0) {
        return true;
    }

    return false;
}

export function isStringNullOrWhitespace(value: string | null): boolean {
    if (!value) {
        return true;
    }

    if (value.trim().length == 0) {
        return true;
    }

    return false;
}
