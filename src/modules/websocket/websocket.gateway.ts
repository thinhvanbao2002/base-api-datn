import { OnModuleInit } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import {
	ConnectedSocket,
	MessageBody,
	OnGatewayConnection,
	OnGatewayDisconnect,
	OnGatewayInit,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway({ cors: { origin: "*" } })
export class WebsocketGateWay implements OnGatewayConnection, OnGatewayDisconnect, OnModuleInit {
	@WebSocketServer()
	server: Server;

	constructor(private jwtService: JwtService) {}

	async handleConnection(socket: Socket) {
		try {
			console.log(socket.handshake);

			console.log("socket connect");
			const decodedToken: any = await this.jwtService.decode(socket.handshake.auth.token);
			socket.handshake.auth.user = decodedToken;

			if (decodedToken) {
				socket.join(`user_${decodedToken.user_id}`);
			}
		} catch (error) {
			socket.handshake.auth.user = null;
		}
	}

	async handleDisconnect(client: any) {
		console.log("socket disconnected");
	}

	onModuleInit() {
		this.server.setMaxListeners(30);
		this.server.on("connection", socket => {
			console.log("Socket Connected");
		});
	}

	sendNotification(user_id: string, data: any): void {
		this.server.to(`user_${user_id}`).emit("notification", { data });
	}
}
