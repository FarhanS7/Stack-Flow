import { verifyWebhook } from "@clerk/nextjs/webhooks";

export async function POST(req: Request) {
  try {
    const evt = await verifyWebhook(req);

    // Do something with payload
    // For this guide, log payload to console
    const { id } = evt.data;
    const eventType = evt.type;

    if (eventType === "user.created") {
      const {
        id,
        email_addresses,
        image_url,
        username,
        first_name,
        last_name,
      } = evt.data;

      const mongoUser = await createUser({
        clerkId: id,
        name: `${first_name} ${last_name}`,
        username,
        email: email_addresses[0].email_address,
        picture: image_url,
      });
    }
    console.log(
      `Received webhook with ID ${id} and event type of ${eventType}`
    );
    console.log("Webhook payload:", evt.data);

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
