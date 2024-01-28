// Checks if the user is an admin
export default async function isAdmin(supabase) {
  const { data, error } = await supabase.rpc('is_admin');
  if (error) {
    console.log(error);
    return false;
  }

  return data;
}
