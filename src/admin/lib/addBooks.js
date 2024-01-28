"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function addBooks(formData) {
  // Extracting values from formData
  const title = formData.get("title");
  const titleAmharic = formData.get("titleAmharic");
  const author = formData.get("author");
  const genre = formData.get("genre");
  const publisher = formData.get("publisher");
  let printVersion = formData.get("printVersion");
  const language = formData.get("language");
  const synopsis = formData.get("synopsis");
  const synopsisAmharic = formData.get("synopsisAmharic");
  let isbn = formData.get("isbn");
  let files = formData.getAll("file");

  // Typecasting quantity, isbn and price to integers
  const quantity = parseInt(formData.get("quantity"), 10);
  const price = parseInt(formData.get("price"), 10);

  //   TYpecasting publication date to date type
  const publicationDate = new Date(formData.get("publicationDate"));

  // Validating mandatory fields
  if (!title || !author || !genre) {
    return { message: "Title, author, and genre are required." };
  }

  // Validating quantity and price
  if (isNaN(quantity) || quantity <= 0) {
    return { message: "Quantity must be a positive number." };
  }
  if (isNaN(price) || price <= 0) {
    return { message: "Price must be a positive number." };
  }

  // Validating ISBN
  if (isbn && (isbn.length != 10 || isbn.length != 13)) {
    return { message: "Invalid ISBN. It should be 10 or 13 characters long." };
  }

  // Typecasting it here because I want the length property of the string to validate it
  isbn = parseInt(formData.get("isbn"), 10);

  // Validating publication date
  if (publicationDate === "Invalid Date") {
    return {
      message: "Invalid publication date. Please provide a valid date.",
    };
  }

  // Handling printVersion
  if (printVersion === "hardcover") {
    printVersion = 1;
  } else if (printVersion === "softcover") {
    printVersion = 0;
  }

  // Create supabase handler using the cookies available
  // cookies function allows to read the HTTP incoming request cookies from a 
  // Server Component or write outgoing request cookies in a Server Action or Route Handler.
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  // Use the JS library to create a bucket.

  if (isbn) {
    const { data: isbnList, error } = await supabase
      .from("books")
      .select("isbn");
    for (let i = 0; i < isbnList.length; i++) {
      if (isbn === isbnList[i].isbn) {
        return { message: "ISBN already exists in catalogue" };
      }
    }
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user = session?.user;

  if (!user) {
    console.error("User is not authenticated");
    return { message: "User is not authenticated" };
  }

  // Handling File Upload
  const coverPageUrl = [];
  if (files && files.length > 0) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileExtension = file.name.split(".").pop();
      const fileName = `${title}-${Date.now()}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("coverpages")
        .upload(fileName, file);
      
      if (uploadError) {
        console.error(uploadError);
        return { message: "Error uploading file" };
      }
      coverPageUrl.push(uploadData.path);
    }
  }

  console.log(coverPageUrl);

  const { data, error } = await supabase.from("books").insert([
    {
      title: title,
      amhr_title: titleAmharic,
      isbn: isbn,
      authors: author,
      genre: genre,
      synopsis: synopsis,
      amhr_synopsis: synopsisAmharic,
      publisher: publisher,
      publication_date: publicationDate,
      is_hardcover: printVersion,
      quantity: quantity,
      price: price,
      cover_page_urls: coverPageUrl, // add the URL/path of the uploaded file
    },
  ]);

  if (error) {
    console.error("Error Inserting Data", error);
    return { message: error.message };
  }

  //   revalidatePath('/admin/manage-catalogue')

  return { message: "success" };
}