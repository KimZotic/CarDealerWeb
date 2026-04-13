import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const inquirySchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(6, "Phone is required"),
  email: z
    .string()
    .trim()
    .optional()
    .or(z.literal(""))
    .transform((value) => value || null)
    .refine(
      (value) => value === null || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      "Invalid email",
    ),
  model: z.string().min(1, "Model is required"),
  message: z.string().min(5, "Message is required"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = inquirySchema.safeParse(body);

    if (!parsed.success) {
      return Response.json(
        {
          success: false,
          message: parsed.error.issues[0]?.message ?? "Invalid form data",
        },
        { status: 400 },
      );
    }

    const supabase = await createClient();

    const { error } = await supabase.from("inquiries").insert({
      name: parsed.data.name,
      phone: parsed.data.phone,
      email: parsed.data.email,
      model: parsed.data.model,
      message: parsed.data.message,
      status: "new",
    });

    if (error) {
      return Response.json(
        {
          success: false,
          message: error.message || "Failed to save inquiry",
        },
        { status: 500 },
      );
    }

    return Response.json({
      success: true,
      message: "Inquiry submitted successfully",
    });
  } catch {
    return Response.json(
      {
        success: false,
        message: "Unexpected server error",
      },
      { status: 500 },
    );
  }
}