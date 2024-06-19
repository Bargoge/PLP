import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import fetchBookDetails from "./fetchBookDetails";

interface ApiKeys {
    GEMINI_API_KEY: string;
    GOOGLE_BOOKS_API_KEY: string;
}

const keys: ApiKeys = {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY ?? (() => { throw new Error("GEMINI_API_KEY is not defined"); })(),
    GOOGLE_BOOKS_API_KEY: process.env.GOOGLE_BOOKS_API_KEY ?? (() => { throw new Error("GOOGLE_BOOKS_API_KEY is not defined"); })()
}

const genAI = new GoogleGenerativeAI(keys.GEMINI_API_KEY);

export async function POST(request: Request, response: Response) {
    const input = await request.json();

    try {
        const prompt = `Give me book suggestions based on "${input.input}", return titles only, maximum 10 titles."`;

        
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const booksReccomended = await response.text();

        const bookTitles = booksReccomended.split("\n").slice(0, 10);

        const booksDataPromises = bookTitles.map(title => fetchBookDetails(title));
        const booksData = await Promise.all(booksDataPromises);
        
        return NextResponse.json(booksData);

    } catch (error) {
        console.error(error);
        return NextResponse.error();
    }
}
