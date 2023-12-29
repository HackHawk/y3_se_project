# delete_user(UUID)
1. Test whether function deletes a *non-super admin* user. Steps: 
    - Create users of all types.
        - Use the GUI to create three users
        - Insert each of those users into `admins`, `sp_admin` and `customers`.
    - Try to delete them with this function.
