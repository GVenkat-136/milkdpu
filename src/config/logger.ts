import { createLogger, format, transports } from 'winston';

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(),
        format.json()
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'logs/app.log' })
    ],
});

logger.exceptions.handle(
    new transports.Console(),
    new transports.File({ filename: 'logs/exceptions.log' })
);

logger.rejections.handle(
    new transports.Console(),
    new transports.File({ filename: 'logs/rejections.log' })
);

export default logger;
