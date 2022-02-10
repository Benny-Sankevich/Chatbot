import { Msg } from './../store/chats/models';
class FunctionsService {
  getTime = (dateStr: string): string => {
    const date = new Date(dateStr);
    return `${
      functionsService.checkNumber(date.getHours()) + date.getHours()
    }:${functionsService.checkNumber(date.getMinutes()) + date.getMinutes()}`;
  };
  getDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    const month = date.getMonth() + 1;
    return `${functionsService.checkNumber(date.getDate()) + date.getDate()}-${
      functionsService.checkNumber(month) + month
    }-${date.getFullYear()}`;
  };
  checkNumber = (num: number): string => {
    return num < 10 ? '0' : '';
  };
  getMessagesSearchResult(search: string, messagesList: Msg[]): Msg[] {
    if (search === '') return messagesList;
    return messagesList.filter((s) =>
      s.message.toLowerCase().includes(search.toLowerCase())
    );
  }
}
export const functionsService = new FunctionsService();
