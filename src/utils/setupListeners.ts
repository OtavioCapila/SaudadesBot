import { Stream } from "twit";
import logger from "../logger";

const setupListeners = (
  stream: Stream,
  type: "UNLIMITED" | "LIMITED"
): void => {
  stream.on("disconnect", (disconnectMessage: string) => {
    logger.error(`- ${type} - Desconectado - ${disconnectMessage}`);
    stream.start();
  });

  stream.on("connect", () => {
    logger.log(`- ${type} - Conectando`);
  });

  stream.on("connected", () => {
    logger.log(`- ${type} - Conectado`);
  });

  stream.on("warning", (warning: string) => {
    logger.warn(`- ${type} - ${warning}`);
  });
};

export default setupListeners;
