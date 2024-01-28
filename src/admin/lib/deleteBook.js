'use server';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function deleteBook(bookId) {
  // Create supabase handler using the cookies available
  // cookies function allows to read the HTTP incoming request cookies from a
  // Server Component or write outgoing request cookies in a Server Action or Route Handler.
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user = session?.user;

  if (!user) {
    console.error('User is not authenticated');
    return { message: 'User is not authenticated' };
  }

  const { data, error } = await supabase
    .from('books')
    .delete()
    .eq('book_id', bookId); // Matching the book by ID for update

  if (error) {
    console.error('Error Updating Data', error);
    return { message: error };
  }

  //   revalidatePath('/admin/manage-catalogue')

  return { message: error };
}
