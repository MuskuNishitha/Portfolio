import dbConnect from "@/lib/mongodb";

export async function GET() {
  try {
    await dbConnect();

    return Response.json({
      success: true,
      message: "MongoDB connected successfully",
    });
  } catch (error) {
    console.error("MongoDB Error:", error);

    return Response.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}