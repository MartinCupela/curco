import {IncomingMessage, ServerResponse} from "http";
import {send} from "micro";

export const withErrorHandler = fn => async (req: IncomingMessage, res: ServerResponse) => {
    try {
        return await fn(req, res);
    } catch (err) {
        console.error("Uncaught error", {metadata: {url: req.url, method: req.method}, error: err});

        return send(res, err.statusCode || 500, err.message || 'An error occured, see the log for more info');
    }
};