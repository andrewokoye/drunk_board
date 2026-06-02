"use client";

import { io } from "socket.io-client";

export const socket = io("https://drunk-board-server.onrender.com");
