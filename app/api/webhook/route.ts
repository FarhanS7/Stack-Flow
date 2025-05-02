import { createUser, deleteUser, updateUser } from "@/lib/actions/user.action";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const evt = await verifyWebhook(req);

    const eventType = evt.type;
    const { id } = evt.data;
    // console.log(
    //   `Received webhook with ID ${id} and event type of ${eventType}`
    // );
    // console.log("Webhook payload:", evt.data);

    if (eventType === "user.created") {
      const {
        id,
        email_addresses,
        image_url,
        username,
        first_name,
        last_name,
      } = evt.data;
      const fullName = `${first_name}${last_name ? ` ${last_name}` : ""}`;
      const mongoUser = await createUser({
        clerkId: id!,
        name: fullName,
        username: username!,
        email: email_addresses[0].email_address,
        picture: image_url,
      });
    }

    if (eventType === "user.updated") {
      const {
        id,
        email_addresses,
        image_url,
        username,
        first_name,
        last_name,
      } = evt.data;
      const fullName = `${first_name}${last_name ? ` ${last_name}` : ""}`;
      const mongoUser = await updateUser({
        clerkId: id!,
        updateData: {
          name: fullName,
          username: username!,
          email: email_addresses[0].email_address,
          picture: image_url,
        },
        path: `profile/${id}`,
      });
    }

    if (eventType === "user.deleted") {
      const { id } = evt.data;
      const deletedUser = await deleteUser({ clerkId: id! });
      return NextResponse.json({ message: "OK", user: deletedUser });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
