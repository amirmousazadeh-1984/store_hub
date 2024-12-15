import supabase, { supabaseUrl } from "./supabase";

export async function getProducts() {
  const { data, error } = await supabase.from("products").select("*");

  if (error) {
    console.error("Error fetching products:", error);
    throw new Error("Cars could not be loaded");
  }

  return data;
}

export async function createEditCar(newCar) {
  let imageName; // Variable to hold the name of the uploaded image

  // Check if a new image needs to be uploaded
  if (newCar.image && newCar.image instanceof File) {
    // Generate a random name for the image
    imageName = `${Math.random()}-${newCar.image.name}`.replaceAll("/", "");

    // Upload the image to Supabase storage
    const { error: storageError } = await supabase.storage
      .from("car_image") // Ensure the bucket name is correct
      .upload(imageName, newCar.image);

    if (storageError) {
      console.error("Upload error:", storageError);
      throw new Error("Image could not be uploaded");
    }

    console.log("Image uploaded successfully, name:", imageName); // Log the name of the uploaded image
  } else {
    // If no new image is provided, use the existing image name
    imageName = newCar.image; // Make sure this is correct
  }

  // Insert or update the product record
  const { data, error } = await supabase
    .from("products")
    .insert([{ ...newCar, image: imageName }]); // Save only the image name

  if (error) {
    console.error("Insert error:", error);
    throw new Error("Car could not be created");
  }

  console.log("Inserted car with image name:", imageName); // Log the name of the image being inserted
  return data;
}

export async function getCar(id) {
  if (!id) {
    throw new Error("Product ID is required");
  }

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching car:", error);
    throw new Error("Car not found");
  }

  return data;
}

export async function updateCar(id, updatedData) {
  if (!id) {
    throw new Error("Product ID is required");
  }

  const { data, error } = await supabase
    .from("products")
    .update(updatedData)
    .eq("id", id);

  if (error) {
    console.error("Update error:", error);
    throw new Error("Car could not be updated");
  }

  console.log("Updated car with ID:", id);
  return data;
}

export async function deleteCar(id) {
  if (!id) {
    throw new Error("Product ID is required");
  }

  const { data, error } = await supabase.from("products").delete().eq("id", id);

  if (error) {
    console.error("Delete error:", error);
    throw new Error("Car could not be deleted");
  }

  console.log("Deleted car with ID:", id);
  return data;
}

export const getImageUrl = (filename) => {
  const publicUrl = `${supabaseUrl}/storage/v1/object/public/car_image/${filename}`;
  return publicUrl;
};
