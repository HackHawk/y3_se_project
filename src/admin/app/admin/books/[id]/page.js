// TODO: Identify which parts need to be client side. Eg Add to Cart button, and move this parts needing interactivity to their own components
// TODO: No need to export async functions. 


import supabase from "@/lib/supabaseClient";
import UpdateBook from "@/components/BookDetails/UpdateBook";

// Dynamic paths not available should return 404 page
export const dynamicParams = false;

// Refresh the page after 4 seconds
export const revalidate = 4; 

// The following paths are prerendered even before clicked.
export async function generateStaticParams() {
  const { data: books } = await supabase.rpc('retrieve_books');
  return books?.map((book) => ({
    id: (book?.book_id).toString(),
  }));
}

// Function returns book with the ID provided
export async function getBook(id) {
  const { data: book } = await supabase
    .from("books")
    .select()
    .eq("book_id", id);

  //  We return this because the data that is returned is an array
  return book[0];
}

const page = async ({ params: { id } }) => {
  const book = await getBook(id);

  return (
    <>
    <main className="w-full flex flex-col items-center justify-center px-4">
      <div className="max-w-sm w-full text-gray-600">
        <div className="text-center pb-8">
          <div className="mt-5 flex justify-between items-center">
            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
              Edit Book Details
            </h3>
          </div>
        </div>
        <UpdateBook book={book} />
      </div>
    </main>
  </>
  );
};

export default page;