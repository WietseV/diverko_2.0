import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { name, email, message } = await request.json();
  if (!name || !email || !message) {
    return NextResponse.json({ message: "Missing fields" }, { status: 400 });
  }
  // In a real application, forward to CRM or email provider here.
  console.log("Contact submission", { name, email, message });
  return NextResponse.json({ success: true });
}

export function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}
