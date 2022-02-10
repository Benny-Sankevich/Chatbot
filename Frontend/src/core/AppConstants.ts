export namespace AppConstants {
  export class Routes {
    public static Login = 'Login';
    public static ChatRoomPage = 'ChatRoomPage';
  }

  // Modules
  export const UiModule = 'ui';
  export const AuthModule = 'auth';
  export const ChatModule = 'chat';

  export class Ui {
    public static GetIsFormDirty = 'getIsFormDirty';
    public static GetPendingRequestsCount = 'getPendingRequestsCount';
    public static GetShowDialogStatus = 'getShowDialogStatus';
    public static MutationSetIsFormDirty = 'setIsFormDirty';
    public static MutationAddPendingRequest = 'addPendingRequest';
    public static MutationRemovePendingRequest = 'removePendingRequest';
    public static MutationShowDialog = 'showDialog';
    public static MutationHideDialog = 'hideDialog';
  }

  export class Auth {
    public static GetAuthUser = 'getAuthUser';
    public static ActionAuthLoggedIn = 'authLoggedIn';
    public static ActionAuthLoggedOut = 'authLoggedOut';
    public static MutationAuthLoggedIn = 'saveUserAuth';
    public static MutationAuthRemove = 'removeUserAuth';
  }
  
  export class Chats {
    public static GetChats = 'getChats';
    public static GetMessageToReplay = 'getMessageToReplay';
    public static ActionClearMsg = 'clearMsg';
    public static ActionLoadHistoryChats = 'loadHistoryChats';
    public static MutationSetHistoryChats = 'setHistoryChats';
    public static MutationAddMsg = 'mutationAddMsg';
    public static MutationClearMsg = 'mutationClearMsg';
    public static MutationSetMessageToReplay = 'mutationSetMessageToReplay';
  }
}
