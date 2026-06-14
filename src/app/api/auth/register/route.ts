import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "../../../../lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, password } = body;

    // 1. Make sure all fields are filled out
    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        { error: "Please fill in all fields." }, 
        { status: 400 }
      );
    }

    // 2. Check if the user already exists in SQLite
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "This email is already registered." }, 
        { status: 400 }
      );
    }

    // 3. Hash the password securely
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Save the new user to the database
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
      }
    });

    // 5. Send success back to the frontend so NextAuth can log them in
    return NextResponse.json({ success: true }, { status: 201 });

  } catch (error: any) {
    console.error("SERVER ERROR:", error);
    return NextResponse.json(
      { error: "Internal Server Error" }, 
      { status: 500 }
    );
  }
}