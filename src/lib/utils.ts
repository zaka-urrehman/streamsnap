import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}


export const getMonth = (month: number) => {
    const months: string[] = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ]

    if (month < 1 || month > 12) {
        return 'Invalid month number. Please enter a number between 1 and 12.'
    }

    return months[month - 1]
}

/**
 * Adds an element to the array if it does not already exist, 
 * otherwise removes the element from the array.
 *
 * @param arr - The array to check for duplicates.
 * @param el - The element to add or remove.
 * @returns The updated array.
 */
export const duplicateValidation = (arr: string[], el: string) => {
    if (!arr.find((t) => t === el)) {
        arr.push(el)
        return arr
    } else {
        arr = arr.filter((t) => t !== el)
        return arr
    }
}


export const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
};

// A simple text splitter based on double newlines.
function splitTextIntoChunks(text: string, maxChunkLength: number = 1000): string[] {
    // First, split on double newlines as a rough paragraph delimiter.
    const paragraphs = text.split(/\n\s*\n/);
    const chunks: string[] = [];

    for (const para of paragraphs) {
        // If a paragraph is too long, further split by sentence boundaries.
        if (para.length > maxChunkLength) {
            const sentences = para.split(/(?<=[.?!])\s+/);
            let chunk = "";
            for (const sentence of sentences) {
                if ((chunk + sentence).length > maxChunkLength) {
                    chunks.push(chunk.trim());
                    chunk = sentence;
                } else {
                    chunk += " " + sentence;
                }
            }
            if (chunk) chunks.push(chunk.trim());
        } else {
            chunks.push(para.trim());
        }
    }
    return chunks.filter((c) => c.length > 0);
}
