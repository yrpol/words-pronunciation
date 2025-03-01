import { NextRequest, NextResponse } from "next/server";

const API_KEY = process.env.NEXT_PUBLIC_FORVO_API_KEY;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const word = searchParams.get("word");
  const language = searchParams.get("language") || "en"; // Якщо не передано мову, використовуємо англійську

  if (!word) {
    return NextResponse.json({ error: "No word provided" }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://apifree.forvo.com/key/${API_KEY}/format/json/action/word-pronunciations/word/${word}/language/${language}`,
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
