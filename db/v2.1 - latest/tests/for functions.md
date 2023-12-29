> Note: ~~this~~ means that that test case has been verified.

# delete_user(UUID)
1. ~~Test whether function deletes a *non-super admin* user.~~ 
    - Steps: 
        - Create users of all types.
            - Use the GUI to create three users
            - Insert each of those users into `admins`, `sp_admin` and `customers`.
        - Try to delete them with this function.
    - **EXPECTED BEHAVIOR**: 
        - If the user is either an admin or a customer then the deletion should succeed - the user is removed from `auth.users` and `admins` or `customers` as applicable.
        - ~~If the user is a super admin then the deletion will fail with the following message: "User cannot be deleted because they are a super admin"~~
        - ~~If the user is an `anon` user or is not in `admins` or `customers` then the deletion will fail with "User does not exist, or is not an admin or a customer"~~
    
# 
