export enum Success_Message {
    USER_CREATED = 'User created successfully',
    USER_UPDATED = 'User data updated successfully',
    USER_DELETED = 'User data deleted successfully'
}

export enum Error_Message {
    FAILED_TO_DELETE_USER = 'Failed to delete user',
    USER_NOT_FOUND = 'User not found'
}

export enum AppRoutes {
    CreateUser = 'create-user',
    EditUser = 'edit-user',
    UserList = 'user-list',
    Default = '',
    Slash = '/'
}
