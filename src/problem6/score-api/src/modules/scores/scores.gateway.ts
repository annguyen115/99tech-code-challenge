import {
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { LogService } from '@modules/log/log.service';
import { appConfig } from '@config';

@WebSocketGateway({
  namespace: '/score',
  cors: {
    origin: appConfig.cors.origins,
  },
})
export class ScoresGateway implements OnGatewayInit {
  @WebSocketServer()
  server: Server;

  constructor(private readonly logService: LogService) {}

  afterInit() {
    this.logService.info('WebSocket /score initialized');
  }

  emitScoreUpdate() {
    this.server.emit('score-updated');
  }
}
