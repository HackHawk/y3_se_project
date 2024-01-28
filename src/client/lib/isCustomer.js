// Checks if the user is a customer
export default async function isAdmin(supabase) {
    const { data, error } = await supabase.rpc('is_customer');
    if (error) {
        console.log(error);
        return false;
    }

    return data;
}
