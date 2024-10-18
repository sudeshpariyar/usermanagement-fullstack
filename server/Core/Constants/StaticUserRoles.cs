namespace server.Core.Constants
{
    public static class StaticUserRoles
    {
        public const string OWNER = "OWNER";
        public const string ADMIN = "ADMIN";
        public const string MANAGER = "MANAGER";
        public const string USER = "USER";

        public const string OWNERADMIN = "OWNER,ADMIN";
        public const string OWNERADMINMANAGER = "OWNER,ADMIN,MANAGER";
        public const string OWNERADMINMANAGERUSER = "OWNER,ADMIN,MANAGER,USER";

    }
}
