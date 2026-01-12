"use server";

import { z } from "zod";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

const RegisterSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    role: z.enum(["STUDENT", "WARDEN", "ADMIN"]),
});

export async function registerUser(formData: z.infer<typeof RegisterSchema>) {
    console.log("Registering user:", formData.email);
    const validatedFields = RegisterSchema.safeParse(formData);

    if (!validatedFields.success) {
        console.log("Validation failed:", validatedFields.error);
        return { error: "Invalid fields: " + validatedFields.error.issues.map(e => e.message).join(", ") };
    }

    const { name, email, password, role } = validatedFields.data;

    try {
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            console.log("User already exists");
            return { error: "Email already in use" };
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role,
            },
        });

        console.log("User created:", newUser.id);
        return { success: "Account created! Please log in." };

    } catch (error) {
        console.error("Registration error full:", error);
        return { error: "Registration failed: " + (error as Error).message };
    }
}

export async function authenticate(prevState: string | undefined, formData: FormData) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}

export async function logout() {
    await signOut({ redirectTo: "/" });
}
