import { BookVolume } from "@/types/books";

const fetchBookDetails = async (title: string) => {
    try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(title)}&key=${process.env.GOOGLE_BOOKS_API_KEY}`)
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (!data.items || data.items.length === 0) {
            throw new Error('No books found');
        }

        const bookVolumes: BookVolume[] = data.items;
        return bookVolumes;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export default fetchBookDetails;