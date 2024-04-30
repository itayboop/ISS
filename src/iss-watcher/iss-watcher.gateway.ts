import { WebSocketGateway, WebSocketServer, WsException } from "@nestjs/websockets";
import { IssService } from "src/iss/iss.service";
import { Server } from "socket.io";

@WebSocketGateway()
export class IssWatcherGateway {
  constructor(private readonly issService: IssService) {
    setInterval(() => {
      this.emitMessageToClients();
    }, 10000);
  }

  @WebSocketServer()
  server: Server;

  private emitMessageToClients() {
    console.log('sending');
    try {
      const issCountry = this.issService.getIssCountry();

      this.server.emit(
        'response',
        {
          data: issCountry,
        }
      );
    } catch (error) {
      throw new WsException(error);
    }
  }
}
