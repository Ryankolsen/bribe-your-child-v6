"use server";

export default async function UpdatePoints(formData: FormData) {
  const rawFormData = formData.get("points");

  console.log("points to be update to: ", rawFormData);
}
